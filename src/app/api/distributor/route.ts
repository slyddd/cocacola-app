import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { distributorSchema } from "@/validations/distributorSchema";
import { z } from "zod";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const distributor = await prisma.distributor.findMany({
      include: { person: true },
    });
    const result = distributor.map((distributor) => {
      return {
        ...distributor,
        person: undefined,
        ...distributor.person,
      };
    });
    return NextResponse.json({
      count: distributor.length,
      results: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const admin = searchParams.get("admin");
  const validAdmin = admin
    ? await prisma.admin.findFirst({
        where: { id: admin },
      })
    : null;

  if (!admin || !validAdmin) {
    return NextResponse.json(
      { error: "Unauthorized, you need to be an admin" },
      { status: 401 },
    );
  }

  const body: z.infer<typeof distributorSchema> = await request.json();
  const validation = await distributorSchema.safeParseAsync({
    ...body,
    dni: body.dni ?? "",
  });

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const distributor = await prisma.distributor.create({
      include: { person: true },
      data: {
        nit: body.nit,
        person: {
          create: {
            dni: body.dni || "",
            name: body.name,
            phone: body.phone,
            email: body.email,
          },
        },
      },
    });

    const setRegister = await axios.post(
      process.env.API_URL + "/admin/" + validAdmin.id,
      {
        description: `Ha creado un nuevo distribuidor (${distributor.person.name}) con el nit: ${distributor.nit}`,
      },
    );

    if (!setRegister) {
      return NextResponse.json(
        { error: "Error al crear el registro del cambio" },
        { status: 500 },
      );
    }

    return NextResponse.json(distributor, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

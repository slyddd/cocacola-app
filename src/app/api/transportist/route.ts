import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { distributorSchema } from "@/validations/distributorSchema";
import { transportistSchema } from "@/validations/transportistSchema";
import { z } from "zod";
import axios from "axios";

export async function GET() {
  try {
    const transportist = await prisma.transportist.findMany({
      include: { person: true },
    });
    const result = transportist.map((transportist) => {
      return {
        ...transportist,
        ...transportist.person,
        person: undefined,
      };
    });
    return NextResponse.json({
      count: transportist.length,
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

  const body: z.infer<typeof transportistSchema> = await request.json();
  const validation = await transportistSchema.safeParseAsync({
    ...body,
    dni: body.dni ?? "",
  });

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const transportist = await prisma.transportist.create({
      include: { person: true },
      data: {
        license: body.license,
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
        description: `Se ha creado un nuevo transportista con el nombre ${transportist.person.name} y el dni ${transportist.person.dni}`,
      },
    );

    if (!setRegister) {
      return NextResponse.json(
        { error: "Error al crear el registro del cambio" },
        { status: 500 },
      );
    }

    return NextResponse.json(transportist, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

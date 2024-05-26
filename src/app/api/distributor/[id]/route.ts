import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { distributorSchema } from "@/validations/distributorSchema";
import { z } from "zod";
import axios from "axios";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const distributor = await prisma.distributor.findUnique({
      where: { id: params.id },
      include: { person: true },
    });

    if (!distributor) {
      return NextResponse.json(
        { error: "Distributor not found" },
        { status: 404 },
      );
    }

    const result = {
      ...distributor,
      person: undefined,
      ...distributor.person,
    };

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
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
  const validation = await distributorSchema.safeParseAsync(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const distributor = await prisma.distributor.update({
      where: { id: params.id },
      include: { person: true },
      data: {
        nit: body.nit,
        person: {
          update: {
            dni: body.dni,
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
        description: `Ha actualizado el distribuidor (${distributor.person.name})`,
      },
    );

    if (!setRegister) {
      return NextResponse.json(
        { error: "Error al crear el registro del cambio" },
        { status: 500 },
      );
    }

    return NextResponse.json(distributor);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
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

  const distributor = await prisma.distributor.findUnique({
    where: { id: params.id },
    include: { person: true },
  });

  if (!distributor) {
    return NextResponse.json(
      { error: "Distributor not found" },
      { status: 404 },
    );
  }

  try {
    const {
      person: { name },
      nit,
    } = distributor;

    await prisma.distributor.delete({
      where: { id: params.id },
    });

    await prisma.person.delete({
      where: { dni: distributor.person.dni },
    });

    const setRegister = await axios.post(
      process.env.API_URL + "/admin/" + validAdmin.id,
      {
        description: `Ha eliminado el distribuidor (${name}) con el nit: ${nit}`,
      },
    );

    if (!setRegister) {
      return NextResponse.json(
        { error: "Error al crear el registro del cambio" },
        { status: 500 },
      );
    }

    return NextResponse.json(distributor);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

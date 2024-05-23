import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { distributorSchema } from "@/validations/distributorSchema";

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
  const body = await request.json();
  const validation = distributorSchema.safeParse(body);

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
    return NextResponse.json(distributor);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
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
    await prisma.distributor.delete({
      where: { id: params.id },
      include: { person: true },
    });
    return NextResponse.json(distributor);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

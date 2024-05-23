import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { z } from "zod";
import { transportistSchema } from "@/validations/transportistSchema";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const transportist = await prisma.transportist.findUnique({
      where: { id: params.id },
      include: { person: true },
    });

    if (!transportist) {
      return NextResponse.json(
        { error: "Transportist not found" },
        { status: 404 },
      );
    }

    const result = {
      ...transportist,
      ...transportist.person,
      person: undefined,
    };

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const body: z.infer<typeof transportistSchema> = await request.json();
  const validation = await transportistSchema.safeParseAsync(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const transportist = await prisma.transportist.update({
      where: { id: params.id },
      include: { person: true },
      data: {
        license: body.license,
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
    return NextResponse.json(transportist);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const transportist = await prisma.transportist.findUnique({
    where: { id: params.id },
    include: { person: true },
  });

  if (!transportist) {
    return NextResponse.json(
      { error: "Transportist not found" },
      { status: 404 },
    );
  }

  try {
    await prisma.transportist.delete({
      where: { id: params.id },
    });

    await prisma.person.delete({
      where: { dni: transportist.person.dni },
    });

    return NextResponse.json(transportist);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { materialSchema } from "@/validations/materialSchema";

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
  const validation = materialSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const material = await prisma.materials.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(material);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const material = await prisma.materials.findUnique({
    where: { id: params.id },
  });

  if (!material) {
    return NextResponse.json({ error: "Material not found" }, { status: 404 });
  }

  try {
    await prisma.materials.delete({ where: { id: params.id } });
    return NextResponse.json(material);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { materialSchema } from "@/validations/materialSchema";
import { z } from "zod";
import axios from "axios";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const material = await prisma.materials.findUnique({
      where: { id: params.id },
    });
    if (!material) {
      return NextResponse.json(
        { error: "Material not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(material);
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

  const body: z.infer<typeof materialSchema> = await request.json();
  const validation = await materialSchema.safeParseAsync(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const material = await prisma.materials.update({
      where: { id: params.id },
      data: body,
    });

    const setRegister = await axios.post(
      process.env.API_URL + "/admin/" + validAdmin.id,
      {
        description: `Se ha actualizado el material con el nombre ${material.name}`,
      },
    );

    if (!setRegister) {
      return NextResponse.json(
        { error: "Error al crear el registro del cambio" },
        { status: 500 },
      );
    }

    return NextResponse.json(material);
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

  const material = await prisma.materials.findUnique({
    where: { id: params.id },
  });

  if (!material) {
    return NextResponse.json({ error: "Material not found" }, { status: 404 });
  }

  try {
    const { name } = material;
    await prisma.materials.delete({ where: { id: params.id } });

    const setRegister = await axios.post(
      process.env.API_URL + "/admin/" + validAdmin.id,
      {
        description: `Se ha eliminado el material con el nombre ${name}`,
      },
    );

    if (!setRegister) {
      return NextResponse.json(
        { error: "Error al crear el registro del cambio" },
        { status: 500 },
      );
    }

    return NextResponse.json(material);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

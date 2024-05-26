import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { z } from "zod";
import { registerSchema } from "@/validations/registerSchema";

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const admin = await prisma.admin.findUnique({
      include: { person: true, register: true },
      where: { id: params.id },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...admin,
      ...admin.person,
      person: undefined,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  const body: z.infer<typeof registerSchema> = await request.json();

  try {
    await prisma.admin.update({
      where: { id: params.id },
      data: {
        register: {
          create: {
            description: body.description,
          },
        },
      },
    });

    return NextResponse.json({ message: "Register created" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

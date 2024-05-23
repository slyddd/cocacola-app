import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { materialSchema } from "@/validations/materialSchema";
import { z } from "zod";

export async function GET() {
  try {
    const materials = await prisma.materials.findMany();
    return NextResponse.json({ count: materials.length, results: materials });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  const body: z.infer<typeof materialSchema> = await request.json();
  const validation = await materialSchema.safeParseAsync(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const material = await prisma.materials.create({ data: body });
    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

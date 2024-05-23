import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { distributorSchema } from "@/validations/distributorSchema";
import { z } from "zod";

export async function GET() {
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
    return NextResponse.json(distributor, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

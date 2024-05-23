import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { distributorSchema } from "@/validations/distributorSchema";
import { transportistSchema } from "@/validations/transportistSchema";
import { z } from "zod";

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
  const body: z.infer<typeof transportistSchema> = await request.json();
  const validation = await transportistSchema.safeParseAsync({
    ...body,
    dni: body.dni ?? "",
  });

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const distributor = await prisma.transportist.create({
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
    return NextResponse.json(distributor, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

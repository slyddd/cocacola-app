import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
  params: { dni: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const person = await prisma.person.findUnique({
      where: { dni: params.dni },
    });

    return NextResponse.json(person);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import { z } from "zod";
import { userSchema } from "@/validations/userSchema";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body: z.infer<typeof userSchema> = await request.json();

  const validation = await userSchema.safeParseAsync({
    ...body,
    dni: body.dni ?? " ",
  });

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const hashPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.admin.create({
      include: { person: true },
      data: {
        password: hashPassword,
        person: {
          create: {
            dni: body.dni ?? "",
            name: body.name.toUpperCase(),
            phone: body.phone,
            email: body.email,
          },
        },
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/libs/prisma";
import { z } from "zod";
import { loginSchema } from "@/validations/loginSchema";

export async function POST(request: NextRequest) {
  const body: z.infer<typeof loginSchema> = await request.json();
  const validation = loginSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  try {
    const user = await prisma.admin.findFirst({
      include: { person: true },
      where: {
        person: {
          email: body.email,
        },
      },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isPasswordValid = await bcrypt.compare(
      body.password as string,
      user.password,
    );

    if (!isPasswordValid)
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });

    const token = jwt.sign(
      { id: user.id, email: user.person.email },
      process.env.NEXTAUTH_SECRET as string,
      {
        expiresIn: "30d",
      },
    );

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.person.name,
          email: user.person.email,
        },
        accessToken: token,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { employeeSchema } from "@/validations/employeeSchema";
import { z } from "zod";

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: { person: true },
    });
    const result = employees.map((employee) => {
      return {
        ...employee,
        ...employee.person,
        bornDate: undefined,
        person: undefined,
        age:
          new Date().getFullYear() - new Date(employee.bornDate).getFullYear(),
      };
    });
    return NextResponse.json({
      count: employees.length,
      results: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  const body: z.infer<typeof employeeSchema> = await request.json();
  const validation = await employeeSchema.safeParseAsync({
    ...body,
    dni: body.dni ?? "",
  });

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const bornYear = new Date().getFullYear() - body.age;
    const dateYear = new Date().setFullYear(bornYear);
    const employee = await prisma.employee.create({
      include: { person: true },
      data: {
        bornDate: new Date(dateYear),
        salary: body.salary,
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
    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

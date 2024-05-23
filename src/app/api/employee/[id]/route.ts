import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { employeeSchema } from "@/validations/employeeSchema";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: params.id },
      include: { person: true },
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Employee not found" },
        { status: 404 },
      );
    }

    const result = {
      ...employee,
      ...employee.person,
      bornDate: undefined,
      person: undefined,
      age: new Date().getFullYear() - new Date(employee.bornDate).getFullYear(),
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
  const validation = employeeSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const bornYear = new Date().getFullYear() - body.age;
    const dateYear = new Date().setFullYear(bornYear);
    const employee = await prisma.employee.update({
      where: { id: params.id },
      include: { person: true },
      data: {
        bornDate: new Date(dateYear),
        salary: body.salary,
        person: {
          update: {
            dni: body.dni,
            name: body.name,
            phone: body.phone,
            email: body.email,
          },
        },
      },
    });
    return NextResponse.json(employee);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const employee = await prisma.employee.findUnique({
    where: { id: params.id },
    include: { person: true },
  });

  if (!employee) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  try {
    await prisma.employee.delete({
      where: { id: params.id },
      include: { person: true },
    });

    await prisma.person.delete({
      where: { dni: employee.person.dni },
    });

    return NextResponse.json(employee);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

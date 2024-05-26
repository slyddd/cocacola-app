import { z } from "zod";
import axios from "axios";
import { PersonInterface } from "@/interfaces/personInterface";

export const employeeSchema = z.object({
  dni: z
    .string({
      message: "El DNI es requerido",
    })
    .refine(
      (value) => {
        return /^(?:\d{8}|\d{10})?$/.test(value);
      },
      {
        message: "El DNI debe tener 8 numeros o 10",
      },
    )
    .refine(
      async (value) => {
        if (value === "") return true;
        try {
          const { data } = await axios.get<PersonInterface>(
            `${process.env.NEXT_PUBLIC_API_URL}/person/${value}`,
          );

          return !data;
        } catch (error) {
          return false;
        }
      },
      {
        message: "El DNI ya está en uso",
      },
    )
    .optional(),
  name: z
    .string({
      message: "El nombre es requerido",
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres",
    }),
  phone: z
    .string({
      message: "El teléfono es requerido",
    })
    .min(10, {
      message: "El teléfono debe tener al menos 10 caracteres",
    })
    .max(10, {
      message: "El teléfono no puede tener más de 10 caracteres",
    })
    .refine(
      (value) => {
        return /^[0-9]+$/.test(value);
      },
      {
        message: "El teléfono debe contener solo números",
      },
    ),
  email: z
    .string({
      message: "El correo es requerido",
    })
    .email({
      message: "El correo debe ser válido",
    }),
  age: z
    .number({
      message: "La edad debe ser un número",
    })
    .int()
    .min(18, {
      message: "La edad mínima es de 18 años",
    })
    .max(100, {
      message: "La edad máxima es de 100 años",
    }),
  salary: z
    .number({
      message: "El salario debe ser un número",
    })
    .int()
    .min(100000, {
      message: "El salario mínimo es de $100.000",
    }),
});

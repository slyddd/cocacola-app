import { z } from "zod";

export const employeeSchema = z.object({
  dni: z
    .string()
    .min(8, {
      message: "El DNI debe tener al menos 8 caracteres",
    })
    .max(10, {
      message: "El DNI no puede tener más de 10 caracteres",
    })
    .refine(
      (value) => {
        return /^[0-9]+$/.test(value);
      },
      {
        message: "El DNI debe contener solo números",
      },
    ),
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  phone: z
    .string()
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
  email: z.string().email({
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

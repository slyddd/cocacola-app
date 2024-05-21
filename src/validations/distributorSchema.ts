import { z } from "zod";

export const distributorSchema = z.object({
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
  nit: z
    .string()
    .min(9, {
      message: "El NIT debe tener al menos 9 caracteres",
    })
    .max(9, {
      message: "El NIT no puede tener más de 9 caracteres",
    })
    .refine(
      (value) => {
        return /^[0-9]+$/.test(value);
      },
      {
        message: "El NIT debe contener solo números",
      },
    ),
});

import { z } from "zod";

export const transportistSchema = z.object({
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
  license: z
    .string()
    .min(14, {
      message: "La licencia debe tener al menos 14 caracteres",
    })
    .max(14, {
      message: "La licencia no puede tener más de 14 caracteres",
    })
    .refine(
      (value) => {
        return /^[0-9]+$/.test(value);
      },
      {
        message: "La licencia debe contener solo números",
      },
    ),
});

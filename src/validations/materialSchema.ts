import { z } from "zod";

export const materialSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  quantity: z
    .number({
      message: "La cantidad debe ser un número",
    })
    .min(0, {
      message: "La cantidad no puede ser menor a 0",
    }),
  unit: z
    .string()
    .min(1, {
      message: "La unidad debe tener al menos 1 caracter",
    })
    .refine(
      (value) => {
        return /^[a-zA-Z]+$/.test(value);
      },
      {
        message: "La unidad debe contener solo letras",
      },
    ),
  price: z
    .number({
      message: "El precio debe ser un número",
    })
    .min(0, {
      message: "El precio no puede ser menor a $0",
    }),
});

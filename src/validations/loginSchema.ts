import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      message: "El email es requerido",
    })
    .email({
      message: "Digite un email valido",
    }),
  password: z
    .string({
      message: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

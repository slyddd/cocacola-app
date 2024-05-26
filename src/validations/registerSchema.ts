import { z } from "zod";

export const registerSchema = z.object({
  description: z.string({
    message: "La descripción es requerida",
  }),
});

import { z } from "zod";
import axios from "axios";
import { PersonInterface } from "@/interfaces/personInterface";

export const transportistSchema = z.object({
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
  license: z
    .string({
      message: "La licencia es requerida",
    })
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

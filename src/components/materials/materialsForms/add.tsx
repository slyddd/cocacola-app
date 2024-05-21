"use client";
import { navigate } from "@/config/navigate";
import { Button } from "@nextui-org/button";
import React from "react";
import materials from "@/data/materials.json";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { editSchema } from "@/validations/materialSchema";

export const Add = () => {
  const [name, setName] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editSchema),
  });

  return (
    <div className="w-full">
      <Button
        onClick={() => navigate("/materials")}
        startContent={<IoMdArrowRoundBack />}
        isIconOnly
      />
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className="mx-auto mt-5 grid w-full grid-cols-2 gap-5"
      >
        <Input
          label="Nombre"
          errorMessage={errors.name?.message as string}
          isInvalid={!!errors.name}
          value={name}
          onValueChange={(value) => setName(value.toUpperCase())}
          {...register("name")}
        />
        <Input
          label="Cantidad"
          type="number"
          errorMessage={errors.quantity?.message as string}
          isInvalid={!!errors.quantity}
          {...register("quantity", { valueAsNumber: true })}
        />
        <Input
          label="Unidad"
          errorMessage={errors.unit?.message as string}
          isInvalid={!!errors.unit}
          {...register("unit")}
        />
        <Input
          label="Precio"
          type="number"
          errorMessage={errors.price?.message as string}
          isInvalid={!!errors.price}
          startContent="$"
          {...register("price", { valueAsNumber: true })}
        />
        <div className="col-span-2 flex">
          <Button
            type="submit"
            color="success"
            className="ml-auto"
            isDisabled={
              !!(errors.name || errors.quantity || errors.unit || errors.price)
            }
          >
            Añadir
          </Button>
        </div>
      </form>
    </div>
  );
};

"use client";
import { navigate } from "@/config/navigate";
import { Button } from "@nextui-org/button";
import React from "react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/validations/employeeSchema";

export const Add = () => {
  const [name, setName] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
  });

  return (
    <div className="w-full">
      <Button
        onClick={() => navigate("/employees")}
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
          label="DNI"
          errorMessage={errors.dni?.message as string}
          isInvalid={!!errors.dni}
          {...register("dni")}
        />
        <Input
          label="Nombre"
          value={name}
          onValueChange={(value) => setName(value.toUpperCase())}
          errorMessage={errors.name?.message as string}
          isInvalid={!!errors.name}
          {...register("name")}
        />
        <Input
          label="Telefono"
          errorMessage={errors.phone?.message as string}
          isInvalid={!!errors.phone}
          startContent="+57"
          {...register("phone")}
        />
        <Input
          label="Correo"
          errorMessage={errors.email?.message as string}
          isInvalid={!!errors.email}
          {...register("email")}
        />
        <Input
          label="Edad"
          type="number"
          errorMessage={errors.age?.message as string}
          isInvalid={!!errors.age}
          {...register("age", { valueAsNumber: true })}
        />
        <Input
          label="Salario"
          type="number"
          errorMessage={errors.salary?.message as string}
          isInvalid={!!errors.salary}
          startContent="$"
          {...register("salary", { valueAsNumber: true })}
        />
        <div className="col-span-2 flex">
          <Button
            type="submit"
            color="success"
            className="ml-auto"
            isDisabled={Object.keys(errors).length > 0}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};

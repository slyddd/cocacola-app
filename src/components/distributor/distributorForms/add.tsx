"use client";
import { navigate } from "@/config/navigate";
import { Button } from "@nextui-org/button";
import React from "react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { distributorSchema } from "@/validations/distributorSchema";
import axios from "axios";

export const Add = () => {
  const [name, setName] = React.useState("");
  const [dni, setDni] = React.useState(" ");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(distributorSchema),
  });
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="w-full">
      <Button
        onClick={() => navigate("/distributor")}
        startContent={<IoMdArrowRoundBack />}
        isIconOnly
      />
      <form
        onSubmit={handleSubmit((data) => {
          setLoading(true);
          axios
            .post(process.env.NEXT_PUBLIC_API_URL + "/distributor", data)
            .finally(() => {
              setLoading(false);
              navigate("/distributor");
            });
        })}
        className="mx-auto mt-5 grid w-full grid-cols-2 gap-5"
      >
        <Input
          label="DNI"
          errorMessage={errors.dni?.message as string}
          isInvalid={!!errors.dni}
          value={dni}
          onValueChange={(value) => setDni(value === "" ? " " : value)}
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
          label="NIT"
          errorMessage={errors.nit?.message as string}
          isInvalid={!!errors.nit}
          {...register("nit")}
        />
        <div className="col-span-2 flex">
          <Button
            type="submit"
            color="success"
            className="ml-auto"
            isDisabled={Object.keys(errors).length > 0}
            isLoading={loading}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};

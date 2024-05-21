"use client";
import { navigate } from "@/config/navigate";
import { Button } from "@nextui-org/button";
import React from "react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import distributors from "@/data/distributors.json";
import { distributorSchema } from "@/validations/distributorSchema";

interface EditProps {
  distributor: (typeof distributors)[0] | undefined;
}

export const Edit = ({ distributor }: EditProps) => {
  const [distributorData, setDistributorData] = React.useState(distributor!);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(distributorSchema),
  });

  return (
    <div className="w-full">
      <Button
        onClick={() => navigate("/distributor")}
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
          label="ID (No editable)"
          value={`${distributor?.id}` ?? ""}
          readOnly
          disabled
          className="opacity-50"
        />
        <Input
          label="DNI"
          value={distributorData?.dni}
          errorMessage={errors.dni?.message as string}
          isInvalid={!!errors.dni}
          onValueChange={(value) =>
            setDistributorData({
              ...distributorData,
              dni: value,
            })
          }
          {...register("dni")}
        />
        <Input
          label="Nombre"
          value={distributorData?.name}
          errorMessage={errors.name?.message as string}
          isInvalid={!!errors.name}
          onValueChange={(value) =>
            setDistributorData({
              ...distributorData,
              name: value.toUpperCase(),
            })
          }
          {...register("name")}
        />
        <Input
          label="Telefono"
          value={distributorData?.phone}
          errorMessage={errors.phone?.message as string}
          isInvalid={!!errors.phone}
          startContent="+57"
          onValueChange={(value) =>
            setDistributorData({
              ...distributorData,
              phone: value,
            })
          }
          {...register("phone")}
        />
        <Input
          label="Correo"
          value={distributorData?.email}
          errorMessage={errors.email?.message as string}
          isInvalid={!!errors.email}
          onValueChange={(value) =>
            setDistributorData({
              ...distributorData,
              email: value,
            })
          }
          {...register("email")}
        />
        <Input
          label="NIT"
          value={distributorData?.nit}
          errorMessage={errors.nit?.message as string}
          isInvalid={!!errors.nit}
          onValueChange={(value) =>
            setDistributorData({
              ...distributorData,
              nit: value,
            })
          }
          {...register("nit")}
        />
        <div className="col-span-2 flex justify-between">
          <Button color="danger">Eliminar</Button>
          <Button
            type="submit"
            color="success"
            isDisabled={Object.keys(errors).length > 0}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};

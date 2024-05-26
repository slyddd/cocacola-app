"use client";
import { navigate } from "@/config/navigate";
import { Button } from "@nextui-org/button";
import React from "react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { distributorSchema } from "@/validations/distributorSchema";
import { DistributorInterface } from "@/interfaces/distributorInterface";
import axios from "axios";

interface EditProps {
  distributor: DistributorInterface;
  admin: string;
}

export const Edit = ({ distributor, admin }: EditProps) => {
  const [distributorData, setDistributorData] = React.useState(distributor);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(distributorSchema),
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  return (
    <div className="w-full">
      <Button
        onClick={() => navigate("/distributor")}
        startContent={<IoMdArrowRoundBack />}
        isIconOnly
      />
      {error && <span className="text-center text-red-500">{error}</span>}
      <form
        onSubmit={handleSubmit((data) => {
          setLoading(true);
          axios
            .put(
              process.env.NEXT_PUBLIC_API_URL +
                "/distributor/" +
                distributorData.id,
              { ...data, dni: data.dni || undefined },
              { params: { admin } },
            )
            .catch((error) => setError(error.response.data.message))
            .then(() => {
              setError("");
              navigate("/distributor");
            })
            .finally(() => {
              setLoading(false);
            });
        })}
        className="mx-auto mt-5 grid w-full grid-cols-2 gap-5"
      >
        <Input
          label="ID (No editable)"
          value={distributorData.id}
          readOnly
          disabled
          className="opacity-50"
        />
        <Input
          label="DNI (Dejar en blanco para no modificar)"
          errorMessage={errors.dni?.message as string}
          isInvalid={!!errors.dni}
          {...register("dni")}
        />
        <Input
          label="Nombre"
          value={distributorData.name}
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
          value={distributorData.phone}
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
          value={distributorData.email}
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
          value={distributorData.nit}
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
          <Button
            color="danger"
            isLoading={loading}
            onPress={() => {
              setLoading(true);
              axios
                .delete(
                  process.env.NEXT_PUBLIC_API_URL +
                    "/distributor/" +
                    distributorData.id,
                  { params: { admin } },
                )
                .catch((error) => setError(error.response.data.message))
                .then(() => {
                  setError("");
                  navigate("/distributor");
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            Eliminar
          </Button>
          <Button
            type="submit"
            color="success"
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

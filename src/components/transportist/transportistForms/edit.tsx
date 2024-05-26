"use client";
import { navigate } from "@/config/navigate";
import { Button } from "@nextui-org/button";
import React from "react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { transportistSchema } from "@/validations/transportistSchema";
import { TransportistInterface } from "@/interfaces/trasnportistInterface";
import axios from "axios";

interface EditProps {
  transportist: TransportistInterface;
  admin: string;
}

export const Edit = ({ transportist, admin }: EditProps) => {
  const [transportistData, setTransportistData] = React.useState(transportist!);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transportistSchema),
  });
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="w-full">
      <Button
        onClick={() => navigate("/transportist")}
        startContent={<IoMdArrowRoundBack />}
        isIconOnly
      />
      <form
        onSubmit={handleSubmit((data) => {
          setLoading(true);
          axios
            .put(
              process.env.NEXT_PUBLIC_API_URL +
                "/transportist/" +
                transportist.id,
              { ...data, dni: data.dni || undefined },
              {
                params: { admin },
              },
            )
            .finally(() => {
              setLoading(false);
              navigate("/transportist");
            });
        })}
        className="mx-auto mt-5 grid w-full grid-cols-2 gap-5"
      >
        <Input
          label="ID (No editable)"
          value={transportistData.id}
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
          value={transportistData.name}
          errorMessage={errors.name?.message as string}
          isInvalid={!!errors.name}
          onValueChange={(value) =>
            setTransportistData({
              ...transportistData,
              name: value.toUpperCase(),
            })
          }
          {...register("name")}
        />
        <Input
          label="Telefono"
          value={transportistData.phone}
          errorMessage={errors.phone?.message as string}
          isInvalid={!!errors.phone}
          startContent="+57"
          onValueChange={(value) =>
            setTransportistData({
              ...transportistData,
              phone: value,
            })
          }
          {...register("phone")}
        />
        <Input
          label="Correo"
          value={transportistData.email}
          errorMessage={errors.email?.message as string}
          isInvalid={!!errors.email}
          onValueChange={(value) =>
            setTransportistData({
              ...transportistData,
              email: value,
            })
          }
          {...register("email")}
        />
        <Input
          label="Licencia"
          value={transportistData.license}
          errorMessage={errors.license?.message as string}
          isInvalid={!!errors.license}
          onValueChange={(value) =>
            setTransportistData({
              ...transportistData,
              license: value,
            })
          }
          {...register("license")}
        />
        <div className="col-span-2 flex justify-between">
          <Button
            color="danger"
            onPress={() => {
              setLoading(true);
              axios
                .delete(
                  process.env.NEXT_PUBLIC_API_URL +
                    "/transportist/" +
                    transportist.id,
                  {
                    params: { admin },
                  },
                )
                .finally(() => {
                  setLoading(false);
                  navigate("/transportist");
                });
            }}
            isLoading={loading}
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

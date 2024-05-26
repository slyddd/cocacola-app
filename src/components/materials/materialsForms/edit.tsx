"use client";
import { navigate } from "@/config/navigate";
import { Button } from "@nextui-org/button";
import React from "react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { materialSchema } from "@/validations/materialSchema";
import { MaterialsInterface } from "@/interfaces/materialsInterface";
import axios from "axios";

interface EditProps {
  material: MaterialsInterface;
  admin: string;
}

export const Edit = ({ material, admin }: EditProps) => {
  const [materialData, setMaterialData] = React.useState(material!);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(materialSchema),
  });
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="w-full">
      <Button
        onClick={() => navigate("/materials")}
        startContent={<IoMdArrowRoundBack />}
        isIconOnly
      />
      <form
        onSubmit={handleSubmit((formData) => {
          setLoading(true);
          axios
            .put(
              process.env.NEXT_PUBLIC_API_URL + "/materials/" + materialData.id,
              formData,
              {
                params: { admin },
              },
            )
            .finally(() => {
              setLoading(false);
              navigate("/materials");
            });
        })}
        className="mx-auto mt-5 grid w-full grid-cols-2 gap-5"
      >
        <Input
          label="ID (No editable)"
          value={materialData.id}
          readOnly
          disabled
          className="opacity-50"
        />
        <Input
          label="Nombre"
          value={materialData.name}
          errorMessage={errors.name?.message as string}
          isInvalid={!!errors.name}
          onValueChange={(value) =>
            setMaterialData({
              ...materialData,
              name: value.toUpperCase(),
            })
          }
          {...register("name")}
        />
        <Input
          label="Cantidad"
          type="number"
          value={materialData.quantity.toString()}
          errorMessage={errors.quantity?.message as string}
          isInvalid={!!errors.quantity}
          onValueChange={(value) =>
            setMaterialData({
              ...materialData,
              quantity: parseInt(value),
            })
          }
          {...register("quantity", { valueAsNumber: true })}
        />
        <Input
          label="Unidad"
          value={materialData.unit}
          errorMessage={errors.unit?.message as string}
          isInvalid={!!errors.unit}
          onValueChange={(value) =>
            setMaterialData({
              ...materialData,
              unit: value.toUpperCase(),
            })
          }
          {...register("unit")}
        />
        <Input
          label="Precio"
          type="number"
          value={materialData.price.toString()}
          errorMessage={errors.price?.message as string}
          isInvalid={!!errors.price}
          startContent="$"
          onValueChange={(value) =>
            setMaterialData({
              ...materialData,
              price: parseFloat(value),
            })
          }
          {...register("price", { valueAsNumber: true })}
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
                    "/materials/" +
                    materialData.id,
                  {
                    params: { admin },
                  },
                )
                .finally(() => {
                  setLoading(false);
                  navigate("/materials");
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

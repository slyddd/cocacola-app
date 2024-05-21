"use client";
import { navigate } from "@/config/navigate";
import { Button } from "@nextui-org/button";
import React from "react";
import materials from "@/data/materials.json";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { materialSchema } from "@/validations/materialSchema";

interface EditProps {
  material: (typeof materials)[0] | undefined;
}

export const Edit = ({ material }: EditProps) => {
  const [materialData, setMaterialData] = React.useState(material!);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(materialSchema),
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
          label="ID (No editable)"
          value={`${material?.id}` ?? ""}
          readOnly
          disabled
          className="opacity-50"
        />
        <Input
          label="Nombre"
          value={materialData?.name}
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
          value={`${materialData?.quantity}`}
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
          value={`${materialData?.unit}`}
          errorMessage={errors.unit?.message as string}
          isInvalid={!!errors.unit}
          onValueChange={(value) =>
            setMaterialData({
              ...materialData,
              unit: value,
            })
          }
          {...register("unit")}
        />
        <Input
          label="Precio"
          type="number"
          value={`${materialData?.price}`}
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

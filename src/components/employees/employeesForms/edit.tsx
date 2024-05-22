"use client";
import { navigate } from "@/config/navigate";
import { Button } from "@nextui-org/button";
import React from "react";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import employees from "@/data/employees.json";
import { employeeSchema } from "@/validations/employeeSchema";

interface EditProps {
  employee: (typeof employees)[0] | undefined;
}

export const Edit = ({ employee }: EditProps) => {
  const [employeeData, setEmployeeData] = React.useState(employee!);
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
          label="ID (No editable)"
          value={`${employee?.id}` ?? ""}
          readOnly
          disabled
          className="opacity-50"
        />
        <Input
          label="DNI"
          value={employeeData?.dni}
          errorMessage={errors.dni?.message as string}
          isInvalid={!!errors.dni}
          onValueChange={(value) =>
            setEmployeeData({
              ...employeeData,
              dni: value,
            })
          }
          {...register("dni")}
        />
        <Input
          label="Nombre"
          value={employeeData?.name}
          errorMessage={errors.name?.message as string}
          isInvalid={!!errors.name}
          onValueChange={(value) =>
            setEmployeeData({
              ...employeeData,
              name: value.toUpperCase(),
            })
          }
          {...register("name")}
        />
        <Input
          label="Telefono"
          value={employeeData?.phone}
          errorMessage={errors.phone?.message as string}
          isInvalid={!!errors.phone}
          startContent="+57"
          onValueChange={(value) =>
            setEmployeeData({
              ...employeeData,
              phone: value,
            })
          }
          {...register("phone")}
        />
        <Input
          label="Correo"
          value={employeeData?.email}
          errorMessage={errors.email?.message as string}
          isInvalid={!!errors.email}
          onValueChange={(value) =>
            setEmployeeData({
              ...employeeData,
              email: value,
            })
          }
          {...register("email")}
        />
        <Input
          label="Edad"
          type="number"
          value={`${employeeData?.age}`}
          errorMessage={errors.age?.message as string}
          isInvalid={!!errors.age}
          onValueChange={(value) =>
            setEmployeeData({
              ...employeeData,
              age: parseInt(value),
            })
          }
          {...register("age", { valueAsNumber: true })}
        />
        <Input
          label="Salario"
          type="number"
          value={`${employeeData?.salary}`}
          startContent="$"
          errorMessage={errors.salary?.message as string}
          isInvalid={!!errors.salary}
          onValueChange={(value) =>
            setEmployeeData({
              ...employeeData,
              salary: parseInt(value),
            })
          }
          {...register("salary", { valueAsNumber: true })}
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

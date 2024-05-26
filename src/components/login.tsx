"use client";
import { handleLogin } from "@/libs/logInAsync";
import { loginSchema } from "@/validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface LoginProps {
  error: string;
  status: number;
  ok: boolean;
  url: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = React.useState<string | null>("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  return (
    <Card className="h-1/2 w-1/2 bg-transparent">
      <CardHeader className="grid grid-cols-1">
        <h2 className="my-5 w-full text-center text-xl font-bold">
          Iniciar Sesion
        </h2>
        {error && (
          <span className="rounded-md bg-danger/30 py-2 text-center">
            {error}
          </span>
        )}
      </CardHeader>
      <CardBody>
        <form
          className="grid grid-cols-1 gap-5"
          onSubmit={handleSubmit(async (data) => {
            setLoading(true);
            const res = await handleLogin({
              email: data.email,
              password: data.password,
            });

            if (!res) {
              setError("No se pudo iniciar sesion");
              setLoading(false);
              return;
            }

            if (!res.ok) {
              setError(res.error!);
              setLoading(false);
              return;
            }

            setLoading(false);
          })}
        >
          <Input
            variant="underlined"
            label="Email"
            errorMessage={errors.email?.message as string}
            isInvalid={!!errors.email}
            {...register("email")}
          />
          <Input
            variant="underlined"
            label="Password"
            type="password"
            errorMessage={errors.password?.message as string}
            isInvalid={!!errors.password}
            {...register("password")}
          />
          <Button type="submit" isLoading={loading}>
            Iniciar Sesion
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

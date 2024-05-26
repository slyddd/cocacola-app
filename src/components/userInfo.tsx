import { Chip } from "@nextui-org/chip";
import { Session } from "next-auth";
import { signOut } from "@/auth";

import React from "react";
import { FaUser } from "react-icons/fa";
import { redirect } from "next/navigation";
import { SessionMod } from "@/interfaces/sessionMod";

interface UserInfoProps {
  session: SessionMod;
}

export const UserInfo = ({ session }: UserInfoProps) => {
  return (
    <div className="flex w-full items-center">
      <h2 className="w-1/2 text-xl font-bold">Registo de Cambios</h2>
      <Chip
        classNames={{
          content: "flex gap-4 items-center justify-end w-full h-full",
        }}
        className="ml-auto h-fit max-w-full bg-transparent px-6 py-3"
        endContent={<FaUser className="ml-6 text-xl" />}
        color="default"
        variant="light"
      >
        <div className="flex flex-col text-right">
          <p className="font-bold">{session.user?.name}</p>
          <p>{session.user?.dni}</p>
          <form
            className="flex h-full w-full items-end justify-center"
            action={async () => {
              "use server";
              await signOut();
              redirect("/");
            }}
          >
            <button className="w-full text-right text-sm underline hover:text-accent">
              (Cerrar Sesión)
            </button>
          </form>
        </div>
      </Chip>
    </div>
  );
};

"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FaPlus, FaSearch } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { motion } from "framer-motion";
import { useBlurActions } from "@/context/blurActions";
import { Ref, useEffect, useRef } from "react";
import { navigate } from "@/config/navigate";
import { useActualFilter } from "@/context/actualFIlter";
import { Chip } from "@nextui-org/chip";

export const BlurActions = () => {
  const { blurState, setBlur } = useBlurActions();
  const { actualFilter, actualColumn, setActualFilter, setActualColumn } =
    useActualFilter();
  const inputRef = useRef<HTMLInputElement>(null);
  const actualUrl =
    typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    const setFocus = async () => {
      if (blurState) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        inputRef.current?.focus();
      }
    };

    setFocus();
  }, [blurState]);

  return (
    <motion.span
      initial={false}
      animate={blurState ? "open" : "closed"}
      variants={{
        open: { display: "flex", opacity: 1 },
        closed: {
          opacity: 0,
          transitionEnd: { display: "none" },
        },
      }}
      transition={{ duration: 0.5 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setBlur(false);
        }
      }}
      className="absolute left-0 top-0 z-50 hidden h-screen w-screen items-end justify-end overflow-clip bg-background/50 p-10 backdrop-blur-md backdrop-saturate-150"
    >
      <div className="flex flex-col items-end justify-center gap-4">
        <motion.div
          variants={{ open: { x: 0 }, closed: { x: "100vw" } }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            size="sm"
            endContent={<FaPlus className="text-xl" />}
            onPress={() => {
              setBlur(false);
              navigate(`${actualUrl}/add`);
            }}
          >
            Agregar
          </Button>
        </motion.div>

        <motion.div
          variants={{ open: { x: 0 }, closed: { x: "100vw" } }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Button
            size="sm"
            endContent={<TbReportAnalytics className="text-xl" />}
          >
            Crear Reporte
          </Button>
        </motion.div>

        <motion.div
          variants={{ open: { x: 0 }, closed: { x: "100vw" } }}
          transition={{ duration: 0.5 }}
        >
          <Input
            label="Buscar"
            labelPlacement="outside"
            ref={inputRef}
            endContent={<FaSearch />}
            startContent={
              actualColumn ? (
                <Chip color="danger" className="text-white">
                  {actualColumn}
                </Chip>
              ) : null
            }
            onValueChange={(value) => {
              if (value.includes(":")) {
                const [column, filter] = value.split(":");
                setActualColumn(column);
                setActualFilter(filter);
                return;
              }
              setActualFilter(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && actualFilter === "") {
                setActualColumn("");
              }
              if (e.key === "Enter" || e.key === "Escape") {
                setBlur(false);
              }
            }}
            value={actualFilter}
          />
        </motion.div>
      </div>
    </motion.span>
  );
};

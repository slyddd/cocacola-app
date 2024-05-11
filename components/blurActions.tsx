"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FaPlus, FaSearch } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { motion } from "framer-motion";
import { useBlurActions } from "@/context/blurActions";

export const BlurActions = () => {
  const { blurState } = useBlurActions();

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
      className="absolute left-0 top-0 z-50 hidden h-screen w-screen items-end justify-end overflow-clip bg-background/70 p-10 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="flex flex-col items-end justify-center gap-4">
        <motion.div
          variants={{ open: { x: 0 }, closed: { x: "100vw" } }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button size="sm" endContent={<FaPlus className="text-xl" />}>
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
            className="active:border-none"
            autoFocus
            endContent={<FaSearch />}
          />
        </motion.div>
      </div>
    </motion.span>
  );
};

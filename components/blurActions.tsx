"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FaPlus, FaSearch } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { motion } from "framer-motion";

export const BlurActions = () => {
  return (
    <span className="absolute left-0 top-0 z-50 flex h-screen w-screen items-end justify-end overflow-clip bg-background/70 p-10 backdrop-blur-xl backdrop-saturate-150">
      <div className="flex flex-col items-end justify-center gap-4">
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button size="sm" endContent={<FaPlus className="text-xl" />}>
            Agregar
          </Button>
        </motion.div>

        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            size="sm"
            endContent={<TbReportAnalytics className="text-xl" />}
          >
            Crear Reporte
          </Button>
        </motion.div>

        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Input label="Buscar" endContent={<FaSearch />} />
        </motion.div>
      </div>
    </span>
  );
};

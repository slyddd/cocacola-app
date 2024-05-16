"use client";
import { navigate } from "@/config/navigate";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { GiBeerBottle } from "react-icons/gi";

interface RegTableProps {
  registers: Array<any>;
}

export const MaterialsTable = ({ registers: rows }: RegTableProps) => {
  return (
    <Tooltip
      content="Doble Click Para Editar"
      placement="top"
      color="default"
      className="z-auto bg-black/10 opacity-70 backdrop-blur-md"
      shadow="sm"
    >
      <Table
        isHeaderSticky
        removeWrapper
        classNames={{
          base: "h-[90%] max-h-[95%] overflow-y-scroll",
          table: "h-[90%] max-h-[95%]",
          thead: "[&>tr>th]:bg-black/10 [&>tr>th]:backdrop-blur-md",
        }}
        aria-label="Materiales en inventario"
        selectionBehavior="replace"
        selectionMode="single"
        onRowAction={(row) => navigate(`/materials/edit/${row}`)}
      >
        <TableHeader>
          <TableColumn key="id">ID</TableColumn>
          <TableColumn key="name">NOMBRE</TableColumn>
          <TableColumn key="quantity">CANTIDAD</TableColumn>
          <TableColumn key="price">PRRECIO</TableColumn>
          <TableColumn key="actions">{""}</TableColumn>
        </TableHeader>
        <TableBody
          items={rows}
          emptyContent={
            <div className="flex items-center justify-center gap-4">
              <p className="opacity-40">
                Aun no hay materiales en el inventario.
              </p>
              <GiBeerBottle className="text-2xl opacity-40" />
            </div>
          }
        >
          {(row) => (
            <TableRow key={row.id}>
              {(item) => <TableCell>{getKeyValue(row, item)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Tooltip>
  );
};

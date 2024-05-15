"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { GiBeerBottle } from "react-icons/gi";

interface RegTableProps {
  registers: Array<any>;
}

export const RegTable = ({ registers: rows }: RegTableProps) => {
  return (
    <Table
      isHeaderSticky
      removeWrapper
      classNames={{
        base: "h-[80%] max-h-[85%] overflow-y-scroll",
        table: "h-[80%] max-h-[85%]",
      }}
    >
      <TableHeader>
        <TableColumn key="id">ID</TableColumn>
        <TableColumn key="description">DESCRIPCIÓN DEL CAMBIO</TableColumn>
        <TableColumn key="date">FECHA</TableColumn>
      </TableHeader>
      <TableBody
        items={rows}
        emptyContent={
          <div className="flex items-center justify-center gap-4">
            <p className="opacity-40">Aun no hay registros de cambios.</p>
            <GiBeerBottle className="text-2xl opacity-40" />
          </div>
        }
      >
        {(row) => (
          <TableRow key={row.key}>
            {(item) => <TableCell>{getKeyValue(row, item)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

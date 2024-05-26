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
import { useAsyncList } from "@react-stately/data";
import { RegisterInterface } from "@/interfaces/registerInterfcae";

interface RegTableProps {
  registers: RegisterInterface[];
}

export const RegTable = ({ registers: rows }: RegTableProps) => {
  let list = useAsyncList({
    async load() {
      return {
        items: rows.map((row) => ({
          ...row,
          createdAt: new Date(row.createdAt).toLocaleDateString(),
        })),
      };
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[(sortDescriptor.column ?? "id") as keyof typeof a];
          let second = b[(sortDescriptor.column ?? "id") as keyof typeof b];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      isHeaderSticky
      removeWrapper
      classNames={{
        base: "max-h-[80%] overflow-y-scroll",
        table: "max-h-[80%]",
        thead: "[&>tr>th]:bg-black/10 [&>tr>th]:backdrop-blur-md",
      }}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader>
        <TableColumn key="id" allowsSorting>
          ID
        </TableColumn>
        <TableColumn key="description">DESCRIPCIÓN DEL CAMBIO</TableColumn>
        <TableColumn key="createdAt" allowsSorting>
          FECHA
        </TableColumn>
      </TableHeader>
      <TableBody
        items={list.items}
        emptyContent={
          <div className="flex items-center justify-center gap-4">
            <p className="opacity-40">Aun no hay registros de cambios.</p>
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
  );
};

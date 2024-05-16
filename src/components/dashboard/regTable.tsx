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

interface RegTableProps {
  registers: Array<any>;
}

export const RegTable = ({ registers: rows }: RegTableProps) => {
  let list = useAsyncList({
    async load() {
      return { items: rows };
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column ?? "id"];
          let second = b[sortDescriptor.column ?? "id"];
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
        base: "h-[80%] max-h-[85%] overflow-y-scroll",
        table: "h-[80%] max-h-[85%]",
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
        <TableColumn key="date" allowsSorting>
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
          <TableRow key={row.key}>
            {(item) => <TableCell>{getKeyValue(row, item)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

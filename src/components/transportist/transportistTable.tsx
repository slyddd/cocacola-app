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
import { useAsyncList } from "@react-stately/data";
import { useActualFilter } from "@/context/actualFIlter";
import { filterItems } from "@/libs/filterItems";
import { TransportistInterface } from "@/interfaces/trasnportistInterface";

interface RegTableProps {
  registers: TransportistInterface[];
}

export const TransportistTable = ({ registers: rows }: RegTableProps) => {
  const { actualFilter, actualColumn } = useActualFilter();

  let list = useAsyncList<TransportistInterface>({
    async load() {
      return {
        items: rows,
      };
    },

    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[(sortDescriptor.column ?? "id") as keyof typeof a];
          let second = b[(sortDescriptor.column ?? "id") as keyof typeof b];
          let cmp = first < second ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

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
          base: "max-h-[90%] overflow-y-scroll",
          table: "max-h-[90%]",
          thead: "[&>tr>th]:bg-black/10 [&>tr>th]:backdrop-blur-md",
        }}
        aria-label="Proveedores en inventario"
        selectionBehavior="replace"
        selectionMode="single"
        onRowAction={(row) => {
          navigate(`/transportist/edit/${row}`);
        }}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader>
          <TableColumn key="id" textValue="id" allowsSorting>
            ID
          </TableColumn>
          <TableColumn key="dni" allowsSorting>
            DNI
          </TableColumn>
          <TableColumn key="name" allowsSorting>
            NOMBRE
          </TableColumn>
          <TableColumn key="phone">TELEFONO</TableColumn>
          <TableColumn key="email">CORREO</TableColumn>
          <TableColumn key="license" allowsSorting>
            LICENCIA
          </TableColumn>
        </TableHeader>
        <TableBody
          items={filterItems(list.items, actualFilter, actualColumn)}
          emptyContent={
            <div className="flex items-center justify-center gap-4">
              <p className="opacity-40">
                Aun no hay transportistas en el inventario.
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

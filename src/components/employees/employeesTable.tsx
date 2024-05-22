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
import employees from "@/data/employees.json";

interface RegTableProps {
  registers: typeof employees;
}

export const EmployeesTable = ({ registers: rows }: RegTableProps) => {
  const modRows = rows.map((row) => ({
    ...row,
    salary: `$${row.salary}`,
  }));
  let list = useAsyncList({
    async load() {
      return { items: modRows };
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
          base: "h-[90%] max-h-[95%] overflow-y-scroll",
          table: "h-[90%] max-h-[95%]",
          thead: "[&>tr>th]:bg-black/10 [&>tr>th]:backdrop-blur-md",
        }}
        aria-label="Proveedores en inventario"
        selectionBehavior="replace"
        selectionMode="single"
        onRowAction={(row) => {
          navigate(`/employees/edit/${row}`);
        }}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader>
          <TableColumn key="id" allowsSorting>
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
          <TableColumn key="age" allowsSorting>
            EDAD
          </TableColumn>
          <TableColumn key="salary" allowsSorting>
            SALARIO
          </TableColumn>
        </TableHeader>
        <TableBody
          items={list.items}
          emptyContent={
            <div className="flex items-center justify-center gap-4">
              <p className="opacity-40">
                Aun no hay empleados en el inventario.
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

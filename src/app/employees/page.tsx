import { EmployeesTable } from "@/components/employees/employeesTable";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";
import employees from "@/data/employees.json";

export default function Employees() {
  return (
    <ActiveSectionProvider section={enumSections._EMPLOYEES_}>
      <EmployeesTable registers={employees} />
    </ActiveSectionProvider>
  );
}

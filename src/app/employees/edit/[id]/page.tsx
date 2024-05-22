import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";
import employees from "@/data/employees.json";
import { EditEmployeesForm } from "@/components/employees/employeesForms";

interface Params {
  params: {
    id: string;
  };
}

export default function EditEmployee({ params }: Params) {
  const employee = employees.find(
    (employee) => employee.id === parseInt(params.id),
  );
  return (
    <ActiveSectionProvider section={enumSections._EMPLOYEES_} editMode>
      <EditEmployeesForm employee={employee} />
    </ActiveSectionProvider>
  );
}

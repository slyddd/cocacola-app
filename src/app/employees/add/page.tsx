import { AddEmployeesForm } from "@/components/employees/employeesForms";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default function AddMaterial() {
  return (
    <ActiveSectionProvider section={enumSections._EMPLOYEES_} editMode>
      <AddEmployeesForm />
    </ActiveSectionProvider>
  );
}

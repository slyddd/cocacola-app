import { auth } from "@/auth";
import { AddEmployeesForm } from "@/components/employees/employeesForms";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";

export default async function AddMaterial() {
  const session = await auth();
  return (
    <ActiveSectionProvider section={enumSections._EMPLOYEES_} editMode>
      <AddEmployeesForm admin={session?.user?.id || ""} />
    </ActiveSectionProvider>
  );
}

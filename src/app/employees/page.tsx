import { EmployeesTable } from "@/components/employees/employeesTable";
import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";
import axios from "axios";
import { MainInterface } from "@/interfaces/mainInterface";
import { EmployeesInterface } from "@/interfaces/employeesInterface";

export default async function Employees() {
  const { data } = await axios.get<MainInterface<EmployeesInterface>>(
    process.env.API_URL + "/employee",
  );
  return (
    <ActiveSectionProvider section={enumSections._EMPLOYEES_}>
      <EmployeesTable registers={data.results} />
    </ActiveSectionProvider>
  );
}

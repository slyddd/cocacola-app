import { enumSections } from "@/config/sections";
import { ActiveSectionProvider } from "@/providers/activeSection";
import { EditEmployeesForm } from "@/components/employees/employeesForms";
import axios from "axios";
import { EmployeesInterface } from "@/interfaces/employeesInterface";

interface Params {
  params: {
    id: string;
  };
}

export default async function EditEmployee({ params }: Params) {
  const { data } = await axios.get<EmployeesInterface>(
    process.env.API_URL + "/employee/" + params.id,
  );
  return (
    <ActiveSectionProvider section={enumSections._EMPLOYEES_} editMode>
      <EditEmployeesForm employee={data} />
    </ActiveSectionProvider>
  );
}

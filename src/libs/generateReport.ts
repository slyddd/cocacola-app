import { MainInterface } from "@/interfaces/mainInterface";
import axios from "axios";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ReportData {
  title: string;
  url: string;
}

export async function generateReport({ title, url }: ReportData) {
  const {
    data: { results: data },
  } = await axios.get<MainInterface<any>>(
    process.env.NEXT_PUBLIC_API_URL + url,
  );

  if (!data) {
    return;
  }

  if (data.length === 0) {
    return alert("No data to generate report");
  }

  const doc = new jsPDF();

  const columns = Object.keys(data[0]);
  const rows: any[][] = data.map((row) => Object.values(row));

  autoTable(doc, {
    head: [columns],
    body: rows,
  });
  doc.text(title, 0, 0, { align: "center" }, { maxWidth: 200 });

  doc.save(`${title}.pdf`);
}

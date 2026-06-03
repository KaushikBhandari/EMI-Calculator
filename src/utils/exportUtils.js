import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToCSV = (data, filename) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToPDF = (data, filename, currency) => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Amortization Schedule', 14, 22);

  const tableColumn = ["Month", "EMI", "Principal Paid", "Interest Paid", "Cumulative Principal", "Remaining Balance"];
  const tableRows = [];

  data.forEach(row => {
    const rowData = [
      row.month,
      `${row.emi}`,
      `${row.principalPaid}`,
      `${row.interestPaid}`,
      `${row.cumulativePrincipal}`,
      `${row.balance}`
    ];
    tableRows.push(rowData);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save(filename);
};

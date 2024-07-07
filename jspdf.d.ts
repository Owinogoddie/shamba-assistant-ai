import 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: import('jspdf-autotable').UserOptions) => void;
    lastAutoTable: {
      finalY: number;
    };
    internal: jsPDF['internal'] & {
      getNumberOfPages: () => number;
    };
  }
}
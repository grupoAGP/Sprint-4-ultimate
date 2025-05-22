import { FC, useState } from 'react';
import ReportCard from '@/components/ReportCard';

const reports = [
  { name: 'Problema na Linha', icon: 'train', priority: 'high' },
  { name: 'Problema de Segurança', icon: 'warning', priority: 'medium' },
  { name: 'Atraso no Serviço', icon: 'clock', priority: 'low' },
  { name: 'Outro Problema', icon: 'other', priority: 'other' },
];

const ReportList: FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 gap-6">
      {reports.map((report) => (
        <div key={report.name}>
          <ReportCard
            name={report.name}
            icon={report.icon as any}
            priority={report.priority as any}
            selected={selectedReport === report.name}
            onClick={() => setSelectedReport(report.name)}
          />
          {selectedReport === report.name && (
            <textarea
              placeholder="Descreva o problema aqui..."
              className="mt-4 w-full p-3 rounded-lg border-2 border-gray-600 bg-darkCard text-white"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportList;

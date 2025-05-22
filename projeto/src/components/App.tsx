import { FC } from 'react';
import ReportList from '@/components/ReportList';

const App: FC = () => {
  return (
    <div className="min-h-screen bg-darkBackground text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Sistema de Reportes</h1>
      <ReportList />
    </div>
  );
};

export default App;

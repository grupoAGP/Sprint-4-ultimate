import { FC, useState } from 'react';
import Icons from '@/components/Icons';
import clsx from 'clsx';


type ReportCardProps = {
  name: string;
  icon: 'train' | 'warning' | 'clock' | 'other';
  priority: 'high' | 'medium' | 'low' | 'other';
  onClick: () => void;
  selected: boolean;
};

const ReportCard: FC<ReportCardProps> = ({ name, icon, priority, onClick, selected }) => {
  const borderColors = {
    high: 'border-highPriority',
    medium: 'border-mediumPriority',
    low: 'border-lowPriority',
    other: 'border-otherProblem',
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'p-6 border-2 rounded-2xl flex flex-col items-center cursor-pointer transition-all duration-300',
        selected && borderColors[priority],
        !selected && 'border-gray-600'
      )}
    >
      <Icons name={icon} className="w-16 h-16 mb-2" />
      <h3 className="text-white text-lg font-medium">{name}</h3>
    </div>
  );
};

export default ReportCard;

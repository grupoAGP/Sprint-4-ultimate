"use client";

import { FC } from 'react';
import Image from 'next/image';

interface IconProps {
  name: 'train' | 'warning' | 'clock' | 'other';
  className?: string;
}

const Icons: FC<IconProps> = ({ name, className = '' }) => {
  const icons = {
    train: '/img/train.png',
    warning: '/img/warning.png',
    clock: '/img/clock.png',
    other: '/img/outro.png',
  };

  return (
    <Image
      src={icons[name]}
      alt={name}
      className={className}
      width={32}
      height={32}
    />
  );
};

export default Icons;

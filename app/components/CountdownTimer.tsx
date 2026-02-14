'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  datetime: string | Date;
}

export function CountdownTimer({ datetime }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<string>('');
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date(datetime);
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setIsPast(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      const formatted = `${String(days).padStart(2, '0')}d : ${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m`;
      setCountdown(formatted);
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);

    return () => clearInterval(interval);
  }, [datetime]);

  if (isPast) {
    return <span className="opacity-60 font-family-garamond">out now!</span>;
  }

  return <span className='lg:text-nowrap lg:whitespace-nowrap '>{countdown}</span>;
}

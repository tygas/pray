import { useQuery } from '@tanstack/react-query';
import { addDays, format } from 'date-fns';

interface LunarInfo {
  moonDay: number;
  nextEkadashi: {
    date: string;
    name: string;
  };
}

const calculateMoonDay = (date: Date): number => {
  // Simplified calculation - in production use a proper astronomical calculation
  const startOfLunarMonth = new Date('2024-03-10'); // New moon
  const daysSinceNewMoon = Math.floor((date.getTime() - startOfLunarMonth.getTime()) / (1000 * 60 * 60 * 24));
  return (daysSinceNewMoon % 30) + 1;
};

const findNextEkadashi = (date: Date) => {
  let currentDate = new Date();
  let daysToAdd = 0;

  while (calculateMoonDay(currentDate) !== 11) {
    currentDate = addDays(date, ++daysToAdd);
  }

  return {
    date: format(currentDate, 'MMM dd, yyyy'),
    name: 'Next Ekadashi',
  };
};

export function useLunarInfo(date: Date) {
  return useQuery({
    queryKey: ['lunarInfo', format(date, 'yyyy-MM-dd')],
    queryFn: () => {
      const moonDay = calculateMoonDay(date);
      const nextEkadashi = findNextEkadashi(date);

      return {
        moonDay,
        nextEkadashi,
      } as LunarInfo;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

interface PrayerText {
  arabic: string;
  english: string;
  translation: string;
}

const fetchPrayerText = async (prayerName: string, date: string): Promise<PrayerText> => {
  // Simulated API call - in production, replace with actual Quran API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        english: 'In the name of Allah, the Most Gracious, the Most Merciful',
        translation: 'This is a sample prayer text that would be fetched from an API based on the prayer time and date.',
      });
    }, 500);
  });
};

export function usePrayerText(prayerName: string, date: Date) {
  return useQuery({
    queryKey: ['prayerText', prayerName, format(date, 'yyyy-MM-dd')],
    queryFn: () => fetchPrayerText(prayerName, format(date, 'yyyy-MM-dd')),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}
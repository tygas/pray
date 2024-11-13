import { useState, useEffect } from 'react';
import { PrayerTimes, Coordinates, CalculationMethod } from 'adhan';
import type { PrayerTime } from '../types';

export function usePrayerTimes(latitude: number | null, longitude: number | null) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) {
      console.log('Latitude and longitude are required to calculate prayer times');
      return;
    }
    try {
      console.log(latitude)

      const coordinates = new Coordinates(latitude, longitude);
      const date = new Date();
      const params = CalculationMethod.MoonsightingCommittee();
      const prayerTimesData = new PrayerTimes(coordinates, date, params);

      const times: PrayerTime[] = [
        {
          name: 'Fajr',
          nameArabic: 'الفجر',
          time: prayerTimesData.fajr.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Dawn prayer before sunrise',
          descriptionArabic: 'صلاة الصبح قبل شروق الشمس',
        },
        {
          name: 'Dhuhr',
          nameArabic: 'الظهر',
          time: prayerTimesData.dhuhr.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Noon prayer',
          descriptionArabic: 'صلاة الظهر',
        },
        {
          name: 'Asr',
          nameArabic: 'العصر',
          time: prayerTimesData.asr.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Afternoon prayer',
          descriptionArabic: 'صلاة العصر',
        },
        {
          name: 'Maghrib',
          nameArabic: 'المغرب',
          time: prayerTimesData.maghrib.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Sunset prayer',
          descriptionArabic: 'صلاة المغرب',
        },
        {
          name: 'Isha',
          nameArabic: 'العشاء',
          time: prayerTimesData.isha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: 'Night prayer',
          descriptionArabic: 'صلاة العشاء',
        },
      ];

      setPrayerTimes(times);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate prayer times');
      setLoading(false);
    }
  }, [latitude, longitude]);

  return { prayerTimes, loading, error };
}

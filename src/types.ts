export interface PrayerTime {
  name: string;
  nameArabic: string;
  time: string;
  description: string;
  descriptionArabic: string;
}

export interface WeatherData {
  temperature: number;
  city: string;
}

export interface MoonPhase {
  phase: string;
  emoji: string;
}
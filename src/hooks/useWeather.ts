import { useQuery } from '@tanstack/react-query';
import type { WeatherData } from '../types';

const API_KEY = 'ca8565bfe8a2e6a112df82f619c220ab';

const fetchWeather = async (latitude: number, longitude: number): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Weather data fetch failed');
  }

  const data = await response.json();

  return {
    temperature: Math.round(data.main.temp),
    city: data.name,
  };
};

export function useWeather(latitude: number | null, longitude: number | null) {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () =>
      latitude && longitude ? fetchWeather(latitude, longitude) : null,
    enabled: !!latitude && !!longitude,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

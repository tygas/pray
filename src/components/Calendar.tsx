import { format, getWeek, addDays, startOfWeek, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Moon } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';
import { useLunarInfo } from '../hooks/useLunarInfo';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  coordinates: { latitude: number | null; longitude: number | null };
}

export function Calendar({
  selectedDate,
  onDateSelect,
  coordinates,
}: CalendarProps) {
  const { data: weather } = useWeather(
    coordinates.latitude,
    coordinates.longitude
  );
  const { data: lunarInfo } = useLunarInfo(selectedDate);
  const weekNumber = getWeek(selectedDate);
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getMoonPhase = () => {
    const day = lunarInfo?.moonDay ?? 1;
    if (day <= 7) return '🌑';
    if (day <= 14) return '🌓';
    if (day <= 21) return '🌕';
    return '🌗';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {format(selectedDate, 'MMMM')}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Week {weekNumber}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <Moon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-1" />
              <span>{getMoonPhase()}</span>
            </div>
            {lunarInfo && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Day {lunarInfo.moonDay}
              </div>
            )}
          </div>
          {weather && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {weather.temperature}°C - {weather.city}
            </div>
          )}
        </div>
      </div>
      {lunarInfo?.nextEkadashi && (
        <div className="text-sm text-indigo-600 dark:text-indigo-400 mb-2">
          Next Ekadashi: {lunarInfo.nextEkadashi.date}
        </div>
      )}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((date) => (
          <div
            key={date.toString()}
            onClick={() => onDateSelect(date)}
            className={`text-center p-2 rounded-lg cursor-pointer transition-colors ${
              isSameDay(date, selectedDate)
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <div className="text-xs">{format(date, 'EEE')}</div>
            <div className="text-sm">{format(date, 'd')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

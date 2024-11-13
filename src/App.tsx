import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Calendar } from './components/Calendar';
import { PrayerCard } from './components/PrayerCard';
import { NewsFooter } from './components/NewsFooter';
import { useGeolocation } from './hooks/useGeolocation';
import { usePrayerTimes } from './hooks/usePrayerTimes';
import { useTheme } from './hooks/useTheme';
import { MapPin } from 'lucide-react';

const queryClient = new QueryClient();

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { latitude: geoLatitude, longitude: geoLongitude, error: geoError } = useGeolocation();
  const latitude = geoLatitude || 54.8985; // Default latitude
  const longitude = geoLongitude || 23.9036; // Default longitude
  const { prayerTimes, loading, error: prayerError } = usePrayerTimes(latitude, longitude);

  const theme = useTheme();
  console.log(theme);



  const getNextPrayerIndex = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    return prayerTimes.findIndex((prayer) => {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      return prayerTime > currentTime;
    });
  };

  const nextPrayerIndex = getNextPrayerIndex();

  if (geoError) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-2">Error: {geoError}</p>
            <p className="text-gray-600 dark:text-gray-400">Please enable location services to use this app.</p>
          </div>
        </div>
    );
  }

  if (prayerError) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-2">Error: {prayerError.message}</p>
            <p className="text-gray-600 dark:text-gray-400">An error occurred while fetching prayer times.</p>
          </div>
        </div>
    );
  }

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent"></div>
        </div>
    );
  }

  return (
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Prayer Times
                </h1>
                {latitude && longitude && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{latitude.toFixed(2)}°N, {longitude.toFixed(2)}°E</span>
                    </div>
                )}
              </div>
              <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  coordinates={{ latitude, longitude }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prayerTimes?.map((prayer, index) => (
                  <PrayerCard
                      key={prayer.name}
                      prayer={prayer}
                      isNext={index === nextPrayerIndex}
                      selectedDate={selectedDate}
                  />
              ))}
            </div>
          </div>
          <NewsFooter />
        </div>
      </QueryClientProvider>
  );
}

export default App;

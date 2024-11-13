import { useState } from 'react';
import { Clock } from 'lucide-react';
import type { PrayerTime } from '../types';
import { Modal } from './Modal';
import { usePrayerText } from '../hooks/usePrayerText';

interface PrayerCardProps {
  prayer: PrayerTime;
  isNext: boolean;
  selectedDate: Date;
}

export function PrayerCard({ prayer, isNext, selectedDate }: PrayerCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: prayerText } = usePrayerText(prayer.name, selectedDate);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`${
          isNext
            ? 'bg-indigo-600 text-white shadow-indigo-200 dark:bg-indigo-500'
            : 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white'
        } rounded-lg shadow-lg p-6 transition-all duration-300 hover:scale-105 cursor-pointer`}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`text-xl font-bold ${
              isNext ? 'text-white' : 'text-inherit'
            }`}>
              {prayer.name}
            </h3>
            <p className={`text-lg ${
              isNext ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-300'
            }`}>
              {prayer.nameArabic}
            </p>
          </div>
          <Clock className={`h-6 w-6 ${
            isNext ? 'text-indigo-200' : 'text-indigo-600 dark:text-indigo-400'
          }`} />
        </div>
        <div className="text-2xl font-bold mb-4">{prayer.time}</div>
        <div className="space-y-2">
          <p className={`text-sm ${
            isNext ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-300'
          }`}>
            {prayer.description}
          </p>
          <p
            className={`text-sm font-arabic ${
              isNext ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-300'
            }`}
            dir="rtl"
          >
            {prayer.descriptionArabic}
          </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${prayer.name} Prayer - ${prayer.nameArabic}`}
      >
        <div className="space-y-6">
          {prayerText ? (
            <>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold dark:text-white">Today's Prayer Text</h3>
                <p className="text-gray-700 dark:text-gray-300">{prayerText.english}</p>
                <p className="font-arabic text-lg text-gray-800 dark:text-gray-200" dir="rtl">
                  {prayerText.arabic}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold dark:text-white">Translation</h4>
                <p className="text-gray-600 dark:text-gray-400">{prayerText.translation}</p>
              </div>
            </>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Loading prayer text...</p>
          )}
        </div>
      </Modal>
    </>
  );
}

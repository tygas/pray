import { useNews } from '../hooks/useNews';
import { ExternalLink } from 'lucide-react';

export function NewsFooter() {
  const { data: news, isLoading, error } = useNews();

  if (isLoading || error || !news?.length) return null;

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg mt-8 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Latest News
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ExternalLink className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-900 dark:text-gray-100">{item.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.source}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

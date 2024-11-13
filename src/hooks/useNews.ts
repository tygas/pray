import { useQuery } from '@tanstack/react-query';

interface NewsItem {
  title: string;
  url: string;
  source: string;
}

const fetchNews = async (): Promise<NewsItem[]> => {
  const response = await fetch(
    'https://api.spaceflightnewsapi.net/v4/articles/?limit=5'
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  const data = await response.json();
  return data.results.map((item: any) => ({
    title: item.title,
    url: item.url,
    source: item.news_site,
  }));
};

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    staleTime: 60 * 60 * 1000, // 1 hour
    cacheTime: 60 * 60 * 1000, // 1 hour
  });
}
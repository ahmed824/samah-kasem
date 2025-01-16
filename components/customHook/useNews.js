import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '../baseUrl';

const getLiteNews = async () => {
  const { data } = await axios.get(`${baseUrl}/rest/tables.news/getLiteNews`);
  return data.list;
};

export const useNews = () => {
  return useQuery({
    queryKey: ['liteNews'],
    queryFn: getLiteNews,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};

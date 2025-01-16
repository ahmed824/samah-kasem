import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '@/components/baseUrl';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/rest/tables.news/getcatPojos`);
      return response.data.cats;
    },
    staleTime: 1000 * 60 * 10, // Fresh for 10 minutes
    cacheTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: true,
    retry: 2
  });
};


export const useDresses = (selectedType) => {
  return useQuery({
    queryKey: ['dresses', selectedType],
    queryFn: async () => {
      if (!selectedType) return [];
      
      const response = await axios.post(
        `${baseUrl}/rest/tables.news/getgalleryPojos`,
        { id: selectedType }
      );
      return response.data.list;
    },
    enabled: !!selectedType,
    staleTime: 1000 * 60 * 5, // Fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache for 30 minutes
    refetchOnWindowFocus: false
  });
};
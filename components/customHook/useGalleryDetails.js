import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '@/components/baseUrl';

// Add this new hook for gallery details
export const useGalleryDetails = (id) => {
  return useQuery({
    queryKey: ['galleryDetails', id],
    queryFn: async () => {
      const response = await axios.post(
        `${baseUrl}/rest/tables.news/getgalleryDetails`,
        { id }
      );
      return response.data;
    },
    enabled: !!id
  });
};

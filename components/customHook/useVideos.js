import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../baseUrl";

export const useVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/rest/tables.news/getLatestVideos`);
      return response.data.videos;
    },
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache persists for 30 minutes
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    refetchOnMount: false, // Prevent refetch on component mount
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    select: (data) => {
      return data.map(video => ({
        ...video,
        formattedDate: new Date(video.date).toLocaleDateString(),
        thumbnailUrl: `${baseUrl}/media/${video.thumbnail}`,
      }));
    },
  });
};

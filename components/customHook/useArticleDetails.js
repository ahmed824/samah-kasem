import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../baseUrl";

export const useArticleDetails = (articleId) => {
  return useQuery({
    queryKey: ["article", articleId],
    queryFn: async () => {
      const response = await axios.post(
        `${baseUrl}/rest/tables.news/getarticlePojo`,
        { id: articleId }
      );
      return response.data;
    },
    enabled: !!articleId,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Cache persists for 30 minutes
    refetchOnWindowFocus: false,
  });
};

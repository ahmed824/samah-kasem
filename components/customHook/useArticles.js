import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../baseUrl";

export const useArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/rest/tables.news/getarticlePojos`
      );
      return response.data.list;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: true,
    retry: 3,
  });
};

export const useSaveArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articleData) => {
      const response = await axios.post(
        `${baseUrl}/rest/tables.news/saveArticle`,
        articleData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
    },
  });
};

// Update Article
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${baseUrl}/rest/tables.news/updateArticle`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
    },
  });
};

// Delete Article
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axios.post(
        `${baseUrl}/rest/tables.news/deleteArticle`,
        { id }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
    },
  });
};

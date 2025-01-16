import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/components/baseUrl";

export const useNewsData = (articleId) => {
  const fetchNewsDetail = async (id) => {
    const response = await axios.post(
      `${baseUrl}/rest/tables.news/getnewsDetail`,
      { id }
    );
    return response.data;
  };

  const fetchMatchedNews = async (id) => {
    const response = await axios.post(
      `${baseUrl}/rest/tables.news/getMatchedNews`,
      { id }
    );
    return response.data.list;
  };

  const { data: article, isLoading: articleLoading } = useQuery({
    queryKey: ["newsDetail", articleId],
    queryFn: () => fetchNewsDetail(articleId),
    enabled: !!articleId,
  });

  const { data: relatedArticles = [], isLoading: relatedLoading } = useQuery({
    queryKey: ["matchedNews", articleId],
    queryFn: () => fetchMatchedNews(articleId),
    enabled: !!articleId,
  });

  return {
    article,
    relatedArticles,
    isLoading: articleLoading || relatedLoading,
  };
};

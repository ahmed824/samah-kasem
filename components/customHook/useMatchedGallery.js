import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../baseUrl";
import axios from "axios";

export const useMatchedGallery = (id) => {
    return useQuery({
      queryKey: ['matchedGallery', id],
      queryFn: async () => {
        const response = await axios.post(
          `${baseUrl}/rest/tables.news/getMatchedgallery`,
          { id }
        );
        return response.data;
      },
      enabled: !!id
    });
  };
  
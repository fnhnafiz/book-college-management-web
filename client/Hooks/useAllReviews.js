import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const useAllReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, isLoading } = await axios.get(
        `${API_BASE_URL}/all-reviews`
      );
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

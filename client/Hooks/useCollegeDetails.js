import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
export const useCollegeDetails = (id) => {
  return useQuery({
    queryKey: ["collegeDetails", id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/colleges/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

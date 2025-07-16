import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const useMyAdmissions = (email) => {
  return useQuery({
    queryKey: ["myAdmissions", email],
    queryFn: async () => {
      const { data } = await axios.get(`${API_BASE_URL}/my-addmissions`, {
        params: { email },
      });
      return data;
    },
    enabled: !!email,
  });
};

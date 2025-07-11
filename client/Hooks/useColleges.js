import { useQuery } from "@tanstack/react-query";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const useColleges = () => {
  return useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/colleges`);
      if (!res.ok) throw new Error("Failed to fetch colleges");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
};

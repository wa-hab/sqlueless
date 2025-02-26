import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGenerateSQL = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, query }: { id: string; query: string }) => {
      try {
        const response = await axios.post("/ai", { id, query });
        return response.data;
      } catch (error: any) {
        throw new Error("Failed to generate SQL");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
};

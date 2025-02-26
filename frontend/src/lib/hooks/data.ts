import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUploadDatabase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post("/data", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["userDatabases"],
      });
    },
  });
};

export const getUserDatabases = () => {
  return useQuery({
    queryKey: ["userDatabases"],
    queryFn: async () => {
      const { data } = await axios.get("/data/user");
      return data;
    },
  });
};

export interface Workflow {
  id: string;
  userDatabaseId: string;
  generatedQuery: string | null;
  naturalLanguageQuery: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const getDatabaseWorkflows = (databaseId: string | null) => {
  return useQuery({
    queryKey: ["workflows", databaseId],
    queryFn: async () => {
      const { data } = await axios.get<Workflow[]>(
        `/workflow/database/${databaseId}/workflows`,
      );
      return data;
    },
    enabled: !!databaseId,
  });
};

export const getQueryStatus = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.get(`/workflow/status/${id}`);
      return data;
    },
    // onSuccess: (data, ) => {
    //   // Stop polling when a specific condition is met (e.g., status is "completed")
    //   if (data.status === "pending") {
    //     conte
    //   }
    // },
  });
};

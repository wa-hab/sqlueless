import { useQueryState, parseAsString } from "nuqs";

export function useSelectedDatabase() {
  return useQueryState("db", parseAsString);
}

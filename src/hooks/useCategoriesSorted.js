import { useQuery } from "@tanstack/react-query";
import { getDocs } from "firebase/firestore";
import { buildCategoriesQuery } from "./firestore/buildCategoriesQuery";

/**
 * Server-side sort by createdAt; client-side pagination.
 * (Optional: if you add a name_lc field later, you can enable server prefix search too.)
 */
export function useCategoriesSorted({ dir = "desc" }) {
  return useQuery({
    queryKey: ["categoriesSorted", { dir }],
    queryFn: async () => {
      const q = buildCategoriesQuery({ dir });
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },
    staleTime: 15_000,
    keepPreviousData: true,
  });
}

// TanStack Query v4
// Author: Asil
import { useQuery } from "@tanstack/react-query";

export function useGetComments() {
	return useQuery({
		queryKey: ["comments"],
		queryFn: async () => {
			const response = await fetch(
				`https://lusty.asia:1443/api/mercari-comments`
			);
			if (!response.ok) {
				alert("error");
			} else {
				return response;
			}
		},
	});
}

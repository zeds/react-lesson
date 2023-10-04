// TanStack Query v4
// Author: Tom
import { useQuery } from "@tanstack/react-query";

const STRAPI_URL = `${import.meta.env.VITE_STRAPI_URL}`;

export function useGetComments() {
	return useQuery({
		queryKey: ["comments"],
		queryFn: async () => {
			const response = await fetch(`${STRAPI_URL}/api/mercari-comments`);
			if (!response.ok) {
				alert("error");
			} else {
				return response;
			}
		},
	});
}

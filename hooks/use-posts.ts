'use client';

import { useQuery } from '@tanstack/react-query';

import { getStatusText } from '@/lib/utils';
import { JSONPLACEHOLDER_POSTS_API } from '@/lib/constants';
import { TPost } from '@/lib/types';

interface UsePostsReturn {
  postsData: TPost[] | TPost | undefined;
  isLoading: boolean;
  error: Error | null;
}

// Source -> https://tanstack.com/query/latest/docs/framework/react/guides/queries
const usePosts = (postId?: number): UsePostsReturn => {
  const {
    data: postsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blog_posts', postId],
    queryFn: async () => {
      let fetchUrl = JSONPLACEHOLDER_POSTS_API;

      if (postId !== undefined) {
        fetchUrl = `${JSONPLACEHOLDER_POSTS_API}/${postId}`;
      }

      const response = await fetch(fetchUrl);

      if (!response.ok) {
        const statusMessage = response.statusText
          ? response.statusText
          : getStatusText(response.status);

        throw new Error(
          `JSONPlaceholder API Error: ${response.status} ${statusMessage}`,
        );
      }

      const responseData: TPost[] | TPost = await response.json();

      return responseData;
    },
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    postsData,
    isLoading,
    error,
  } as const;
};

export default usePosts;

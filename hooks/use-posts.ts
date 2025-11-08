'use client';

import { useQuery } from '@tanstack/react-query';

import { getStatusText } from '@/lib/utils';
import { JSONPLACEHOLDER_POSTS_API } from '@/lib/constants';
import { TPost } from '@/lib/types';

interface UsePostsReturn {
  postsData: TPost[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

const usePosts = (): UsePostsReturn => {
  const {
    data: postsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blog_posts'],
    queryFn: async () => {
      const response = await fetch(JSONPLACEHOLDER_POSTS_API);

      if (!response.ok) {
        const statusMessage = response.statusText
          ? response.statusText
          : getStatusText(response.status);

        throw new Error(
          `JSONPlaceholder API Error: ${response.status} ${statusMessage}`,
        );
      }

      const responseData: TPost[] = await response.json();

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

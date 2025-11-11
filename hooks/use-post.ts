'use client';

import { useQuery } from '@tanstack/react-query';

import prisma from '@/lib/db';
import { TPost } from '@/lib/types';

interface UsePostsReturn {
  postData: TPost | undefined;
  isLoading: boolean;
  error: Error | null;
}

// Source -> https://tanstack.com/query/latest/docs/framework/react/guides/queries
const usePost = (postId: string): UsePostsReturn => {
  const {
    data: postData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blog_post', postId],
    queryFn: async () => {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        throw new Error(
          `Error: 404, Blog post with the ID ${postId} could not be found`,
        );
      }

      return post;
    },
    staleTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    postData,
    isLoading,
    error,
  } as const;
};

export default usePost;

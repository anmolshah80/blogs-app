// to only allow the server components to import and use the util functions declared here
import 'server-only';

import { unstable_cache } from 'next/cache';

import prisma from '@/lib/db';
import { TPost } from '@/lib/types';

type GetPostResponse = {
  postData?: TPost;
  error?: string;
};

type GetPostsResponse = {
  postsData?: TPost[];
  error?: string;
};

const getPost = unstable_cache(
  async (postId: string): Promise<GetPostResponse> => {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      // if (!post) return notFound();

      if (!post) {
        return {
          postData: undefined,
          error: 'Post not found',
        };
      }

      return {
        postData: post,
        error: undefined,
      };
    } catch (error) {
      return {
        postData: undefined,
        error:
          error instanceof Error
            ? error.message
            : `An error occurred while fetching the blog post with ID ${postId}`,
      };
    }
  },
);

const getPosts = unstable_cache(async (): Promise<GetPostsResponse> => {
  try {
    const postsData = await prisma.post.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      // take: 6,
      // skip: (currentPage - 1) * 6,
    });

    // if (!postsData || postsData.length === 0) notFound();

    if (!postsData || postsData.length === 0) {
      return {
        postsData: undefined,
        error: '404, Blog posts could not be found',
      };
    }

    return { postsData, error: undefined };
  } catch (error) {
    return {
      postsData: undefined,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching the blog posts',
    };
  }
});

export { getPost, getPosts };

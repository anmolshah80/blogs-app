'use server';

import { revalidatePath } from 'next/cache';

import { Prisma } from '@/prisma/lib/generated/prisma';

import prisma from '@/lib/db';
import { generateRandomValue } from '@/lib/utils';
import { TPost } from '@/lib/types';

interface CreatePostResponse {
  createdPostData?: Prisma.PostCreateInput;
  error?: string;
}

interface UpdatePostResponse {
  updatedPostData?: Prisma.PostUpdateInput;
  error?: string;
}

interface DeletePostResponse {
  deletedPostData?: TPost;
  error?: string;
}

const createPost = async (
  formData: Prisma.PostCreateInput,
): Promise<CreatePostResponse> => {
  try {
    const createdPost = await prisma.post.create({
      data: {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        userId: generateRandomValue(),
      },
    });

    // if (!createdPost) return notFound();

    if (!createdPost) {
      // return {
      //   createdPostData: undefined,
      //   error: '400 Bad Request',
      // };
      throw new Error('400 Bad Request');
    }

    revalidatePath('/blogs');

    return {
      createdPostData: createdPost,
      error: undefined,
    };
  } catch (error) {
    return {
      createdPostData: undefined,
      error: error instanceof Error ? error.message : '400, Bad Request',
    };
  }
};

const updatePost = async (
  postId: string,
  formData: Prisma.PostUpdateInput,
): Promise<UpdatePostResponse> => {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        userId: generateRandomValue(),
      },
    });

    // if (!updatedPost) return notFound();

    if (!updatedPost) {
      throw new Error('400 Bad Request');
    }

    revalidatePath('/blogs');
    revalidatePath(`/blogs/${postId}/edit`);

    return {
      updatedPostData: updatedPost,
      error: undefined,
    };
  } catch (error) {
    return {
      updatedPostData: undefined,
      error: error instanceof Error ? error.message : '400, Bad Request',
    };
  }
};

const deletePost = async (postId: string): Promise<DeletePostResponse> => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    // if (!deletedPost) return notFound();

    if (!deletedPost) {
      throw new Error('404 Not Found');
    }

    revalidatePath('/blogs');

    return {
      deletedPostData: deletedPost,
      error: undefined,
    };
  } catch (error) {
    return {
      deletedPostData: undefined,
      error: error instanceof Error ? error.message : '404, Not Found',
    };
  }
};

export { createPost, updatePost, deletePost };

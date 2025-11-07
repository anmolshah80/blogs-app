'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { getStatusText } from '@/lib/utils';
import { JSONPLACEHOLDER_POSTS_API } from '@/lib/constants';
import { TPost } from '@/lib/types';

type RequestMethod = 'POST' | 'PATCH' | 'PUT' | 'DELETE';
type MutationKey = 'create_blog_post' | 'update_blog_post' | 'delete_blog_post';

interface TPostExtended extends TPost {
  category: string;
}

// Source -> https://tanstack.com/query/latest/docs/framework/react/guides/mutations
const usePostMutation = (
  mutationKey: MutationKey,
  requestMethod: RequestMethod,
  postId?: number,
): UseMutationResult<
  TPostExtended,
  Error,
  Record<string, string | number>,
  unknown
> => {
  let fetchUrl = `${JSONPLACEHOLDER_POSTS_API}/${postId}`;

  if (requestMethod === 'POST') {
    fetchUrl = JSONPLACEHOLDER_POSTS_API;
  }

  const mutation = useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (requestBody: Record<string, string | number>) => {
      let response = null;

      if (requestMethod === 'DELETE') {
        response = await fetch(fetchUrl, {
          method: requestMethod,
        });
      } else {
        response = await fetch(fetchUrl, {
          method: requestMethod,
          body: JSON.stringify(requestBody),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      }

      if (!response.ok) {
        const statusMessage = response.statusText
          ? response.statusText
          : getStatusText(response.status);

        throw new Error(
          `JSONPlaceholder API Error: ${response.status} ${statusMessage}`,
        );
      }

      const responseData: TPostExtended = await response.json();

      console.log('responseData: ', responseData);

      return responseData;
    },
    retry: false,
  });

  return mutation;
};

export default usePostMutation;

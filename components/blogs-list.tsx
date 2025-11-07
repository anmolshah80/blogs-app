'use client';

import Link from 'next/link';
import { SquarePen, Trash2 } from 'lucide-react';

import BlogsListLoading from '@/components/blogs-list-loading';
import PaginationControls from '@/components/pagination-controls';

import usePosts from '@/hooks/use-posts';

import { MAX_RESULTS_PER_PAGE } from '@/lib/constants';
import { useRouter, useSearchParams } from 'next/navigation';

type BlogsListProps = {
  currentPage: number | undefined;
};

const BlogsList = ({ currentPage = 1 }: BlogsListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { postsData, isLoading, error } = usePosts();

  if (isLoading || !postsData) return <BlogsListLoading />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[70dvh] overflow-auto pb-2 min-w-full flex-col text-red-400">
        <strong className="text-xl">Something went wrong</strong>
        <p className="max-w-130 rounded-lg p-2 text-center text-white/80 text-base">
          An unexpected error has occurred, and the blogs could not be fetched.
        </p>
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', newPage.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const totalPages = Math.ceil(postsData.length / MAX_RESULTS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {postsData
          .slice((currentPage - 1) * 6, currentPage * 6)
          .map(({ id, title, body }) => {
            return (
              <div
                key={id}
                className="group rounded-lg border border-solid border-gray-500 bg-transparent"
              >
                <article className="px-4 py-6 sm:px-8 sm:py-6 text-offWhite">
                  <Link
                    href={'#'}
                    className="group/title flex gap-3 rounded-sm px-1 text-xl font-semibold outline-offset-4 outline-blue-500"
                  >
                    <span className="decoration-blue-400 decoration-2 underline-offset-2 group-hover/title:underline">
                      {id}. {title}
                    </span>
                  </Link>

                  <p className="my-4 whitespace-pre-wrap text-base">{body}</p>

                  <div className="flex gap-4 justify-between items-center mt-8 flex-wrap">
                    <Link
                      href={'/:id/edit'}
                      className="text-base rounded-md text-white border-2 border-gray-700 bg-transparent hover:bg-(--ds-gray-100) px-8 py-2 flex gap-3 items-center justify-center"
                    >
                      <SquarePen
                        size={16}
                        className="text-white hidden xs:block"
                      />
                      Edit
                    </Link>

                    <button className="text-base rounded-md text-white border-2 border-gray-700 bg-transparent hover:bg-gray-700 px-7 py-2 cursor-pointer flex items-center justify-center gap-3">
                      <Trash2
                        size={16}
                        className="text-white hidden xs:block"
                      />
                      Delete
                    </button>
                  </div>
                </article>
              </div>
            );
          })}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(page) => handlePageChange(page)}
      />
    </>
  );
};

export default BlogsList;

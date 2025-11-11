import * as zod from 'zod';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import BlogsList from '@/components/blogs-list';
import Header from '@/components/header';
import BlogsListLoading from '@/components/blogs-list-loading';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const pageNumberSchema = zod.coerce.number().int().positive().optional();

const BlogsPage = async ({ searchParams }: HomeProps) => {
  const { page } = await searchParams;

  const parsedPage = pageNumberSchema.safeParse(page);

  if (!parsedPage.success) {
    return notFound();
  }

  return (
    <Suspense fallback={<BlogsListLoading />}>
      <main className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="flex w-full max-w-7xl flex-col items-center justify-between py-8 sm:py-14 px-8 md:px-12 2xl:px-0 bg-white dark:bg-black sm:items-start">
          <Header />

          <BlogsList currentPage={parsedPage.data} />
        </div>
      </main>
    </Suspense>
  );
};

export default BlogsPage;

import * as zod from 'zod';
import { notFound } from 'next/navigation';

import BlogsList from '@/components/blogs-list';
import Header from '@/components/header';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const pageNumberSchema = zod.coerce.number().int().positive().optional();

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;

  const parsedPage = pageNumberSchema.safeParse(page);

  if (!parsedPage.success) {
    return notFound();
  }

  return (
    <main className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between py-8 sm:py-14 px-8 md:px-12 2xl:px-0 bg-white dark:bg-black sm:items-start">
        <Header />

        <BlogsList currentPage={parsedPage.data} />
      </div>
    </main>
  );
}

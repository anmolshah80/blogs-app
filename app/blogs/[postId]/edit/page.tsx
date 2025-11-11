import { Suspense } from 'react';

import Header from '@/components/header';
import BlogsListLoading from '@/components/blogs-list-loading';

import EditFormWrapper from '@/components/edit-form-wrapper';

interface BlogEditPageProps {
  params: Promise<{
    postId: string;
  }>;
}

const BlogEditPage = async ({ params }: BlogEditPageProps) => {
  const { postId } = await params;

  return (
    <main className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full max-w-5xl flex-col items-center justify-between py-8 sm:py-14 px-8 md:px-12 2xl:px-0 bg-white dark:bg-black sm:items-start">
        <Header />

        <Suspense fallback={<BlogsListLoading />}>
          <EditFormWrapper postId={postId} />
        </Suspense>
      </div>
    </main>
  );
};

export default BlogEditPage;

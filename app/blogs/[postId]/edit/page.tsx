import Header from '@/components/header';
import EditForm from '@/components/edit-form';

interface BlogEditPageProps {
  params: Promise<{
    postId: string;
  }>;
}

const BlogEditPage = async ({ params }: BlogEditPageProps) => {
  const { postId } = await params;

  const postIdNumber = Number(postId);

  return (
    <main className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full max-w-5xl flex-col items-center justify-between py-8 sm:py-14 px-8 md:px-12 2xl:px-0 bg-white dark:bg-black sm:items-start">
        <Header />

        <EditForm postId={postIdNumber} />
      </div>
    </main>
  );
};

export default BlogEditPage;

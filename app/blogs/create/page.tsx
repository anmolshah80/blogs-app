import CreateForm from '@/components/create-form';
import Header from '@/components/header';

const BlogCreatePage = () => {
  return (
    <main className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full max-w-7xl flex-col items-center justify-between py-8 sm:py-14 px-8 md:px-12 2xl:px-0 bg-white dark:bg-black sm:items-start">
        <Header />

        <CreateForm />
      </div>
    </main>
  );
};

export default BlogCreatePage;

import Link from 'next/link';

export default async function Home() {
  return (
    <main className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full sm:max-w-7xl flex-col items-center justify-center py-32 sm:py-40 px-4 md:px-12 2xl:px-0 bg-white dark:bg-black gap-4 h-full">
        <h1 className="text-5xl sm:text-7xl text-white font-bold">Blogs App</h1>
        <p className="text-2xl sm:text-3xl max-w-56 sm:max-w-full">
          Go to the{' '}
          <Link
            href="/blogs"
            className="text-blue-400 underline hover:no-underline hover:text-blue-400/80"
          >
            blogs
          </Link>{' '}
          page to view all blogs
        </p>
      </div>
    </main>
  );
}

import Link from 'next/link';

import Logout from '@/components/logout';

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <Link
        href="/blogs"
        className="text-3xl xs:text-4xl sm:text-5xl text-white hover:underline decoration-blue-300"
      >
        Blogs App
      </Link>

      <div className="flex items-center justify-center gap-4">
        <Link
          href="/blogs/create"
          className="sm:hidden block px-4 py-2 text-white/80 rounded hover:text-white bg-blue-500 cursor-pointer"
        >
          Create
        </Link>

        <Link
          href="/blogs/create"
          className="hidden sm:block px-4 py-2 text-white/80 rounded hover:text-white bg-blue-500 cursor-pointer"
        >
          Create new post
        </Link>

        <Logout />
      </div>
    </header>
  );
};

export default Header;

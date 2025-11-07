import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <span className="text-3xl xs:text-4xl sm:text-5xl text-white">
        Blogs App
      </span>

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
    </header>
  );
};

export default Header;

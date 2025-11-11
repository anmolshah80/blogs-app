'use client';

import { LogOut } from 'lucide-react';

import { logout } from '@/app/api/auth/login/actions';

const Logout = () => {
  return (
    <button
      onClick={() => logout()}
      className="text-base rounded-md text-white border-2 border-gray-700 bg-transparent hover:bg-(--ds-gray-100) px-2 sm:px-6 2xl:px-8 py-2 cursor-pointer flex items-center justify-center gap-2"
    >
      <LogOut size={20} />
      <span className="hidden sm:block">Logout</span>
    </button>
  );
};

export default Logout;

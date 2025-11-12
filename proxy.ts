import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { decrypt } from '@/lib/session';

const protectedRoutes = ['/blogs', '/blogs/create'];
const publicRoutes = ['/login', '/register', '/'];

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // await the cookies() call
  const cookieStore = await cookies();

  const cookie = cookieStore.get('blogs-app-session')?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (!session?.userId && path.endsWith('/edit')) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/blogs', request.nextUrl));
  }

  return NextResponse.next();
}

// Source -> https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
export const config = {
  matcher: ['/', '/login', '/register', '/blogs/:path*'],
};

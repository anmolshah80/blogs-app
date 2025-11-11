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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     *  api (API routes)
     *  _next/static (static files)
     *  _next/image (image optimization files)
     *  favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

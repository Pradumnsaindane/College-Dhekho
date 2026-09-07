import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that don't require authentication here
const publicPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files, api routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // like favicon.ico, images, etc.
  ) {
    return NextResponse.next();
  }

  // Check if path is public
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    // If user is already logged in, redirect them away from login/register to home
    const token = request.cookies.get('auth_token')?.value;
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Path requires authentication
  const token = request.cookies.get('auth_token')?.value;

  // If no token, redirect to login page
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    // Add the current url as a query param so we can redirect back after login (optional)
    loginUrl.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(loginUrl);
  }

  // User is authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

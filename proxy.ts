import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const { pathname } = request.nextUrl;

  // docs.liant.ai/* → /docs/*
  if (host.startsWith('docs.')) {
    const url = request.nextUrl.clone();
    if (!pathname.startsWith('/docs')) {
      url.pathname = `/docs${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

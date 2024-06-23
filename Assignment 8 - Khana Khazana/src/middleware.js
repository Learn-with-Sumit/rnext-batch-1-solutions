import { NextResponse } from 'next/server'

export function middleware(request) {
  const isLoggedIn = request.cookies.has('user')
  // if user is logged in redirect to the home page
  if (isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: '/login',
}

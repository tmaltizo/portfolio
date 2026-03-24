import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()

  // Add security and performance headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Cache static assets
  if (request.nextUrl.pathname.startsWith('/_next') || 
      request.nextUrl.pathname.startsWith('/images') ||
      request.nextUrl.pathname.endsWith('.css') ||
      request.nextUrl.pathname.endsWith('.js')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  return response
}

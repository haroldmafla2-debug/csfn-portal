import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPrivateRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/circulares(.*)',
  '/notas(.*)',
  '/documentos(.*)',
  '/perfil(.*)',
  '/admin(.*)',
])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isPrivateRoute(req)) {
    const { userId, sessionClaims } = await auth()

    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }

    const role = (sessionClaims?.publicMetadata as { role?: string })?.role

    if (isAdminRoute(req) && role !== 'rector' && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

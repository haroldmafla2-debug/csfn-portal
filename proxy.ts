import { NextRequest, NextResponse } from 'next/server'

const PRIVATE_PATHS = ['/dashboard', '/circulares', '/notas', '/documentos', '/perfil', '/admin']

function isPrivate(pathname: string) {
  return PRIVATE_PATHS.some((p) => pathname.startsWith(p))
}

// When Clerk keys are present, use full Clerk middleware; otherwise allow all (demo mode)
async function middleware(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    // Demo mode: no auth required
    return NextResponse.next()
  }

  const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server')

  const privateRoute = createRouteMatcher(PRIVATE_PATHS.map((p) => `${p}(.*)`))
  const adminRoute = createRouteMatcher(['/admin(.*)'])

  return clerkMiddleware(async (auth, request) => {
    if (privateRoute(request)) {
      const { userId, sessionClaims } = await auth()
      if (!userId) {
        const signInUrl = new URL('/sign-in', request.url)
        signInUrl.searchParams.set('redirect_url', request.url)
        return NextResponse.redirect(signInUrl)
      }
      const role = (sessionClaims?.publicMetadata as { role?: string })?.role
      if (adminRoute(request) && role !== 'rector' && role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
  })(req, {} as never)
}

export default middleware

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

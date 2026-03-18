import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import { UserButton } from '@clerk/nextjs'
import { Bell } from 'lucide-react'
import type { UserRole } from '@/types'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId, sessionClaims } = await auth()
  if (!userId) redirect('/sign-in')

  const role = (sessionClaims?.publicMetadata as { role?: string })?.role as UserRole
  if (role !== 'rector' && role !== 'admin') redirect('/dashboard')

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#F5F7FA' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: '#C8A951' }}>
            Panel Administrativo
          </span>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
              <Bell className="w-4 h-4" />
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

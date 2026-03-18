import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import ChatbotWidget from '@/components/ai/ChatbotWidget'
import { Bell } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#F5F7FA' }}>
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
          <div />
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors relative">
              <Bell className="w-4 h-4" />
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <ChatbotWidget />
    </div>
  )
}

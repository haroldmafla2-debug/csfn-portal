import { currentUser } from '@clerk/nextjs/server'
import { UserProfile } from '@clerk/nextjs'
import { User } from 'lucide-react'

export default async function PerfilPage() {
  const user = await currentUser()
  const role = (user?.publicMetadata?.role as string) || 'padre'

  const roleLabels: Record<string, string> = {
    rector: 'Rector',
    admin: 'Administrador',
    docente: 'Docente',
    padre: 'Padre / Acudiente',
  }

  return (
    <div className="max-w-3xl animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <User className="w-6 h-6" style={{ color: '#1B3A6B' }} />
        <h1 className="text-2xl font-extrabold" style={{ color: '#1B3A6B' }}>Mi Perfil</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: '#1B3A6B' }}>
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div>
            <p className="font-bold text-lg text-gray-900">{user?.firstName} {user?.lastName}</p>
            <p className="text-sm text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium text-white" style={{ backgroundColor: '#2E5FA3' }}>
              {roleLabels[role] || role}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <UserProfile
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'shadow-none rounded-none border-0',
            },
          }}
        />
      </div>
    </div>
  )
}

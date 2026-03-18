import { GraduationCap } from 'lucide-react'

const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default async function SignInPage() {
  if (hasClerk) {
    const { SignIn } = await import('@clerk/nextjs')
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-12"
        style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5FA3 100%)' }}
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8" style={{ color: '#C8A951' }} />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Portal Familias</h1>
            <p className="text-white/70 text-sm mt-1">Colegio San Felipe Neri · Bogotá</p>
          </div>
          <div className="flex justify-center">
            <SignIn appearance={{ elements: { card: 'shadow-xl rounded-2xl', formButtonPrimary: 'bg-[#1B3A6B]' } }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5FA3 100%)' }}
    >
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-8 h-8" style={{ color: '#C8A951' }} />
        </div>
        <h1 className="text-2xl font-extrabold text-white mb-2">Portal Familias</h1>
        <p className="text-white/70 text-sm mb-8">Colegio San Felipe Neri · Bogotá</p>
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1B3A6B' }}>Modo Vista Previa</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            El portal está en modo demo. Configure las variables de entorno para activar la autenticación completa.
          </p>
          <div className="text-left bg-gray-50 rounded-xl p-4 text-xs text-gray-500 space-y-1.5">
            <p>✅ Portal público — funcionando</p>
            <p>⚙️ Autenticación — requiere Clerk</p>
            <p>⚙️ Base de datos — requiere Supabase</p>
            <p>⚙️ IA Chatbot — requiere Anthropic Key</p>
          </div>
        </div>
      </div>
    </div>
  )
}

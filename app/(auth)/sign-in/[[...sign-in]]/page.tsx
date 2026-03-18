import { SignIn } from '@clerk/nextjs'
import { GraduationCap } from 'lucide-react'

export default function SignInPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(135deg, #1B3A6B 0%, #2E5FA3 100%)' }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8" style={{ color: '#C8A951' }} />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Portal Familias</h1>
          <p className="text-white/70 text-sm mt-1">Colegio San Felipe Neri · Bogotá</p>
        </div>

        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                card: 'shadow-xl rounded-2xl',
                headerTitle: 'font-bold text-[#1B3A6B]',
                formButtonPrimary: 'bg-[#1B3A6B] hover:bg-[#2E5FA3]',
                footerActionLink: 'text-[#1B3A6B]',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

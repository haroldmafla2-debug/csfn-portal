'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from 'lucide-react'

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulación de envío
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setEnviado(true)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="py-12 px-4 text-white" style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E5FA3)' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-2">Contáctenos</h1>
          <p className="text-white/70">Estamos aquí para ayudarle. Comuníquese con nosotros.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Información de contacto */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1B3A6B' }}>Información de Contacto</h2>
            <div className="space-y-4">
              {[
                { icon: MapPin, titulo: 'Dirección', info: 'Cr. 27 C# 71-80 Barrio Alcázares, Bogotá D.C.' },
                { icon: Phone, titulo: 'Secretaría', info: '322 458 13 69' },
                { icon: MessageCircle, titulo: 'WhatsApp', info: '319 512 96 50' },
                { icon: Mail, titulo: 'Correo institucional', info: 'csfn@sanfelipeneribogota.edu.co' },
                { icon: Mail, titulo: 'Secretaría', info: 'secretariacsfn@colegiosanfelipeneribogota.edu.co' },
                { icon: Clock, titulo: 'Horario de atención', info: 'Lunes a Viernes: 7:00 am - 4:30 pm' },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.titulo + item.info} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
                    <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#1B3A6B' }}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">{item.titulo}</p>
                      <p className="text-sm text-gray-800 font-medium">{item.info}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mapa placeholder */}
          <div
            className="rounded-2xl h-48 flex items-center justify-center text-white"
            style={{ background: 'linear-gradient(135deg, #1B3A6B, #2E5FA3)' }}
          >
            <div className="text-center">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-70" />
              <p className="text-sm font-medium">Barrio Alcázares</p>
              <p className="text-xs text-white/60">Cr. 27 C# 71-80, Bogotá</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#1B3A6B' }}>Envíenos un Mensaje</h2>

          {enviado ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">¡Mensaje enviado!</h3>
              <p className="text-gray-500 text-sm">Nos pondremos en contacto con usted a la brevedad posible.</p>
              <button
                onClick={() => { setEnviado(false); setForm({ nombre: '', email: '', asunto: '', mensaje: '' }) }}
                className="mt-6 text-sm font-semibold"
                style={{ color: '#1B3A6B' }}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                  <input
                    type="text"
                    required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': '#1B3A6B' } as React.CSSProperties}
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asunto *</label>
                <input
                  type="text"
                  required
                  value={form.asunto}
                  onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                  placeholder="¿En qué le podemos ayudar?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                <textarea
                  required
                  rows={5}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 resize-none"
                  placeholder="Escriba su mensaje aquí..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all disabled:opacity-70"
                style={{ backgroundColor: '#1B3A6B' }}
              >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

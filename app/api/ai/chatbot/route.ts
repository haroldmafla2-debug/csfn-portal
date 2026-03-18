import { NextRequest, NextResponse } from 'next/server'
import { anthropic, CLAUDE_MODEL } from '@/lib/anthropic'
import type { ChatMessage } from '@/types'

const SYSTEM_PROMPT = `Eres el asistente virtual del Colegio San Felipe Neri de Bogotá, Colombia.
Respondes preguntas sobre el colegio de manera amable, profesional y cálida en español colombiano formal.

Información del colegio:
- Nombre: Colegio San Felipe Neri (CSFN)
- Fundado: 1965
- Carácter: Privado y católico
- Ubicación: Cr. 27 C# 71-80, Barrio Alcázares, Bogotá D.C.
- Grados: 6° a 11° (básica secundaria y media vocacional)
- Teléfono secretaría: 322 458 13 69
- WhatsApp: 319 512 96 50
- Correo: csfn@sanfelipeneribogota.edu.co
- Horario de atención: Lunes a Viernes, 7:00 am - 4:30 pm

Puedes responder sobre: horarios, matrículas, actividades, uniformes, calendario, proceso académico, valores institucionales.

IMPORTANTE:
- Nunca inventes información sobre notas, calificaciones o trámites específicos de estudiantes.
- Si no sabes algo específico, indica amablemente que el padre debe contactar directamente a secretaría.
- Mantén respuestas concisas (máximo 3-4 oraciones) a menos que se requiera más detalle.
- Siempre ofrece redirigir a secretaría para temas complejos.`

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 })
    }

    const messages = [
      ...conversationHistory.map((msg: ChatMessage) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user' as const, content: message },
    ]

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages,
    })

    const assistantMessage = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ response: assistantMessage })
  } catch (error) {
    console.error('Chatbot API error:', error)
    return NextResponse.json(
      { response: 'Lo siento, no puedo responder en este momento. Por favor comuníquese con secretaría al 322 458 13 69.' },
      { status: 200 } // Return 200 so the chat still works
    )
  }
}

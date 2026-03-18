import { NextRequest, NextResponse } from 'next/server'
import { anthropic, CLAUDE_MODEL } from '@/lib/anthropic'

export async function POST(req: NextRequest) {
  try {
    const { borrador, destinatarios, fecha } = await req.json()

    if (!borrador?.trim()) {
      return NextResponse.json({ error: 'Borrador requerido' }, { status: 400 })
    }

    const prompt = `Genera una circular institucional formal para el Colegio San Felipe Neri de Bogotá.

Borrador / idea principal: ${borrador}
Destinatarios: ${destinatarios || 'Padres de familia y acudientes'}
Fecha: ${fecha || new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}

La circular debe incluir:
1. Membrete textual: "COLEGIO SAN FELIPE NERI - Bogotá D.C."
2. Número de circular (usa el formato: Circular No. [número correlativo])
3. Fecha en formato: [ciudad], [día] de [mes] de [año]
4. Destinatarios
5. Saludo formal: "Estimados padres de familia y acudientes:"
6. Cuerpo bien redactado con la información
7. Despedida cordial
8. Firma: "Cordialmente, \nRectoría\nColegio San Felipe Neri"

Tono: profesional, cálido e institucional. Máximo 300 palabras. Solo devuelve el texto de la circular, sin explicaciones adicionales.`

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }],
    })

    const circular = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ circular })
  } catch (error) {
    console.error('Generar circular error:', error)
    return NextResponse.json({ error: 'Error al generar la circular' }, { status: 500 })
  }
}

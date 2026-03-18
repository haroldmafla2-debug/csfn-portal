import { NextRequest, NextResponse } from 'next/server'
import { anthropic, CLAUDE_MODEL } from '@/lib/anthropic'

export async function POST(req: NextRequest) {
  try {
    const { titulo, contenido } = await req.json()

    if (!titulo || !contenido) {
      return NextResponse.json({ error: 'Título y contenido requeridos' }, { status: 400 })
    }

    const prompt = `Mejora la redacción de esta noticia para el portal del Colegio San Felipe Neri de Bogotá.

TÍTULO ORIGINAL: ${titulo}

CONTENIDO ORIGINAL:
${contenido}

Instrucciones:
- Mantén todos los hechos y datos originales sin inventar nada
- Mejora la claridad, fluidez y gramática
- Usa un tono formal pero cercano, apropiado para una institución educativa católica
- El español debe ser colombiano formal y correcto
- Devuelve un JSON válido con este formato exacto:
{
  "tituloMejorado": "...",
  "contenidoMejorado": "...",
  "resumen": "Máximo 2 oraciones para vista previa"
}

Solo devuelve el JSON, sin texto adicional.`

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : '{}'

    try {
      const result = JSON.parse(text)
      return NextResponse.json(result)
    } catch {
      // Si no es JSON válido, devolver el texto como contenido mejorado
      return NextResponse.json({
        tituloMejorado: titulo,
        contenidoMejorado: text,
        resumen: '',
      })
    }
  } catch (error) {
    console.error('Mejorar noticia error:', error)
    return NextResponse.json({ error: 'Error al mejorar la noticia' }, { status: 500 })
  }
}

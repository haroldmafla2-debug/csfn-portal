import { NextRequest, NextResponse } from 'next/server'
import { anthropic, CLAUDE_MODEL } from '@/lib/anthropic'

export async function POST(req: NextRequest) {
  try {
    const { nombreEstudiante, grado, notas } = await req.json()

    if (!nombreEstudiante || !notas?.length) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const notasTexto = notas
      .map((n: { materia: string; nota: number; periodo: number }) =>
        `- ${n.materia}: ${n.nota.toFixed(1)}/5.0`
      )
      .join('\n')

    const promedio = (notas.reduce((acc: number, n: { nota: number }) => acc + n.nota, 0) / notas.length).toFixed(2)

    const prompt = `Genera un párrafo de análisis del rendimiento académico del estudiante para compartir con sus padres.

Estudiante: ${nombreEstudiante}
Grado: ${grado}
Notas del período:
${notasTexto}
Promedio general: ${promedio}/5.0

Instrucciones:
- Escribe exactamente 3-4 oraciones
- Menciona el promedio general
- Destaca 1-2 fortalezas específicas (materias con mejor nota)
- Si hay áreas de mejora (notas por debajo de 3.5), mencionarlas constructivamente
- Tono: positivo, motivador y profesional
- Español colombiano formal
- No uses títulos ni encabezados, solo el párrafo directamente`

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    })

    const narrativa = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ narrativa })
  } catch (error) {
    console.error('Boletín narrativa error:', error)
    return NextResponse.json({ error: 'Error al generar la narrativa' }, { status: 500 })
  }
}

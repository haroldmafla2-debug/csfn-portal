import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import { renderToBuffer } from '@react-pdf/renderer'
import BoletinPDF from '@/components/dashboard/BoletinPDF'
import React from 'react'

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const estudianteId = searchParams.get('estudianteId')
  const periodo = parseInt(searchParams.get('periodo') || '1')
  const narrativa = searchParams.get('narrativa') || undefined

  if (!estudianteId) return NextResponse.json({ error: 'estudianteId requerido' }, { status: 400 })

  // Fetch student
  const { data: estudiante } = await supabaseAdmin
    .from('estudiantes')
    .select('*')
    .eq('id', estudianteId)
    .single()

  if (!estudiante) return NextResponse.json({ error: 'Estudiante no encontrado' }, { status: 404 })

  // Fetch notas
  const { data: notas } = await supabaseAdmin
    .from('notas')
    .select('*, materia:materias(*)')
    .eq('estudiante_id', estudianteId)
    .eq('periodo', periodo)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buffer = await renderToBuffer(
    React.createElement(BoletinPDF, {
      estudiante,
      notas: notas || [],
      periodo,
      narrativaIA: narrativa,
    }) as any
  )

  return new NextResponse(buffer as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="boletin-${estudiante.codigo}-periodo${periodo}.pdf"`,
    },
  })
}

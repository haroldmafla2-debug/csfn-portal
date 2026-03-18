export type UserRole = 'rector' | 'admin' | 'docente' | 'padre'

export interface Estudiante {
  id: string
  nombres: string
  apellidos: string
  grado: string
  codigo: string
  padre_clerk_id: string | null
  foto_url: string | null
  activo: boolean
  created_at: string
}

export interface Materia {
  id: string
  nombre: string
  grado: string
  docente_clerk_id: string | null
  created_at: string
}

export interface Nota {
  id: string
  estudiante_id: string
  materia_id: string
  periodo: 1 | 2 | 3 | 4
  nota: number
  observacion: string | null
  docente_clerk_id: string | null
  created_at: string
  // joins
  materia?: Materia
  estudiante?: Estudiante
}

export interface Circular {
  id: string
  titulo: string
  contenido: string
  destinatarios: string[]
  archivo_url: string | null
  publicada: boolean
  autor_clerk_id: string | null
  created_at: string
  // computed
  leida?: boolean
}

export interface ConfirmacionCircular {
  id: string
  circular_id: string
  padre_clerk_id: string
  leida_en: string
}

export interface Noticia {
  id: string
  titulo: string
  slug: string
  resumen: string | null
  contenido: string
  imagen_url: string | null
  publicada: boolean
  autor_clerk_id: string | null
  created_at: string
}

export interface Evento {
  id: string
  titulo: string
  descripcion: string | null
  fecha_inicio: string
  fecha_fin: string | null
  tipo: 'academico' | 'cultural' | 'deportivo' | 'institucional' | 'festivo'
  visible_publico: boolean
  created_at: string
}

export interface Documento {
  id: string
  nombre: string
  categoria: 'manual' | 'cronograma' | 'academico' | 'administrativo' | 'pastoral'
  archivo_url: string
  visible_publico: boolean
  created_at: string
}

export interface FAQ {
  id: string
  pregunta: string
  respuesta: string
  categoria: string | null
  activa: boolean
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

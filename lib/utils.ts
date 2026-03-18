import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), "d 'de' MMMM 'de' yyyy", { locale: es })
  } catch {
    return dateString
  }
}

export function formatDateShort(dateString: string): string {
  try {
    return format(parseISO(dateString), 'dd/MM/yyyy', { locale: es })
  } catch {
    return dateString
  }
}

export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})\s?(\d{3})\s?(\d{2})\s?(\d{2})/, '$1 $2 $3 $4')
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function calculateAverage(notas: number[]): number {
  if (notas.length === 0) return 0
  const sum = notas.reduce((acc, nota) => acc + nota, 0)
  return Math.round((sum / notas.length) * 100) / 100
}

export function getNotaColor(nota: number): string {
  if (nota >= 4.5) return 'text-green-600'
  if (nota >= 3.5) return 'text-blue-600'
  if (nota >= 3.0) return 'text-yellow-600'
  return 'text-red-600'
}

export function getNotaLabel(nota: number): string {
  if (nota >= 4.5) return 'Excelente'
  if (nota >= 4.0) return 'Superior'
  if (nota >= 3.5) return 'Alto'
  if (nota >= 3.0) return 'Básico'
  return 'Bajo'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const GRADOS = ['6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B', '10A', '10B', '11A', '11B']

export const TIPO_EVENTO_COLORS: Record<string, string> = {
  academico: 'bg-blue-100 text-blue-800',
  cultural: 'bg-purple-100 text-purple-800',
  deportivo: 'bg-green-100 text-green-800',
  institucional: 'bg-yellow-100 text-yellow-800',
  festivo: 'bg-red-100 text-red-800',
}

export const CATEGORIA_DOCUMENTO_LABELS: Record<string, string> = {
  manual: 'Manual',
  cronograma: 'Cronograma',
  academico: 'Académico',
  administrativo: 'Administrativo',
  pastoral: 'Pastoral',
}

-- ============================================================
-- SCHEMA SUPABASE — Colegio San Felipe Neri
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- Estudiantes
CREATE TABLE IF NOT EXISTS estudiantes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombres TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  grado TEXT NOT NULL,
  codigo TEXT UNIQUE NOT NULL,
  padre_clerk_id TEXT,
  foto_url TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Materias
CREATE TABLE IF NOT EXISTS materias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  grado TEXT NOT NULL,
  docente_clerk_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Notas
CREATE TABLE IF NOT EXISTS notas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  estudiante_id UUID REFERENCES estudiantes(id) ON DELETE CASCADE,
  materia_id UUID REFERENCES materias(id) ON DELETE CASCADE,
  periodo INTEGER CHECK (periodo IN (1, 2, 3, 4)),
  nota DECIMAL(4,2) CHECK (nota >= 0 AND nota <= 5),
  observacion TEXT,
  docente_clerk_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(estudiante_id, materia_id, periodo)
);

-- Circulares
CREATE TABLE IF NOT EXISTS circulares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  destinatarios TEXT[] DEFAULT '{}',
  archivo_url TEXT,
  publicada BOOLEAN DEFAULT false,
  autor_clerk_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Confirmaciones de lectura
CREATE TABLE IF NOT EXISTS confirmaciones_circulares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circular_id UUID REFERENCES circulares(id) ON DELETE CASCADE,
  padre_clerk_id TEXT NOT NULL,
  leida_en TIMESTAMPTZ DEFAULT now(),
  UNIQUE(circular_id, padre_clerk_id)
);

-- Noticias
CREATE TABLE IF NOT EXISTS noticias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  resumen TEXT,
  contenido TEXT NOT NULL,
  imagen_url TEXT,
  publicada BOOLEAN DEFAULT false,
  autor_clerk_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Eventos
CREATE TABLE IF NOT EXISTS eventos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descripcion TEXT,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE,
  tipo TEXT CHECK (tipo IN ('academico', 'cultural', 'deportivo', 'institucional', 'festivo')),
  visible_publico BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Documentos
CREATE TABLE IF NOT EXISTS documentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  categoria TEXT CHECK (categoria IN ('manual', 'cronograma', 'academico', 'administrativo', 'pastoral')),
  archivo_url TEXT NOT NULL,
  visible_publico BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pregunta TEXT NOT NULL,
  respuesta TEXT NOT NULL,
  categoria TEXT,
  activa BOOLEAN DEFAULT true
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE estudiantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notas ENABLE ROW LEVEL SECURITY;
ALTER TABLE circulares ENABLE ROW LEVEL SECURITY;
ALTER TABLE confirmaciones_circulares ENABLE ROW LEVEL SECURITY;
ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Noticias: cualquiera puede leer las publicadas
CREATE POLICY "noticias_public_read" ON noticias FOR SELECT USING (publicada = true);

-- Eventos: cualquiera puede leer los visibles
CREATE POLICY "eventos_public_read" ON eventos FOR SELECT USING (visible_publico = true);

-- Documentos: cualquiera puede leer los visibles
CREATE POLICY "documentos_public_read" ON documentos FOR SELECT USING (visible_publico = true);

-- FAQs: cualquiera puede leer las activas
CREATE POLICY "faqs_public_read" ON faqs FOR SELECT USING (activa = true);

-- Circulares: cualquier autenticado puede leer las publicadas
CREATE POLICY "circulares_auth_read" ON circulares FOR SELECT TO authenticated USING (publicada = true);

-- Confirmaciones: cada padre ve y modifica las suyas
CREATE POLICY "confirmaciones_own" ON confirmaciones_circulares FOR ALL TO authenticated
  USING (padre_clerk_id = auth.uid()::text)
  WITH CHECK (padre_clerk_id = auth.uid()::text);

-- NOTA: Para la aplicación se usa supabaseAdmin (service role) que bypassa RLS.
-- Las políticas arriba son para acceso directo al cliente anon.

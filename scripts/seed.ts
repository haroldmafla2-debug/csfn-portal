/**
 * Script de datos iniciales — Colegio San Felipe Neri
 * Ejecutar: npx ts-node scripts/seed.ts
 * Requiere NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('🌱 Iniciando seed del Colegio San Felipe Neri...\n')

  // ---- MATERIAS ----
  const { data: materias, error: materiasError } = await supabase
    .from('materias')
    .insert([
      { nombre: 'Matemáticas', grado: '6A' },
      { nombre: 'Español y Literatura', grado: '6A' },
      { nombre: 'Ciencias Naturales', grado: '6A' },
      { nombre: 'Inglés', grado: '6A' },
      { nombre: 'Educación Física', grado: '6A' },
      { nombre: 'Matemáticas', grado: '8B' },
      { nombre: 'Español y Literatura', grado: '8B' },
      { nombre: 'Física', grado: '8B' },
      { nombre: 'Inglés', grado: '8B' },
      { nombre: 'Química', grado: '8B' },
      { nombre: 'Matemáticas', grado: '10A' },
      { nombre: 'Filosofía', grado: '10A' },
      { nombre: 'Economía y Política', grado: '10A' },
      { nombre: 'Inglés', grado: '10A' },
      { nombre: 'Biología', grado: '10A' },
    ])
    .select()

  if (materiasError) { console.error('Error en materias:', materiasError); return }
  console.log(`✅ ${materias?.length} materias creadas`)

  // ---- ESTUDIANTES ----
  const { data: estudiantes, error: estudiantesError } = await supabase
    .from('estudiantes')
    .insert([
      { nombres: 'Carlos Andrés', apellidos: 'Rodríguez Gómez', grado: '6A', codigo: 'EST001', activo: true },
      { nombres: 'María Fernanda', apellidos: 'López Herrera', grado: '6A', codigo: 'EST002', activo: true },
      { nombres: 'Juan Sebastián', apellidos: 'Martínez Pérez', grado: '8B', codigo: 'EST003', activo: true },
      { nombres: 'Valentina', apellidos: 'Torres Vargas', grado: '8B', codigo: 'EST004', activo: true },
      { nombres: 'Santiago', apellidos: 'Moreno Ruiz', grado: '10A', codigo: 'EST005', activo: true },
    ])
    .select()

  if (estudiantesError) { console.error('Error en estudiantes:', estudiantesError); return }
  console.log(`✅ ${estudiantes?.length} estudiantes creados`)

  // ---- NOTAS ----
  if (estudiantes && materias) {
    const notas = []
    const est6A = estudiantes.filter((e) => e.grado === '6A')
    const est8B = estudiantes.filter((e) => e.grado === '8B')
    const est10A = estudiantes.filter((e) => e.grado === '10A')
    const mat6A = materias.filter((m) => m.grado === '6A')
    const mat8B = materias.filter((m) => m.grado === '8B')
    const mat10A = materias.filter((m) => m.grado === '10A')

    const generarNota = () => Math.round((3.0 + Math.random() * 2.0) * 10) / 10

    for (const estudiante of est6A) {
      for (const materia of mat6A) {
        for (const periodo of [1, 2]) {
          notas.push({ estudiante_id: estudiante.id, materia_id: materia.id, periodo, nota: generarNota() })
        }
      }
    }
    for (const estudiante of est8B) {
      for (const materia of mat8B) {
        for (const periodo of [1]) {
          notas.push({ estudiante_id: estudiante.id, materia_id: materia.id, periodo, nota: generarNota() })
        }
      }
    }
    for (const estudiante of est10A) {
      for (const materia of mat10A) {
        for (const periodo of [1]) {
          notas.push({ estudiante_id: estudiante.id, materia_id: materia.id, periodo, nota: generarNota() })
        }
      }
    }

    const { error: notasError } = await supabase.from('notas').insert(notas)
    if (notasError) console.error('Error en notas:', notasError)
    else console.log(`✅ ${notas.length} notas creadas`)
  }

  // ---- CIRCULARES ----
  const { error: circularesError } = await supabase.from('circulares').insert([
    {
      titulo: 'Circular No. 001 - Inicio de actividades académicas 2026',
      contenido: `COLEGIO SAN FELIPE NERI - Bogotá D.C.

Bogotá, 3 de febrero de 2026

Estimados padres de familia y acudientes:

Nos complace darle la bienvenida al año escolar 2026. Las actividades académicas se reinician el lunes 9 de febrero de 2026, en el horario habitual de 6:30 am a 1:00 pm.

Les recordamos traer los útiles completos según la lista entregada en diciembre. El uniforme de diario es obligatorio los días lunes, martes y jueves.

Cordialmente,
Rectoría
Colegio San Felipe Neri`,
      destinatarios: ['todos'],
      publicada: true,
    },
    {
      titulo: 'Circular No. 002 - Reunión de padres grado 6A',
      contenido: `COLEGIO SAN FELIPE NERI - Bogotá D.C.

Bogotá, 14 de febrero de 2026

Estimados padres de familia del grado 6A:

Se les convoca a reunión de padres el próximo viernes 20 de febrero a las 6:00 pm en el salón múltiple del colegio.

Se tratarán temas relacionados con el proceso de adaptación de los estudiantes y el plan de estudios del año.

Se ruega puntual asistencia.

Cordialmente,
Dirección de Grupo 6A
Colegio San Felipe Neri`,
      destinatarios: ['6A'],
      publicada: true,
    },
    {
      titulo: 'Circular No. 003 - Actualización plataforma académica',
      contenido: `COLEGIO SAN FELIPE NERI - Bogotá D.C.

Bogotá, 1 de marzo de 2026

Estimados docentes:

Se informa que a partir del 10 de marzo el nuevo portal institucional estará disponible en sanfelipeneribogota.edu.co para el ingreso de notas y publicación de circulares.

Se agradece asistir a la capacitación programada para el viernes 6 de marzo a las 2:00 pm.

Cordialmente,
Coordinación Académica
Colegio San Felipe Neri`,
      destinatarios: ['docentes'],
      publicada: true,
    },
  ])
  if (circularesError) console.error('Error en circulares:', circularesError)
  else console.log('✅ 3 circulares de ejemplo creadas')

  // ---- NOTICIAS ----
  const { error: noticiasError } = await supabase.from('noticias').insert([
    {
      titulo: 'Inicio del año escolar 2026: ¡Bienvenidos a una nueva aventura académica!',
      slug: 'inicio-ano-escolar-2026',
      resumen: 'El Colegio San Felipe Neri inicia sus actividades con nuevas estrategias pedagógicas y un ambiente renovado.',
      contenido: '<p>Con gran alegría y entusiasmo, el Colegio San Felipe Neri abrió sus puertas este 9 de febrero para dar inicio a un nuevo año académico lleno de posibilidades y aprendizajes.</p><p>Este 2026, la institución implementará nuevas estrategias pedagógicas orientadas al pensamiento crítico y el uso responsable de la tecnología, siempre manteniendo los valores católicos que nos caracterizan desde 1965.</p>',
      publicada: true,
    },
    {
      titulo: 'Olimpiadas Deportivas CSFN 2026: ¡Que gane el mejor!',
      slug: 'olimpiadas-deportivas-2026',
      resumen: 'Los estudiantes participarán en emocionantes competencias deportivas durante el mes de mayo.',
      contenido: '<p>El Colegio San Felipe Neri anuncia con orgullo las Olimpiadas Deportivas Internas 2026, que se realizarán del 8 al 9 de mayo en las instalaciones del colegio.</p><p>Podrán participar todos los estudiantes de grado 6° a 11° en disciplinas como fútbol, baloncesto, atletismo y voleibol.</p>',
      publicada: true,
    },
    {
      titulo: 'Actualización del Manual de Convivencia 2026',
      slug: 'manual-convivencia-2026',
      resumen: 'La institución socializa las actualizaciones del Manual de Convivencia para el presente año.',
      contenido: '<p>El Consejo Directivo del Colegio San Felipe Neri ha aprobado la actualización del Manual de Convivencia para el año 2026, incorporando disposiciones sobre el uso de dispositivos tecnológicos y redes sociales.</p><p>El documento está disponible para descarga en el Portal Familias.</p>',
      publicada: true,
    },
    {
      titulo: 'Semana Cultural CSFN: Arte, cultura y tradición',
      slug: 'semana-cultural-2026',
      resumen: 'Del 27 de abril al 1 de mayo se celebrará la Semana Cultural con exposiciones, teatro y danzas.',
      contenido: '<p>La Semana Cultural del Colegio San Felipe Neri es uno de los eventos más esperados del año. Este 2026 tendremos presentaciones de teatro, exposiciones de arte, danzas folclóricas y mucho más.</p>',
      publicada: true,
    },
    {
      titulo: 'Proceso de matrículas 2027: ¡Inscripciones abiertas!',
      slug: 'matriculas-2027',
      resumen: 'Iniciamos el proceso de admisiones para el año escolar 2027. Cupos limitados.',
      contenido: '<p>El Colegio San Felipe Neri informa que están abiertas las inscripciones para el año escolar 2027. Los interesados pueden comunicarse con la secretaría al 322 458 13 69 o escribir a csfn@sanfelipeneribogota.edu.co.</p>',
      publicada: true,
    },
  ])
  if (noticiasError) console.error('Error en noticias:', noticiasError)
  else console.log('✅ 5 noticias de ejemplo creadas')

  // ---- EVENTOS ----
  const { error: eventosError } = await supabase.from('eventos').insert([
    { titulo: 'Inicio año escolar 2026', fecha_inicio: '2026-02-09', tipo: 'academico', visible_publico: true },
    { titulo: 'Día de la Mujer', descripcion: 'Actividades institucionales', fecha_inicio: '2026-03-08', tipo: 'institucional', visible_publico: true },
    { titulo: 'Semana Santa', fecha_inicio: '2026-03-30', fecha_fin: '2026-04-03', tipo: 'festivo', visible_publico: true },
    { titulo: 'Entrega Boletines Período 1', descripcion: 'Reunión de padres y entrega de informes académicos', fecha_inicio: '2026-04-11', tipo: 'academico', visible_publico: true },
    { titulo: 'Día del Idioma', descripcion: 'Celebración del idioma español', fecha_inicio: '2026-04-23', tipo: 'cultural', visible_publico: true },
    { titulo: 'Semana Cultural CSFN', descripcion: 'Exposiciones, teatro y danzas', fecha_inicio: '2026-04-27', fecha_fin: '2026-05-01', tipo: 'cultural', visible_publico: true },
    { titulo: 'Olimpiadas Deportivas', descripcion: 'Competencias internas por cursos', fecha_inicio: '2026-05-08', fecha_fin: '2026-05-09', tipo: 'deportivo', visible_publico: true },
    { titulo: 'Día del Maestro', descripcion: 'Celebración al docente colombiano', fecha_inicio: '2026-05-15', tipo: 'institucional', visible_publico: true },
    { titulo: 'Jornada de Reflexión', fecha_inicio: '2026-06-05', tipo: 'institucional', visible_publico: false },
    { titulo: 'Cierre Período 2', fecha_inicio: '2026-06-19', tipo: 'academico', visible_publico: true },
    { titulo: 'Vacaciones Mitad de Año', fecha_inicio: '2026-06-22', fecha_fin: '2026-07-10', tipo: 'festivo', visible_publico: true },
    { titulo: 'Reinicio Segundo Semestre', fecha_inicio: '2026-07-13', tipo: 'academico', visible_publico: true },
    { titulo: 'Día de la Independencia', fecha_inicio: '2026-07-20', tipo: 'festivo', visible_publico: true },
    { titulo: 'Fiesta de San Felipe Neri', descripcion: 'Patrono del colegio', fecha_inicio: '2026-05-26', tipo: 'institucional', visible_publico: true },
    { titulo: 'Graduación Grado 11°', descripcion: 'Ceremonia de grado promoción 2026', fecha_inicio: '2026-11-20', tipo: 'institucional', visible_publico: true },
  ])
  if (eventosError) console.error('Error en eventos:', eventosError)
  else console.log('✅ 15 eventos del calendario creados')

  // ---- DOCUMENTOS ----
  const { error: docsError } = await supabase.from('documentos').insert([
    { nombre: 'Manual de Convivencia 2026', categoria: 'manual', archivo_url: '#', visible_publico: true },
    { nombre: 'Cronograma Académico 2026', categoria: 'cronograma', archivo_url: '#', visible_publico: true },
    { nombre: 'Lista de útiles por grado', categoria: 'academico', archivo_url: '#', visible_publico: true },
    { nombre: 'Reglamento Uniforme Escolar', categoria: 'manual', archivo_url: '#', visible_publico: true },
    { nombre: 'Proyecto Educativo Institucional (PEI)', categoria: 'administrativo', archivo_url: '#', visible_publico: true },
    { nombre: 'Plan Pastoral 2026', categoria: 'pastoral', archivo_url: '#', visible_publico: true },
  ])
  if (docsError) console.error('Error en documentos:', docsError)
  else console.log('✅ 6 documentos institucionales creados')

  // ---- FAQs ----
  const { error: faqsError } = await supabase.from('faqs').insert([
    { pregunta: '¿Cuál es el horario de clases?', respuesta: 'El horario de clases es de lunes a viernes, de 6:30 am a 1:00 pm. Los días con jornada extendida terminan a las 2:00 pm.', categoria: 'horarios', activa: true },
    { pregunta: '¿Qué grados ofrece el colegio?', respuesta: 'El Colegio San Felipe Neri ofrece bachillerato completo: grados 6° a 9° (básica secundaria) y grados 10° y 11° (media vocacional).', categoria: 'academico', activa: true },
    { pregunta: '¿Cuáles son los costos de matrícula?', respuesta: 'Para información actualizada sobre costos de matrícula y pensión, por favor comuníquese con secretaría al 322 458 13 69 o escriba a csfn@sanfelipeneribogota.edu.co.', categoria: 'pagos', activa: true },
    { pregunta: '¿Dónde está ubicado el colegio?', respuesta: 'Estamos ubicados en la Cr. 27 C# 71-80, Barrio Alcázares, Bogotá D.C. Puede comunicarse con nosotros al 322 458 13 69.', categoria: 'general', activa: true },
    { pregunta: '¿Cómo es el proceso de matrícula?', respuesta: 'El proceso incluye: 1) Solicitar información en secretaría, 2) Entrevista con el rector, 3) Entrega de documentos, 4) Pago de matrícula. Para iniciar, llame al 322 458 13 69.', categoria: 'matriculas', activa: true },
    { pregunta: '¿Cuál es el uniforme del colegio?', respuesta: 'El colegio tiene uniforme de diario (pantalón o falda azul marino, camisa blanca) y de educación física (pantaloneta y camiseta institucional). Para más detalles, consulte el Manual de Convivencia.', categoria: 'uniforme', activa: true },
    { pregunta: '¿Cómo puedo ver las notas de mi hijo?', respuesta: 'Puede consultar las notas de su hijo/a en el Portal Familias en sanfelipeneribogota.edu.co, iniciando sesión con su usuario y contraseña asignados.', categoria: 'academico', activa: true },
    { pregunta: '¿Cómo recupero mi contraseña del portal?', respuesta: 'Puede recuperar su contraseña haciendo clic en "¿Olvidé mi contraseña?" en la página de inicio de sesión. Si tiene problemas, comuníquese con secretaría.', categoria: 'portal', activa: true },
    { pregunta: '¿Cuándo se entregan los boletines?', respuesta: 'Los boletines se entregan al final de cada período académico. Las fechas exactas se publican en el Calendario Escolar disponible en el portal y en las circulares.', categoria: 'academico', activa: true },
    { pregunta: '¿El colegio tiene ruta escolar?', respuesta: 'El colegio no cuenta con ruta escolar propia. Para información sobre transportes escolares en la zona de Alcázares, puede consultar en secretaría.', categoria: 'general', activa: true },
  ])
  if (faqsError) console.error('Error en FAQs:', faqsError)
  else console.log('✅ 10 FAQs para el chatbot creadas')

  console.log('\n🎉 Seed completado exitosamente!')
  console.log('\n📝 Próximos pasos:')
  console.log('   1. Configure las variables de entorno en .env.local')
  console.log('   2. Ejecute las migraciones de Supabase (schema.sql)')
  console.log('   3. Configure los roles en Clerk Dashboard')
  console.log('   4. Inicie el servidor: npm run dev')
}

seed().catch(console.error)

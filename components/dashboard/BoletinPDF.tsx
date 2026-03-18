import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import type { Estudiante, Nota } from '@/types'
import { calculateAverage, getNotaLabel } from '@/lib/utils'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 40,
    paddingBottom: 50,
    paddingHorizontal: 40,
    color: '#1A1A2E',
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#1B3A6B',
    paddingBottom: 16,
  },
  colegioName: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#1B3A6B',
    marginBottom: 2,
  },
  colegioSubtitle: {
    fontSize: 9,
    color: '#666',
    marginBottom: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  boletinTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#C8A951',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1B3A6B',
    marginBottom: 8,
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
    backgroundColor: '#F5F7FA',
    padding: 12,
    borderRadius: 4,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1A1A2E',
  },
  table: {
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1B3A6B',
    padding: 8,
    borderRadius: 2,
  },
  tableHeaderText: {
    color: '#ffffff',
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    flex: 1,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableRowEven: {
    backgroundColor: '#FAFAFA',
  },
  tableCell: {
    fontSize: 10,
    flex: 1,
    color: '#333',
  },
  tableCellBold: {
    fontFamily: 'Helvetica-Bold',
  },
  notaText: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  promedioRow: {
    flexDirection: 'row',
    backgroundColor: '#1B3A6B',
    padding: 10,
    borderRadius: 2,
    marginTop: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promedioLabel: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
  },
  promedioValue: {
    color: '#C8A951',
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
  },
  narrativa: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F5F7FA',
    borderLeftWidth: 3,
    borderLeftColor: '#C8A951',
    borderRadius: 2,
  },
  narrativaTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#C8A951',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  narrativaText: {
    fontSize: 10,
    color: '#555',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
    color: '#aaa',
  },
  firmaSeparator: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  firmaItem: {
    alignItems: 'center',
    width: 150,
  },
  firmaLine: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    width: '100%',
    marginBottom: 4,
  },
  firmaLabel: {
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
  },
})

function notaColor(nota: number) {
  return nota >= 4.0 ? '#16a34a' : nota >= 3.0 ? '#d97706' : '#dc2626'
}

interface BoletinPDFProps {
  estudiante: Estudiante
  notas: Nota[]
  periodo: number
  narrativaIA?: string
}

export default function BoletinPDF({ estudiante, notas, periodo, narrativaIA }: BoletinPDFProps) {
  const promedio = calculateAverage(notas.map((n) => n.nota))
  const periodoNombres = ['', 'Primer', 'Segundo', 'Tercer', 'Cuarto']

  return (
    <Document
      title={`Boletín ${estudiante.nombres} ${estudiante.apellidos} - Período ${periodo}`}
      author="Colegio San Felipe Neri"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.colegioName}>COLEGIO SAN FELIPE NERI</Text>
              <Text style={styles.colegioSubtitle}>Cr. 27 C# 71-80, Barrio Alcázares — Bogotá D.C.</Text>
              <Text style={styles.colegioSubtitle}>Tel: 322 458 13 69 · csfn@sanfelipeneribogota.edu.co</Text>
            </View>
            <View>
              <Text style={styles.boletinTitle}>BOLETÍN DE NOTAS</Text>
              <Text style={{ fontSize: 9, color: '#999', textAlign: 'right' }}>Año Escolar 2026</Text>
            </View>
          </View>
        </View>

        {/* Info estudiante */}
        <Text style={styles.sectionTitle}>Información del Estudiante</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Estudiante</Text>
            <Text style={styles.infoValue}>{estudiante.nombres} {estudiante.apellidos}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Grado</Text>
            <Text style={styles.infoValue}>{estudiante.grado}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Código</Text>
            <Text style={styles.infoValue}>{estudiante.codigo}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Período</Text>
            <Text style={styles.infoValue}>{periodoNombres[periodo]} Período</Text>
          </View>
        </View>

        {/* Notas */}
        <Text style={styles.sectionTitle}>Informe Académico</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={{ ...styles.tableHeaderText, flex: 3 }}>Asignatura</Text>
            <Text style={{ ...styles.tableHeaderText, flex: 1, textAlign: 'center' }}>Nota</Text>
            <Text style={{ ...styles.tableHeaderText, flex: 1, textAlign: 'center' }}>Desempeño</Text>
          </View>
          {notas.map((nota, i) => (
            <View key={nota.id} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowEven : {}]}>
              <Text style={{ ...styles.tableCell, flex: 3 }}>
                {(nota.materia as { nombre: string } | undefined)?.nombre || '—'}
              </Text>
              <Text style={{ ...styles.tableCell, ...styles.tableCellBold, ...styles.notaText, flex: 1, textAlign: 'center', color: notaColor(nota.nota) }}>
                {nota.nota.toFixed(1)}
              </Text>
              <Text style={{ ...styles.tableCell, flex: 1, textAlign: 'center', fontSize: 9 }}>
                {getNotaLabel(nota.nota)}
              </Text>
            </View>
          ))}
          <View style={styles.promedioRow}>
            <Text style={styles.promedioLabel}>Promedio General</Text>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.promedioValue}>{promedio.toFixed(2)}</Text>
              <Text style={{ color: '#ffffff', fontSize: 9 }}>{getNotaLabel(promedio)}</Text>
            </View>
          </View>
        </View>

        {/* Narrativa IA */}
        {narrativaIA && (
          <View style={styles.narrativa}>
            <Text style={styles.narrativaTitle}>Análisis del Período</Text>
            <Text style={styles.narrativaText}>{narrativaIA}</Text>
          </View>
        )}

        {/* Firma */}
        <View style={styles.firmaSeparator}>
          <View style={styles.firmaItem}>
            <View style={styles.firmaLine} />
            <Text style={styles.firmaLabel}>Director(a) de Grupo</Text>
          </View>
          <View style={styles.firmaItem}>
            <View style={styles.firmaLine} />
            <Text style={styles.firmaLabel}>Coordinación Académica</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Colegio San Felipe Neri · Bogotá D.C. · 2026</Text>
          <Text style={styles.footerText}>Este documento es oficial y confidencial</Text>
        </View>
      </Page>
    </Document>
  )
}

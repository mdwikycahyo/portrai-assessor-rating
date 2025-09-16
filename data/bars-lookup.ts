import { barsChecklist } from "./bars-checklist"

// Mapping of behavior IDs to Indonesian descriptions from BARS checklist
const barsLookupMap: { [behaviorId: string]: string } = {
  // Business opportunity recognition behaviors
  "recognizes-business-opportunities": "Mengevaluasi peluang bisnis dengan data komprehensif",
  "seeks-additional-information": "Menggunakan informasi ekonomi, keuangan, dan pasar untuk analisis mendalam",
  "strategic-alignment-thinking": "Mengintegrasikan multiple data sources untuk strategic insights",

  // Analysis behaviors
  "analyzes-proposal-details": "Mengidentifikasi tren pasar dengan insight yang actionable",
  "processes-formal-communications": "Membuat analisis tanpa adanya insight mendalam",

  // SWOT analysis behaviors
  "conducts-comprehensive-swot-analysis": "Menggunakan framework analisis strategis (SWOT, Porter, dll)",
  "provides-strategic-recommendations": "Memberikan rekomendasi strategis berbasis analisis mendalam",
  "quantifies-business-impact": "Mengukur dampak finansial dari setiap keputusan bisnis",

  // Collaboration behaviors
  "facilitates-cross-functional-collaboration": "Memfasilitasi kolaborasi lintas fungsi dengan efektif",
  "acknowledges-leadership-decisions": "Mendukung keputusan manajemen dengan konstruktif",
  "collaborates-effectively-with-team": "Berkomunikasi dengan jelas dan persuasif kepada stakeholder",
  "aligns-tactical-execution-with-strategy": "Menyelaraskan eksekusi taktis dengan strategi perusahaan",
  "coordinates-project-activities": "Mengkoordinasikan aktivitas proyek dengan timeline yang jelas",

  // Platform utilization behaviors
  "seeks-expert-guidance": "Menggunakan AI tools untuk analisis mendalam",
  "asks-specific-questions": "Mengajukan pertanyaan spesifik untuk mendapat insight",
  "applies-learning-to-project": "Menerapkan learning dari berbagai sumber untuk project context"
}

/**
 * Get Indonesian BARS description by behavior ID
 * Falls back to provided description if no mapping found
 */
export function getIndonesianBARSDescription(behaviorId: string, fallbackDescription?: string): string {
  return barsLookupMap[behaviorId] || fallbackDescription || behaviorId
}

/**
 * Check if a behavior ID has Indonesian mapping
 */
export function hasIndonesianMapping(behaviorId: string): boolean {
  return behaviorId in barsLookupMap
}

/**
 * Get all behavior IDs that have Indonesian mappings
 */
export function getAvailableBehaviorIds(): string[] {
  return Object.keys(barsLookupMap)
}
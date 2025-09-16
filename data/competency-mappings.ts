import { CompetencyMetadata, SimulationCompetencyMapping } from "./stimulus-response-types"

// Competency definitions with key actions
export const competencyDefinitions: CompetencyMetadata[] = [
  {
    id: "business-acumen",
    title: "Business Acumen",
    definition: "Memanfaatkan pengetahuan tentang tren ekonomi, keuangan, pasar, dan industri untuk memahami serta meningkatkan hasil individu, kelompok kerja, dan/atau organisasi; menggunakan pemahaman tentang fungsi bisnis utama, tren industri, serta posisi organisasi sendiri untuk berkontribusi dalam strategi dan/atau taktik bisnis yang efektif.",
    keyActions: [
      {
        id: "memahami-fungsi-bisnis",
        code: "BA1",
        title: "Memahami Fungsi dan Proses Bisnis",
        description: "Memahami fungsi bisnis utama, proses organisasi, dan bagaimana berbagai departemen bekerja sama untuk mencapai tujuan bisnis.",
        competencyId: "business-acumen"
      },
      {
        id: "menganalisis",
        code: "BA2",
        title: "Menganalisis",
        description: "Menggunakan informasi ekonomi, keuangan, pasar, dan industri untuk mengidentifikasi tren, menilai strategi dan hasil bisnis saat ini, dan/atau mengevaluasi peluang bisnis tertentu; mengenali tren dan mengantisipasi dampaknya.",
        competencyId: "business-acumen"
      },
      {
        id: "mengintegrasikan",
        code: "BA3",
        title: "Mengintegrasikan",
        description: "Menggabungkan data ekonomi, keuangan, pasar, dan industri dari berbagai sumber untuk mengidentifikasi isu-isu kritis; menjelaskan implikasi tren bagi departemen atau tim sendiri serta organisasi secara lebih luas.",
        competencyId: "business-acumen"
      }
    ]
  },
  {
    id: "establishing-collaboration",
    title: "Establishing Collaboration",
    definition: "Membangun dan memelihara hubungan kerja yang efektif dengan kolega, stakeholder, dan mitra bisnis untuk mencapai tujuan bersama melalui komunikasi yang efektif dan kontribusi yang bermakna.",
    keyActions: [
      {
        id: "komunikasi-terbuka",
        code: "EC1",
        title: "Komunikasi Terbuka",
        description: "Berkomunikasi dengan jelas, transparan, dan efektif dengan berbagai stakeholder untuk membangun kepercayaan dan pemahaman bersama.",
        competencyId: "establishing-collaboration"
      },
      {
        id: "menunjukkan-kontribusi",
        code: "EC2",
        title: "Menunjukkan Kontribusi",
        description: "Memberikan kontribusi yang bermakna dalam kerja tim, berbagi pengetahuan, dan mengambil inisiatif untuk mendukung pencapaian tujuan bersama.",
        competencyId: "establishing-collaboration"
      },
      {
        id: "membangun-hubungan",
        code: "EC3",
        title: "Membangun Hubungan",
        description: "Membangun dan memelihara hubungan kerja yang positif dengan berbagai pihak, menunjukkan empati dan pemahaman terhadap perspektif yang berbeda.",
        competencyId: "establishing-collaboration"
      }
    ]
  },
  {
    id: "strategic-thinking",
    title: "Strategic Thinking",
    definition: "Kemampuan untuk berpikir secara strategis, menganalisis situasi bisnis dari perspektif jangka panjang, dan mengembangkan solusi yang berkelanjutan.",
    keyActions: [
      {
        id: "analisis-strategis",
        code: "ST1",
        title: "Analisis Strategis",
        description: "Melakukan analisis mendalam terhadap situasi bisnis, mengidentifikasi peluang dan tantangan strategis, serta mengembangkan rekomendasi yang actionable.",
        competencyId: "strategic-thinking"
      },
      {
        id: "perencanaan-jangka-panjang",
        code: "ST2",
        title: "Perencanaan Jangka Panjang",
        description: "Mengembangkan strategi dan rencana jangka panjang yang sejalan dengan tujuan organisasi dan kondisi pasar.",
        competencyId: "strategic-thinking"
      }
    ]
  }
]

// Mapping simulations to competencies they measure
export const simulationCompetencyMappings: SimulationCompetencyMapping[] = [
  {
    simulationId: "business-analysis-swot",
    competencies: [
      competencyDefinitions.find(c => c.id === "business-acumen")!,
      competencyDefinitions.find(c => c.id === "establishing-collaboration")!
    ]
  },
  {
    simulationId: "supply-chain-bottleneck",
    competencies: [
      competencyDefinitions.find(c => c.id === "business-acumen")!,
      competencyDefinitions.find(c => c.id === "strategic-thinking")!
    ]
  },
  {
    simulationId: "performance-coaching",
    competencies: [
      competencyDefinitions.find(c => c.id === "establishing-collaboration")!,
      competencyDefinitions.find(c => c.id === "strategic-thinking")!
    ]
  },
  {
    simulationId: "simulasi-lainnya",
    competencies: [
      competencyDefinitions.find(c => c.id === "business-acumen")!,
      competencyDefinitions.find(c => c.id === "establishing-collaboration")!
    ]
  },
  {
    simulationId: "csr-project",
    competencies: [
      competencyDefinitions.find(c => c.id === "strategic-thinking")!,
      competencyDefinitions.find(c => c.id === "establishing-collaboration")!
    ]
  }
]

// Helper function to get competencies for a simulation
export function getCompetenciesForSimulation(simulationId: string): CompetencyMetadata[] {
  const mapping = simulationCompetencyMappings.find(m => m.simulationId === simulationId)
  return mapping?.competencies || []
}

// Helper function to get key action by ID
export function getKeyActionById(keyActionId: string): { keyAction: any; competency: CompetencyMetadata } | null {
  for (const competency of competencyDefinitions) {
    const keyAction = competency.keyActions.find(ka => ka.id === keyActionId)
    if (keyAction) {
      return { keyAction, competency }
    }
  }
  return null
}

// Helper function to get competency by key action ID
export function getCompetencyByKeyActionId(keyActionId: string): CompetencyMetadata | null {
  const result = getKeyActionById(keyActionId)
  return result?.competency || null
}

// Helper function to map behaviorId to competency and key action information
export function getBehaviorContext(behaviorId: string): {
  competency: CompetencyMetadata
  keyAction: any
} | null {
  // Exact behavior ID mappings (for specific behavior IDs)
  const exactBehaviorMappings: { [behaviorId: string]: string } = {
    // Business Acumen - Menganalisis (BA2) behaviors
    'seeks-additional-information': 'menganalisis',
    'provides-strategic-recommendations': 'menganalisis',
    'quantifies-business-impact': 'menganalisis',

    // Business Acumen - Mengintegrasikan (BA3) behaviors
    'strategic-alignment-thinking': 'mengintegrasikan',

    // Establishing Collaboration - Komunikasi Terbuka (EC1) behaviors
    'offers-comprehensive-perspective': 'komunikasi-terbuka',

    // Establishing Collaboration - Menunjukkan Kontribusi (EC2) behaviors
    'acknowledges-leadership-decisions': 'menunjukkan-kontribusi',
    'shows-collaborative-willingness': 'menunjukkan-kontribusi',

    // General analysis and learning behaviors (could be BA2 or other contexts)
    'seeks-expert-guidance': 'menganalisis',
    'asks-specific-questions': 'menganalisis',
    'applies-learning-to-project': 'menganalisis',

    // New behaviors from "Simulasi Lainnya"
    'understands-task-requirements': 'memahami-fungsi-bisnis',
    'processes-information-effectively': 'menganalisis',
    'demonstrates-attention-to-detail': 'menganalisis',
    'provides-clear-communication': 'komunikasi-terbuka',
    'shows-proactive-collaboration': 'menunjukkan-kontribusi',
    'shows-openness-to-feedback': 'menunjukkan-kontribusi',
    'engages-in-meaningful-dialogue': 'komunikasi-terbuka',
    'demonstrates-subject-matter-expertise': 'menganalisis',
    'collaborates-across-different-communication-channels': 'menunjukkan-kontribusi'
  }

  // Prefix-based behavior ID mappings (for pattern-based behavior IDs)
  const prefixBehaviorMappings: { [prefix: string]: string } = {
    'analisis': 'menganalisis',
    'integrasi': 'mengintegrasikan',
    'fungsi-bisnis': 'memahami-fungsi-bisnis',
    'komunikasi': 'komunikasi-terbuka',
    'kontribusi': 'menunjukkan-kontribusi',
    'hubungan': 'membangun-hubungan',
    'strategis': 'analisis-strategis',
    'perencanaan': 'perencanaan-jangka-panjang'
  }

  let matchedKeyActionId: string | null = null

  // First, try exact match
  if (exactBehaviorMappings[behaviorId]) {
    matchedKeyActionId = exactBehaviorMappings[behaviorId]
  } else {
    // Fallback to prefix matching
    for (const [prefix, keyActionId] of Object.entries(prefixBehaviorMappings)) {
      if (behaviorId.startsWith(prefix)) {
        matchedKeyActionId = keyActionId
        break
      }
    }
  }

  if (!matchedKeyActionId) return null

  // Get competency and key action information
  const result = getKeyActionById(matchedKeyActionId)
  return result ? {
    competency: result.competency,
    keyAction: result.keyAction
  } : null
}
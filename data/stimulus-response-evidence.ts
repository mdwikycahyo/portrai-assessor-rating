import { EnhancedAIBehaviorEvidence } from './stimulus-response-types'

// Enhanced AI behavior evidence mapping for stimulus-response framework
// Maps behavioral evidence to specific stimulus-response chains

export const stimulusResponseEvidence: { [behaviorId: string]: EnhancedAIBehaviorEvidence[] } = {
  // Supply Chain Bottleneck Simulation Evidence
  "responds-promptly-to-urgent-requests": [
    {
      behaviorId: "responds-promptly-to-urgent-requests",
      stimulusResponseId: "sr-1",
      evidenceSegments: [
        "Replied to urgent crisis email within 17 minutes",
        "Terima kasih atas informasinya. Setelah melakukan analisis awal"
      ],
      confidence: 92,
      reasoning: "Participant responded quickly to urgent manager request with comprehensive analysis",
      category: "strength"
    }
  ],

  "provides-structured-solutions": [
    {
      behaviorId: "provides-structured-solutions",
      stimulusResponseId: "sr-1",
      evidenceSegments: [
        "Langkah-langkah yang saya usulkan:\n1. Isolasi sistem yang bermasalah\n2. Komunikasi proaktif dengan klien\n3. Tim darurat untuk perbaikan dalam 2 jam"
      ],
      confidence: 95,
      reasoning: "Delivered clear 3-step action plan under crisis pressure",
      category: "strength"
    }
  ],

  "communicates-timeline-commitments": [
    {
      behaviorId: "communicates-timeline-commitments",
      stimulusResponseId: "sr-1",
      evidenceSegments: [
        "Tim darurat untuk perbaikan dalam 2 jam"
      ],
      confidence: 78,
      reasoning: "Specified timeline but could be more detailed about contingency planning",
      category: "meet-requirement"
    }
  ],

  "identifies-comprehensive-risks": [
    {
      behaviorId: "identifies-comprehensive-risks",
      stimulusResponseId: "sr-2",
      evidenceSegments: [
        "saya identifikasi 3 risiko utama: pertama, customer adoption rate yang mungkin lebih lambat dari proyeksi. Kedua, supply chain challenges untuk sustainable materials. Ketiga, initial investment yang cukup besar"
      ],
      confidence: 90,
      reasoning: "Identified multiple risk categories across different business dimensions",
      category: "strength"
    }
  ],

  "provides-mitigation-strategies": [
    {
      behaviorId: "provides-mitigation-strategies",
      stimulusResponseId: "sr-2",
      evidenceSegments: [
        "Untuk customer adoption, saya recommend pilot program di 2-3 kota besar dulu untuk test market response. Untuk supply chain, kita bisa mulai partnership dengan 2-3 supplier sustainable materials sekarang. Dan untuk investment, kita bisa phase implementation dalam 3 tahap untuk spread risk"
      ],
      confidence: 88,
      reasoning: "Provided specific, actionable mitigation for each identified risk",
      category: "strength"
    }
  ],

  "estimates-realistic-timelines": [
    {
      behaviorId: "estimates-realistic-timelines",
      stimulusResponseId: "sr-2",
      evidenceSegments: [
        "Saya estimate 3 bulan untuk preparation, 6 bulan untuk pilot execution, dan 2 bulan untuk evaluation. Total 11 bulan sebelum full rollout decision"
      ],
      confidence: 82,
      reasoning: "Provided detailed timeline breakdown, appears realistic but lacks risk buffer",
      category: "meet-requirement"
    }
  ],

  // Performance Coaching Simulation Evidence
  "identifies-market-opportunities": [
    {
      behaviorId: "identifies-market-opportunities",
      stimulusResponseId: "sr-3",
      evidenceSegments: [
        "Saya rasa kita harus mempertimbangkan untuk mengembangkan lini produk baru yang berfokus pada keberlanjutan. Ini bisa menjadi peluang besar untuk menangkap pangsa pasar yang sedang berkembang"
      ],
      confidence: 85,
      reasoning: "Proactively identified market opportunity from trend analysis",
      category: "strength"
    }
  ],

  "provides-budget-estimates": [
    {
      behaviorId: "provides-budget-estimates",
      stimulusResponseId: "sr-3",
      evidenceSegments: [
        "Budget estimasi sekitar 500K untuk R&D awal",
        "Berdasarkan analisis kompetitor, kita punya window 6 bulan sebelum mereka masuk ke space ini"
      ],
      confidence: 80,
      reasoning: "Provided budget estimate with competitive analysis context",
      category: "strength"
    }
  ],

  "identifies-implementation-challenges": [
    {
      behaviorId: "identifies-implementation-challenges",
      stimulusResponseId: "sr-4",
      evidenceSegments: [
        "Saya sudah identify beberapa potential issues:\n1. Different data formats\n2. Timing discrepancies\n3. Definition inconsistencies"
      ],
      confidence: 87,
      reasoning: "Identified specific technical challenges for data integration project",
      category: "strength"
    }
  ],

  "proposes-structured-approach": [
    {
      behaviorId: "proposes-structured-approach",
      stimulusResponseId: "sr-4",
      evidenceSegments: [
        "Phase 1 (Data standardization): 2 weeks\nPhase 2 (Integration framework): 3 weeks\nPhase 3 (Testing & validation): 1 week\n\nTotal 6 weeks untuk full implementation"
      ],
      confidence: 92,
      reasoning: "Delivered well-structured 3-phase implementation plan with clear timelines",
      category: "strength"
    }
  ],

  "commits-to-stakeholder-coordination": [
    {
      behaviorId: "commits-to-stakeholder-coordination",
      stimulusResponseId: "sr-4",
      evidenceSegments: [
        "Akan saya coordinate dengan semua stakeholders dan provide regular updates"
      ],
      confidence: 75,
      reasoning: "Volunteered for coordination role but lacks specific update frequency",
      category: "meet-requirement"
    }
  ],

  // Business Analysis Simulation Evidence
  "conducts-comprehensive-analysis": [
    {
      behaviorId: "conducts-comprehensive-analysis",
      stimulusResponseId: "sr-5",
      evidenceSegments: [
        "Berdasarkan analisis data operasional selama 6 bulan terakhir, ditemukan bahwa otomatisasi proses X dapat mengurangi pengeluaran sebesar 15%",
        "Analisis Detail\n1. Proses Manual Saat Ini\n- Waktu pemrosesan: 4 jam per transaksi\n- Tingkat error: 3.2%"
      ],
      confidence: 95,
      reasoning: "Conducted thorough 6-month analysis with detailed current state assessment",
      category: "strength"
    }
  ],

  "quantifies-business-impact": [
    {
      behaviorId: "quantifies-business-impact",
      stimulusResponseId: "sr-5",
      evidenceSegments: [
        "otomatisasi proses X dapat mengurangi pengeluaran sebesar 15% atau setara dengan penghematan Rp 2.5 miliar per tahun",
        "Investasi dalam otomatisasi proses X akan memberikan ROI sebesar 300% dalam 18 bulan pertama"
      ],
      confidence: 90,
      reasoning: "Provided specific financial impact metrics with percentage and absolute values",
      category: "strength"
    }
  ],

  "provides-implementation-roadmap": [
    {
      behaviorId: "provides-implementation-roadmap",
      stimulusResponseId: "sr-5",
      evidenceSegments: [
        "REKOMENDASI\n1. Implementasi sistem otomatisasi dalam 3 fase\n2. Training tim untuk adaptasi teknologi baru\n3. Monitoring dan evaluasi berkala"
      ],
      confidence: 85,
      reasoning: "Outlined implementation approach but could be more detailed on timelines",
      category: "strength"
    }
  ],

  // Platform Underutilization Simulation Evidence
  "seeks-expert-guidance": [
    {
      behaviorId: "seeks-expert-guidance",
      stimulusResponseId: "sr-6",
      evidenceSegments: [
        "Halo, saya lagi butuh info nih tentang cara analisis tren pasar di industri teknologi. Ada saran?"
      ],
      confidence: 82,
      reasoning: "Proactively sought expert guidance for market analysis methodology",
      category: "meet-requirement"
    }
  ],

  "asks-specific-questions": [
    {
      behaviorId: "asks-specific-questions",
      stimulusResponseId: "sr-6",
      evidenceSegments: [
        "Tapi ada contoh alat atau kerangka kerja spesifik yang bisa saya pakai?",
        "gimana cara gabunginnya biar jadi insight yang benar-benar bisa dipakai?"
      ],
      confidence: 88,
      reasoning: "Asked targeted follow-up questions about tools and practical application",
      category: "meet-requirement"
    }
  ],

  "applies-learning-to-project": [
    {
      behaviorId: "applies-learning-to-project",
      stimulusResponseId: "sr-6",
      evidenceSegments: [
        "Ini sangat membantu buat proyek analisis pasar saya"
      ],
      confidence: 78,
      reasoning: "Connected consultation to specific project but could elaborate on application",
      category: "strength"
    }
  ],

  // CSR Project Simulation Evidence
  "reviews-documents-systematically": [
    {
      behaviorId: "reviews-documents-systematically",
      stimulusResponseId: "sr-7",
      evidenceSegments: [
        "Document reviewed across 3 separate sessions",
        "Session 1: 3 minutes (initial overview)\nSession 2: 3 minutes (departmental performance)\nSession 3: 2 minutes (market analysis section)"
      ],
      confidence: 85,
      reasoning: "Demonstrated systematic approach with focused review sessions",
      category: "meet-requirement"
    }
  ],

  "identifies-key-metrics": [
    {
      behaviorId: "identifies-key-metrics",
      stimulusResponseId: "sr-7",
      evidenceSegments: [
        "12% revenue growth, Marketing ROI improvement from 3.2x to 4.1x, 8% operations cost reduction"
      ],
      confidence: 90,
      reasoning: "Extracted specific quantitative metrics from financial report",
      category: "meet-requirement"
    }
  ],

  "recognizes-business-opportunities": [
    {
      behaviorId: "recognizes-business-opportunities",
      stimulusResponseId: "sr-7",
      evidenceSegments: [
        "25% SE Asia growth potential, B2B market share opportunity"
      ],
      confidence: 83,
      reasoning: "Identified growth opportunities from financial data analysis",
      category: "strength"
    }
  ]
}

// Helper function to get evidence by stimulus-response ID
export const getEvidenceByStimulus = (stimulusResponseId: string): EnhancedAIBehaviorEvidence[] => {
  const evidence: EnhancedAIBehaviorEvidence[] = []

  Object.values(stimulusResponseEvidence).forEach(behaviorEvidence => {
    behaviorEvidence.forEach(item => {
      if (item.stimulusResponseId === stimulusResponseId) {
        evidence.push(item)
      }
    })
  })

  return evidence
}

// Helper function to get evidence by behavior ID
export const getEvidenceByBehavior = (behaviorId: string): EnhancedAIBehaviorEvidence[] => {
  return stimulusResponseEvidence[behaviorId] || []
}

// Helper function to get confidence level label
export const getConfidenceLabel = (confidence: number): 'High' | 'Medium' | 'Low' => {
  if (confidence >= 90) return 'High'
  if (confidence >= 70) return 'Medium'
  return 'Low'
}
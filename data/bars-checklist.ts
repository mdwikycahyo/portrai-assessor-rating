export interface BehavioralIndicator {
  id: string
  description: string
  level: "strength" | "meet-requirement" | "need-improvement"
}

export interface BARSChecklist {
  [keyActionId: string]: BehavioralIndicator[]
}

export const barsChecklist: BARSChecklist = {
  analisis: [
    // Strong (+) behaviors - Expanded to 12 items
    {
      id: "analisis-strong-1",
      description: "Menggunakan informasi ekonomi, keuangan, dan pasar untuk analisis mendalam",
      level: "strength",
    },
    {
      id: "analisis-strong-2",
      description: "Mengidentifikasi tren pasar dengan insight yang actionable",
      level: "strength",
    },
    {
      id: "analisis-strong-3",
      description: "Mengevaluasi peluang bisnis dengan data komprehensif",
      level: "strength",
    },
    {
      id: "analisis-strong-4",
      description: "Mengintegrasikan multiple data sources untuk strategic insights",
      level: "strength",
    },
    {
      id: "analisis-strong-5",
      description: "Menganalisis dampak ekonomi makro terhadap strategi bisnis",
      level: "strength",
    },
    // Meets Requirement (/) behaviors - Expanded to 10 items
    {
      id: "analisis-meet-1",
      description: "Membuat analisis tanpa adanya insight mendalam",
      level: "meet-requirement",
    },
    {
      id: "analisis-meet-2",
      description: "Mengumpulkan data tanpa validasi yang memadai",
      level: "meet-requirement",
    },
    {
      id: "analisis-meet-3",
      description: "Melakukan analisis dasar tanpa konteks bisnis yang luas",
      level: "meet-requirement",
    },
    {
      id: "analisis-meet-4",
      description: "Menggunakan template analisis standar tanpa customization",
      level: "meet-requirement",
    },
    {
      id: "analisis-meet-5",
      description: "Menganalisis data historis tanpa proyeksi masa depan",
      level: "meet-requirement",
    },
    // Needs Improvement (-) behaviors - Expanded to 11 items
    {
      id: "analisis-need-1",
      description: "Mengabaikan informasi penting dalam analisis",
      level: "need-improvement",
    },
    {
      id: "analisis-need-2",
      description: "Membuat kesimpulan tanpa data yang mendukung",
      level: "need-improvement",
    },
    {
      id: "analisis-need-3",
      description: "Gagal mengidentifikasi risiko atau peluang yang jelas",
      level: "need-improvement",
    },
    {
      id: "analisis-need-4",
      description: "Menggunakan data yang tidak akurat atau outdated",
      level: "need-improvement",
    },
    {
      id: "analisis-need-5",
      description: "Tidak mempertimbangkan dampak jangka panjang dalam analisis",
      level: "need-improvement",
    },
  ],
  mengintegrasikan: [
    // Strong (+) behaviors
    {
      id: "integrasi-strong-1",
      description: "Menggabungkan data dari berbagai sumber dengan efektif",
      level: "strength",
    },
    {
      id: "integrasi-strong-2",
      description: "Mengidentifikasi pola dan koneksi antar data yang kompleks",
      level: "strength",
    },
    // Meets Requirement (/) behaviors
    {
      id: "integrasi-meet-1",
      description: "Menggabungkan data dengan cara yang standar",
      level: "meet-requirement",
    },
    {
      id: "integrasi-meet-2",
      description: "Membuat koneksi dasar antar informasi",
      level: "meet-requirement",
    },
    // Needs Improvement (-) behaviors
    {
      id: "integrasi-need-1",
      description: "Gagal menghubungkan informasi yang relevan",
      level: "need-improvement",
    },
    {
      id: "integrasi-need-2",
      description: "Mengabaikan konteks yang penting dalam integrasi data",
      level: "need-improvement",
    },
  ],
}

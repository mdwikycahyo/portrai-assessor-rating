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
    {
      id: "analisis-strong-6",
      description: "Mengidentifikasi competitive advantage melalui analisis industri",
      level: "strength",
    },
    {
      id: "analisis-strong-7",
      description: "Menggunakan predictive analytics untuk forecasting bisnis",
      level: "strength",
    },
    {
      id: "analisis-strong-8",
      description: "Menghubungkan tren teknologi dengan peluang pasar baru",
      level: "strength",
    },
    {
      id: "analisis-strong-9",
      description: "Menganalisis customer behavior patterns untuk strategic planning",
      level: "strength",
    },
    {
      id: "analisis-strong-10",
      description: "Mengidentifikasi emerging markets dengan potensi tinggi",
      level: "strength",
    },
    {
      id: "analisis-strong-11",
      description: "Menggunakan scenario planning untuk risk assessment",
      level: "strength",
    },
    {
      id: "analisis-strong-12",
      description: "Menganalisis value chain untuk optimasi operasional",
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
    {
      id: "analisis-meet-6",
      description: "Membuat laporan analisis yang informatif namun tidak actionable",
      level: "meet-requirement",
    },
    {
      id: "analisis-meet-7",
      description: "Menggunakan single data source untuk analisis kompleks",
      level: "meet-requirement",
    },
    {
      id: "analisis-meet-8",
      description: "Menganalisis tren tanpa mempertimbangkan faktor eksternal",
      level: "meet-requirement",
    },
    {
      id: "analisis-meet-9",
      description: "Membuat kesimpulan berdasarkan data terbatas",
      level: "meet-requirement",
    },
    {
      id: "analisis-meet-10",
      description: "Menggunakan metodologi analisis yang sudah usang",
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
    {
      id: "analisis-need-6",
      description: "Mengabaikan feedback dari stakeholder kunci",
      level: "need-improvement",
    },
    {
      id: "analisis-need-7",
      description: "Membuat analisis yang bias tanpa objektivitas",
      level: "need-improvement",
    },
    {
      id: "analisis-need-8",
      description: "Tidak menggunakan tools analisis yang tersedia",
      level: "need-improvement",
    },
    {
      id: "analisis-need-9",
      description: "Mengabaikan competitive landscape dalam analisis",
      level: "need-improvement",
    },
    {
      id: "analisis-need-10",
      description: "Tidak melakukan cross-validation terhadap temuan",
      level: "need-improvement",
    },
    {
      id: "analisis-need-11",
      description: "Membuat rekomendasi yang tidak feasible atau realistic",
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

export interface BehavioralIndicator {
  id: string
  description: string
  level: "strength" | "meet-requirement" | "need-improvement"
}

export interface BARSChecklist {
  [keyActionId: string]: BehavioralIndicator[]
}

export const barsChecklist: BARSChecklist = {
  "menganalisis": [
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
  "mengintegrasikan": [
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
  "memahami-fungsi-bisnis": [
    // Strong (+) behaviors
    {
      id: "fungsi-bisnis-strong-1",
      description: "Mendemonstrasikan pemahaman mendalam tentang fungsi bisnis utama dan interdependensinya",
      level: "strength",
    },
    {
      id: "fungsi-bisnis-strong-2",
      description: "Mengidentifikasi peluang optimasi proses bisnis lintas departemen",
      level: "strength",
    },
    {
      id: "fungsi-bisnis-strong-3",
      description: "Menjelaskan dampak keputusan bisnis terhadap berbagai fungsi organisasi",
      level: "strength",
    },
    // Meets Requirement (/) behaviors
    {
      id: "fungsi-bisnis-meet-1",
      description: "Memahami proses bisnis dasar dalam departemen sendiri",
      level: "meet-requirement",
    },
    {
      id: "fungsi-bisnis-meet-2",
      description: "Mengenali hubungan antar departemen secara umum",
      level: "meet-requirement",
    },
    // Needs Improvement (-) behaviors
    {
      id: "fungsi-bisnis-need-1",
      description: "Menunjukkan pemahaman terbatas tentang proses bisnis organisasi",
      level: "need-improvement",
    },
    {
      id: "fungsi-bisnis-need-2",
      description: "Gagal mengidentifikasi dampak keputusan terhadap fungsi bisnis lain",
      level: "need-improvement",
    },
  ],
  "komunikasi-terbuka": [
    // Strong (+) behaviors
    {
      id: "komunikasi-strong-1",
      description: "Berkomunikasi dengan jelas dan persuasif kepada berbagai stakeholder",
      level: "strength",
    },
    {
      id: "komunikasi-strong-2",
      description: "Menyesuaikan gaya komunikasi sesuai dengan audiens dan konteks",
      level: "strength",
    },
    {
      id: "komunikasi-strong-3",
      description: "Mendengarkan secara aktif dan memberikan feedback yang konstruktif",
      level: "strength",
    },
    // Meets Requirement (/) behaviors
    {
      id: "komunikasi-meet-1",
      description: "Menyampaikan informasi dengan cara yang dapat dipahami",
      level: "meet-requirement",
    },
    {
      id: "komunikasi-meet-2",
      description: "Merespons pertanyaan dan feedback secara tepat",
      level: "meet-requirement",
    },
    // Needs Improvement (-) behaviors
    {
      id: "komunikasi-need-1",
      description: "Komunikasi kurang jelas atau sulit dipahami",
      level: "need-improvement",
    },
    {
      id: "komunikasi-need-2",
      description: "Gagal menyesuaikan komunikasi dengan audiens",
      level: "need-improvement",
    },
  ],
  "menunjukkan-kontribusi": [
    // Strong (+) behaviors
    {
      id: "kontribusi-strong-1",
      description: "Mengambil inisiatif dan memberikan solusi inovatif untuk masalah tim",
      level: "strength",
    },
    {
      id: "kontribusi-strong-2",
      description: "Berbagi pengetahuan dan expertise untuk membantu pencapaian tujuan bersama",
      level: "strength",
    },
    {
      id: "kontribusi-strong-3",
      description: "Menunjukkan kepemimpinan dalam situasi kolaboratif",
      level: "strength",
    },
    // Meets Requirement (/) behaviors
    {
      id: "kontribusi-meet-1",
      description: "Berpartisipasi aktif dalam diskusi dan aktivitas tim",
      level: "meet-requirement",
    },
    {
      id: "kontribusi-meet-2",
      description: "Menyelesaikan tugas yang diberikan dengan baik",
      level: "meet-requirement",
    },
    // Needs Improvement (-) behaviors
    {
      id: "kontribusi-need-1",
      description: "Kontribusi minimal atau pasif dalam aktivitas tim",
      level: "need-improvement",
    },
    {
      id: "kontribusi-need-2",
      description: "Menunggu instruksi tanpa mengambil inisiatif",
      level: "need-improvement",
    },
  ],
  "membangun-hubungan": [
    // Strong (+) behaviors
    {
      id: "hubungan-strong-1",
      description: "Membangun rapport dan kepercayaan dengan berbagai stakeholder",
      level: "strength",
    },
    {
      id: "hubungan-strong-2",
      description: "Menunjukkan empati dan pemahaman terhadap perspektif yang berbeda",
      level: "strength",
    },
    // Meets Requirement (/) behaviors
    {
      id: "hubungan-meet-1",
      description: "Berinteraksi dengan sopan dan profesional",
      level: "meet-requirement",
    },
    {
      id: "hubungan-meet-2",
      description: "Memelihara hubungan kerja yang positif",
      level: "meet-requirement",
    },
    // Needs Improvement (-) behaviors
    {
      id: "hubungan-need-1",
      description: "Kesulitan membangun hubungan yang efektif",
      level: "need-improvement",
    },
    {
      id: "hubungan-need-2",
      description: "Kurang peka terhadap dinamika interpersonal",
      level: "need-improvement",
    },
  ],
  "analisis-strategis": [
    // Strong (+) behaviors
    {
      id: "strategis-strong-1",
      description: "Melakukan analisis strategis yang komprehensif dan actionable",
      level: "strength",
    },
    {
      id: "strategis-strong-2",
      description: "Mengidentifikasi peluang dan risiko strategis dengan akurat",
      level: "strength",
    },
    // Meets Requirement (/) behaviors
    {
      id: "strategis-meet-1",
      description: "Melakukan analisis dasar terhadap situasi bisnis",
      level: "meet-requirement",
    },
    {
      id: "strategis-meet-2",
      description: "Mengidentifikasi faktor-faktor strategis utama",
      level: "meet-requirement",
    },
    // Needs Improvement (-) behaviors
    {
      id: "strategis-need-1",
      description: "Analisis strategis kurang mendalam atau tidak fokus",
      level: "need-improvement",
    },
    {
      id: "strategis-need-2",
      description: "Gagal mengidentifikasi implikasi strategis yang penting",
      level: "need-improvement",
    },
  ],
  "perencanaan-jangka-panjang": [
    // Strong (+) behaviors
    {
      id: "perencanaan-strong-1",
      description: "Mengembangkan rencana jangka panjang yang realistis dan terstruktur",
      level: "strength",
    },
    {
      id: "perencanaan-strong-2",
      description: "Mempertimbangkan skenario masa depan dan rencana kontingensi",
      level: "strength",
    },
    // Meets Requirement (/) behaviors
    {
      id: "perencanaan-meet-1",
      description: "Membuat rencana dengan timeline yang jelas",
      level: "meet-requirement",
    },
    {
      id: "perencanaan-meet-2",
      description: "Mempertimbangkan faktor-faktor jangka panjang dalam perencanaan",
      level: "meet-requirement",
    },
    // Needs Improvement (-) behaviors
    {
      id: "perencanaan-need-1",
      description: "Perencanaan kurang detail atau tidak realistis",
      level: "need-improvement",
    },
    {
      id: "perencanaan-need-2",
      description: "Fokus pada solusi jangka pendek tanpa mempertimbangkan dampak jangka panjang",
      level: "need-improvement",
    },
  ],
}

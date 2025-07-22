export interface Interaction {
  id: string
  type: "email" | "chat" | "document" | "chatbot" | "call" | "document-creation" // Added new type
  title: string
  fullContext: string
  timestamp: string
  participants: string[]
  activityType: string
  contextTitle: string
}

export interface KeyAction {
  id: string
  title: string
  description: string
  interactions: Interaction[]
  rating?: "need-improvement" | "meet-requirement" | "strength"
  ratingNote?: string // Added new field for assessor's note on rating
}

export interface Competency {
  id: string
  title: string
  definition: string
  keyActions: KeyAction[]
  rationale: string
}

export interface Assessment {
  participant: {
    name: string
    totalTime: string
    date: string
  }
  competencies: Competency[]
  overallSummary: string
}

// Keep Evidence interface for backward compatibility if needed elsewhere
export interface Evidence {
  id: string
  source: "email" | "chat" | "document" | "chatbot"
  contextTitle: string
  fullContext: string
  timestamp: string
  participants: string[]
  activityType: string
  isFlagged?: boolean
  assessorComment?: string
}

export const mockAssessment: Assessment = {
  participant: {
    name: "John Doe",
    totalTime: "1 Jam 30 Menit",
    date: "5 Juli 2025",
  },
  competencies: [
    {
      id: "business-acumen",
      title: "Business Acumen",
      definition:
        "Memanfaatkan pengetahuan tentang tren ekonomi, keuangan, pasar, dan industri untuk memahami serta meningkatkan hasil individu, kelompok kerja, dan/atau organisasi; menggunakan pemahaman tentang fungsi bisnis utama, tren industri, serta posisi organisasi sendiri untuk berkontribusi dalam strategi dan/atau taktik bisnis yang efektif.",
      keyActions: [
        {
          id: "analisis",
          title: "Menganalisis",
          description:
            "Menggunakan informasi ekonomi, keuangan, pasar, dan industri untuk mengidentifikasi tren, menilai strategi dan hasil bisnis saat ini, dan/atau mengevaluasi peluang bisnis tertentu; mengenali tren dan mengantisipasi dampaknya.",
          interactions: [
            {
              id: "interaction-3",
              type: "document-creation", // Changed type to document-creation
              title: "Interaksi Membuat Dokumen: Laporan Analisis Efisiensi Biaya",
              timestamp: "5 Juli 2025, 09:00",
              participants: ["John Doe"],
              activityType: "Report Writing",
              contextTitle: "Laporan Analisis Efisiensi Biaya",
              fullContext: `LAPORAN ANALISIS EFISIENSI BIAYA
Disusun oleh: John Doe
Tanggal: 4 Juli 2025

EXECUTIVE SUMMARY
Laporan ini menyajikan analisis komprehensif terhadap biaya operasional perusahaan dengan fokus pada identifikasi peluang penghematan melalui otomatisasi proses.

TEMUAN UTAMA
Berdasarkan analisis data operasional selama 6 bulan terakhir, ditemukan bahwa otomatisasi proses X dapat mengurangi pengeluaran sebesar 15% atau setara dengan penghematan Rp 2.5 miliar per tahun.

ANALISIS DETAIL
1. Proses Manual Saat Ini
 - Waktu pemrosesan: 4 jam per transaksi
 - Tingkat error: 3.2%
 - Biaya tenaga kerja: Rp 500,000 per transaksi

2. Proyeksi Otomatisasi
 - Waktu pemrosesan: 30 menit per transaksi
 - Tingkat error: 0.1%
 - Biaya sistem: Rp 50,000 per transaksi

REKOMENDASI
1. Implementasi sistem otomatisasi dalam 3 fase
2. Training tim untuk adaptasi teknologi baru
3. Monitoring dan evaluasi berkala

KESIMPULAN
Investasi dalam otomatisasi proses X akan memberikan ROI sebesar 300% dalam 18 bulan pertama.`,
            },
            {
              id: "interaction-4",
              type: "chatbot",
              title: "Interaksi AI Chatbot Assistant: Konsultasi Analisis Pasar",
              timestamp: "5 Juli 2025, 10:15", // Updated
              participants: ["John Doe", "AI Assistant"],
              activityType: "AI Consultation",
              contextTitle: "Konsultasi Analisis Pasar dengan AI",
              fullContext: `John Doe: Halo, saya lagi butuh info nih tentang cara analisis tren pasar di industri teknologi. Ada saran?

AI Assistant: Tentu! Untuk menganalisis tren pasar teknologi secara efektif, saya merekomendasikan pendekatan multi-dimensi:

1.  **Analisis Data Kuantitatif**
    -   Pantau ukuran pasar dan tingkat pertumbuhan
    -   Analisis lanskap kompetitif
    -   Lacak tingkat adopsi teknologi baru

2.  **Wawasan Kualitatif**
    -   Pola perilaku konsumen
    -   Pendapat ahli industri
    -   Dampak perubahan regulasi

John Doe: Oke, itu jelas. Tapi ada contoh alat atau kerangka kerja spesifik yang bisa saya pakai?

AI Assistant: Tentu saja! Beberapa kerangka kerja yang terbukti efektif:

**Porter's Five Forces** untuk analisis kompetitif
**PEST Analysis** untuk faktor makro-lingkungan
**Technology Adoption Lifecycle** untuk menentukan waktu masuk pasar

Untuk alat: Google Trends, laporan Gartner, CB Insights untuk ekosistem startup, dan alat pendengar sosial seperti Brandwatch.

John Doe: Nah, kalau semua data ini sudah terkumpul, gimana cara gabunginnya biar jadi insight yang benar-benar bisa dipakai?

AI Assistant: Kunci integrasinya adalah:

1.  **Triangulasi**: Validasi silang temuan dari berbagai sumber
2.  **Perencanaan Skenario**: Buat 3 skenario (optimis, realistis, pesimis)
3.  **Matriks Dampak-Probabilitas**: Prioritaskan wawasan berdasarkan potensi dampak dan kemungkinan
4.  **Siklus Tinjauan Rutin**: Perbarui analisis setiap kuartal

Yang paling penting adalah menerjemahkan data menjadi rekomendasi bisnis spesifik dengan garis waktu dan kebutuhan sumber daya yang jelas.

John Doe: Wah, makasih banyak ya! Ini sangat membantu buat proyek analisis pasar saya.

AI Assistant: Sama-sama! Senang bisa membantu. Kalau ada pertanyaan lagi, jangan sungkan ya.`,
            },
            {
              id: "interaction-1",
              type: "email",
              title: "Interaksi Email: Penanganan Krisis Klien",
              timestamp: "5 Juli 2025, 09:15",
              participants: ["Manager AI", "John Doe"],
              activityType: "Crisis Management",
              contextTitle: "Krisis Klien - Penanganan Darurat",
              fullContext: `Email Thread: Krisis Klien

Dari: Manager AI <manager@company.com>
Kepada: John Doe <john.doe@company.com>
Tanggal: 5 Juli 2025, 09:15
Subjek: URGENT - Krisis Klien PT. Jaya Abadi

John, kita ada masalah besar. Klien utama kita, PT. Jaya Abadi, melaporkan ada bug kritis di sistem kita. Tolong segera berikan rekomendasi.

---

Dari: John Doe <john.doe@company.com>
Kepada: Manager AI <manager@company.com>
Tanggal: 5 Juli 2025, 09:32
Subjek: RE: URGENT - Krisis Klien PT. Jaya Abadi

Terima kasih atas informasinya. Setelah melakukan analisis awal dari log error dan data penjualan Q3, saya melihat peluang besar untuk ekspansi ke segmen B2B. Saya merekomendasikan untuk menunda ekspansi ke segmen B2B hingga masalah ini terselesaikan.

Langkah-langkah yang saya usulkan:
1. Isolasi sistem yang bermasalah
2. Komunikasi proaktif dengan klien
3. Tim darurat untuk perbaikan dalam 2 jam

---

Dari: Manager AI <manager@company.com>
Kepada: Manager AI <manager@company.com>
Tanggal: 5 Juli 2025, 09:45
Subjek: RE: URGENT - Krisis Klien PT. Jaya Abadi

Baik, saya akan koordinasikan dengan tim teknis untuk penanganan darurat. Terima kasih atas analisis cepatnya.`,
            },
            {
              id: "interaction-2",
              type: "chat",
              title: "Interaksi Group Chat: Diskusi Strategi Produk",
              timestamp: "5 Juli 2025, 11:00",
              participants: ["John Doe", "Team Lead", "Marketing Team"],
              activityType: "Team Collaboration",
              contextTitle: "Diskusi Strategi Produk Tim",
              fullContext: `[11:00 AM] John Doe: Tim, saya baru saja meninjau laporan tren pasar terbaru. Data menunjukkan pergeseran signifikan dalam preferensi konsumen ke arah produk yang lebih ramah lingkungan.

[11:02 AM] Team Lead: Itu menarik, John. Apa implikasinya bagi kita?

[11:03 AM] Marketing Team: Setuju dengan John. Kami juga melihat tren serupa dari data customer feedback.

[11:05 AM] John Doe: Saya rasa kita harus mempertimbangkan untuk mengembangkan lini produk baru yang berfokus pada keberlanjutan. Ini bisa menjadi peluang besar untuk menangkap pangsa pasar yang sedang berkembang.

[11:06 AM] Team Lead: Bagaimana dengan timeline dan budget untuk ini?

[11:07 AM] John Doe: Berdasarkan analisis kompetitor, kita punya window 6 bulan sebelum mereka masuk ke space ini. Budget estimasi sekitar 500K untuk R&D awal.

[11:08 AM] Team Lead: Ide bagus. Mari kita jadwalkan pertemuan untuk membahas ini lebih lanjut dengan tim finance.

[11:09 AM] Marketing Team: Saya akan siapkan market research yang lebih detail untuk mendukung proposal ini.`,
            },
          ],
          rating: undefined,
          ratingNote: "", // Initialize ratingNote
        },
        {
          id: "mengintegrasikan",
          title: "Mengintegrasikan",
          description:
            "Menggabungkan data ekonomi, keuangan, pasar, dan industri dari berbagai sumber untuk mengidentifikasi isu-isu kritis; menjelaskan implikasi tren bagi departemen atau tim sendiri serta organisasi secara lebih luas.",
          interactions: [
            {
              id: "interaction-8",
              type: "document",
              title: "Interaksi Membaca Dokumen: Review Laporan Keuangan Q2",
              timestamp: "8 Juli 2025, 09:00",
              participants: ["John Doe"],
              activityType: "Document Review",
              contextTitle: "Review Laporan Keuangan Q2 2025",
              fullContext: `DOCUMENT_TITLE: Laporan Keuangan Q2 2025.pdf
DOCUMENT_OPENED: 8 Juli 2025, 09:00
DOCUMENT_CLOSED: 8 Juli 2025, 09:10
TOTAL_READING_TIME: 10 menit

DOCUMENT_CONTENT:
EXECUTIVE SUMMARY
Kuartal kedua tahun 2025 menunjukkan pertumbuhan yang solid dengan peningkatan pendapatan sebesar 12% year-over-year.

KINERJA KEUANGAN
[HIGHLIGHTED]Revenue growth 12% YoY, exceeding target by 3%[/HIGHLIGHTED]

Total pendapatan mencapai Rp 45.2 miliar, melampaui target sebesar Rp 43.8 miliar.

ANALISIS KINERJA DEPARTEMEN
Departemen Marketing menunjukkan peningkatan signifikan dalam efisiensi kampanye.
[HIGHLIGHTED]Marketing ROI improved from 3.2x to 4.1x[/HIGHLIGHTED]

Departemen Operations berhasil mengoptimalkan biaya operasional melalui inisiatif otomatisasi.
[HIGHLIGHTED]Operations cost reduced by 8% through automation[/HIGHLIGHTED]

ANALISIS EKSPANSI PASAR
Riset pasar menunjukkan potensi pertumbuhan yang menjanjikan di kawasan Asia Tenggara.
[HIGHLIGHTED]Southeast Asia market shows 25% growth potential[/HIGHLIGHTED]

Analisis kompetitor mengindikasikan adanya peluang untuk memperluas pangsa pasar di segmen B2B.
[HIGHLIGHTED]Competitor analysis indicates market share opportunity in B2B segment[/HIGHLIGHTED]

PENILAIAN RISIKO
Identifikasi risiko potensial dan strategi mitigasi untuk kuartal mendatang telah disiapkan dengan komprehensif.`,
            },
            {
              id: "interaction-7",
              type: "call",
              title: "Interaksi 1-on-1 Call: Diskusi Strategi dengan CEO",
              timestamp: "8 Juli 2025, 10:30", // Updated
              participants: ["John Doe", "CEO"],
              activityType: "Strategic Discussion",
              contextTitle: "Panggilan Strategis dengan CEO",
              fullContext: `CEO: John, terima kasih sudah menyempatkan waktu. Saya ingin membahas analisis pasar yang kamu submit minggu lalu.

John Doe: Tentu, saya senang bisa mendiskusikan ini lebih detail.

CEO: Insight tentang shift ke sustainable products sangat menarik. Tapi saya khawatir dengan timing dan resource allocation. Bagaimana kamu melihat risiko-risikonya?

John Doe: Berdasarkan analisis kompetitor dan market data, saya identifikasi 3 risiko utama: pertama, customer adoption rate yang mungkin lebih lambat dari proyeksi. Kedua, supply chain challenges untuk sustainable materials. Ketiga, initial investment yang cukup besar.

CEO: Bagaimana mitigasinya?

John Doe: Untuk customer adoption, saya recommend pilot program di 2-3 kota besar dulu untuk test market response. Untuk supply chain, kita bisa mulai partnership dengan 2-3 supplier sustainable materials sekarang. Dan untuk investment, kita bisa phase implementation dalam 3 tahap untuk spread risk.

CEO: Menarik. Berapa timeline untuk pilot program ini?

John Doe: Saya estimate 3 bulan untuk preparation, 6 bulan untuk pilot execution, dan 2 bulan untuk evaluation. Total 11 bulan sebelum full rollout decision.

CEO: Dan ROI projection-nya?

John Doe: Conservative estimate, break even di bulan ke-18, positive ROI 15-20% di tahun ketiga. Tapi ini assuming pilot program berhasil dan market response positif.

CEO: Okay, ini solid analysis. Prepare detailed proposal dengan timeline dan budget breakdown. Kita present ke board bulan depan.

John Doe: Siap, akan saya finalisasi proposal lengkapnya minggu ini.

CEO: Good. One more thing, pastikan kamu coordinate dengan Finance dan Operations team untuk validate angka-angka ini.

John Doe: Noted. Akan saya schedule meeting dengan mereka minggu ini juga.

CEO: Perfect. Thanks John, good work on this analysis.`,
            },
            {
              id: "interaction-6",
              type: "chat",
              title: "Interaksi 1-on-1 Chat: Diskusi dengan Senior Manager",
              timestamp: "8 Juli 2025, 11:00", // Updated
              participants: ["John Doe", "Senior Manager"],
              activityType: "Strategic Planning",
              contextTitle: "Diskusi Strategis dengan Senior Manager",
              fullContext: `[14:00 PM] Senior Manager: John, saya lihat proposal integrasi data yang kamu kirim. Menarik sekali.

[14:02 PM] John Doe: Terima kasih. Saya rasa dengan mengintegrasikan data dari berbagai sumber, kita bisa dapat insight yang lebih holistik untuk decision making.

[14:03 PM] Senior Manager: Setuju. Tapi bagaimana kita ensure data quality dan consistency across departments?

[14:05 PM] John Doe: Good point. Saya sudah identify beberapa potential issues:
1. Different data formats
2. Timing discrepancies
3. Definition inconsistencies

Saya propose kita establish data governance framework dulu sebelum integration.

[14:07 PM] Senior Manager: Sounds like a solid approach. What's the timeline?

[14:08 PM] John Doe: Phase 1 (Data standardization): 2 weeks
Phase 2 (Integration framework): 3 weeks  
Phase 3 (Testing & validation): 1 week

Total 6 weeks untuk full implementation.

[14:10 PM] Senior Manager: Reasonable. Let's proceed. Kamu lead initiative ini ya.

[14:11 PM] John Doe: Siap. Akan saya coordinate dengan semua stakeholders dan provide regular updates.`,
            },
          ],
          rating: undefined,
          ratingNote: "", // Initialize ratingNote
        },
      ],
      rationale: "",
    },
    {
      id: "other-competency",
      title: "Other Competency",
      definition: "Another competency definition...",
      keyActions: [
        {
          id: "key-action-3",
          title: "Sample Key Action",
          description: "Deskripsi singkat untuk Sample Key Action.",
          interactions: [], // Empty as requested
          rating: undefined,
          ratingNote: "", // Initialize ratingNote
        },
      ],
      rationale: "",
    },
  ],
  overallSummary: "",
}

// Attachment content data for documents referenced in emails

export interface AttachmentContent {
  filename: string
  title: string
  sections: {
    title: string
    content: string | string[]
  }[]
}

export const attachmentContents: { [filename: string]: AttachmentContent } = {
  "S24_Event_Proposal_2024.pdf": {
    filename: "S24_Event_Proposal_2024.pdf",
    title: "Proposal Event KTT Sustainability S24",
    sections: [
      {
        title: "Executive Summary",
        content: "Konferensi Tingkat Tinggi Sustainability 2024 (KTT S24) merupakan event terbesar di Indonesia yang membahas keberlanjutan dalam industri makanan dan minuman. Event ini akan diselenggarakan pada 15-17 Maret 2024 di Jakarta Convention Center dengan target 5.000+ peserta dari berbagai segmen industri F&B.\n\nTema utama 'Sustainable Innovation for Future Food Systems' sangat relevan dengan positioning Amboja sebagai leader dalam produk agrikultur berkelanjutan."
      },
      {
        title: "Informasi Event",
        content: [
          "Tanggal: 15-17 Maret 2024 (3 hari)",
          "Lokasi: Jakarta Convention Center - Hall A & B",
          "Target Peserta: 5.000+ decision makers industri F&B",
          "Format: Hybrid (On-site + Virtual streaming)",
          "Bahasa: Indonesia & English",
          "Ekspektasi Media Coverage: 50+ media partner nasional & internasional"
        ]
      },
      {
        title: "Profil Peserta",
        content: [
          "60% CEO, Director, VP level dari perusahaan F&B",
          "25% Manager level (Marketing, Operations, R&D)",
          "15% Government officials, NGO, dan akademisi",
          "Asal industri: Food processing (40%), Beverage (25%), Agriculture (20%), Packaging (15%)",
          "Geographic reach: Jakarta (30%), Jawa Barat (20%), Surabaya (15%), rest of Indonesia (35%)"
        ]
      },
      {
        title: "Paket Sponsorship Gold",
        content: [
          "Investment: Rp 150.000.000 (exclude PPN)",
          "Logo placement di semua material marketing (website, social media, print ads)",
          "Speaking slot 30 menit di Main Stage (prime time session)",
          "Exhibition booth 6x3 meter di area premium",
          "10 complimentary delegate passes (senilai Rp 75 juta)",
          "Dedicated session untuk product demonstration",
          "Full attendee database (5.000+ contacts dengan profiling)",
          "Branding di welcome dinner dan networking lunch",
          "Digital marketing campaign collaboration (social media mention, newsletter feature)"
        ]
      },
      {
        title: "Manfaat Strategis",
        content: "Partisipasi sebagai Gold Sponsor memberikan positioning unik sebagai thought leader dalam sustainability. Dengan fokus pada 'Sustainable Innovation', Amboja dapat showcase product portfolio yang align dengan trend conscious consumerism.\n\nOpportunity untuk networking dengan key players industri F&B, potential strategic partnerships, dan direct access ke decision makers yang selama ini sulit dijangkau melalui sales approach konvensional."
      },
      {
        title: "ROI Projection",
        content: [
          "Brand awareness: Estimated reach 50.000+ melalui digital amplification",
          "Lead generation: Target 200+ qualified leads dari booth dan networking",
          "Media exposure: Equivalent advertising value Rp 300+ juta",
          "Sales opportunity: Potential pipeline Rp 2+ miliar (conversion rate 10-15%)",
          "Partnership opportunities: 5-10 strategic partnership discussions",
          "Market intelligence: Valuable insights tentang industry trends dan competitor activities"
        ]
      },
      {
        title: "Timeline & Deliverables",
        content: [
          "Deadline konfirmasi: 15 Februari 2024",
          "Material branding submission: 1 Maret 2024",
          "Booth setup: 13-14 Maret 2024",
          "Event execution: 15-17 Maret 2024",
          "Post-event report: 31 Maret 2024",
          "Follow-up campaign: April 2024"
        ]
      },
      {
        title: "Next Steps",
        content: "Untuk melanjutkan partnership ini, kami membutuhkan:\n\n1. Konfirmasi partisipasi dari management Amboja\n2. Internal alignment terkait messaging dan positioning strategy\n3. Koordinasi dengan tim marketing untuk booth design dan collateral materials\n4. Persiapan speaking content yang align dengan expertise Amboja\n\nKami siap melakukan presentasi detail kepada stakeholder terkait untuk membahas implementasi dan customization sesuai kebutuhan Amboja."
      }
    ]
  }
}

export function getAttachmentContent(filename: string): AttachmentContent | null {
  return attachmentContents[filename] || null
}
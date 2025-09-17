import { SimulationData } from "./stimulus-response-types";

// Mock data for multiple simulations based on current interactions
// Organized by simulation rather than competency

export const mockSimulations: SimulationData[] = [
  {
    id: "business-analysis-swot",
    name: "Business Analysis (SWOT)",
    isCompleted: false,
    availableBARS: {
      "memahami-fungsi-bisnis": true,
      "menganalisis": true,
      "mengintegrasikan": true,
      "komunikasi-terbuka": true,
      "menunjukkan-kontribusi": true,
      "membangun-hubungan": true
    },
    keyActionRatings: {
      "memahami-fungsi-bisnis": {
        keyActionId: "memahami-fungsi-bisnis",
        keyActionTitle: "Memahami Fungsi dan Proses Bisnis",
        keyActionCode: "BA1",
        competencyTitle: "Business Acumen",
        aiRecommendation: "need-improvement",
        aiReasoning: "Tidak ditemukan bukti yang cukup untuk memberikan rekomendasi penilaian pada Key Action ini. Partisipan tidak menunjukkan pemahaman eksplisit tentang fungsi bisnis utama, proses organisasi, atau bagaimana berbagai departemen bekerja sama dalam interaksi yang diamati. Assessor perlu menilai berdasarkan observasi langsung atau bukti tambahan.",
        assessorNotes: "",
        isDraft: true,
        hasEvidence: false,
      },
      "menganalisis": {
        keyActionId: "menganalisis",
        keyActionTitle: "Menganalisis",
        keyActionCode: "BA2",
        competencyTitle: "Business Acumen",
        aiRecommendation: "strength",
        aiReasoning: "Partisipan menunjukkan kemampuan analitis yang sangat baik dengan melakukan analisis SWOT yang komprehensif terhadap peluang sponsorship S24. Secara sistematis mengevaluasi Kekuatan (5000+ peserta, kesesuaian industri), Kelemahan (biaya tinggi, alokasi sumber daya), Peluang (brand awareness, lead generation), dan Ancaman (ketidakpastian ROI, kehadiran kompetitor). Menggunakan data ekonomi (analisis cost-benefit) dan insight pasar untuk memberikan rekomendasi bisnis yang actionable.",
        assessorNotes: "",
        isDraft: true,
        hasEvidence: true,
      },
      "mengintegrasikan": {
        keyActionId: "mengintegrasikan",
        keyActionTitle: "Mengintegrasikan",
        keyActionCode: "BA3",
        competencyTitle: "Business Acumen",
        aiRecommendation: "strength",
        aiReasoning: "Partisipan berhasil mengintegrasikan data dari berbagai sumber termasuk dokumen proposal event, riset pasar, dan feedback stakeholder untuk membentuk penilaian bisnis yang komprehensif. Menghubungkan implikasi finansial dengan positioning strategis, mengintegrasikan insight tim marketing dengan pertimbangan operasional, dan mensintesis perspektif cross-functional untuk mengidentifikasi faktor-faktor keputusan kritis bagi kesuksesan organisasi.",
        assessorNotes: "",
        isDraft: true,
        hasEvidence: true,
      },
      "komunikasi-terbuka": {
        keyActionId: "komunikasi-terbuka",
        keyActionTitle: "Komunikasi Terbuka",
        keyActionCode: "EC1",
        competencyTitle: "Establishing Collaboration",
        aiRecommendation: "strength",
        aiReasoning: "Partisipan menunjukkan komunikasi yang jelas dan persuasif melalui berbagai saluran. Secara efektif mengartikulasikan temuan analisis bisnis yang kompleks kepada berbagai stakeholder, menyesuaikan gaya komunikasi untuk audiens yang berbeda (production manager vs tim marketing), memberikan respons yang terstruktur dan beralasan, serta menjaga transparansi tentang proses analisis dan persyaratan timeline.",
        assessorNotes: "",
        isDraft: true,
        hasEvidence: true,
      },
      "menunjukkan-kontribusi": {
        keyActionId: "menunjukkan-kontribusi",
        keyActionTitle: "Menunjukkan Kontribusi",
        keyActionCode: "EC2",
        competencyTitle: "Establishing Collaboration",
        aiRecommendation: "meet-requirement",
        aiReasoning: "Partisipan menunjukkan perilaku kolaboratif yang baik dengan secara proaktif melibatkan tim marketing untuk perencanaan implementasi dan memberikan analisis yang menyeluruh ketika diminta. Namun, kontribusi sebagian besar bersifat reaktif daripada proaktif - merespons permintaan dengan baik tetapi tidak memulai aktivitas bernilai tambah atau mengambil kepemimpinan dalam mendorong kolaborasi lebih jauh dari lingkup yang ditugaskan.",
        assessorNotes: "",
        isDraft: true,
        hasEvidence: true,
      },
      "membangun-hubungan": {
        keyActionId: "membangun-hubungan",
        keyActionTitle: "Membangun Hubungan",
        keyActionCode: "EC3",
        competencyTitle: "Establishing Collaboration",
        aiRecommendation: "need-improvement",
        aiReasoning: "Tidak ditemukan bukti yang cukup untuk memberikan rekomendasi penilaian pada Key Action ini. Dalam interaksi yang diamati, partisipan tidak menunjukkan upaya khusus untuk membangun hubungan kerja yang positif, menunjukkan empati, atau memahami perspektif yang berbeda dari rekan kerja. Assessor perlu menilai berdasarkan observasi langsung atau bukti tambahan.",
        assessorNotes: "",
        isDraft: true,
        hasEvidence: false,
      },
    },
    stimulusResponseChains: [
      {
        id: "sr-1",
        chronologicalOrder: 1,
        isExpanded: false,
        aiActor: {
          name: "Nero Atlas",
          role: "Production Manager of Food Processing",
          content: "Multi-bubble chat conversation about S24 sponsorship opportunity", // Legacy fallback
          communicationType: "chat",
          chatMessages: [
            {
              id: "msg-1",
              sender: "ai",
              content: "Hai! Saya punya ide menarik tentang sponsorship event S24. Event ini cukup besar dan bisa jadi peluang bagus untuk brand awareness kita. Gimana pendapat kamu? Apakah kita bisa explore lebih lanjut untuk sponsorship ini?",
              timestamp: "09:15",
              type: "text"
            },
            {
              id: "msg-2",
              sender: "participant",
              content: "Wah ide menarik nih Nero! Saya akan coba baca dokumennya dulu ya sebelum kasih pendapat yang lebih detail",
              timestamp: "09:18",
              type: "text"
            },
            {
              id: "msg-3",
              sender: "ai",
              content: "Perfect! Dokumen proposal event S24 ada di shared folder ya. File nya \"S24_Event_Proposal_2024.pdf\". Silakan review dulu, nanti kita diskusi lebih lanjut 👍",
              timestamp: "09:19",
              type: "document-link"
            },
            {
              id: "msg-4",
              sender: "participant",
              content: "Oke sudah saya baca proposalnya. Event ini memiliki potensi yang sangat baik! Ratusan peserta dari berbagai industry akan memberikan brand exposure yang luas. Saya rasa ini align dengan target dari Tim Marketing kita tahun ini. Layak untuk di-explore lebih jauh.",
              timestamp: "09:42",
              type: "text"
            },
            {
              id: "msg-5",
              sender: "ai",
              content: "Great analysis! Kalau gitu saya forward proposal ini ke team marketing untuk review lebih detail ya. Makasih banyak ya, Pak! 🙌",
              timestamp: "09:44",
              type: "text"
            }
          ]
        },
        participantActions: [
          {
            type: "chat",
            description: "Engaged in multi-turn chat discussion about sponsorship opportunity",
            duration: 30,
            content:
              "Participated in dynamic chat conversation: acknowledged opportunity → requested time to review documentation → provided thoughtful analysis after reading proposal → supported moving forward with marketing team review",
          },
        ],
        identifiedBARS: [
          {
            category: "strength",
            behaviorId: "analisis-strong-3",
            description: "Mengevaluasi peluang bisnis dengan data komprehensif",
            evidence:
              "Quickly identified potential value in S24 event during chat conversation",
            highlightedSegments: [
              {
                messageId: "msg-4",
                startIndex: 46,
                endIndex: 120,
                text: "potensi yang sangat baik! Ratusan peserta dari berbagai industry akan memberikan brand exposure yang luas"
              }
            ]
          },
          {
            category: "strength",
            behaviorId: "seeks-additional-information",
            description: "Menggunakan informasi ekonomi, keuangan, dan pasar untuk analisis mendalam",
            evidence:
              "Requested time to review documentation before providing opinion",
            highlightedSegments: [
              {
                messageId: "msg-2",
                startIndex: 25,
                endIndex: 98,
                text: "Saya akan coba baca dokumennya dulu ya sebelum kasih pendapat yang lebih detail"
              }
            ]
          },
          {
            category: "strength",
            behaviorId: "strategic-alignment-thinking",
            description: "Mengintegrasikan multiple data sources untuk strategic insights",
            evidence:
              "Linked event opportunity to company's strategic goals",
            highlightedSegments: [
              {
                messageId: "msg-4",
                startIndex: 138,
                endIndex: 197,
                text: "align dengan target dari Tim Marketing kita tahun ini"
              }
            ]
          },
        ],
      },
      {
        id: "sr-2",
        chronologicalOrder: 2,
        isExpanded: false,
        aiActor: {
          name: "Nero Atlas",
          role: "Production Manager of Food Processing",
          communicationType: "email",
          content: "Subject: Peluang Sponsorship KTT S24", // Legacy fallback
          emailMessages: [
            {
              id: "email-1",
              sender: "ai",
              subject: "Peluang Sponsorship KTT S24",
              content: "Dear John,\n\nTerima kasih atas inisiatif dan informasi awal yang sangat menarik terkait peluang sponsorship di KTT S24.\n\nSecara sekilas, positioning kita lewat produk agrikultur memang tampak sangat relevan dengan tema keberlanjutan yang diusung. Kami sangat terbuka untuk mengeksplorasi ide ini lebih lanjut.\n\nAgar kami bisa menilai potensi bisnisnya secara lebih konkret, bolehkah dibagikan pandangan dari sisi Anda mengenai manfaat strategis sponsorship ini untuk Amboja, khususnya jika dibandingkan dengan pengajuan produk lain atau pendekatan promosi lain?\n\nKami tunggu insight-nya, Terima kasih!\n\nSalam,\nNero Atlas\nProduction Manager of Food Processing",
              timestamp: "10:30",
              type: "new",
              attachments: ["S24_Event_Proposal_2024.pdf"]
            }
          ]
        },
        participantActions: [
          {
            type: "email",
            description: "Read and analyzed formal sponsorship proposal",
            duration: 8,
            content:
              "Email reviewed thoroughly, noted key details: 5000+ F&B industry attendees, Gold Sponsor package Rp 150M, comprehensive benefits including speaking slot and exhibition booth. Ready to provide analysis to marketing team.",
          },
        ],
        identifiedBARS: [],
      },
      {
        id: "sr-3",
        chronologicalOrder: 3,
        isExpanded: false,
        aiActor: {
          name: "Neo Lunama",
          role: "GM of Marketing",
          communicationType: "email",
          content: "Subject: Re: Proposal Sponsorship Event S24", // Legacy fallback
          emailMessages: [
            {
              id: "email-2",
              sender: "ai",
              subject: "Re: Proposal Sponsorship Event S24",
              content: "Hi John,\n\nSaya sudah review usulan sponsorship S24 dari Nero. Secara umum, event ini menarik karena target audiencenya sesuai dengan pasar kita.\n\nBeberapa pertanyaan dari sisi marketing:\n1. Apakah proyeksi ROI sudah dihitung?\n2. Bagaimana perbandingan dengan sponsorship event lain tahun ini?\n3. Timeline persiapan untuk speaking slot dan booth?\n\nSaya butuh input analisis dari Anda untuk pengambilan keputusan. Terutama terkait analisis cost-benefit dan strategic alignment dengan business goals kita tahun ini.\n\nTerima kasih,\nNeo Lunama\nGM of Marketing",
              timestamp: "14:15",
              type: "reply",
              replyTo: "email-1"
            },
            {
              id: "email-3",
              sender: "participant",
              subject: "Re: Proposal Sponsorship Event S24 - Business Analysis",
              content: "Hi Neo,\n\nTerima kasih atas review-nya. Saya sudah melakukan analisis mendalam terkait usulan sponsorship S24. Berikut analisis saya:\n\nKEKUATAN (STRENGTHS):\n- Target audience sangat sesuai dengan pasar agrikultur berkelanjutan\n- Brand exposure komprehensif melalui berbagai platform event\n- Opportunity untuk membangun database leads berkualitas\n- Positioning sebagai leader dalam sustainability di sektor F&B\n\nKELEMAHAN (WEAKNESSES):\n- Investasi yang cukup besar memerlukan budget preparation\n- Timeline persiapan yang ketat untuk booth setup dan speaking preparation\n- Keterbatasan resource internal untuk optimalisasi event presence\n\nPELUANG (OPPORTUNITIES):\n- Market penetration ke segmen baru industri agrikultur berkelanjutan\n- Networking dengan potential partners dan key customers\n- Thought leadership positioning melalui speaking slot\n- Cross-selling opportunity dengan produk lini lainnya\n\nANCAMAN (THREATS):\n- Kompetitor besar mungkin juga melakukan sponsorship di event yang sama\n- ROI measurement challenge khususnya untuk brand awareness\n- Potential overshadowing oleh sponsor dengan budget lebih besar\n\nREKOMENDASI:\nSaya merekomendasikan untuk melanjutkan dengan catatan:\n1. Secure speaking topic yang align dengan product innovation Amboja\n2. Design booth experience yang memorable dan interaktif\n3. Set clear KPI untuk lead generation (target 200+ qualified leads)\n4. Develop pre-event campaign untuk maximize visibility\n\nProyeksi ROI: Break-even jika berhasil convert 15 leads menjadi customer (average deal size Rp 10M)\n\nSiap untuk diskusi lebih detail jika diperlukan.\n\nBest regards,\nJohn",
              timestamp: "16:40",
              type: "reply",
              replyTo: "email-2"
            }
          ]
        },
        participantActions: [
          {
            type: "email",
            description: "Provided comprehensive SWOT analysis response via email thread",
            duration: 25,
            content:
              "Responded to Neo's marketing questions with detailed SWOT analysis, ROI projections, and strategic recommendations. Email included structured analysis with clear categorization and actionable insights.",
          },
        ],
        identifiedBARS: [
          {
            category: "strength",
            behaviorId: "analisis-strong-1",
            description: "Menggunakan informasi ekonomi, keuangan, dan pasar untuk analisis mendalam",
            evidence:
              "Provided detailed Strengths, Weaknesses, Opportunities, Threats analysis with specific metrics",
            highlightedSegments: [
              {
                messageId: "email-3",
                startIndex: 150,
                endIndex: 310,
                text: "KEKUATAN (STRENGTHS):\n- Target audience sangat sesuai dengan pasar agrikultur berkelanjutan\n- Brand exposure komprehensif melalui berbagai platform event"
              },
              {
                messageId: "email-3",
                startIndex: 432,
                endIndex: 580,
                text: "KELEMAHAN (WEAKNESSES):\n- Investasi yang cukup besar memerlukan budget preparation\n- Timeline persiapan yang ketat untuk booth setup dan speaking preparation"
              }
            ]
          },
          {
            category: "strength",
            behaviorId: "provides-strategic-recommendations",
            description: "Memberikan rekomendasi strategis berbasis analisis mendalam",
            evidence:
              "Delivered actionable recommendations with KPIs and ROI calculations",
            highlightedSegments: [
              {
                messageId: "email-3",
                startIndex: 1050,
                endIndex: 1280,
                text: "REKOMENDASI:\nSaya merekomendasikan untuk melanjutkan dengan catatan:\n1. Secure speaking topic yang align dengan product innovation Amboja\n2. Design booth experience yang memorable dan interaktif\n3. Set clear KPI untuk lead generation (target 200+ qualified leads)"
              }
            ]
          },
          {
            category: "strength",
            behaviorId: "quantifies-business-impact",
            description: "Mengukur dampak finansial dari setiap keputusan bisnis",
            evidence:
              "Calculated break-even point (15 leads, Rp 10M average deal size)",
            highlightedSegments: [
              {
                messageId: "email-3",
                startIndex: 1340,
                endIndex: 1440,
                text: "Proyeksi ROI: Break-even jika berhasil convert 15 leads menjadi customer (average deal size Rp 10M)"
              }
            ]
          },
        ],
      },
      {
        id: "sr-4",
        chronologicalOrder: 4,
        isExpanded: false,
        aiActor: {
          name: "Neo Lunama",
          role: "GM of Marketing",
          communicationType: "email",
          content: "Subject: Re: Proposal Sponsorship Event S24 - Business Analysis", // Legacy fallback
          emailMessages: [
            {
              id: "email-4",
              sender: "ai",
              subject: "Re: Proposal Sponsorship Event S24 - Business Analysis",
              content: "John,\n\nAnalisis yang excellent! Framework SWOT yang Anda gunakan sangat membantu untuk pengambilan keputusan. Saya sangat menghargai kalkulasi ROI yang detail dan rekomendasi strategis yang diberikan.\n\nBerdasarkan analisis Anda, saya akan melanjutkan dengan approval untuk sponsorship ini. Namun sebelum finalisasi, bisakah Anda berdiskusi dengan Chia dari team marketing untuk detail implementasi? Terutama terkait booth design dan strategi lead generation.\n\nHal ini akan membantu kita untuk execute dengan lebih optimal.\n\nTerima kasih atas kerja keras yang luar biasa!\nNeo Lunama\nGM of Marketing",
              timestamp: "17:20",
              type: "reply",
              replyTo: "email-3"
            },
            {
              id: "email-5",
              sender: "participant",
              subject: "Re: Proposal Sponsorship Event S24 - Next Steps",
              content: "Hi Neo,\n\nTerima kasih atas approval-nya! Senang sekali analisis saya bisa membantu proses pengambilan keputusan.\n\nSaya akan segera berkoordinasi dengan Chia untuk membahas detail implementasi, khususnya:\n- Strategi booth design untuk memaksimalkan engagement\n- Mekanisme lead generation dan proses kualifikasi\n- Koordinasi timeline untuk persiapan event\n- Pengembangan pre-event campaign strategy\n\nSaya akan terus memberikan update perkembangan secara berkala.\n\nBest regards,\nJohn",
              timestamp: "17:45",
              type: "reply",
              replyTo: "email-4"
            }
          ]
        },
        participantActions: [
          {
            type: "email",
            description: "Acknowledged approval and coordinated next steps via email reply",
            duration: 3,
            content:
              "Responded promptly to approval with gratitude and proactive coordination plan. Outlined specific implementation areas and committed to progress updates.",
          },
        ],
        identifiedBARS: [
          {
            category: "strength",
            behaviorId: "kontribusi-strong-1",
            description: "Mengambil inisiatif dan memberikan solusi inovatif untuk masalah tim",
            evidence:
              "Proactively coordinated with marketing team for implementation planning",
            highlightedSegments: [
              {
                messageId: "email-5",
                startIndex: 120,
                endIndex: 280,
                text: "Saya akan segera berkoordinasi dengan Chia untuk membahas detail implementasi, khususnya:\n- Strategi booth design untuk memaksimalkan engagement\n- Mekanisme lead generation dan proses kualifikasi"
              }
            ]
          },
          {
            category: "meet-requirement",
            behaviorId: "acknowledges-leadership-decisions",
            description: "Mendukung keputusan manajemen dengan konstruktif",
            evidence:
              "Professional acknowledgment of approval with commitment to next steps",
            highlightedSegments: [
              {
                messageId: "email-5",
                startIndex: 30,
                endIndex: 115,
                text: "Terima kasih atas approval-nya! Senang sekali analisis saya bisa membantu proses pengambilan keputusan."
              },
              {
                messageId: "email-5",
                startIndex: 370,
                endIndex: 440,
                text: "Saya akan terus memberikan update perkembangan secara berkala."
              }
            ]
          },
        ],
      },
      {
        id: "sr-5",
        chronologicalOrder: 5,
        isExpanded: false,
        aiActor: {
          name: "Chia Breppo",
          role: "Team Member Marketing",
          communicationType: "chat",
          content: "Halo! Dalam rangka pengkajian Branding Amboja...", // Legacy fallback
          chatMessages: [
            {
              id: "msg-6",
              sender: "ai",
              content: "Halo! \n\nDalam rangka pengkajian Branding Amboja, kami dari tim Marketing ingin mendapatkan masukkan/input dari Anda. Terdapat beberapa hal yang akan saya tanyakan, apakah Anda berkenan?",
              timestamp: "14:30",
              type: "text"
            },
            {
              id: "msg-7",
              sender: "participant",
              content: "Halo Chia! Tentu saja, saya sangat berkenan untuk memberikan input terkait pengkajian Branding Amboja.\n\nSebagai bagian dari tim yang terlibat dalam berbagai aspek bisnis, saya memahami betapa pentingnya brand positioning yang tepat untuk mendukung strategi jangka panjang perusahaan, terutama di era sustainability seperti sekarang.\n\nBeberapa area yang bisa saya kontribusikan:\n- Perspektif operasional dan implementasi program\n- Insight tentang customer touchpoint dan market response\n- Analisis competitive landscape dari sudut pandang business development\n- Evaluasi brand alignment dengan product innovation roadmap\n\nKapan waktu yang tepat untuk sesi diskusi ini?",
              timestamp: "14:35",
              type: "text"
            }
          ]
        },
        participantActions: [
          {
            type: "chat",
            description: "Professional engagement in branding consultation discussion",
            duration: 5,
            content:
              "Responded positively to branding consultation request with strategic insights and willingness to contribute across multiple business areas. Demonstrated understanding of brand positioning importance and offered comprehensive perspective on operational, customer, and competitive aspects.",
          },
        ],
        identifiedBARS: [
          {
            category: "strength",
            behaviorId: "komunikasi-strong-1",
            description: "Berkomunikasi dengan jelas dan persuasif kepada berbagai stakeholder",
            evidence:
              "Demonstrated understanding of brand positioning importance and its impact on long-term strategy",
            highlightedSegments: [
              {
                messageId: "msg-7",
                startIndex: 115,
                endIndex: 265,
                text: "saya memahami betapa pentingnya brand positioning yang tepat untuk mendukung strategi jangka panjang perusahaan, terutama di era sustainability seperti sekarang"
              }
            ]
          },
          {
            category: "strength",
            behaviorId: "offers-comprehensive-perspective",
            description: "Memberikan perspektif komprehensif lintas berbagai aspek bisnis",
            evidence:
              "Offered comprehensive input across operational, customer, competitive, and innovation aspects",
            highlightedSegments: [
              {
                messageId: "msg-7",
                startIndex: 315,
                endIndex: 580,
                text: "Beberapa area yang bisa saya kontribusikan:\n- Perspektif operasional dan implementasi program\n- Insight tentang customer touchpoint dan market response\n- Analisis competitive landscape dari sudut pandang business development\n- Evaluasi brand alignment dengan product innovation roadmap"
              }
            ]
          },
          {
            category: "meet-requirement",
            behaviorId: "shows-collaborative-willingness",
            description: "Menunjukkan kesiapan berkolaborasi dan memberikan kontribusi",
            evidence:
              "Expressed willingness to participate and contribute to branding consultation process",
            highlightedSegments: [
              {
                messageId: "msg-7",
                startIndex: 30,
                endIndex: 110,
                text: "saya sangat berkenan untuk memberikan input terkait pengkajian Branding Amboja"
              },
              {
                messageId: "msg-7",
                startIndex: 585,
                endIndex: 635,
                text: "Kapan waktu yang tepat untuk sesi diskusi ini?"
              }
            ]
          },
        ],
      },
    ],
  },
  {
    id: "simulasi-lainnya",
    name: "Simulasi Lainnya",
    isCompleted: false,
    availableBARS: {
      "memahami-fungsi-bisnis": true,
      "menganalisis": true,
      "komunikasi-terbuka": true,
      "menunjukkan-kontribusi": true
    },
    keyActionRatings: {
      "memahami-fungsi-bisnis": {
        keyActionId: "memahami-fungsi-bisnis",
        keyActionTitle: "Memahami Fungsi dan Proses Bisnis",
        keyActionCode: "BA1",
        competencyTitle: "Business Acumen",
        aiRecommendation: "meet-requirement",
        aiReasoning: "Partisipan menunjukkan pemahaman yang memadai terhadap proses bisnis melalui kemampuan mengikuti instruksi kerja, membaca dan memproses dokumen dengan tepat, serta menyelesaikan tugas sesuai dengan prosedur yang ditetapkan. Namun, belum menunjukkan pemahaman strategis yang mendalam tentang bagaimana fungsi bisnis saling terhubung.",
        assessorNotes: "",
        isDraft: true,
        hasEvidence: true,
      },
      "menganalisis": {
        keyActionId: "menganalisis",
        keyActionTitle: "Menganalisis",
        keyActionCode: "BA2",
        competencyTitle: "Business Acumen",
        aiRecommendation: "meet-requirement",
        aiReasoning: "Partisipan mampu memproses informasi dari berbagai sumber dan mengintegrasikannya ke dalam dokumen kerja. Menunjukkan kemampuan analitis dasar dalam merespons instruksi dan menyesuaikan output sesuai kebutuhan. Perlu pengembangan lebih lanjut dalam analisis strategis dan evaluasi dampak bisnis.",
        assessorNotes: "",
        isDraft: true,
        hasEvidence: true,
      },
      "komunikasi-terbuka": {
        keyActionId: "komunikasi-terbuka",
        keyActionTitle: "Komunikasi Terbuka",
        keyActionCode: "EC1",
        competencyTitle: "Establishing Collaboration",
        aiRecommendation: "strength",
        aiReasoning: "Partisipan menunjukkan kemampuan komunikasi yang sangat baik melalui berbagai saluran - email, voice call, dan dokumen tertulis. Komunikasi jelas, responsif, dan sesuai dengan konteks profesional. Mampu menyesuaikan gaya komunikasi berdasarkan medium yang digunakan (formal di email, interaktif di voice call).",
        assessorNotes: "",
        isDraft: true,
        hasEvidence: true,
      },
      "menunjukkan-kontribusi": {
        keyActionId: "menunjukkan-kontribusi",
        keyActionTitle: "Menunjukkan Kontribusi",
        keyActionCode: "EC2",
        competencyTitle: "Establishing Collaboration",
        aiRecommendation: "strength",
        aiReasoning: "Partisipan secara konsisten memberikan kontribusi melalui penyelesaian tugas tepat waktu, pembuatan dokumen berkualitas, dan partisipasi aktif dalam komunikasi multi-channel. Menunjukkan inisiatif dalam memastikan deliverable selesai sesuai ekspektasi dan siap berkolaborasi melalui berbagai platform komunikasi.",
        assessorNotes: "",
        isDraft: true,
        hasEvidence: true,
      },
    },
    stimulusResponseChains: [
      {
        id: "sr-6",
        chronologicalOrder: 1,
        isExpanded: false,
        aiActor: {
          name: "Maya Sari",
          role: "Project Manager",
          communicationType: "email",
          content: "Subject: Tugas Analisis Pasar Q4 2024",
          emailMessages: [
            {
              id: "email-task-1",
              sender: "ai",
              subject: "Tugas Analisis Pasar Q4 2024",
              content: "Dear John,\n\nSaya memerlukan bantuan Anda untuk menyelesaikan analisis pasar Q4 2024. Berikut adalah tugas yang perlu dikerjakan:\n\n1. Silakan baca dokumen \"Market_Analysis_Template_Q4.docx\" yang saya lampirkan\n2. Buatlah dokumen analisis baru berdasarkan template tersebut dengan fokus pada tren industri teknologi\n3. Balas email ini dengan melampirkan dokumen analisis yang sudah Anda buat\n\nDeadline: Hari ini sebelum jam 17:00\n\nTerima kasih atas bantuannya!\n\nBest regards,\nMaya Sari\nProject Manager",
              timestamp: "09:00",
              type: "new",
              attachments: ["Market_Analysis_Template_Q4.docx"]
            }
          ]
        },
        participantActions: [
          {
            type: "email",
            description: "Received and read project assignment email with instructions and template attachment",
            duration: 3,
            content: "Membaca email tugas dari Maya Sari, memahami instruksi untuk membaca template, membuat dokumen analisis baru, dan membalas email dengan attachment. Mencatat deadline jam 17:00.",
          },
        ],
        identifiedBARS: [
          {
            category: "meet-requirement",
            behaviorId: "understands-task-requirements",
            description: "Memahami instruksi dan persyaratan tugas dengan jelas",
            evidence: "Successfully processed multi-step task instructions including reading, creating, and responding requirements",
            highlightedSegments: []
          },
        ],
      },
      {
        id: "sr-7",
        chronologicalOrder: 2,
        isExpanded: false,
        aiActor: {
          name: "Document System",
          role: "System",
          communicationType: "document",
          content: "Market Analysis Template Q4 - Document Reading and Creation Task"
        },
        participantActions: [
          {
            type: "document",
            description: "Read the Market_Analysis_Template_Q4.docx to understand the required structure and format",
            duration: 8,
            content: "Membaca template analisis pasar Q4, mempelajari struktur yang dibutuhkan: Executive Summary, Market Overview, Technology Trends, Competitive Analysis, Recommendations. Memahami format dan kriteria yang harus dipenuhi.",
          },
          {
            type: "document-creation",
            description: "Created comprehensive market analysis document based on template requirements",
            duration: 25,
            content: "Membuat dokumen \"Market_Analysis_Q4_2024_Tech_Industry.docx\" dengan isi: Executive Summary tentang pertumbuhan industri teknologi, Market Overview dengan data pasar Q4, Technology Trends focusing pada AI dan automation, Competitive Analysis dari pemain utama, dan Recommendations untuk strategi Q1 2025.",
          },
        ],
        identifiedBARS: [
          {
            category: "strength",
            behaviorId: "processes-information-effectively",
            description: "Memproses informasi dari berbagai sumber dengan efektif",
            evidence: "Effectively processed template requirements and created comprehensive analysis document following specified structure",
            highlightedSegments: []
          },
          {
            category: "strength",
            behaviorId: "demonstrates-attention-to-detail",
            description: "Menunjukkan perhatian terhadap detail dan kualitas output",
            evidence: "Created detailed document following template structure with comprehensive sections and professional formatting",
            highlightedSegments: []
          },
        ],
      },
      {
        id: "sr-8",
        chronologicalOrder: 3,
        isExpanded: false,
        aiActor: {
          name: "Maya Sari",
          role: "Project Manager",
          communicationType: "email",
          content: "Subject: Re: Tugas Analisis Pasar Q4 2024",
          emailMessages: [
            {
              id: "email-reply-1",
              sender: "participant",
              subject: "Re: Tugas Analisis Pasar Q4 2024",
              content: "Dear Maya,\n\nTerima kasih atas tugasnya. Saya sudah menyelesaikan analisis pasar Q4 2024 dengan fokus pada industri teknologi sesuai dengan template yang diberikan.\n\nDokumen yang saya lampirkan mencakup:\n- Executive Summary dengan highlight key findings\n- Market Overview dengan data terkini Q4 2024\n- Technology Trends analysis focusing pada AI, automation, dan emerging technologies\n- Competitive Analysis dari major players\n- Strategic Recommendations untuk Q1 2025\n\nSaya harap analisis ini sesuai dengan ekspektasi. Jika ada bagian yang perlu diperbaiki atau diperjelas, silakan beritahu saya.\n\nBest regards,\nJohn",
              timestamp: "14:30",
              type: "reply",
              replyTo: "email-task-1",
              attachments: ["Market_Analysis_Q4_2024_Tech_Industry.docx"]
            }
          ]
        },
        participantActions: [
          {
            type: "email",
            description: "Replied to Maya's email with completed analysis document attached",
            duration: 7,
            content: "Mengirim balasan email ke Maya Sari dengan melampirkan dokumen analisis pasar yang sudah selesai dibuat. Email berisi ringkasan isi dokumen dan menawarkan perbaikan jika diperlukan.",
          },
        ],
        identifiedBARS: [
          {
            category: "strength",
            behaviorId: "provides-clear-communication",
            description: "Memberikan komunikasi yang jelas dan profesional",
            evidence: "Sent clear and professional email response with comprehensive summary of deliverable content",
            highlightedSegments: [
              {
                messageId: "email-reply-1",
                startIndex: 85,
                endIndex: 200,
                text: "Dokumen yang saya lampirkan mencakup:\n- Executive Summary dengan highlight key findings\n- Market Overview dengan data terkini Q4 2024"
              }
            ]
          },
          {
            category: "strength",
            behaviorId: "shows-proactive-collaboration",
            description: "Menunjukkan kolaborasi proaktif dan responsif",
            evidence: "Proactively offered to make improvements if needed and provided detailed breakdown of deliverable",
            highlightedSegments: [
              {
                messageId: "email-reply-1",
                startIndex: 450,
                endIndex: 550,
                text: "Jika ada bagian yang perlu diperbaiki atau diperjelas, silakan beritahu saya"
              }
            ]
          },
        ],
      },
      {
        id: "sr-9",
        chronologicalOrder: 4,
        isExpanded: false,
        aiActor: {
          name: "Alex Rahman",
          role: "Senior Analyst",
          communicationType: "chat",
          content: "Voice call request for market analysis discussion",
          chatMessages: [
            {
              id: "msg-call-1",
              sender: "ai",
              content: "Halo John! Saya Alex dari tim Senior Analyst. Saya sudah lihat hasil analisis pasar Q4 yang Anda buat - impressive work! 👏",
              timestamp: "15:45",
              type: "text"
            },
            {
              id: "msg-call-2",
              sender: "ai",
              content: "Ada beberapa insights yang ingin saya diskusikan lebih detail dengan Anda, terutama terkait competitive analysis dan recommendations. Bisa kita voice call sekarang selama 15-20 menit?",
              timestamp: "15:46",
              type: "text"
            },
            {
              id: "msg-call-3",
              sender: "participant",
              content: "Halo Alex! Terima kasih atas feedback positifnya. Saya siap untuk voice call sekarang untuk membahas lebih detail. Mari kita mulai!",
              timestamp: "15:47",
              type: "text"
            }
          ]
        },
        participantActions: [
          {
            type: "chat",
            description: "Responded positively to voice call request from Senior Analyst",
            duration: 2,
            content: "Merespons permintaan voice call dari Alex Rahman untuk membahas hasil analisis pasar. Menunjukkan kesiapan dan kesediaan untuk berdiskusi.",
          },
        ],
        identifiedBARS: [
          {
            category: "strength",
            behaviorId: "shows-openness-to-feedback",
            description: "Menunjukkan keterbukaan terhadap feedback dan diskusi",
            evidence: "Positively responded to senior analyst's feedback and request for detailed discussion",
            highlightedSegments: [
              {
                messageId: "msg-call-3",
                startIndex: 30,
                endIndex: 120,
                text: "Terima kasih atas feedback positifnya. Saya siap untuk voice call sekarang untuk membahas lebih detail"
              }
            ]
          },
        ],
      },
      {
        id: "sr-10",
        chronologicalOrder: 5,
        isExpanded: false,
        aiActor: {
          name: "Alex Rahman",
          role: "Senior Analyst",
          communicationType: "call",
          content: "Voice call discussion about market analysis findings and strategic recommendations",
          callMessages: [
            {
              id: "call-1",
              speaker: "Alex Rahman",
              content: "Halo John! Terima kasih sudah bisa voice call. Saya sudah review analisis pasar Q4 yang Anda kirim tadi. Overall hasilnya impressive!",
              timestamp: "15:50"
            },
            {
              id: "call-2",
              speaker: "John Doe",
              content: "Halo Alex! Terima kasih atas feedback positifnya. Saya senang bisa diskusi lebih detail tentang findings-nya.",
              timestamp: "15:50"
            },
            {
              id: "call-3",
              speaker: "Alex Rahman",
              content: "Ada beberapa insights yang menarik, terutama terkait competitive analysis dan technology trends. Bisa kita bahas lebih detail bagian competitive landscape-nya?",
              timestamp: "15:51"
            },
            {
              id: "call-4",
              speaker: "John Doe",
              content: "Tentu! Dari analisis yang saya lakukan, ada 3 kompetitor utama yang perlu diperhatikan. Pertama, TechCorp yang baru saja launch produk AI-powered solution. Kedua, InnovateLab dengan strategi pricing yang agresif. Dan ketiga, StartupX yang fokus pada niche market tapi growing rapidly.",
              timestamp: "15:51"
            },
            {
              id: "call-5",
              speaker: "Alex Rahman",
              content: "Menarik. Bagaimana impact dari technology trends yang Anda identify terhadap posisi kita di market?",
              timestamp: "15:52"
            },
            {
              id: "call-6",
              speaker: "John Doe",
              content: "Berdasarkan research, ada 2 major trends yang akan significantly impact market landscape. AI integration akan jadi table stakes dalam 18-24 bulan ke depan. Dan sustainability initiatives akan jadi key differentiator untuk customer decision making.",
              timestamp: "15:53"
            },
            {
              id: "call-7",
              speaker: "Alex Rahman",
              content: "Strategic recommendations-nya bagaimana untuk address trends ini?",
              timestamp: "15:54"
            },
            {
              id: "call-8",
              speaker: "John Doe",
              content: "Saya recommend 3 strategic actions. Pertama, accelerate AI capability development melalui partnership atau acquisition. Kedua, strengthen sustainability positioning dengan clear roadmap dan measurable targets. Ketiga, enhance customer experience dengan personalization yang leverage AI insights.",
              timestamp: "15:54"
            },
            {
              id: "call-9",
              speaker: "Alex Rahman",
              content: "Timeline untuk implementation recommendations ini realistic nggak menurut Anda?",
              timestamp: "15:55"
            },
            {
              id: "call-10",
              speaker: "John Doe",
              content: "Untuk AI integration, saya estimate 12-15 bulan untuk MVP, 24 bulan untuk full implementation. Sustainability roadmap bisa kita launch dalam 6 bulan dengan quick wins, comprehensive program dalam 18 bulan. Customer experience enhancement bisa phased approach, 3-6 bulan untuk initial improvements.",
              timestamp: "15:56"
            },
            {
              id: "call-11",
              speaker: "Alex Rahman",
              content: "Budget estimation untuk initiatives ini sudah ada?",
              timestamp: "15:57"
            },
            {
              id: "call-12",
              speaker: "John Doe",
              content: "Rough estimation, AI development sekitar 15-20% dari annual R&D budget. Sustainability program 8-10% dari operational budget. Customer experience enhancement bisa leverage existing infrastructure, jadi estimated additional 5-7% dari marketing budget.",
              timestamp: "15:58"
            },
            {
              id: "call-13",
              speaker: "Alex Rahman",
              content: "Good analysis John. Satu hal lagi, alignment dengan company strategic direction bagaimana?",
              timestamp: "15:59"
            },
            {
              id: "call-14",
              speaker: "John Doe",
              content: "Semua recommendations ini aligned dengan our 3-year strategic plan, especially focus pada digital transformation dan market expansion. AI dan sustainability initiatives akan support core objectives untuk market leadership dan operational excellence.",
              timestamp: "16:00"
            },
            {
              id: "call-15",
              speaker: "Alex Rahman",
              content: "Perfect! Ini sangat comprehensive analysis. Saya akan forward findings ini ke leadership team untuk review lebih lanjut. Thanks untuk insightful discussion!",
              timestamp: "16:01"
            },
            {
              id: "call-16",
              speaker: "John Doe",
              content: "Sama-sama Alex! Senang bisa berbagi insights dan dapat feedback dari senior analyst perspective. Kalau ada follow-up questions, feel free to reach out.",
              timestamp: "16:01"
            },
            {
              id: "call-17",
              speaker: "Alex Rahman",
              content: "Will do! Good work on this, John. Have a great day!",
              timestamp: "16:02"
            },
            {
              id: "call-18",
              speaker: "John Doe",
              content: "Thank you Alex, you too!",
              timestamp: "16:02"
            }
          ]
        },
        participantActions: [
          {
            type: "call",
            description: "Conducted 18-minute voice call discussion about market analysis with Senior Analyst",
            duration: 18,
            content: "Melakukan voice call dengan Alex Rahman membahas detail analisis pasar Q4. Diskusi mencakup: validasi competitive analysis findings, elaborasi technology trends impact, refinement pada strategic recommendations, dan alignment dengan company strategic direction. Memberikan clarifications dan menerima insights tambahan dari senior analyst perspective.",
          },
        ],
        identifiedBARS: [
          {
            category: "strength",
            behaviorId: "engages-in-meaningful-dialogue",
            description: "Terlibat dalam dialog yang bermakna dan konstruktif",
            evidence: "Successfully conducted detailed voice discussion covering multiple aspects of market analysis with senior stakeholder",
            highlightedSegments: []
          },
          {
            category: "strength",
            behaviorId: "demonstrates-subject-matter-expertise",
            description: "Menunjukkan keahlian dan pemahaman mendalam terhadap materi",
            evidence: "Able to provide clarifications and engage in strategic discussion about market analysis findings and recommendations",
            highlightedSegments: []
          },
          {
            category: "strength",
            behaviorId: "collaborates-across-different-communication-channels",
            description: "Berkolaborasi efektif melalui berbagai saluran komunikasi",
            evidence: "Successfully collaborated through email, chat, and voice call maintaining consistent professional communication",
            highlightedSegments: []
          },
        ],
      },
    ],
  },
];

// Helper function to get simulation by ID
export const getSimulationById = (
  simulationId: string
): SimulationData | undefined => {
  return mockSimulations.find((sim) => sim.id === simulationId);
};

// Helper function to get all simulation names
export const getSimulationNames = (): string[] => {
  return mockSimulations.map((sim) => sim.name);
};

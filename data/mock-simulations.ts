import { SimulationData } from "./stimulus-response-types";

// Mock data for multiple simulations based on current interactions
// Organized by simulation rather than competency

export const mockSimulations: SimulationData[] = [
  {
    id: "business-analysis",
    name: "Business Analysis (SWOT)",
    isCompleted: false,
    availableBARS: {},
    keyActionRating: {
      aiRecommendation: "strength",
      aiReasoning:
        "Participant demonstrates excellent SWOT analysis skills through systematic evaluation of sponsorship opportunity. Shows strong stakeholder engagement, strategic thinking, and collaborative decision-making approach with cross-functional teams.",
      assessorNotes: "",
      isDraft: true,
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
            behaviorId: "recognizes-business-opportunities",
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
        identifiedBARS: [
          {
            category: "meet-requirement",
            behaviorId: "processes-formal-communications",
            description: "Membaca dan memahami komunikasi formal dari stakeholder",
            evidence:
              "Successfully read and processed formal email communication from Production Manager regarding sponsorship opportunity",
          },
        ],
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
            behaviorId: "conducts-comprehensive-swot-analysis",
            description: "Menggunakan framework analisis strategis (SWOT, Porter, dll)",
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
            behaviorId: "facilitates-cross-functional-collaboration",
            description: "Memfasilitasi kolaborasi lintas fungsi dengan efektif",
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
            behaviorId: "demonstrates-strategic-thinking",
            description: "Menunjukkan pemahaman strategis tentang brand positioning dan dampak bisnis",
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
    id: "platform-underutilization",
    name: "Platform Underutilization",
    isCompleted: false,
    availableBARS: {},
    keyActionRating: {
      aiRecommendation: "meet-requirement",
      aiReasoning:
        "Participant shows good initiative in seeking information and using available resources. Demonstrates learning mindset and practical application of frameworks. Could improve by showing more independent research before consultation.",
      assessorNotes: "",
      isDraft: true,
    },
    stimulusResponseChains: [
      {
        id: "sr-6",
        chronologicalOrder: 1,
        isExpanded: false,
        aiActor: {
          name: "AI Assistant",
          role: "AI Chatbot Assistant",
          communicationType: "chat",
          content:
            "Halo! Saya AI Assistant yang siap membantu analisis dan konsultasi bisnis. Ada yang bisa saya bantu hari ini?",
        },
        participantActions: [
          {
            type: "chat",
            description:
              "Consulted AI assistant about market analysis methodologies",
            duration: 15,
            content:
              "Halo, saya lagi butuh info nih tentang cara analisis tren pasar di industri teknologi. Ada saran?\n\nOke, itu jelas. Tapi ada contoh alat atau kerangka kerja spesifik yang bisa saya pakai?\n\nNah, kalau semua data ini sudah terkumpul, gimana cara gabunginnya biar jadi insight yang benar-benar bisa dipakai?\n\nWah, makasih banyak ya! Ini sangat membantu buat proyek analisis pasar saya.",
          },
        ],
        identifiedBARS: [
          {
            category: "meet-requirement",
            behaviorId: "seeks-expert-guidance",
            description: "Menggunakan AI tools untuk analisis mendalam",
            evidence:
              "Proactively consulted AI assistant for market analysis methodology",
          },
          {
            category: "meet-requirement",
            behaviorId: "asks-specific-questions",
            description: "Mengajukan pertanyaan spesifik untuk mendapat insight",
            evidence:
              "Asked targeted questions about tools, frameworks, and data integration",
          },
          {
            category: "strength",
            behaviorId: "applies-learning-to-project",
            description: "Menerapkan learning dari berbagai sumber untuk project context",
            evidence:
              "Connected advice to specific market analysis project needs",
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

"use client"

import { useState, useEffect, useMemo } from "react"
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  ChevronLeft,
  Save,
  Mail,
  MessageCircle,
  FileText,
  Bot,
  Phone,
} from "lucide-react"
import { mockAssessment, type Assessment, type Interaction, type KeyAction } from "../../../data/mock-assessment"
import { mockParticipants } from "../../../data/mock-participants"
import { ContextModal } from "../../../components/context-modal"
import { InteractionDetailPanel } from "../../../components/interaction-detail-panel"
import { AssessorSidebar } from "../../../components/assessor-sidebar"
import { AssessorHeader } from "../../../components/assessor-header"
import Link from "next/link"
import { useParams } from "next/navigation"
import { barsChecklist } from "../../../data/bars-checklist"

export default function RatingPage() {
  const params = useParams()
  const participantId = params.id as string

  const [assessment, setAssessment] = useState<Assessment>(mockAssessment)
  const [expandedCompetencies, setExpandedCompetencies] = useState<string[]>(["business-acumen"])
  const [selectedContextEvidence, setSelectedContextEvidence] = useState<Interaction | null>(null)
  const [barsSelections, setBarsSelections] = useState<{
    [keyActionId: string]: { [interactionId: string]: { [behaviorId: string]: boolean } }
  }>({})
  const [activeBarsTab, setActiveBarsTab] = useState<{
    [keyActionId: string]: "strength" | "meet-requirement" | "need-improvement"
  }>({})
  const [currentAIHighlights, setCurrentAIHighlights] = useState<{ [interactionId: string]: string[] }>({})

  const [isAIEnabled, setIsAIEnabled] = useState(true)

  // Simulated AI-generated summaries for demonstration - only used in Opsi 2
  const aiSummaries = {
    analisis: {
      overview:
        "AI telah menganalisis interaksi peserta dan mengidentifikasi perilaku kunci berikut yang relevan dengan Key Action ini:",
      strength: [
        "Peserta menunjukkan kemampuan analisis strategis dengan mengajukan pertanyaan mendalam tentang tren pasar teknologi dan meminta kerangka kerja spesifik untuk implementasi",
        "Mendemonstrasikan kemampuan mengidentifikasi peluang bisnis berdasarkan data penjualan Q3 dan mengusulkan strategi ekspansi B2B dengan pertimbangan timeline yang matang",
        "Mengintegrasikan multiple data sources untuk menghasilkan insight yang actionable, termasuk analisis kompetitor dan proyeksi budget untuk R&D",
      ],
      meetRequirement: [
        "Melakukan analisis dasar terhadap biaya operasional dengan fokus pada identifikasi peluang penghematan melalui otomatisasi proses",
      ],
      needsImprovement: [],
    },
    mengintegrasikan: {
      overview:
        "AI telah menganalisis interaksi peserta dan mengidentifikasi perilaku kunci berikut yang relevan dengan Key Action ini:",
      strength: [
        "Peserta menunjukkan kemampuan integrasi data yang kuat dengan menggabungkan insight dari berbagai departemen (Marketing, Operations, Finance) untuk membuat proposal yang komprehensif",
        "Mendemonstrasikan kemampuan mengidentifikasi pola dan koneksi antar data yang kompleks, termasuk analisis risiko dan strategi mitigasi yang matang",
      ],
      meetRequirement: [
        "Menggabungkan data dari laporan keuangan Q2 dengan cara yang standar untuk mengidentifikasi tren pertumbuhan dan peluang pasar",
      ],
      needsImprovement: [],
    },
  }

  // AI evidence mapping - only used in Opsi 2
  const aiBehaviorEvidence: {
    [behaviorId: string]: { interactionId: string; segments: string[] }[]
  } = {
    "analisis-strong-1": [
      {
        interactionId: "interaction-1",
        segments: [
          "Setelah melakukan analisis awal dari log error dan data penjualan Q3, saya melihat peluang besar untuk ekspansi ke segmen B2B",
        ],
      },
      {
        interactionId: "interaction-2",
        segments: [
          "Data menunjukkan pergeseran signifikan dalam preferensi konsumen ke arah produk yang lebih ramah lingkungan",
          "Saya rasa kita harus mempertimbangkan untuk mengembangkan lini produk baru yang berfokus pada keberlanjutan.",
        ],
      },
    ],
    "analisis-strong-2": [
      {
        interactionId: "interaction-4",
        segments: [
          "Untuk menganalisis tren pasar teknologi secara efektif, saya merekomendasikan pendekatan multi-dimensi",
          "Porter's Five Forces untuk analisis kompetitif",
          "PEST Analysis untuk faktor makro-lingkungan",
          "Technology Adoption Lifecycle untuk menentukan waktu masuk pasar",
        ],
      },
      {
        interactionId: "interaction-2",
        segments: [
          "Berdasarkan analisis kompetitor, kita punya window 6 bulan sebelum mereka masuk ke space ini. Budget estimasi sekitar 500K untuk R&D awal.",
        ],
      },
    ],
    "analisis-strong-4": [
      {
        interactionId: "interaction-2",
        segments: [
          "Tim, saya baru saja meninjau laporan tren pasar terbaru. Data menunjukkan pergeseran signifikan dalam preferensi konsumen ke arah produk yang lebih ramah lingkungan.",
          "Saya rasa kita harus mempertimbangkan untuk mengembangkan lini produk baru yang berfokus pada keberlanjutan. Ini bisa menjadi peluang besar untuk menangkap pangsa pasar yang sedang berkembang.",
        ],
      },
      {
        interactionId: "interaction-4",
        segments: [
          "Kunci integrasinya adalah: 1. Triangulasi: Validasi silang temuan dari berbagai sumber 2. Perencanaan Skenario: Buat 3 skenario (optimis, realistis, pesimis) 3. Matriks Dampak-Probabilitas: Prioritaskan wawasan berdasarkan potensi dampak dan kemungkinan",
        ],
      },
    ],
    "analisis-meet-3": [
      {
        interactionId: "interaction-3",
        segments: [
          "Laporan ini menyajikan analisis komprehensif terhadap biaya operasional perusahaan dengan fokus pada identifikasi peluang penghematan melalui otomatisasi proses X dapat mengurangi pengeluaran sebesar 15% atau setara dengan penghematan Rp 2.5 miliar per tahun.",
          "Investasi dalam otomatisasi proses X akan memberikan ROI sebesar 300% dalam 18 bulan pertama.",
        ],
      },
    ],
    "integrasi-strong-1": [
      {
        interactionId: "interaction-7",
        segments: [
          "Berdasarkan analisis kompetitor dan market data, saya identifikasi 3 risiko utama: pertama, customer adoption rate yang mungkin lebih lambat dari proyeksi. Kedua, supply chain challenges untuk sustainable materials. Ketiga, initial investment yang cukup besar.",
          "Untuk customer adoption, saya recommend pilot program di 2-3 kota besar dulu untuk test market response. Untuk supply chain, kita bisa mulai partnership dengan 2-3 supplier sustainable materials sekarang. Dan untuk investment, kita bisa phase implementation dalam 3 tahap untuk spread risk.",
        ],
      },
      {
        interactionId: "interaction-6",
        segments: [
          "Saya sudah identify beberapa potential issues: 1. Different data formats 2. Timing discrepancies 3. Definition inconsistencies Saya propose kita establish data governance framework dulu sebelum integration.",
        ],
      },
    ],
    "integrasi-strong-2": [
      {
        interactionId: "interaction-7",
        segments: [
          "Berdasarkan analisis kompetitor dan market data, saya identifikasi 3 risiko utama: pertama, customer adoption rate yang mungkin lebih lambat dari proyeksi. Kedua, supply chain challenges untuk sustainable materials. Ketiga, initial investment yang cukup besar.",
          "Untuk customer adoption, saya recommend pilot program di 2-3 kota besar dulu untuk test market response. Untuk supply chain, kita bisa mulai partnership dengan 2-3 supplier sustainable materials sekarang. Dan untuk investment, kita bisa phase implementation dalam 3 tahap untuk spread risk.",
        ],
      },
    ],
    "integrasi-meet-1": [
      {
        interactionId: "interaction-8",
        segments: [
          "Revenue growth 12% YoY, exceeding target by 3%",
          "Marketing ROI improved from 3.2x to 4.1x",
          "Operations cost reduced by 8% through automation",
          "Southeast Asia market shows 25% growth potential",
          "Competitor analysis indicates market share opportunity in B2B segment",
        ],
      },
    ],
  }

  // Get participant info
  const participant = mockParticipants.find((p) => p.id === participantId)

  useEffect(() => {
    if (participant) {
      setAssessment((prev) => ({
        ...prev,
        participant: {
          name: participant.name,
          totalTime: "1 Jam 30 Menit",
          date: participant.assessmentDate,
        },
      }))
    }
  }, [participant])

  const toggleCompetency = (competencyId: string) => {
    setExpandedCompetencies((prev) =>
      prev.includes(competencyId) ? prev.filter((id) => id !== competencyId) : [...prev, competencyId],
    )
  }

  const updateKeyActionRatingNote = (competencyId: string, keyActionId: string, note: string) => {
    setAssessment((prev) => ({
      ...prev,
      competencies: prev.competencies.map((comp) =>
        comp.id === competencyId
          ? {
              ...comp,
              keyActions: comp.keyActions.map((ka) => (ka.id === keyActionId ? { ...ka, ratingNote: note } : ka)),
            }
          : comp,
      ),
    }))
  }

  const updateCompetencyRationale = (competencyId: string, rationale: string) => {
    setAssessment((prev) => ({
      ...prev,
      competencies: prev.competencies.map((comp) => (comp.id === competencyId ? { ...comp, rationale } : comp)),
    }))
  }

  const updateOverallSummary = (summary: string) => {
    setAssessment((prev) => ({ ...prev, overallSummary: summary }))
  }

  const saveKeyAction = (competencyId: string, keyActionId: string) => {
    console.log("Saving key action:", { competencyId, keyActionId })
    alert("Key Action saved successfully!")
  }

  const saveRationale = (competencyId: string, rationale: string) => {
    console.log(`Saving rationale for ${competencyId}:`, rationale)
    alert("Rationale saved successfully!")
  }

  const handleBarsSelection = (keyActionId: string, interactionId: string, behaviorId: string, checked: boolean) => {
    setBarsSelections((prev) => ({
      ...prev,
      [keyActionId]: {
        ...prev[keyActionId],
        [interactionId]: {
          ...prev[keyActionId]?.[interactionId],
          [behaviorId]: checked,
        },
      },
    }))
  }

  // Algorithm to derive rating from BARS selections
  const deriveRating = useMemo(() => {
    return (keyActionId: string): KeyAction["rating"] | "Belum Dinilai" => {
      const keyActionSelections = barsSelections[keyActionId] || {}
      const behaviors = barsChecklist[keyActionId] || []

      let totalScore = 0

      Object.values(keyActionSelections).forEach((interactionSelections) => {
        Object.entries(interactionSelections).forEach(([behaviorId, isSelected]) => {
          if (isSelected) {
            const behavior = behaviors.find((b) => b.id === behaviorId)
            if (behavior) {
              switch (behavior.level) {
                case "strength":
                  totalScore += 2
                  break
                case "meet-requirement":
                  totalScore += 1
                  break
                case "need-improvement":
                  totalScore -= 1
                  break
              }
            }
          }
        })
      })

      if (totalScore >= 4) return "strength"
      if (totalScore >= 1) return "meet-requirement"
      if (totalScore < 0) return "need-improvement"
      return "Belum Dinilai"
    }
  }, [barsSelections])

  const getRatingLabel = (rating: KeyAction["rating"] | "Belum Dinilai") => {
    switch (rating) {
      case "strength":
        return <span className="text-green-600 font-bold">Strength (+)</span>
      case "meet-requirement":
        return <span className="text-yellow-600 font-bold">Meet Requirement (/)</span>
      case "need-improvement":
        return <span className="text-red-600 font-bold">Needs Improvement (-)</span>
      case "Belum Dinilai":
      default:
        return <span className="text-gray-500 font-bold">Belum Dinilai</span>
    }
  }

  // Helper function to get interaction type icon
  const getInteractionIcon = (type: Interaction["type"]) => {
    switch (type) {
      case "email":
        return <Mail size={20} className="text-blue-600" />
      case "chat":
        return <MessageCircle size={20} className="text-green-600" />
      case "document":
        return <FileText size={20} className="text-purple-600" />
      case "document-creation":
        return <FileText size={20} className="text-gray-600" />
      case "chatbot":
        return <Bot size={20} className="text-orange-600" />
      case "call":
        return <Phone size={20} className="text-indigo-600" />
      default:
        return <FileText size={20} className="text-gray-600" />
    }
  }

  const getInteractionTypeLabel = (type: Interaction["type"]) => {
    switch (type) {
      case "email":
        return "Email"
      case "chat":
        return "Chat"
      case "document":
        return "Dokumen"
      case "document-creation":
        return "Membuat Dokumen"
      case "chatbot":
        return "AI Chatbot"
      case "call":
        return "Call"
      default:
        return "Dokumen"
    }
  }

  // Function to handle "Lihat Bukti" click - only available in AI mode
  const handleLihatBukti = (behaviorId: string, allInteractions: Interaction[]) => {
    const evidenceForBehavior = aiBehaviorEvidence[behaviorId]
    if (!evidenceForBehavior || evidenceForBehavior.length === 0) {
      setSelectedContextEvidence(null)
      setCurrentAIHighlights({})
      return
    }

    // Filter interactions to only include those with evidence for this behavior
    const relevantInteractionIds = new Set(evidenceForBehavior.map((e) => e.interactionId))
    const filteredInteractions = allInteractions.filter((interaction) => relevantInteractionIds.has(interaction.id))

    // Construct highlights object for the panel
    const highlights: { [interactionId: string]: string[] } = {}
    evidenceForBehavior.forEach((evidence) => {
      highlights[evidence.interactionId] = evidence.segments
    })

    setCurrentAIHighlights(highlights)
    if (filteredInteractions.length > 0) {
      setSelectedContextEvidence(filteredInteractions[0])
    } else {
      setSelectedContextEvidence(null)
    }
  }

  // Function to handle viewing raw interaction data
  const handleViewInteraction = (interaction: Interaction) => {
    setSelectedContextEvidence(interaction)

    // In AI mode, show all AI highlights for this interaction's Key Action
    if (isAIEnabled) {
      // Find which Key Action this interaction belongs to
      const parentKeyAction = assessment.competencies
        .flatMap((comp) => comp.keyActions)
        .find((ka) => ka.interactions.some((int) => int.id === interaction.id))

      if (parentKeyAction) {
        // Construct highlights for all behaviors in this Key Action
        const allHighlights: { [interactionId: string]: string[] } = {}

        Object.entries(aiBehaviorEvidence).forEach(([behaviorId, evidenceList]) => {
          // Check if this behavior belongs to the current Key Action
          const behaviorExists = barsChecklist[parentKeyAction.id]?.some((b) => b.id === behaviorId)
          if (behaviorExists) {
            evidenceList.forEach((evidence) => {
              if (!allHighlights[evidence.interactionId]) {
                allHighlights[evidence.interactionId] = []
              }
              allHighlights[evidence.interactionId].push(...evidence.segments)
            })
          }
        })

        setCurrentAIHighlights(allHighlights)
      } else {
        setCurrentAIHighlights({})
      }
    } else {
      // In manual mode, no highlights
      setCurrentAIHighlights({})
    }
  }

  // Function to get "Diamati x kali" count - tracks assessor confirmations
  const getObservedCount = (keyActionId: string, behaviorId: string): number => {
    const keyActionSelections = barsSelections[keyActionId] || {}
    let count = 0

    Object.values(keyActionSelections).forEach((interactionSelections) => {
      if (interactionSelections[behaviorId]) {
        count++
      }
    })

    return count
  }

  // Check if behavior has AI evidence (only used in AI mode)
  const hasAIEvidence = (behaviorId: string): boolean => {
    return isAIEnabled && aiBehaviorEvidence[behaviorId] && aiBehaviorEvidence[behaviorId].length > 0
  }

  if (!participant) {
    return <div>Participant not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AssessorSidebar />

      <div className="pl-24">
        <AssessorHeader />

        <div className="flex items-center gap-4 my-4">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Assessment Rating</h1>
        </div>

        {/* Assessment Mode Toggle */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-1">
            <div className="flex">
              <button
                onClick={() => setIsAIEnabled(false)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  !isAIEnabled
                    ? "bg-slate-700 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Opsi 1: Penilaian Manual
              </button>
              <button
                onClick={() => setIsAIEnabled(true)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  isAIEnabled
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                Opsi 2: Penilaian Dibantu AI
              </button>
            </div>
          </div>
        </div>

        {/* Split-Pane Layout */}
        <div className="flex gap-6 h-[calc(100vh-200px)]">
          <div className={`${selectedContextEvidence ? "w-2/3" : "w-full"} transition-all duration-300`}>
            <div className="p-6 bg-white border border-gray-200 rounded-lg h-full overflow-y-auto">
              <div className="mb-8 flex justify-between items-center">
                <p className="text-gray-600">
                  Disusun dari data simulasi untuk memberikan gambaran komprehensif terhadap kompetensi peserta.
                </p>
              </div>

              {/* Assessment Summary Card */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
                <div className="bg-slate-800 text-white p-6 rounded-t-lg">
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-gray-300 text-sm">Peserta</div>
                      <div className="text-xl font-semibold">{assessment.participant.name}</div>
                    </div>
                    <div>
                      <div className="text-gray-300 text-sm">Perusahaan</div>
                      <div className="text-xl font-semibold">{participant.company}</div>
                    </div>
                    <div>
                      <div className="text-gray-300 text-sm">Tanggal Asesmen</div>
                      <div className="text-xl font-semibold">{assessment.participant.date}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competencies Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Penilaian Kompetensi</h2>
                  <p className="text-gray-600 mb-6">
                    Evaluasi setiap kompetensi berdasarkan bukti perilaku yang terdeteksi.
                  </p>

                  <div className="space-y-4">
                    {assessment.competencies.map((competency, index) => (
                      <div key={competency.id} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleCompetency(competency.id)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                              {index + 1}
                            </div>
                            <span className="font-medium text-lg text-gray-900">{competency.title}</span>
                          </div>
                          {expandedCompetencies.includes(competency.id) ? (
                            <ChevronUp className="text-gray-400" />
                          ) : (
                            <ChevronDown className="text-gray-400" />
                          )}
                        </button>

                        {expandedCompetencies.includes(competency.id) && (
                          <div className="border-t border-gray-200 p-6">
                            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                              <p className="text-blue-800">{competency.definition}</p>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Actions</h3>
                            <div className="space-y-6">
                              {competency.keyActions.map((keyAction, keyActionIndex) => (
                                <div
                                  key={keyAction.id}
                                  className="bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm"
                                >
                                  <h4 className="font-medium mb-6 text-black text-lg">
                                    Key Action {keyActionIndex + 1}:{" "}
                                    <span className="font-bold">{keyAction.title}</span> <br />
                                    <span className="text-base font-normal text-gray-600">{keyAction.description}</span>
                                  </h4>

                                  {/* Always show DATA SIMULASI YANG TERSEDIA section */}
                                  {keyAction.interactions.length > 0 && (
                                    <div className="mb-6">
                                      <h5 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                                        DATA SIMULASI YANG TERSEDIA:
                                      </h5>
                                      <div className="space-y-3">
                                        {keyAction.interactions.map((interaction) => (
                                          <div
                                            key={interaction.id}
                                            className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                                              selectedContextEvidence?.id === interaction.id
                                                ? "bg-blue-100 border-blue-500 shadow-md"
                                                : "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300"
                                            }`}
                                          >
                                            <div className="flex-1">
                                              <div className="flex items-center gap-3 mb-1">
                                                {getInteractionIcon(interaction.type)}
                                                <h6 className="font-medium text-blue-900">
                                                  Interaksi {getInteractionTypeLabel(interaction.type)}:{" "}
                                                  {interaction.simulationName}
                                                </h6>
                                              </div>
                                            </div>
                                            <button
                                              onClick={() => handleViewInteraction(interaction)}
                                              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                                selectedContextEvidence?.id === interaction.id
                                                  ? "bg-blue-600 text-white"
                                                  : "bg-blue-600 text-white hover:bg-blue-700"
                                              }`}
                                            >
                                              {selectedContextEvidence?.id === interaction.id
                                                ? "Sedang Dibuka"
                                                : "Lihat Data Simulasi"}
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* AI Summary Section - Only in Opsi 2 */}
                                  {isAIEnabled && keyAction.interactions.length > 0 && (
                                    <div className="mb-6">
                                      <h5 className="text-sm font-medium text-gray-700 mb-3 tracking-wide flex items-center gap-2">
                                        <Sparkles size={16} className="text-blue-500" />
                                        Ringkasan Temuan Evidence oleh AI:
                                      </h5>
                                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                                        <div className="flex items-start mb-4">
                                          <div className="flex-1">
                                            {aiSummaries[keyAction.id as keyof typeof aiSummaries] && (
                                              <div className="space-y-4">
                                                {aiSummaries[keyAction.id as keyof typeof aiSummaries].strength.length >
                                                  0 && (
                                                  <div>
                                                    <h6 className="font-semibold text-green-800 mb-2">
                                                      🟢 Kekuatan Ditemukan (Strength):
                                                    </h6>
                                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                                      {aiSummaries[
                                                        keyAction.id as keyof typeof aiSummaries
                                                      ].strength.map((item, index) => (
                                                        <li
                                                          key={index}
                                                          className="text-blue-800 text-sm leading-relaxed"
                                                        >
                                                          {item}
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </div>
                                                )}

                                                {aiSummaries[keyAction.id as keyof typeof aiSummaries].meetRequirement
                                                  .length > 0 && (
                                                  <div>
                                                    <h6 className="font-semibold text-yellow-800 mb-2">
                                                      🟡 Memenuhi Persyaratan (Meet Requirement):
                                                    </h6>
                                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                                      {aiSummaries[
                                                        keyAction.id as keyof typeof aiSummaries
                                                      ].meetRequirement.map((item, index) => (
                                                        <li
                                                          key={index}
                                                          className="text-blue-800 text-sm leading-relaxed"
                                                        >
                                                          {item}
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </div>
                                                )}

                                                {aiSummaries[keyAction.id as keyof typeof aiSummaries].needsImprovement
                                                  .length > 0 && (
                                                  <div>
                                                    <h6 className="font-semibold text-red-800 mb-2">
                                                      🔴 Area untuk Peningkatan (Needs Improvement):
                                                    </h6>
                                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                                      {aiSummaries[
                                                        keyAction.id as keyof typeof aiSummaries
                                                      ].needsImprovement.map((item, index) => (
                                                        <li
                                                          key={index}
                                                          className="text-blue-800 text-sm leading-relaxed"
                                                        >
                                                          {item}
                                                        </li>
                                                      ))}
                                                    </ul>
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* BARS Checklist Section */}
                                  {keyAction.interactions.length > 0 && barsChecklist[keyAction.id] && (
                                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
                                      <div className="flex items-center gap-2 mb-4">
                                        <h5 className="font-semibold text-slate-800">
                                          BARS (Behaviorally Anchored Rating Scale) Checklist:
                                        </h5>
                                      </div>
                                      <p className="text-sm text-slate-600 mb-6">
                                        {!isAIEnabled
                                          ? "Centang perilaku yang ditunjukkan peserta berdasarkan review manual Anda terhadap data simulasi."
                                          : "Centang perilaku yang ditunjukkan peserta. Item dengan tombol 'Lihat Bukti' telah diidentifikasi oleh AI."}
                                      </p>

                                      {/* Horizontal Tabs */}
                                      <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg">
                                        {[
                                          { key: "strength", label: "Strength (+)", color: "green" },
                                          { key: "meet-requirement", label: "Meet Requirement (/)", color: "yellow" },
                                          { key: "need-improvement", label: "Needs Improvement (-)", color: "red" },
                                        ].map((tab) => (
                                          <button
                                            key={tab.key}
                                            onClick={() =>
                                              setActiveBarsTab((prev) => ({
                                                ...prev,
                                                [keyAction.id]: tab.key as
                                                  | "strength"
                                                  | "meet-requirement"
                                                  | "need-improvement",
                                              }))
                                            }
                                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                              (activeBarsTab[keyAction.id] || "strength") === tab.key
                                                ? `bg-${tab.color}-100 text-${tab.color}-800 border border-${tab.color}-300`
                                                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                            }`}
                                          >
                                            {tab.label}
                                          </button>
                                        ))}
                                      </div>

                                      {/* Tab Content */}
                                      <div className="space-y-3">
                                        {barsChecklist[keyAction.id]
                                          .filter(
                                            (behavior) =>
                                              behavior.level === (activeBarsTab[keyAction.id] || "strength"),
                                          )
                                          .map((behavior) => {
                                            const observedCount = getObservedCount(keyAction.id, behavior.id)
                                            const hasEvidence = hasAIEvidence(behavior.id)

                                            const isCheckedForCurrentInteraction =
                                              selectedContextEvidence &&
                                              barsSelections[keyAction.id]?.[selectedContextEvidence.id]?.[behavior.id]

                                            const tabColor =
                                              activeBarsTab[keyAction.id] === "strength"
                                                ? "green"
                                                : activeBarsTab[keyAction.id] === "meet-requirement"
                                                  ? "yellow"
                                                  : "red"

                                            return (
                                              <div
                                                key={behavior.id}
                                                className={`flex items-start gap-3 p-3 rounded-md border transition-all bg-white border-${tabColor}-200`}
                                              >
                                                <div className="flex items-center gap-2">
                                                  <input
                                                    type="checkbox"
                                                    id={behavior.id}
                                                    checked={isCheckedForCurrentInteraction || false}
                                                    disabled={!selectedContextEvidence}
                                                    onChange={(e) => {
                                                      if (selectedContextEvidence) {
                                                        handleBarsSelection(
                                                          keyAction.id,
                                                          selectedContextEvidence.id,
                                                          behavior.id,
                                                          e.target.checked,
                                                        )
                                                      }
                                                    }}
                                                    className={`w-4 h-4 border-gray-300 rounded focus:ring-2 transition-colors text-${tabColor}-600 focus:ring-${tabColor}-500 disabled:opacity-50`}
                                                  />
                                                  <div
                                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                      observedCount > 0
                                                        ? `bg-${tabColor}-600 text-white`
                                                        : "bg-gray-200 text-gray-500"
                                                    }`}
                                                  >
                                                    {observedCount}
                                                  </div>
                                                </div>
                                                <div className="flex-1">
                                                  <div className="text-sm text-gray-800">{behavior.description}</div>
                                                  {/* AI suggestion label - separate from observed count */}
                                                  {hasEvidence && (
                                                    <div className="text-xs mt-1 text-blue-600 font-medium flex items-center gap-1">
                                                      <Sparkles size={12} className="text-blue-500" />
                                                      Disarankan oleh AI
                                                    </div>
                                                  )}
                                                  {/* Observed count - tracks assessor confirmations only */}
                                                  {observedCount > 0 && (
                                                    <div className={`text-xs mt-1 text-${tabColor}-600`}>
                                                      Diamati {observedCount} kali
                                                    </div>
                                                  )}
                                                </div>
                                                {/* "Lihat Bukti" button - only shown if AI has evidence */}
                                                {hasEvidence && (
                                                  <button
                                                    onClick={() =>
                                                      handleLihatBukti(behavior.id, keyAction.interactions)
                                                    }
                                                    className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                                                    title="Lihat bukti interaksi untuk perilaku ini"
                                                  >
                                                    <FileText size={12} />
                                                    Lihat Bukti
                                                  </button>
                                                )}
                                              </div>
                                            )
                                          })}
                                      </div>
                                    </div>
                                  )}

                                  {/* Assessor Rating Section */}
                                  {keyAction.interactions.length > 0 && (
                                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-lg border border-gray-200">
                                      <div className="flex items-center gap-2 mb-2">
                                        <h5 className="font-semibold text-slate-800">
                                          Penilaian untuk Key Action ini:
                                        </h5>
                                      </div>
                                      <p className="text-sm text-gray-600 mb-4">
                                        Secara otomatis dihitung menggunakan algoritma
                                      </p>

                                      <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Rating Saat Ini:
                                        </label>
                                        <div className="text-2xl font-bold">
                                          {getRatingLabel(deriveRating(keyAction.id))}
                                        </div>
                                      </div>

                                      <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                          Catatan Assessor untuk Rating Ini:
                                        </label>
                                        <textarea
                                          value={keyAction.ratingNote || ""}
                                          onChange={(e) =>
                                            updateKeyActionRatingNote(competency.id, keyAction.id, e.target.value)
                                          }
                                          placeholder="Tambahkan catatan Anda tentang rating ini..."
                                          className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        />
                                      </div>

                                      <div className="flex justify-end">
                                        <button
                                          onClick={() => saveKeyAction(competency.id, keyAction.id)}
                                          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-md transition-colors"
                                        >
                                          <Save size={16} />
                                          Simpan Rating
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>

                            {/* Rationale Section */}
                            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
                              <h4 className="font-medium mb-2 text-blue-900">
                                Catatan Assessor untuk "{competency.title}"
                              </h4>
                              <p className="text-sm text-blue-800 mb-2">
                                Rationale and Representative Examples (Mandatory)
                              </p>
                              <textarea
                                value={competency.rationale}
                                onChange={(e) => updateCompetencyRationale(competency.id, e.target.value)}
                                placeholder="Tuliskan justifikasi dan contoh perilaku spesifik di sini..."
                                className="w-full h-32 p-3 border border-blue-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                              />
                              <div className="flex justify-end mt-4">
                                <button
                                  onClick={() => saveRationale(competency.id, competency.rationale)}
                                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                  <Save size={16} />
                                  Simpan Catatan
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Overall Summary Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Ringkasan & Laporan Akhir</h2>
                  <p className="text-gray-600 mb-6">Berikan ringkasan penilaian kompetensi secara keseluruhan.</p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      General Comments of Competency
                    </label>
                    <textarea
                      value={assessment.overallSummary}
                      onChange={(e) => updateOverallSummary(e.target.value)}
                      placeholder="Tuliskan ringkasan penilaian kompetensi secara keseluruhan di sini..."
                      className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                    disabled={!assessment.overallSummary}
                  >
                    <Sparkles size={16} />
                    Buat Draf Laporan Naratif dengan AI
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel for Interaction Details */}
          {selectedContextEvidence && (
            <div className="w-1/3 transition-all duration-300">
              <InteractionDetailPanel
                evidence={selectedContextEvidence}
                onClose={() => setSelectedContextEvidence(null)}
                allInteractions={assessment.competencies.flatMap((comp) =>
                  comp.keyActions.flatMap((ka) => ka.interactions),
                )}
                isAIMode={isAIEnabled}
                aiHighlights={currentAIHighlights}
                aiBehaviorEvidence={aiBehaviorEvidence}
                barsChecklist={barsChecklist}
              />
            </div>
          )}
        </div>
      </div>

      <ContextModal
        evidence={selectedContextEvidence!}
        isOpen={false}
        onClose={() => setSelectedContextEvidence(null)}
      />
    </div>
  )
}

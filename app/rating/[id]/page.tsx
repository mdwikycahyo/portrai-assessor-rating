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
  Clock,
  Users,
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
    // Here you would typically send the key action data to your API
    console.log("Saving key action:", { competencyId, keyActionId })
    alert("Key Action saved successfully!")
  }

  const saveRationale = (competencyId: string, rationale: string) => {
    // Here you would typically send the rationale data to your API
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

  // Placeholder algorithm to derive rating from BARS selections
  const deriveRating = useMemo(() => {
    return (keyActionId: string): KeyAction["rating"] | "Belum Dinilai" => {
      const keyActionSelections = barsSelections[keyActionId] || {}
      const behaviors = barsChecklist[keyActionId] || []

      let totalScore = 0

      // Iterate through all interactions for this key action
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

      // Apply thresholds
      if (totalScore >= 4) return "strength"
      if (totalScore >= 1) return "meet-requirement"
      return "need-improvement"
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

  const getKeyActionIdForInteraction = (interactionId: string): string => {
    for (const competency of assessment.competencies) {
      for (const keyAction of competency.keyActions) {
        if (keyAction.interactions.some((interaction) => interaction.id === interactionId)) {
          return keyAction.id
        }
      }
    }
    return ""
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

  if (!participant) {
    return <div>Participant not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Sidebar */}
      <AssessorSidebar />

      {/* Main Content */}
      <div className="pl-24">
        {/* Top Header */}
        <AssessorHeader />

        <div className="flex items-center gap-4 my-4">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Assessment Report</h1>
        </div>

        {/* Split-Pane Layout */}
        <div className="flex gap-6 h-[calc(100vh-200px)]">
          {/* Main Content Area */}
          <div className={`${selectedContextEvidence ? "w-2/3" : "w-full"} transition-all duration-300`}>
            <div className="p-6 bg-white border border-gray-200 rounded-lg h-full overflow-y-auto">
              {/* Page Header */}
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

                  {/* Competencies Accordion */}
                  <div className="space-y-4">
                    {assessment.competencies.map((competency, index) => (
                      <div key={competency.id} className="border border-gray-200 rounded-lg">
                        {/* Competency Header */}
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

                        {/* Competency Content */}
                        {expandedCompetencies.includes(competency.id) && (
                          <div className="border-t border-gray-200 p-6">
                            {/* Definition */}
                            <div className="bg-blue-50 p-4 rounded-lg mb-6">
                              <p className="text-blue-800">{competency.definition}</p>
                            </div>

                            {/* Key Actions Section */}
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

                                  {/* Raw Interactions Section - Vertical Layout */}
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
                                              <p className="text-sm text-blue-700 flex items-center gap-2">
                                                <Clock size={14} />
                                                <span>{interaction.timestamp}</span>
                                                <span className="mx-1">•</span>
                                                <Users size={14} />
                                                <span>{interaction.participants.join(", ")}</span>
                                              </p>
                                            </div>
                                            <button
                                              onClick={() => setSelectedContextEvidence(interaction)}
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

                                  {/* BARS Checklist Section - Only visible if interactions exist */}
                                  {keyAction.interactions.length > 0 && barsChecklist[keyAction.id] && (
                                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
                                      <div className="flex items-center gap-2 mb-4">
                                        <h5 className="font-semibold text-slate-800">
                                          BARS (Behaviorally Anchored Rating Scale) Checklist:
                                        </h5>
                                      </div>
                                      <p className="text-sm text-slate-600 mb-6">
                                        {selectedContextEvidence
                                          ? "Centang perilaku yang ditunjukkan peserta dalam interaksi yang sedang dibuka."
                                          : "Buka salah satu data simulasi untuk mulai menandai perilaku."}
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
                                            // Calculate total count for this behavior across all interactions
                                            const totalCount = Object.values(barsSelections[keyAction.id] || {}).reduce(
                                              (count, interactionSelections) => {
                                                return count + (interactionSelections[behavior.id] ? 1 : 0)
                                              },
                                              0,
                                            )

                                            // Check if this behavior is selected for the current interaction
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
                                                className={`flex items-start gap-3 p-3 bg-white rounded-md border border-${tabColor}-200`}
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
                                                    className={`w-4 h-4 text-${tabColor}-600 border-gray-300 rounded focus:ring-${tabColor}-500 disabled:opacity-50`}
                                                  />
                                                  <div
                                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                      totalCount > 0
                                                        ? `bg-${tabColor}-600 text-white`
                                                        : "bg-gray-200 text-gray-500"
                                                    }`}
                                                  >
                                                    {totalCount}
                                                  </div>
                                                </div>
                                                <div className="flex-1">
                                                  <div className="text-sm text-gray-800">{behavior.description}</div>
                                                  {totalCount > 0 && (
                                                    <div className={`text-xs text-${tabColor}-600 mt-1`}>
                                                      Diamati {totalCount} kali
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            )
                                          })}
                                      </div>
                                    </div>
                                  )}

                                  {/* Assessor Rating Section - Only visible if interactions exist */}
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

                                      {/* Save Key Action Button */}
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

                            {/* Rationale Section - Visually different */}
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
              />
            </div>
          )}
        </div>
      </div>

      {/* Keep the original ContextModal for backward compatibility if needed */}
      <ContextModal
        evidence={selectedContextEvidence!}
        isOpen={false} // Always false since we're using the side panel now
        onClose={() => setSelectedContextEvidence(null)}
      />
    </div>
  )
}

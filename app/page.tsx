"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Save,
  FileText,
} from "lucide-react"
import { mockAssessment, type Assessment, type Interaction, type KeyAction } from "../data/mock-assessment"
import { mockParticipants } from "../data/mock-participants"
import { ContextModal } from "../components/context-modal"
import { InteractionDetailPanel } from "../components/interaction-detail-panel"
import { AssessorSidebar } from "../components/assessor-sidebar"
import { AssessorHeader } from "../components/assessor-header"
import { barsChecklist } from "../data/bars-checklist"
import { aiSummaries } from "../data/ai-summaries"
import { aiBehaviorEvidence } from "../data/ai-behavior-evidence"
import { getInteractionIcon, getInteractionTypeLabel } from "../utils/interaction-utils"
import { getRatingLabel } from "../utils/rating-utils"
import { useRatingCalculation } from "../hooks/useRatingCalculation"
import { AssessmentSummaryCard } from "../components/assessment/AssessmentSummaryCard"
import { AISummarySection } from "../components/assessment/AISummarySection"
import { BarsChecklistSection } from "../components/assessment/BarsChecklistSection"
import { OverallSummarySection } from "../components/assessment/OverallSummarySection"

export default function RatingPage() {
  // Hardcode participant ID to "1"
  const participantId = "1"

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

  // Use custom hook for rating calculation
  const { deriveRating, getObservedCount } = useRatingCalculation(barsSelections, barsChecklist)




  // Function to handle "Lihat Bukti" click
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

    // Show all AI highlights for this interaction's Key Action
    {
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
    }
  }


  // Check if behavior has AI evidence
  const hasAIEvidence = (behaviorId: string): boolean => {
    return aiBehaviorEvidence[behaviorId] && aiBehaviorEvidence[behaviorId].length > 0
  }

  if (!participant) {
    return <div>Participant not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AssessorSidebar />

      <div className="pl-28 pr-4">
        <AssessorHeader />

        <div className="flex items-center gap-4 my-4">
          <h1 className="text-2xl font-bold text-gray-900">Assessment Rating</h1>
        </div>

        {/* Split-Pane Layout */}
        <div className="flex gap-6 h-[calc(100vh-180px)]">
          <div className={`${selectedContextEvidence ? "w-2/3" : "w-full"} transition-all duration-300`}>
            <div className="p-6 bg-white border border-gray-200 rounded-lg h-full overflow-y-auto">
              <div className="mb-8 flex justify-between items-center">
                <p className="text-gray-600">
                  Disusun dari data simulasi untuk memberikan gambaran komprehensif terhadap kompetensi peserta.
                </p>
              </div>

              {/* Assessment Summary Card */}
              <AssessmentSummaryCard 
                participantName={assessment.participant.name}
                company={participant.company}
                assessmentDate={assessment.participant.date}
              />

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

                                  {/* AI Summary Section */}
                                  {keyAction.interactions.length > 0 && (
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
                                        Centang perilaku yang ditunjukkan peserta. Item dengan tombol 'Lihat Bukti' telah diidentifikasi oleh AI.
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
              <OverallSummarySection 
                overallSummary={assessment.overallSummary}
                onUpdateSummary={updateOverallSummary}
              />
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
                isAIMode={true}
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
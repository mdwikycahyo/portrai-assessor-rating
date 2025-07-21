"use client"

import { useState, useEffect, useMemo } from "react"
import { ChevronDown, ChevronUp, Sparkles, ChevronLeft, Save } from "lucide-react"
import { mockAssessment, type Assessment, type Interaction, type KeyAction } from "../../../data/mock-assessment"
import { mockParticipants } from "../../../data/mock-participants"
import { ContextModal } from "../../../components/context-modal"
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
  const [barsSelections, setBarsSelections] = useState<{ [keyActionId: string]: { [behaviorId: string]: boolean } }>({})

  // Get participant info
  const participant = mockParticipants.find((p) => p.id === participantId)

  useEffect(() => {
    // Update assessment data based on participant ID
    if (participant) {
      setAssessment((prev) => ({
        ...prev,
        participant: {
          name: participant.name,
          totalTime: "1 Jam 30 Menit", // This could be dynamic based on participant
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

  const handleBarsSelection = (keyActionId: string, behaviorId: string, checked: boolean) => {
    setBarsSelections((prev) => ({
      ...prev,
      [keyActionId]: {
        ...prev[keyActionId],
        [behaviorId]: checked,
      },
    }))
  }

  // Placeholder algorithm to derive rating from BARS selections
  const deriveRating = useMemo(() => {
    return (keyActionId: string): KeyAction["rating"] | "Belum Dinilai" => {
      const selectedBehaviors = barsSelections[keyActionId] || {}
      const behaviors = barsChecklist[keyActionId] || []

      const hasStrength = behaviors.some((b) => b.level === "strength" && selectedBehaviors[b.id])
      const hasMeetRequirement = behaviors.some((b) => b.level === "meet-requirement" && selectedBehaviors[b.id])
      const hasNeedsImprovement = behaviors.some((b) => b.level === "need-improvement" && selectedBehaviors[b.id])

      if (hasStrength) return "strength"
      if (hasMeetRequirement) return "meet-requirement"
      if (hasNeedsImprovement) return "need-improvement"
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
        {/* Page Content - Consistent with Dashboard */}
        <div className="p-6 mr-6 bg-white border border-gray-200 rounded-lg">
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
                          {" "}
                          {/* Added space-y for gap between key action cards */}
                          {competency.keyActions.map((keyAction, keyActionIndex) => (
                            <div
                              key={keyAction.id}
                              className="bg-gray-100 p-6 rounded-lg border border-gray-200 shadow-sm"
                            >
                              {" "}
                              {/* Each key action is now a distinct card */}
                              <h4 className="font-medium mb-6 text-black text-lg">
                                Key Action {keyActionIndex + 1}: <span className="font-bold">{keyAction.title}</span>{" "}
                                <br />
                                <span className="text-base font-normal text-gray-600">
                                  {keyAction.description}
                                </span>{" "}
                              </h4>
                              {/* BARS Checklist Section */}
                              {/* Raw Interactions Section */}
                              {keyAction.interactions.length > 0 && (
                                <div className="mb-6">
                                  <h5 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
                                    DATA SIMULASI YANG TERSEDIA:
                                  </h5>
                                  <div className="space-y-3">
                                    {keyAction.interactions.map((interaction) => (
                                      <div
                                        key={interaction.id}
                                        className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
                                      >
                                        <div className="flex-1">
                                          <h6 className="font-medium text-blue-900 mb-1">{interaction.title}</h6>
                                          <p className="text-sm text-blue-700">
                                            {interaction.timestamp} • {interaction.participants.join(", ")}
                                          </p>
                                        </div>
                                        <button
                                          onClick={() => setSelectedContextEvidence(interaction)}
                                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                          Lihat Data Simulasi
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
                                    Centang perilaku yang ditunjukkan peserta berdasarkan data simulasi yang telah Anda
                                    review.
                                  </p>

                                  <div className="space-y-6">
                                    {/* Strong (+) Behaviors */}
                                    <div>
                                      <h6 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                                        <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                          +
                                        </span>
                                        Strong (Strength)
                                      </h6>
                                      <div className="space-y-3 ml-8">
                                        {barsChecklist[keyAction.id]
                                          .filter((behavior) => behavior.level === "strength")
                                          .map((behavior) => (
                                            <div
                                              key={behavior.id}
                                              className="flex items-start gap-3 p-3 bg-white rounded-md border border-green-200"
                                            >
                                              <input
                                                type="checkbox"
                                                id={behavior.id}
                                                checked={barsSelections[keyAction.id]?.[behavior.id] || false}
                                                onChange={(e) =>
                                                  handleBarsSelection(keyAction.id, behavior.id, e.target.checked)
                                                }
                                                className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                              />
                                              <label
                                                htmlFor={behavior.id}
                                                className="text-sm text-gray-800 cursor-pointer flex-1"
                                              >
                                                {behavior.description}
                                              </label>
                                            </div>
                                          ))}
                                      </div>
                                    </div>

                                    {/* Meets Requirement (/) Behaviors */}
                                    <div>
                                      <h6 className="font-medium text-yellow-800 mb-3 flex items-center gap-2">
                                        <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                          /
                                        </span>
                                        Meets Requirement
                                      </h6>
                                      <div className="space-y-3 ml-8">
                                        {barsChecklist[keyAction.id]
                                          .filter((behavior) => behavior.level === "meet-requirement")
                                          .map((behavior) => (
                                            <div
                                              key={behavior.id}
                                              className="flex items-start gap-3 p-3 bg-white rounded-md border border-yellow-200"
                                            >
                                              <input
                                                type="checkbox"
                                                id={behavior.id}
                                                checked={barsSelections[keyAction.id]?.[behavior.id] || false}
                                                onChange={(e) =>
                                                  handleBarsSelection(keyAction.id, behavior.id, e.target.checked)
                                                }
                                                className="mt-1 w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                                              />
                                              <label
                                                htmlFor={behavior.id}
                                                className="text-sm text-gray-800 cursor-pointer flex-1"
                                              >
                                                {behavior.description}
                                              </label>
                                            </div>
                                          ))}
                                      </div>
                                    </div>

                                    {/* Needs Improvement (-) Behaviors */}
                                    <div>
                                      <h6 className="font-medium text-red-800 mb-3 flex items-center gap-2">
                                        <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                          -
                                        </span>
                                        Needs Improvement
                                      </h6>
                                      <div className="space-y-3 ml-8">
                                        {barsChecklist[keyAction.id]
                                          .filter((behavior) => behavior.level === "need-improvement")
                                          .map((behavior) => (
                                            <div
                                              key={behavior.id}
                                              className="flex items-start gap-3 p-3 bg-white rounded-md border border-red-200"
                                            >
                                              <input
                                                type="checkbox"
                                                id={behavior.id}
                                                checked={barsSelections[keyAction.id]?.[behavior.id] || false}
                                                onChange={(e) =>
                                                  handleBarsSelection(keyAction.id, behavior.id, e.target.checked)
                                                }
                                                className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                              />
                                              <label
                                                htmlFor={behavior.id}
                                                className="text-sm text-gray-800 cursor-pointer flex-1"
                                              >
                                                {behavior.description}
                                              </label>
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {/* Assessor Rating Section - Only visible if interactions exist */}
                              {keyAction.interactions.length > 0 && (
                                <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-lg border border-gray-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h5 className="font-semibold text-slate-800">Penilaian untuk Key Action ini:</h5>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">General Comments of Competency</label>
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

      {/* Modals */}
      <ContextModal
        evidence={selectedContextEvidence!}
        isOpen={!!selectedContextEvidence}
        onClose={() => setSelectedContextEvidence(null)}
      />
    </div>
  )
}

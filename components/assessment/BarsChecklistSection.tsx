import { FileText, Sparkles } from "lucide-react"
import { type Interaction } from "../../data/mock-assessment"
import { getKeyActionById, getCompetencyByKeyActionId } from "../../data/competency-mappings"

interface BarsChecklistSectionProps {
  keyActionId: string
  selectedContextEvidence: Interaction | null
  activeBarsTab: string
  onSetActiveBarsTab: (tab: "strength" | "meet-requirement" | "need-improvement") => void
  barsChecklist: { [keyActionId: string]: Array<{ 
    id: string
    description: string
    level: "strength" | "meet-requirement" | "need-improvement"
  }> }
  barsSelections: { [keyActionId: string]: { [interactionId: string]: { [behaviorId: string]: boolean } } }
  onBarsSelection: (keyActionId: string, interactionId: string, behaviorId: string, checked: boolean) => void
  getObservedCount: (keyActionId: string, behaviorId: string) => number
  hasAIEvidence: (behaviorId: string) => boolean
  onLihatBukti: (behaviorId: string, interactions: Interaction[]) => void
  interactions: Interaction[]
}

export function BarsChecklistSection({
  keyActionId,
  selectedContextEvidence,
  activeBarsTab,
  onSetActiveBarsTab,
  barsChecklist,
  barsSelections,
  onBarsSelection,
  getObservedCount,
  hasAIEvidence,
  onLihatBukti,
  interactions,
}: BarsChecklistSectionProps) {
  const behaviors = barsChecklist[keyActionId] || []

  // Get competency and key action metadata
  const competencyInfo = getCompetencyByKeyActionId(keyActionId)
  const keyActionInfo = getKeyActionById(keyActionId)

  if (behaviors.length === 0) return null

  return (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
      {/* Competency and Key Action Context */}
      {competencyInfo && keyActionInfo && (
        <div className="mb-6 p-4 bg-white border border-slate-300 rounded-lg">
          <div className="mb-3">
            <h4 className="text-lg font-semibold text-slate-900 mb-1">
              {competencyInfo.title}
            </h4>
            <p className="text-sm text-slate-600">
              {competencyInfo.definition}
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h5 className="font-semibold text-slate-800 mb-1">
              Key Action: {keyActionInfo.keyAction.title} ({keyActionInfo.keyAction.code})
            </h5>
            <p className="text-sm text-slate-600">
              {keyActionInfo.keyAction.description}
            </p>
          </div>
        </div>
      )}

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
            onClick={() => onSetActiveBarsTab(tab.key as "strength" | "meet-requirement" | "need-improvement")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeBarsTab === tab.key
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
        {behaviors
          .filter((behavior) => behavior.level === activeBarsTab)
          .map((behavior) => {
            const observedCount = getObservedCount(keyActionId, behavior.id)
            const hasEvidence = hasAIEvidence(behavior.id)

            const isCheckedForCurrentInteraction =
              selectedContextEvidence &&
              barsSelections[keyActionId]?.[selectedContextEvidence.id]?.[behavior.id]

            const tabColor =
              activeBarsTab === "strength" ? "green" : activeBarsTab === "meet-requirement" ? "yellow" : "red"

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
                        onBarsSelection(keyActionId, selectedContextEvidence.id, behavior.id, e.target.checked)
                      }
                    }}
                    className={`w-4 h-4 border-gray-300 rounded focus:ring-2 transition-colors text-${tabColor}-600 focus:ring-${tabColor}-500 disabled:opacity-50`}
                  />
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      observedCount > 0 ? `bg-${tabColor}-600 text-white` : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {observedCount}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-800">{behavior.description}</div>
                  {hasEvidence && (
                    <div className="text-xs mt-1 text-blue-600 font-medium flex items-center gap-1">
                      <Sparkles size={12} className="text-blue-500" />
                      Disarankan oleh AI
                    </div>
                  )}
                  {observedCount > 0 && (
                    <div className={`text-xs mt-1 text-${tabColor}-600`}>Diamati {observedCount} kali</div>
                  )}
                </div>
                {hasEvidence && (
                  <button
                    onClick={() => onLihatBukti(behavior.id, interactions)}
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
  )
}
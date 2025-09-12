import { Sparkles } from "lucide-react"

interface AISummarySectionProps {
  keyActionId: string
  aiSummaries: {
    [key: string]: {
      overview: string
      strength: string[]
      meetRequirement: string[]
      needsImprovement: string[]
    }
  }
}

export function AISummarySection({ keyActionId, aiSummaries }: AISummarySectionProps) {
  const summary = aiSummaries[keyActionId as keyof typeof aiSummaries]

  if (!summary) return null

  return (
    <div className="mb-6">
      <h5 className="text-sm font-medium text-gray-700 mb-3 tracking-wide flex items-center gap-2">
        <Sparkles size={16} className="text-blue-500" />
        Ringkasan Temuan Evidence oleh AI:
      </h5>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-start mb-4">
          <div className="flex-1">
            <div className="space-y-4">
              {summary.strength.length > 0 && (
                <div>
                  <h6 className="font-semibold text-green-800 mb-2">🟢 Kekuatan Ditemukan (Strength):</h6>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {summary.strength.map((item, index) => (
                      <li key={index} className="text-blue-800 text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {summary.meetRequirement.length > 0 && (
                <div>
                  <h6 className="font-semibold text-yellow-800 mb-2">🟡 Memenuhi Persyaratan (Meet Requirement):</h6>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {summary.meetRequirement.map((item, index) => (
                      <li key={index} className="text-blue-800 text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {summary.needsImprovement.length > 0 && (
                <div>
                  <h6 className="font-semibold text-red-800 mb-2">🔴 Area untuk Peningkatan (Needs Improvement):</h6>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {summary.needsImprovement.map((item, index) => (
                      <li key={index} className="text-blue-800 text-sm leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
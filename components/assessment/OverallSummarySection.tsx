import { Sparkles } from "lucide-react"

interface OverallSummarySectionProps {
  overallSummary: string
  onUpdateSummary: (summary: string) => void
}

export function OverallSummarySection({ overallSummary, onUpdateSummary }: OverallSummarySectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Ringkasan & Laporan Akhir</h2>
        <p className="text-gray-600 mb-6">Berikan ringkasan penilaian kompetensi secara keseluruhan.</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            General Comments of Competency
          </label>
          <textarea
            value={overallSummary}
            onChange={(e) => onUpdateSummary(e.target.value)}
            placeholder="Tuliskan ringkasan penilaian kompetensi secara keseluruhan di sini..."
            className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          disabled={!overallSummary}
        >
          <Sparkles size={16} />
          Buat Draf Laporan Naratif dengan AI
        </button>
      </div>
    </div>
  )
}
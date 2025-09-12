interface AssessmentSummaryCardProps {
  participantName: string
  company: string
  assessmentDate: string
}

export function AssessmentSummaryCard({ participantName, company, assessmentDate }: AssessmentSummaryCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
      <div className="bg-slate-800 text-white p-6 rounded-t-lg">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-gray-300 text-sm">Peserta</div>
            <div className="text-xl font-semibold">{participantName}</div>
          </div>
          <div>
            <div className="text-gray-300 text-sm">Perusahaan</div>
            <div className="text-xl font-semibold">{company}</div>
          </div>
          <div>
            <div className="text-gray-300 text-sm">Tanggal Asesmen</div>
            <div className="text-xl font-semibold">{assessmentDate}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
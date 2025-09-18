"use client"

interface AssessmentProgressIndicatorProps {
  completed: number
  total: number
  className?: string
}

export function AssessmentProgressIndicator({
  completed,
  total,
  className = ""
}: AssessmentProgressIndicatorProps) {
  const isComplete = completed === total && total > 0

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
      isComplete
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-700"
    } ${className}`}>
      <span>Progress: {completed}/{total}</span>
      {isComplete && <span>✓</span>}
    </div>
  )
}
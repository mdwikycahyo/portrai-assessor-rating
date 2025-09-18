"use client"

import { useState, useMemo } from "react"
import { SimulationData, KeyActionRating, RatingLevel } from "../data/stimulus-response-types"
import { competencyDefinitions, getKeyActionById } from "../data/competency-mappings"
import { ParticipantKeyActionCard } from "./ParticipantKeyActionCard"

interface ParticipantKeyActionAssessmentProps {
  simulations: SimulationData[]
  participantId: string
  completionStatus: { [keyActionId: string]: boolean }
  onCompletionStatusChange: (status: { [keyActionId: string]: boolean }) => void
}

interface AggregatedKeyAction {
  keyActionId: string
  keyActionTitle: string
  keyActionCode: string
  competencyTitle: string
  competencyId: string
  keyActionDescription: string
  evidence: {
    simulationId: string
    simulationName: string
    rating: KeyActionRating
  }[]
  aggregatedAIRecommendation: RatingLevel
  aggregatedAIReasoning: string
  assessorOverride?: RatingLevel
  assessorNotes: string
  isCompleted: boolean
}

export function ParticipantKeyActionAssessment({
  simulations,
  participantId,
  completionStatus,
  onCompletionStatusChange
}: ParticipantKeyActionAssessmentProps) {
  // Track assessor overrides and notes
  const [assessorOverrides, setAssessorOverrides] = useState<{ [keyActionId: string]: RatingLevel }>({})
  const [assessorNotes, setAssessorNotes] = useState<{ [keyActionId: string]: string }>({})

  // Aggregate key actions across all simulations
  const aggregatedKeyActions = useMemo(() => {
    const keyActionMap = new Map<string, AggregatedKeyAction>()

    // Collect all key actions from all simulations
    simulations.forEach(simulation => {
      Object.entries(simulation.keyActionRatings).forEach(([keyActionId, rating]) => {
        const keyActionInfo = getKeyActionById(keyActionId)
        if (!keyActionInfo) return

        if (!keyActionMap.has(keyActionId)) {
          // Create new aggregated key action
          keyActionMap.set(keyActionId, {
            keyActionId,
            keyActionTitle: keyActionInfo.keyAction.title,
            keyActionCode: keyActionInfo.keyAction.code,
            competencyTitle: keyActionInfo.competency.title,
            competencyId: keyActionInfo.competency.id,
            keyActionDescription: keyActionInfo.keyAction.description,
            evidence: [],
            aggregatedAIRecommendation: rating.aiRecommendation,
            aggregatedAIReasoning: rating.aiReasoning,
            assessorNotes: assessorNotes[keyActionId] || "",
            isCompleted: completionStatus[keyActionId] || false
          })
        }

        // Add evidence from this simulation
        const aggregated = keyActionMap.get(keyActionId)!
        aggregated.evidence.push({
          simulationId: simulation.id,
          simulationName: simulation.name,
          rating
        })
      })
    })

    // Generate aggregated AI recommendations based on all evidence
    keyActionMap.forEach((aggregatedKeyAction) => {
      const evidence = aggregatedKeyAction.evidence
      if (evidence.length === 0) return

      // Simple aggregation: if any simulation shows strength, recommend strength
      // If all show meet-requirement or better, recommend meet-requirement
      // Otherwise, recommend need-improvement
      const hasStrength = evidence.some(e => e.rating.aiRecommendation === 'strength')
      const allMeetOrBetter = evidence.every(e =>
        e.rating.aiRecommendation === 'strength' || e.rating.aiRecommendation === 'meet-requirement'
      )

      if (hasStrength) {
        aggregatedKeyAction.aggregatedAIRecommendation = 'strength'
      } else if (allMeetOrBetter) {
        aggregatedKeyAction.aggregatedAIRecommendation = 'meet-requirement'
      } else {
        aggregatedKeyAction.aggregatedAIRecommendation = 'need-improvement'
      }

      // Combine AI reasoning from all simulations
      const reasonings = evidence.map(e => `${e.simulationName}: ${e.rating.aiReasoning}`)
      aggregatedKeyAction.aggregatedAIReasoning = reasonings.join(' | ')

      // Apply assessor override if exists
      if (assessorOverrides[aggregatedKeyAction.keyActionId]) {
        aggregatedKeyAction.assessorOverride = assessorOverrides[aggregatedKeyAction.keyActionId]
      }

      // Update notes
      aggregatedKeyAction.assessorNotes = assessorNotes[aggregatedKeyAction.keyActionId] || ""
      aggregatedKeyAction.isCompleted = completionStatus[aggregatedKeyAction.keyActionId] || false
    })

    return Array.from(keyActionMap.values()).sort((a, b) =>
      a.competencyTitle.localeCompare(b.competencyTitle) || a.keyActionCode.localeCompare(b.keyActionCode)
    )
  }, [simulations, assessorOverrides, assessorNotes, completionStatus])

  const handleRatingOverride = (keyActionId: string, rating: RatingLevel) => {
    setAssessorOverrides(prev => ({
      ...prev,
      [keyActionId]: rating
    }))
  }

  const handleAssessorNotesUpdate = (keyActionId: string, notes: string) => {
    setAssessorNotes(prev => ({
      ...prev,
      [keyActionId]: notes
    }))
  }

  const handleSaveRating = (keyActionId: string) => {
    onCompletionStatusChange({
      ...completionStatus,
      [keyActionId]: true
    })

    console.log("Saving participant-level rating for key action:", keyActionId)
    alert(`Penilaian untuk Key Action ${keyActionId} berhasil disimpan!`)
  }

  // Group by competency for better organization
  const groupedByCompetency = useMemo(() => {
    const groups: { [competencyId: string]: AggregatedKeyAction[] } = {}

    aggregatedKeyActions.forEach(keyAction => {
      if (!groups[keyAction.competencyId]) {
        groups[keyAction.competencyId] = []
      }
      groups[keyAction.competencyId].push(keyAction)
    })

    return groups
  }, [aggregatedKeyActions])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Penilaian Key Action
        </h2>
        <p className="text-gray-600 mb-4">
          Berikan penilaian final untuk setiap Key Action berdasarkan seluruh Evidence dari semua simulasi yang telah diselesaikan partisipan.
        </p>

        {/* Summary Statistics */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-900">Total Key Actions:</span>
              <span className="ml-2 text-blue-700">{aggregatedKeyActions.length}</span>
            </div>
            <div>
              <span className="font-medium text-blue-900">Rating Completed:</span>
              <span className="ml-2 text-blue-700">
                {Object.values(completionStatus).filter(Boolean).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grouped Key Actions by Competency */}
      {competencyDefinitions.map(competency => {
        const keyActionsInCompetency = groupedByCompetency[competency.id] || []
        if (keyActionsInCompetency.length === 0) return null

        return (
          <div key={competency.id} className="space-y-4">
            {/* Competency Header */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                {competency.title}
              </h3>
              <p className="text-sm text-indigo-700">
                {competency.definition}
              </p>
            </div>

            {/* Key Actions in this Competency */}
            <div className="space-y-6">
              {keyActionsInCompetency.map(keyAction => (
                <ParticipantKeyActionCard
                  key={keyAction.keyActionId}
                  aggregatedKeyAction={keyAction}
                  onRatingOverride={handleRatingOverride}
                  onAssessorNotesUpdate={handleAssessorNotesUpdate}
                  onSaveRating={handleSaveRating}
                />
              ))}
            </div>
          </div>
        )
      })}

      {aggregatedKeyActions.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Tidak ada Key Action yang ditemukan untuk dinilai.</p>
        </div>
      )}
    </div>
  )
}
"use client"

import { Sparkles, Save, AlertTriangle } from "lucide-react"
import { KeyActionRating } from "../data/stimulus-response-types"

interface KeyActionRatingCardProps {
  rating: KeyActionRating
  onRatingOverride: (keyActionId: string, rating: 'strength' | 'meet-requirement' | 'need-improvement') => void
  onAssessorNotesUpdate: (keyActionId: string, notes: string) => void
  onSaveRating: (keyActionId: string) => void
}

export function KeyActionRatingCard({
  rating,
  onRatingOverride,
  onAssessorNotesUpdate,
  onSaveRating,
}: KeyActionRatingCardProps) {
  const getRatingColor = (level: string) => {
    switch (level) {
      case "strength":
        return "bg-green-100 text-green-800"
      case "meet-requirement":
        return "bg-yellow-100 text-yellow-800"
      case "need-improvement":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRatingLabel = (level: string) => {
    switch (level) {
      case "strength":
        return "Strength"
      case "meet-requirement":
        return "Meet Requirement"
      case "need-improvement":
        return "Need Improvement"
      default:
        return level
    }
  }

  const hasEvidence = rating.hasEvidence !== false
  const cardStyle = hasEvidence
    ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
    : "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"

  return (
    <div className={`${cardStyle} p-6 rounded-lg border mb-6`}>
      {/* Header with Competency and Key Action Info */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {hasEvidence ? (
              <Sparkles className="w-5 h-5 text-blue-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            )}
            <h3 className="text-lg font-semibold text-gray-900">
              {rating.competencyTitle} - {rating.keyActionTitle} ({rating.keyActionCode})
            </h3>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            hasEvidence
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}>
            {hasEvidence ? "Bukti Tersedia" : "Tidak Ada Bukti Cukup"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendation */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Rekomendasi AI:</h4>
          <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(rating.aiRecommendation)}`}>
            {getRatingLabel(rating.aiRecommendation)}
          </div>

          <div className="mt-3 p-3 bg-white rounded-md border">
            <p className="text-sm text-gray-700">
              {rating.aiReasoning}
            </p>
          </div>
        </div>

        {/* Assessor Override */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Penilaian Assessor:</h4>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={rating.assessorOverride || rating.aiRecommendation}
            onChange={(e) => onRatingOverride(rating.keyActionId, e.target.value as any)}
          >
            <option value="strength">Strength</option>
            <option value="meet-requirement">Meet Requirement</option>
            <option value="need-improvement">Need Improvement</option>
          </select>

          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan Assessor (Wajib):
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder={`Berikan alasan detail untuk penilaian Anda pada ${rating.keyActionTitle}...`}
              value={rating.assessorNotes}
              onChange={(e) => onAssessorNotesUpdate(rating.keyActionId, e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Individual Save Button */}
      <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => onSaveRating(rating.keyActionId)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <Save className="w-4 h-4" />
          Simpan Key Action
        </button>
      </div>
    </div>
  )
}
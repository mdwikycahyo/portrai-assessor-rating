"use client";

import { useState } from "react";
import {
  Sparkles,
  Save,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";
import { RatingLevel } from "../data/stimulus-response-types";

interface AggregatedKeyAction {
  keyActionId: string;
  keyActionTitle: string;
  keyActionCode: string;
  competencyTitle: string;
  competencyId: string;
  keyActionDescription: string;
  evidence: {
    simulationId: string;
    simulationName: string;
    rating: {
      keyActionId: string;
      keyActionTitle: string;
      keyActionCode: string;
      competencyTitle: string;
      aiRecommendation: RatingLevel;
      aiReasoning: string;
      assessorOverride?: RatingLevel;
      assessorNotes: string;
      isDraft: boolean;
      hasEvidence?: boolean;
    };
  }[];
  aggregatedAIRecommendation: RatingLevel;
  aggregatedAIReasoning: string;
  assessorOverride?: RatingLevel;
  assessorNotes: string;
  isCompleted: boolean;
}

interface ParticipantKeyActionCardProps {
  aggregatedKeyAction: AggregatedKeyAction;
  onRatingOverride: (keyActionId: string, rating: RatingLevel) => void;
  onAssessorNotesUpdate: (keyActionId: string, notes: string) => void;
  onSaveRating: (keyActionId: string) => void;
}

export function ParticipantKeyActionCard({
  aggregatedKeyAction,
  onRatingOverride,
  onAssessorNotesUpdate,
  onSaveRating,
}: ParticipantKeyActionCardProps) {
  const getRatingColor = (level: RatingLevel) => {
    switch (level) {
      case "strength":
        return "bg-green-100 text-green-800";
      case "meet-requirement":
        return "bg-yellow-100 text-yellow-800";
      case "need-improvement":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingLabel = (level: RatingLevel) => {
    switch (level) {
      case "strength":
        return "Strength";
      case "meet-requirement":
        return "Meet Requirement";
      case "need-improvement":
        return "Need Improvement";
      default:
        return level;
    }
  };

  const hasEvidence = aggregatedKeyAction.evidence.length > 0;
  const completionIcon = aggregatedKeyAction.isCompleted ? (
    <CheckCircle className="w-5 h-5 text-green-600" />
  ) : (
    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
  );

  return (
    <div
      className={`p-6 rounded-lg border mb-6 ${
        aggregatedKeyAction.isCompleted
          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
          : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
      }`}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {completionIcon}
            <h3 className="text-lg font-semibold text-gray-900">
              {aggregatedKeyAction.keyActionTitle} (
              {aggregatedKeyAction.keyActionCode})
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {aggregatedKeyAction.isCompleted ? (
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Completed
              </div>
            ) : (
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                Pending
              </div>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          {aggregatedKeyAction.keyActionDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Aggregated Recommendation with Evidence */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Rekomendasi AI:
          </h4>
          <div
            className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-3 ${getRatingColor(
              aggregatedKeyAction.aggregatedAIRecommendation
            )}`}
          >
            {getRatingLabel(aggregatedKeyAction.aggregatedAIRecommendation)}
          </div>

          <div className="p-3 bg-white rounded-md border mb-4">
            <p className="text-sm text-gray-700">
              <strong>Ringkasan AI:</strong> Berdasarkan analisis bukti dari{" "}
              {aggregatedKeyAction.evidence.length} simulasi, partisipan
              menunjukkan pola perilaku yang konsisten dengan level{" "}
              {getRatingLabel(
                aggregatedKeyAction.aggregatedAIRecommendation
              ).toLowerCase()}
              .
            </p>
          </div>

          {/* Evidence Section */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Rangkuman Evidence:
            </h4>

            {/* Evidence Details (Open by default) */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h5 className="font-medium text-gray-900 mb-3 text-sm">
                Evidence dari Semua Simulasi:
              </h5>
              <div className="space-y-3">
                {aggregatedKeyAction.evidence.map((evidence, index) => (
                  <div
                    key={`${evidence.simulationId}-${index}`}
                    className="p-3 bg-white rounded-md border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-gray-900">
                        {evidence.simulationName}
                      </span>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${getRatingColor(
                          evidence.rating.aiRecommendation
                        )}`}
                      >
                        {getRatingLabel(evidence.rating.aiRecommendation)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      {evidence.rating.aiReasoning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Assessor Final Rating */}
        <div className="flex flex-col h-full">
          <h4 className="font-medium text-gray-900 mb-2">
            Penilaian Final Assessor:
          </h4>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
            value={
              aggregatedKeyAction.assessorOverride ||
              aggregatedKeyAction.aggregatedAIRecommendation
            }
            onChange={(e) =>
              onRatingOverride(
                aggregatedKeyAction.keyActionId,
                e.target.value as RatingLevel
              )
            }
          >
            <option value="strength">Strength</option>
            <option value="meet-requirement">Meet Requirement</option>
            <option value="need-improvement">Need Improvement</option>
          </select>

          <div className="flex-1 flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Catatan Assessor (Wajib):
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-1 resize-none"
              placeholder={`Berikan justifikasi untuk penilaian final ${aggregatedKeyAction.keyActionTitle}. Pertimbangkan bukti dari semua simulasi...`}
              value={aggregatedKeyAction.assessorNotes}
              onChange={(e) =>
                onAssessorNotesUpdate(
                  aggregatedKeyAction.keyActionId,
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => onSaveRating(aggregatedKeyAction.keyActionId)}
          disabled={aggregatedKeyAction.isCompleted}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            aggregatedKeyAction.isCompleted
              ? "bg-green-600 text-white cursor-default"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {aggregatedKeyAction.isCompleted ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {aggregatedKeyAction.isCompleted ? "Tersimpan" : "Simpan Key Action"}
        </button>
      </div>
    </div>
  );
}

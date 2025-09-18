"use client"

import { User, Building, Calendar, Clock, UserCheck } from "lucide-react"
import { Participant } from "../data/mock-participants"
import { SimulationData } from "../data/stimulus-response-types"
import { AssessmentProgressIndicator } from "./AssessmentProgressIndicator"

interface ParticipantSimulationHeaderProps {
  participant: Participant
  simulations: SimulationData[]
  activeSimulationId: string
  onTabChange: (simulationId: string) => void
  activeView?: 'simulation' | 'key-action-rating'
  onViewChange?: (view: 'simulation' | 'key-action-rating') => void
  progressData?: {
    completed: number
    total: number
  }
}

export function ParticipantSimulationHeader({
  participant,
  simulations,
  activeSimulationId,
  onTabChange,
  activeView = 'simulation',
  onViewChange,
  progressData
}: ParticipantSimulationHeaderProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      {/* Top Row: Participant Info */}
      <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-3">
        <div className="flex items-center gap-4">
          {/* Participant Name & Role */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{participant.name}</h1>
              <p className="text-sm text-gray-600">{participant.role}</p>
            </div>
          </div>

          {/* Company */}
          <div className="flex items-center gap-2 text-gray-700">
            <Building className="w-4 h-4" />
            <span className="font-medium">{participant.company}</span>
          </div>

          {/* Session Duration */}
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4" />
            <span>{participant.sessionDuration}</span>
          </div>

          {/* Assessment Date */}
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4" />
            <span>{participant.assessmentDate}</span>
          </div>

          {/* Assessor */}
          <div className="flex items-center gap-2 text-gray-700">
            <UserCheck className="w-4 h-4" />
            <span>Assessor: {participant.assessorName}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          participant.status === "Completed"
            ? "bg-green-100 text-green-800"
            : participant.status === "Rating In Progress"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-blue-100 text-blue-800"
        }`}>
          {participant.status}
        </div>
      </div>

      {/* Bottom Row: Navigation Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Simulation Tabs - Always show */}
          {simulations.map((simulation) => {
            const isActive = simulation.id === activeSimulationId && activeView === 'simulation'

            return (
              <button
                key={simulation.id}
                onClick={() => {
                  onTabChange(simulation.id)
                  if (onViewChange) onViewChange('simulation')
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {simulation.name}
              </button>
            )
          })}
        </div>

        {/* Right side: Key Action Rating Button */}
        {onViewChange && (
          <button
            onClick={() => onViewChange('key-action-rating')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === 'key-action-rating'
                ? "bg-blue-600 text-white"
                : "text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200"
            }`}
          >
            Key Action Rating
          </button>
        )}
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import { HierarchicalBARSData } from "../data/stimulus-response-types"

interface CollapsibleReferencePanelProps {
  barsData: HierarchicalBARSData
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function CollapsibleReferencePanel({
  barsData,
  isCollapsed,
  onToggleCollapse
}: CollapsibleReferencePanelProps) {
  // State for collapsible sections - initialize with all competencies expanded for better UX
  const [expandedCompetencies, setExpandedCompetencies] = useState<{ [key: string]: boolean }>(() => {
    const initial: { [key: string]: boolean } = {}
    barsData.competencies.forEach(competency => {
      initial[competency.competencyId] = true // Start with competencies expanded
    })
    return initial
  })
  const [expandedKeyActions, setExpandedKeyActions] = useState<{ [key: string]: boolean }>({})

  const toggleCompetency = (competencyId: string) => {
    setExpandedCompetencies(prev => ({
      ...prev,
      [competencyId]: !prev[competencyId]
    }))
  }

  const toggleKeyAction = (keyActionId: string) => {
    setExpandedKeyActions(prev => ({
      ...prev,
      [keyActionId]: !prev[keyActionId]
    }))
  }

  // Get level color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'strength':
        return 'text-green-700'
      case 'meet-requirement':
        return 'text-yellow-700'
      case 'need-improvement':
        return 'text-red-700'
      default:
        return 'text-gray-700'
    }
  }

  // Get level icon
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'strength':
        return '🟢'
      case 'meet-requirement':
        return '🟡'
      case 'need-improvement':
        return '🔴'
      default:
        return '⚪'
    }
  }

  // Get level label
  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'strength':
        return 'Strength [+]'
      case 'meet-requirement':
        return 'Meet Requirement [/]'
      case 'need-improvement':
        return 'Need Improvement [-]'
      default:
        return level
    }
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm h-full transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">BARS Reference</h3>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          title={isCollapsed ? "Expand BARS Reference" : "Collapse BARS Reference"}
        >
          {isCollapsed ? (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="p-4 overflow-y-auto h-[calc(100%-73px)]">
          {/* Hierarchical BARS Structure */}
          <div className="space-y-4">
            {barsData.competencies.map((competency) => (
              <div key={competency.competencyId} className="border border-gray-200 rounded-lg">
                {/* Competency Header */}
                <button
                  onClick={() => toggleCompetency(competency.competencyId)}
                  className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-t-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-800 text-left">
                      {competency.competencyTitle}
                    </h3>
                  </div>
                  {expandedCompetencies[competency.competencyId] ? (
                    <ChevronUp className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                {/* Competency Content */}
                {expandedCompetencies[competency.competencyId] && (
                  <div className="p-3">
                    <p className="text-xs text-gray-600 mb-4">{competency.competencyDefinition}</p>

                    {/* Key Actions */}
                    <div className="space-y-3">
                      {competency.keyActions.map((keyAction) => (
                        <div key={keyAction.keyActionId} className="border border-gray-100 rounded-md">
                          {/* Key Action Header */}
                          <button
                            onClick={() => toggleKeyAction(keyAction.keyActionId)}
                            className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-t-md transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-8 h-5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                {keyAction.keyActionCode}
                              </span>
                              <h4 className="font-medium text-blue-900 text-left">
                                {keyAction.keyActionTitle}
                              </h4>
                            </div>
                            {expandedKeyActions[keyAction.keyActionId] ? (
                              <ChevronUp className="w-4 h-4 text-blue-600" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-blue-600" />
                            )}
                          </button>

                          {/* Key Action Content */}
                          {expandedKeyActions[keyAction.keyActionId] && (
                            <div className="p-3 bg-white">
                              <p className="text-xs text-gray-600 mb-3">{keyAction.keyActionDescription}</p>

                              {/* BARS Behaviors by Level */}
                              <div className="space-y-4">
                                {(['strength', 'meet-requirement', 'need-improvement'] as const).map((level) => {
                                  const behaviors = keyAction.behaviors[level]
                                  if (behaviors.length === 0) return null

                                  return (
                                    <div key={level}>
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm">{getLevelIcon(level)}</span>
                                        <h5 className={`font-medium text-sm ${getLevelColor(level)}`}>
                                          {getLevelLabel(level)}
                                        </h5>
                                      </div>

                                      <div className="space-y-1 ml-6">
                                        {behaviors.map((behavior) => (
                                          <div
                                            key={behavior.id}
                                            className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                                          >
                                            <CheckCircle className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-gray-700 leading-relaxed">
                                              {behavior.description}
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {barsData.competencies.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                No BARS items available for this simulation
              </p>
            </div>
          )}
        </div>
      )}

      {/* Collapsed State Icon */}
      {isCollapsed && (
        <div className="flex flex-col items-center justify-center h-[calc(100%-73px)] gap-2">
          <BookOpen className="w-6 h-6 text-gray-400" />
          <div className="mt-4 writing-mode-vertical text-xs text-gray-500 transform rotate-90">
            BARS
          </div>
        </div>
      )}
    </div>
  )
}
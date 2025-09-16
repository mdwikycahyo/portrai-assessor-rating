"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle } from "lucide-react"

interface BARSItem {
  id: string
  description: string
  level: 'strength' | 'meet-requirement' | 'need-improvement'
}

interface CollapsibleReferencePanelProps {
  barsItems: BARSItem[]
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function CollapsibleReferencePanel({
  barsItems,
  isCollapsed,
  onToggleCollapse
}: CollapsibleReferencePanelProps) {
  // Group BARS items by level
  const groupedBARS = {
    strength: barsItems.filter(item => item.level === 'strength'),
    'meet-requirement': barsItems.filter(item => item.level === 'meet-requirement'),
    'need-improvement': barsItems.filter(item => item.level === 'need-improvement')
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
          {/* BARS Categories */}
          <div className="space-y-6">
            {Object.entries(groupedBARS).map(([level, items]) => {
              if (items.length === 0) return null

              return (
                <div key={level}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{getLevelIcon(level)}</span>
                    <h4 className={`font-semibold ${getLevelColor(level)}`}>
                      {getLevelLabel(level)}
                    </h4>
                  </div>

                  <div className="space-y-2 ml-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-800 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Empty State */}
          {barsItems.length === 0 && (
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
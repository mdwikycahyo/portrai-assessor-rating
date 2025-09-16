"use client"

import { useState, useEffect } from "react"

// New stimulus-response imports
import { mockSimulations } from "../data/mock-simulations"
import { mockParticipants } from "../data/mock-participants"
import { SimulationData } from "../data/stimulus-response-types"
import { ParticipantSimulationHeader } from "../components/ParticipantSimulationHeader"
import { StimulusResponseChain } from "../components/StimulusResponseChain"
import { CollapsibleReferencePanel } from "../components/CollapsibleReferencePanel"
import { KeyActionRatingCard } from "../components/KeyActionRatingCard"

// Existing components to preserve
import { AssessorSidebar } from "../components/assessor-sidebar"
import { barsChecklist } from "../data/bars-checklist"
import { getCompetenciesForSimulation } from "../data/competency-mappings"
import { HierarchicalBARSData } from "../data/stimulus-response-types"

export default function RatingPage() {
  // Hardcode participant ID to "1"
  const participantId = "1"

  // New state management for stimulus-response framework
  const [simulations] = useState<SimulationData[]>(mockSimulations)
  const [activeSimulationId, setActiveSimulationId] = useState<string>(mockSimulations[0]?.id || "")
  const [expandedChains, setExpandedChains] = useState<{ [chainId: string]: boolean }>({})
  const [isReferencePanelCollapsed, setIsReferencePanelCollapsed] = useState<boolean>(true)

  // Get participant info
  const participant = mockParticipants.find((p) => p.id === participantId)
  const activeSimulation = simulations.find(s => s.id === activeSimulationId)

  // New handler functions for stimulus-response framework
  const handleTabChange = (simulationId: string) => {
    setActiveSimulationId(simulationId)
  }

  const handleToggleExpand = (chainId: string) => {
    setExpandedChains(prev => ({
      ...prev,
      [chainId]: !prev[chainId]
    }))
  }


  const handleAssessorNotesUpdate = (keyActionId: string, notes: string) => {
    if (!activeSimulation) return

    // Update assessor notes for specific key action
    console.log("Updating assessor notes for", keyActionId, ":", notes)
    // TODO: Implement state update for key action specific assessor notes
  }

  const handleRatingOverride = (keyActionId: string, rating: 'strength' | 'meet-requirement' | 'need-improvement') => {
    if (!activeSimulation) return

    console.log("Overriding AI rating for", keyActionId, ":", rating)
    // TODO: Implement key action specific rating override functionality
  }

  const handleSaveRating = (keyActionId: string) => {
    if (!activeSimulation) return

    console.log("Saving rating for key action:", keyActionId, "in simulation:", activeSimulation.id)
    alert(`Penilaian untuk Key Action ${keyActionId} berhasil disimpan!`)
  }

  // Get hierarchical BARS data for current simulation
  const getHierarchicalBARSData = (): HierarchicalBARSData => {
    if (!activeSimulation) return { competencies: [] }

    const competencies = getCompetenciesForSimulation(activeSimulation.id)

    return {
      competencies: competencies.map(competency => ({
        competencyId: competency.id,
        competencyTitle: competency.title,
        competencyDefinition: competency.definition,
        keyActions: competency.keyActions
          .filter(keyAction => activeSimulation.availableBARS[keyAction.id]) // Only include key actions available in simulation
          .map(keyAction => {
            const behaviors = barsChecklist[keyAction.id] || []

            return {
              keyActionId: keyAction.id,
              keyActionTitle: keyAction.title,
              keyActionCode: keyAction.code,
              keyActionDescription: keyAction.description,
              behaviors: {
                strength: behaviors.filter(b => b.level === 'strength').map(b => ({
                  id: b.id,
                  description: b.description,
                  level: b.level as 'strength' | 'meet-requirement' | 'need-improvement'
                })),
                'meet-requirement': behaviors.filter(b => b.level === 'meet-requirement').map(b => ({
                  id: b.id,
                  description: b.description,
                  level: b.level as 'strength' | 'meet-requirement' | 'need-improvement'
                })),
                'need-improvement': behaviors.filter(b => b.level === 'need-improvement').map(b => ({
                  id: b.id,
                  description: b.description,
                  level: b.level as 'strength' | 'meet-requirement' | 'need-improvement'
                }))
              }
            }
          })
      }))
    }
  }

  // Update expanded state for stimulus-response chains
  useEffect(() => {
    if (activeSimulation) {
      // Initialize expanded state for new simulation
      const initialExpanded: { [chainId: string]: boolean } = {}
      activeSimulation.stimulusResponseChains.forEach(chain => {
        if (!(chain.id in expandedChains)) {
          initialExpanded[chain.id] = chain.isExpanded
        }
      })

      if (Object.keys(initialExpanded).length > 0) {
        setExpandedChains(prev => ({ ...prev, ...initialExpanded }))
      }
    }
  }, [activeSimulation, expandedChains])

  if (!participant) {
    return <div>Participant not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AssessorSidebar />

      <div className="pl-28 pr-4 py-4">
        {/* Combined Participant & Simulation Header */}
        <ParticipantSimulationHeader
          participant={participant}
          simulations={simulations}
          activeSimulationId={activeSimulationId}
          onTabChange={handleTabChange}
        />

        {/* Main Layout */}
        <div className="flex gap-4 h-[calc(100vh-200px)]">
          {/* Main Content Area */}
          <div className="flex-1 transition-all duration-300">
            <div className="bg-white border border-gray-200 rounded-lg p-6 h-full overflow-y-auto">
              {activeSimulation ? (
                <>
                  {/* Simulation Content */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {activeSimulation.name}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Tinjau rangkaian interaksi di bawah ini untuk menilai perilaku partisipan.
                    </p>

                    {/* Competencies Being Measured */}
                    {(() => {
                      const competencies = getCompetenciesForSimulation(activeSimulation.id)
                      if (competencies.length > 0) {
                        return (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-900 mb-2">
                              Kompetensi yang Diukur:
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {competencies.map((competency) => (
                                <div key={competency.id} className="bg-white border border-blue-100 rounded p-3">
                                  <h4 className="font-medium text-blue-800 mb-1">
                                    {competency.title}
                                  </h4>
                                  <div className="text-xs text-blue-600 space-y-1">
                                    {competency.keyActions.map((keyAction) => (
                                      <div key={keyAction.id} className="flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center w-6 h-4 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                          {keyAction.code}
                                        </span>
                                        <span>{keyAction.title}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      }
                      return null
                    })()}
                  </div>

                  {/* Stimulus-Response Chains */}
                  <div className="space-y-4 mb-8">
                    {activeSimulation.stimulusResponseChains
                      .sort((a, b) => a.chronologicalOrder - b.chronologicalOrder)
                      .map((chain) => (
                        <StimulusResponseChain
                          key={chain.id}
                          stimulusResponse={{
                            ...chain,
                            isExpanded: expandedChains[chain.id] || false
                          }}
                          onToggleExpand={handleToggleExpand}
                        />
                      ))}
                  </div>

                  {/* Key Action Rating Cards */}
                  <div className="space-y-6">
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Penilaian Key Action
                      </h2>
                      <p className="text-gray-600">
                        Tinjau rekomendasi dari AI dan berikan penilaian Anda untuk setiap Key Action yang diukur dalam simulasi ini.
                      </p>
                    </div>

                    {/* Render individual KeyActionRatingCard for each key action */}
                    {Object.entries(activeSimulation.keyActionRatings).map(([keyActionId, rating]) => (
                      <KeyActionRatingCard
                        key={keyActionId}
                        rating={rating}
                        onRatingOverride={handleRatingOverride}
                        onAssessorNotesUpdate={handleAssessorNotesUpdate}
                        onSaveRating={handleSaveRating}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No simulation selected</p>
                </div>
              )}
            </div>
          </div>

          {/* Collapsible Reference Panel */}
          <CollapsibleReferencePanel
            barsData={getHierarchicalBARSData()}
            isCollapsed={isReferencePanelCollapsed}
            onToggleCollapse={() => setIsReferencePanelCollapsed(!isReferencePanelCollapsed)}
          />
        </div>
      </div>
    </div>
  )
}

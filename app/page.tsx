"use client"

import { useState, useEffect } from "react"
import { Save, Sparkles } from "lucide-react"

// New stimulus-response imports
import { mockSimulations } from "../data/mock-simulations"
import { mockParticipants } from "../data/mock-participants"
import { SimulationData } from "../data/stimulus-response-types"
import { ParticipantSimulationHeader } from "../components/ParticipantSimulationHeader"
import { StimulusResponseChain } from "../components/StimulusResponseChain"
import { CollapsibleReferencePanel } from "../components/CollapsibleReferencePanel"

// Existing components to preserve
import { AssessorSidebar } from "../components/assessor-sidebar"
import { barsChecklist } from "../data/bars-checklist"

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


  const handleAssessorNotesUpdate = (notes: string) => {
    if (!activeSimulation) return

    // Update assessor notes for current simulation
    console.log("Updating assessor notes:", notes)
    // TODO: Implement state update for assessor notes
  }

  const handleRatingOverride = (rating: 'strength' | 'meet-requirement' | 'need-improvement') => {
    if (!activeSimulation) return

    console.log("Overriding AI rating:", rating)
    // TODO: Implement rating override functionality
  }

  const handleSaveRating = () => {
    if (!activeSimulation) return

    console.log("Saving rating for simulation:", activeSimulation.id)
    alert("Rating saved successfully!")
  }

  // Get BARS items for current simulation (from existing checklist)
  const getCurrentBARSItems = () => {
    if (!activeSimulation) return []

    // Convert existing BARS checklist format to new format
    const allItems = Object.entries(barsChecklist).flatMap(([, behaviors]) =>
      behaviors.map(behavior => ({
        id: behavior.id,
        description: behavior.description,
        level: behavior.level as 'strength' | 'meet-requirement' | 'need-improvement'
      }))
    )
    return allItems
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
                    <p className="text-gray-600">
                      Tinjau rangkaian interaksi di bawah ini untuk menilai perilaku partisipan.
                    </p>
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

                  {/* AI Assessment Rating Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Key Action Assessment
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* AI Recommendation */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">AI Recommendation:</h4>
                        <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          activeSimulation.keyActionRating.aiRecommendation === "strength"
                            ? "bg-green-100 text-green-800"
                            : activeSimulation.keyActionRating.aiRecommendation === "meet-requirement"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {activeSimulation.keyActionRating.aiRecommendation === "strength" && "Strength"}
                          {activeSimulation.keyActionRating.aiRecommendation === "meet-requirement" && "Meet Requirement"}
                          {activeSimulation.keyActionRating.aiRecommendation === "need-improvement" && "Need Improvement"}
                        </div>

                        <div className="mt-3 p-3 bg-white rounded-md border">
                          <p className="text-sm text-gray-700">
                            {activeSimulation.keyActionRating.aiReasoning}
                          </p>
                        </div>
                      </div>

                      {/* Assessor Override */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Assessor Override:</h4>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          defaultValue={activeSimulation.keyActionRating.aiRecommendation}
                          onChange={(e) => handleRatingOverride(e.target.value as any)}
                        >
                          <option value="strength">Strength</option>
                          <option value="meet-requirement">Meet Requirement</option>
                          <option value="need-improvement">Need Improvement</option>
                        </select>

                        <div className="mt-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Assessor Notes (Required):
                          </label>
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            placeholder="Provide detailed rationale for your assessment..."
                            value={activeSimulation.keyActionRating.assessorNotes}
                            onChange={(e) => handleAssessorNotesUpdate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={handleSaveRating}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save Assessment
                      </button>
                    </div>
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
            barsItems={getCurrentBARSItems()}
            isCollapsed={isReferencePanelCollapsed}
            onToggleCollapse={() => setIsReferencePanelCollapsed(!isReferencePanelCollapsed)}
          />
        </div>
      </div>
    </div>
  )
}

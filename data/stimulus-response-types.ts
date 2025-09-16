// Stimulus-Response Framework Data Types
// Based on PRD requirements for the new assessment interface

// Single message in a chat thread
export interface ChatMessage {
  id: string
  sender: 'ai' | 'participant'
  content: string
  timestamp: string
  type?: 'text' | 'document-link' | 'system-message'
}

// Single message in an email thread
export interface EmailMessage {
  id: string
  sender: 'ai' | 'participant'
  subject: string
  content: string
  timestamp: string
  replyTo?: string // Parent email ID for threading
  attachments?: string[]
  type?: 'new' | 'reply' | 'forward'
}

// Enhanced AI Actor for both single stimulus and chat/email threads
export interface AIActor {
  name: string
  role: string
  content: string // Legacy: single stimulus content
  chatMessages?: ChatMessage[] // New: multi-bubble chat thread
  emailMessages?: EmailMessage[] // New: email thread
  communicationType: 'email' | 'chat' | 'call' | 'document' | 'system'
}

export interface ParticipantAction {
  type: 'email' | 'document' | 'chat' | 'call' | 'document-creation'
  description: string
  duration: number // in minutes
  content?: string // actual participant content (email text, document, etc.)
  timestamp?: string
}

// Highlighted text segment within a chat or email message
export interface HighlightedSegment {
  messageId: string
  startIndex: number
  endIndex: number
  text: string
  category?: 'strength' | 'meet-requirement' | 'need-improvement' // Added for UI rendering
}

export interface BARSEvidence {
  category: 'strength' | 'meet-requirement' | 'need-improvement'
  behaviorId: string
  description: string
  evidence: string
  aiConfidence?: number // 0-100 for AI confidence level
  highlightedSegments?: HighlightedSegment[] // New: highlighted chat segments
}

export interface StimulusResponse {
  id: string
  aiActor: AIActor
  participantActions: ParticipantAction[]
  identifiedBARS: BARSEvidence[]
  isExpanded: boolean
  chronologicalOrder: number // for sorting
}

export interface KeyActionRating {
  aiRecommendation: 'strength' | 'meet-requirement' | 'need-improvement'
  aiReasoning: string
  assessorOverride?: 'strength' | 'meet-requirement' | 'need-improvement'
  assessorNotes: string
  isDraft: boolean
}

export interface SimulationData {
  id: string
  name: string
  stimulusResponseChains: StimulusResponse[]
  availableBARS: { [keyActionId: string]: any } // Reference to BARS checklist
  keyActionRating: KeyActionRating
  isCompleted: boolean
}

// Enhanced Participant interface with additional context
export interface ParticipantContext {
  id: string
  name: string
  company: string
  role: string
  sessionDuration: string
  assessmentDate: string
  assessorName: string
  batchName?: string
  status: "Pending Rating" | "Rating In Progress" | "Completed"
}

// Enhanced Assessment interface for multiple simulations
export interface MultiSimulationAssessment {
  participant: ParticipantContext
  simulations: SimulationData[]
  overallSummary: string
  isCompleted: boolean
  completedAt?: string
}

// Migration helpers - interfaces to bridge current and new data models
export interface LegacyInteractionToStimulusMapping {
  interactionId: string
  stimulusResponseId: string
  aiActorName: string
  aiActorRole: string
  stimulusContent: string
}

// AI Evidence Enhancement for Stimulus-Response
export interface EnhancedAIBehaviorEvidence {
  behaviorId: string
  stimulusResponseId: string
  evidenceSegments: string[]
  confidence: number
  reasoning: string
  category: 'strength' | 'meet-requirement' | 'need-improvement'
}

// Rating levels enum for type safety
export type RatingLevel = 'strength' | 'meet-requirement' | 'need-improvement'

// Utility type for BARS checklist mapping
export interface BARSChecklistItem {
  id: string
  description: string
  level: RatingLevel
  keyActionId: string
}
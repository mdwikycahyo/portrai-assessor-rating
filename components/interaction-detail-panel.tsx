"use client"

import { X, Mail, MessageCircle, FileText, Bot, Phone, Clock, Users, ChevronDown } from "lucide-react"
import type { Interaction } from "../data/mock-assessment"
import ReactMarkdown from "react-markdown"

interface InteractionDetailPanelProps {
  evidence: Interaction
  onClose: () => void
  allInteractions?: Interaction[] // New prop for all available interactions
}

export function InteractionDetailPanel({ evidence, onClose, allInteractions = [] }: InteractionDetailPanelProps) {
  // Find related interactions and create chronological thread
  const relatedInteractions = allInteractions.filter(
    (interaction) =>
      interaction.simulationName === evidence.simulationName || interaction.contextTitle === evidence.contextTitle,
  )

  // Sort chronologically by timestamp
  const chronologicalThread = relatedInteractions.sort((a, b) => {
    // Simple timestamp comparison - you might need to adjust based on your timestamp format
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  })

  const getSourceIcon = (type: Interaction["type"], size = 20) => {
    switch (type) {
      case "email":
        return <Mail size={size} className="text-blue-600" />
      case "chat":
        return <MessageCircle size={size} className="text-green-600" />
      case "document":
        return <FileText size={size} className="text-purple-600" />
      case "document-creation":
        return <FileText size={size} className="text-gray-600" />
      case "chatbot":
        return <Bot size={size} className="text-orange-600" />
      case "call":
        return <Phone size={size} className="text-indigo-600" />
      default:
        return <FileText size={size} className="text-gray-600" />
    }
  }

  const getSourceColor = (type: Interaction["type"]) => {
    switch (type) {
      case "email":
        return "blue"
      case "chat":
        return "green"
      case "document":
        return "purple"
      case "document-creation":
        return "gray"
      case "chatbot":
        return "orange"
      case "call":
        return "indigo"
      default:
        return "gray"
    }
  }

  const renderEmailInterface = (interaction: Interaction) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="p-4 border-b bg-blue-50 border-blue-200 transition-all duration-300">
        <div className="flex items-center gap-3 mb-2">
          <Mail size={20} className="text-blue-600" />
          <h3 className="font-semibold text-blue-900">{interaction.contextTitle}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-blue-700">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{interaction.timestamp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{interaction.participants.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {interaction.fullContext.split("---").map((emailPart, index) => {
          const lines = emailPart.trim().split("\n")
          if (lines.length === 0) return null

          const isParticipantResponse = lines[0].includes("Dari: John Doe")

          return (
            <div key={index} className="mb-6 last:mb-0">
              <div
                className={`p-4 rounded-lg border-l-4 transition-all duration-200 ${
                  isParticipantResponse
                    ? "bg-blue-100 border-blue-600 ring-2 ring-blue-200 shadow-sm"
                    : "bg-gray-50 border-blue-400"
                }`}
              >
                {lines.map((line, lineIndex) => {
                  if (
                    line.startsWith("Dari:") ||
                    line.startsWith("Kepada:") ||
                    line.startsWith("Tanggal:") ||
                    line.startsWith("Subjek:")
                  ) {
                    return (
                      <div
                        key={lineIndex}
                        className={`text-sm font-medium mb-1 ${
                          isParticipantResponse ? "text-blue-800" : "text-gray-700"
                        }`}
                      >
                        {line}
                      </div>
                    )
                  } else if (line.trim() === "") {
                    return <div key={lineIndex} className="h-2" />
                  } else {
                    return (
                      <div
                        key={lineIndex}
                        className={`mb-2 leading-relaxed ${
                          isParticipantResponse ? "text-blue-900 font-medium" : "text-gray-800"
                        }`}
                      >
                        {line}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderChatInterface = (interaction: Interaction) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="p-4 border-b bg-green-50 border-green-200 transition-all duration-300">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle size={20} className="text-green-600" />
          <h3 className="font-semibold text-green-900">{interaction.contextTitle}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-green-700">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{interaction.timestamp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{interaction.participants.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto bg-gray-50">
        <div className="space-y-3">
          {interaction.fullContext
            .split("\n")
            .filter((line) => line.trim())
            .map((message, index) => {
              const timeMatch = message.match(/^\[(.+?)\]/)
              const senderMatch = message.match(/^\[.+?\]\s*(.+?):\s*(.+)$/)

              if (senderMatch) {
                const [, sender, content] = senderMatch
                const isParticipant = sender === "John Doe"

                return (
                  <div key={index} className={`flex ${isParticipant ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg transition-all duration-200 ${
                        isParticipant
                          ? "bg-green-600 text-white ring-2 ring-green-300 shadow-sm"
                          : "bg-white border border-gray-200 text-gray-800 shadow-sm"
                      }`}
                    >
                      <div className={`text-xs mb-1 ${isParticipant ? "text-green-100 font-medium" : "opacity-75"}`}>
                        {sender}
                      </div>
                      <div className={`text-sm leading-relaxed ${isParticipant ? "font-medium" : ""}`}>{content}</div>
                    </div>
                  </div>
                )
              }
              return null
            })}
        </div>
      </div>
    </div>
  )

  const renderDocumentInterface = (interaction: Interaction) => {
    // Parse document data
    const lines = interaction.fullContext.split("\n")
    const documentTitle =
      lines.find((line) => line.startsWith("DOCUMENT_TITLE:"))?.replace("DOCUMENT_TITLE: ", "") ||
      interaction.contextTitle
    const documentOpened = lines.find((line) => line.startsWith("DOCUMENT_OPENED:"))?.replace("DOCUMENT_OPENED: ", "")
    const documentClosed = lines.find((line) => line.startsWith("DOCUMENT_CLOSED:"))?.replace("DOCUMENT_CLOSED: ", "")
    const readingTime = lines
      .find((line) => line.startsWith("TOTAL_READING_TIME:"))
      ?.replace("TOTAL_READING_TIME: ", "")

    // Extract document content (everything after DOCUMENT_CONTENT:)
    const contentStartIndex = lines.findIndex((line) => line.trim() === "DOCUMENT_CONTENT:")
    const documentContent =
      contentStartIndex !== -1 ? lines.slice(contentStartIndex + 1).join("\n") : interaction.fullContext

    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="p-4 border-b bg-purple-50 border-purple-200 transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <FileText size={20} className="text-purple-600" />
            <h3 className="font-semibold text-purple-900">{documentTitle}</h3>
          </div>
          <div className="grid grid-cols-1 gap-2 text-sm text-purple-700">
            {documentOpened && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>Dibuka: {documentOpened}</span>
              </div>
            )}
            {documentClosed && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>Ditutup: {documentClosed}</span>
              </div>
            )}
            {readingTime && (
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>Durasi Membaca: {readingTime}</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto bg-white">
          <div className="prose prose-sm max-w-none">
            {documentContent.split("\n").map((line, index) => {
              if (line.trim() === "") {
                return <div key={index} className="h-4" />
              } else if (line.includes("[HIGHLIGHTED]") && line.includes("[/HIGHLIGHTED]")) {
                // Handle highlighted text
                const parts = line.split(/(\[HIGHLIGHTED\].*?\[\/HIGHLIGHTED\])/)
                return (
                  <p key={index} className="text-gray-800 mb-3 leading-relaxed">
                    {parts.map((part, partIndex) => {
                      if (part.startsWith("[HIGHLIGHTED]") && part.endsWith("[/HIGHLIGHTED]")) {
                        const highlightedText = part.replace("[HIGHLIGHTED]", "").replace("[/HIGHLIGHTED]", "")
                        return (
                          <span key={partIndex} className="bg-yellow-200 px-1 py-0.5 rounded font-medium">
                            {highlightedText}
                          </span>
                        )
                      }
                      return part
                    })}
                  </p>
                )
              } else if (line.match(/^[A-Z\s]+$/) && line.length > 3) {
                // Headers (all caps, longer than 3 chars)
                return (
                  <h3 key={index} className="text-lg font-bold text-purple-900 mt-6 mb-3 first:mt-0">
                    {line}
                  </h3>
                )
              } else if (line.match(/^\d+\./)) {
                // Numbered lists
                return (
                  <div key={index} className="ml-4 mb-2 text-gray-800">
                    {line}
                  </div>
                )
              } else if (line.includes(":") && !line.startsWith("   ")) {
                // Key-value pairs or subheadings (not indented)
                return (
                  <div key={index} className="font-medium text-gray-900 mt-4 mb-2">
                    {line}
                  </div>
                )
              } else {
                // Regular text
                return (
                  <p key={index} className="text-gray-800 mb-3 leading-relaxed">
                    {line}
                  </p>
                )
              }
            })}
          </div>
        </div>
      </div>
    )
  }

  const renderDocumentCreationInterface = (interaction: Interaction) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="p-4 border-b bg-gray-50 border-gray-200 transition-all duration-300">
        <div className="flex items-center gap-3 mb-2">
          <FileText size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">{interaction.contextTitle}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{interaction.timestamp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>Penulis: {interaction.participants.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="p-6 max-h-96 overflow-y-auto">
        <div className="prose prose-sm max-w-none">
          {interaction.fullContext.split("\n").map((line, index) => {
            if (line.trim() === "") {
              return <div key={index} className="h-4" />
            } else if (line.match(/^[A-Z\s]+$/)) {
              // Headers (all caps)
              return (
                <h3 key={index} className="text-lg font-bold text-gray-900 mt-6 mb-3 first:mt-0">
                  {line}
                </h3>
              )
            } else if (line.match(/^\d+\./)) {
              // Numbered lists
              return (
                <div key={index} className="ml-4 mb-2 text-gray-800">
                  {line}
                </div>
              )
            } else if (line.includes(":")) {
              // Key-value pairs or subheadings
              return (
                <div key={index} className="font-medium text-gray-900 mt-4 mb-2">
                  {line}
                </div>
              )
            } else {
              // Regular text
              return (
                <p key={index} className="text-gray-800 mb-3 leading-relaxed">
                  {line}
                </p>
              )
            }
          })}
        </div>
      </div>
    </div>
  )

  const renderChatbotInterface = (interaction: Interaction) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="p-4 border-b bg-orange-50 border-orange-200 transition-all duration-300">
        <div className="flex items-center gap-3 mb-2">
          <Bot size={20} className="text-orange-600" />
          <h3 className="font-semibold text-orange-900">{interaction.contextTitle}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-orange-700">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{interaction.timestamp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{interaction.participants.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto bg-gradient-to-b from-orange-25 to-gray-50">
        <div className="space-y-4">
          {(() => {
            // Parse the conversation more intelligently
            const text = interaction.fullContext.trim()
            const messages = []

            // Split by lines that start with either "John Doe:" or "AI Assistant:"
            const lines = text.split("\n")
            let currentMessage = null

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i]

              // Check if this line starts a new message
              if (line.startsWith("John Doe:") || line.startsWith("AI Assistant:")) {
                // Save previous message if exists
                if (currentMessage) {
                  messages.push(currentMessage)
                }

                // Start new message
                const colonIndex = line.indexOf(":")
                const speaker = line.substring(0, colonIndex).trim()
                const content = line.substring(colonIndex + 1).trim()

                currentMessage = {
                  speaker,
                  content: content,
                }
              } else if (currentMessage && line.trim()) {
                // Add line to current message content
                currentMessage.content += "\n" + line
              } else if (currentMessage && !line.trim()) {
                // Empty line - add as line break in content
                currentMessage.content += "\n"
              }
            }

            // Don't forget the last message
            if (currentMessage) {
              messages.push(currentMessage)
            }

            return messages.map((message, index) => {
              const { speaker, content } = message
              const isUser = speaker.includes("John Doe")
              const isAI = speaker.includes("AI Assistant")

              return (
                <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-lg transition-all duration-200 ${
                      isUser
                        ? "bg-orange-600 text-white ring-2 ring-orange-300 shadow-sm"
                        : isAI
                          ? "bg-white border border-orange-200 text-gray-800 shadow-sm"
                          : "bg-gray-100 text-gray-800 shadow-sm"
                    }`}
                  >
                    <div className={`text-xs font-medium mb-2 ${isUser ? "text-orange-100" : "opacity-75"}`}>
                      {isAI ? "🤖 AI Assistant" : isUser ? "👤 John Doe" : speaker}
                    </div>
                    <div className={`prose prose-sm max-w-none text-sm leading-relaxed ${isUser ? "font-medium" : ""}`}>
                      <ReactMarkdown>{content.trim()}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              )
            })
          })()}
        </div>
      </div>
    </div>
  )

  const renderCallInterface = (interaction: Interaction) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="p-4 border-b bg-indigo-50 border-indigo-200 transition-all duration-300">
        <div className="flex items-center gap-3 mb-2">
          <Phone size={20} className="text-indigo-600" />
          <h3 className="font-semibold text-indigo-900">{interaction.contextTitle}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-indigo-700">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{interaction.timestamp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{interaction.participants.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="space-y-3">
          {interaction.fullContext.split("\n").map((line, index) => {
            if (line.trim() === "") return <div key={index} className="h-2" />

            const isParticipantLine = line.startsWith("John Doe:")

            return (
              <div
                key={index}
                className={`p-3 rounded-lg leading-relaxed transition-all duration-200 ${
                  isParticipantLine
                    ? "bg-indigo-100 border-l-4 border-indigo-600 text-indigo-900 ring-1 ring-indigo-200 font-medium shadow-sm"
                    : "bg-gray-50 text-gray-800"
                }`}
              >
                {line}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderInteractionContent = (interaction: Interaction) => {
    switch (interaction.type) {
      case "email":
        return renderEmailInterface(interaction)
      case "chat":
        return renderChatInterface(interaction)
      case "document":
        return renderDocumentInterface(interaction)
      case "document-creation":
        return renderDocumentCreationInterface(interaction)
      case "chatbot":
        return renderChatbotInterface(interaction)
      case "call":
        return renderCallInterface(interaction)
      default:
        return renderDocumentInterface(interaction)
    }
  }

  // Use chronological thread if there are related interactions, otherwise just show the single evidence
  const interactionsToRender = chronologicalThread.length > 1 ? chronologicalThread : [evidence]
  const sourceColor = getSourceColor(evidence.type)

  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg mr-4 shadow-lg">
      {/* Panel Header */}
      <div
        className={`flex items-center justify-between p-4 border-b bg-gradient-to-r from-${sourceColor}-50 to-${sourceColor}-100 border-${sourceColor}-200`}
      >
        <div className="flex items-center gap-3">
          {getSourceIcon(evidence.type)}
          <div>
            <h2 className={`text-lg font-semibold text-${sourceColor}-900`}>
              {chronologicalThread.length > 1 ? "Alur Komunikasi Lengkap" : "Konteks Interaksi Penuh"}
            </h2>
            <p className={`text-sm text-${sourceColor}-700`}>
              {chronologicalThread.length > 1
                ? `${chronologicalThread.length} interaksi terkait • ${evidence.simulationName}`
                : `${evidence.activityType} • ${evidence.type.charAt(0).toUpperCase() + evidence.type.slice(1)}`}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className={`text-${sourceColor}-500 hover:text-${sourceColor}-700 p-2 rounded-md hover:bg-${sourceColor}-100 transition-all duration-200 hover:scale-110`}
        >
          <X size={20} />
        </button>
      </div>

      {/* Panel Content - Enhanced Chronological Thread */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-12">
          {interactionsToRender.map((interaction, index) => {
            const interactionColor = getSourceColor(interaction.type)

            return (
              <div key={interaction.id} className="relative">
                {/* Flow indicator chevron */}
                {chronologicalThread.length > 1 && index < interactionsToRender.length - 1 && (
                  <div className="absolute left-0 top-full mt-3 w-6 h-6 flex items-center justify-center z-20">
                    <ChevronDown size={24} className="text-gray-900" />
                  </div>
                )}

                {/* Interaction content with enhanced left margin for timeline */}
                <div>{renderInteractionContent(interaction)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

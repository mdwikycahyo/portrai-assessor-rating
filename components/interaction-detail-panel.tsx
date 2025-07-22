"use client"

import { X, Mail, MessageCircle, FileText, Bot, Phone, Clock, Users } from "lucide-react"
import type { Interaction } from "../data/mock-assessment"
import ReactMarkdown from "react-markdown"

interface InteractionDetailPanelProps {
  evidence: Interaction
  onClose: () => void
}

export function InteractionDetailPanel({ evidence, onClose }: InteractionDetailPanelProps) {
  const getSourceIcon = () => {
    switch (evidence.type) {
      case "email":
        return <Mail size={20} className="text-blue-600" />
      case "chat":
        return <MessageCircle size={20} className="text-green-600" />
      case "document":
        return <FileText size={20} className="text-purple-600" />
      case "document-creation": // New type
        return <FileText size={20} className="text-gray-600" /> // Using gray for document creation
      case "chatbot":
        return <Bot size={20} className="text-orange-600" />
      case "call":
        return <Phone size={20} className="text-indigo-600" />
      default:
        return <FileText size={20} className="text-gray-600" />
    }
  }

  const getSourceColor = () => {
    switch (evidence.type) {
      case "email":
        return "blue"
      case "chat":
        return "green"
      case "document":
        return "purple"
      case "document-creation": // New type
        return "gray" // Using gray for document creation
      case "chatbot":
        return "orange"
      case "call":
        return "indigo"
      default:
        return "gray"
    }
  }

  const renderEmailInterface = () => (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="bg-blue-50 p-4 border-b border-blue-200">
        <div className="flex items-center gap-3 mb-2">
          <Mail size={20} className="text-blue-600" />
          <h3 className="font-semibold text-blue-900">{evidence.contextTitle}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-blue-700">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{evidence.timestamp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{evidence.participants.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        {evidence.fullContext.split("---").map((emailPart, index) => {
          const lines = emailPart.trim().split("\n")
          if (lines.length === 0) return null

          const isParticipantResponse = lines[0].includes("Dari: John Doe")

          return (
            <div key={index} className="mb-6 last:mb-0">
              <div
                className={`p-4 rounded-lg border-l-4 ${
                  isParticipantResponse
                    ? "bg-blue-100 border-blue-600" // Distinct style for participant
                    : "bg-gray-50 border-blue-400" // Default style for others
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
                      <div key={lineIndex} className="text-sm font-medium text-gray-700 mb-1">
                        {line}
                      </div>
                    )
                  } else if (line.trim() === "") {
                    return <div key={lineIndex} className="h-2" />
                  } else {
                    return (
                      <div key={lineIndex} className="text-gray-800 mb-2 leading-relaxed">
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

  const renderChatInterface = () => (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="bg-green-50 p-4 border-b border-green-200">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle size={20} className="text-green-600" />
          <h3 className="font-semibold text-green-900">{evidence.contextTitle}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-green-700">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{evidence.timestamp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{evidence.participants.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto bg-gray-50">
        <div className="space-y-3">
          {evidence.fullContext
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
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isParticipant ? "bg-green-600 text-white" : "bg-white border border-gray-200 text-gray-800"
                      }`}
                    >
                      <div className="text-xs opacity-75 mb-1">{sender}</div>
                      <div className="text-sm leading-relaxed">{content}</div>
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

  const renderDocumentInterface = () => {
    // Parse document data
    const lines = evidence.fullContext.split("\n")
    const documentTitle =
      lines.find((line) => line.startsWith("DOCUMENT_TITLE:"))?.replace("DOCUMENT_TITLE: ", "") || evidence.contextTitle
    const documentOpened = lines.find((line) => line.startsWith("DOCUMENT_OPENED:"))?.replace("DOCUMENT_OPENED: ", "")
    const documentClosed = lines.find((line) => line.startsWith("DOCUMENT_CLOSED:"))?.replace("DOCUMENT_CLOSED: ", "")
    const readingTime = lines
      .find((line) => line.startsWith("TOTAL_READING_TIME:"))
      ?.replace("TOTAL_READING_TIME: ", "")

    // Extract document content (everything after DOCUMENT_CONTENT:)
    const contentStartIndex = lines.findIndex((line) => line.trim() === "DOCUMENT_CONTENT:")
    const documentContent =
      contentStartIndex !== -1 ? lines.slice(contentStartIndex + 1).join("\n") : evidence.fullContext

    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="bg-purple-50 p-4 border-b border-purple-200">
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

  const renderDocumentCreationInterface = () => (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <FileText size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">{evidence.contextTitle}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{evidence.timestamp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>Penulis: {evidence.participants.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="p-6 max-h-96 overflow-y-auto">
        <div className="prose prose-sm max-w-none">
          {evidence.fullContext.split("\n").map((line, index) => {
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

  const renderChatbotInterface = () => (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="bg-orange-50 p-4 border-b border-orange-200">
        <div className="flex items-center gap-3 mb-2">
          <Bot size={20} className="text-orange-600" />
          <h3 className="font-semibold text-orange-900">{evidence.contextTitle}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-orange-700">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{evidence.timestamp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{evidence.participants.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto bg-gradient-to-b from-orange-25 to-gray-50">
        <div className="space-y-4">
          {(() => {
            // Parse the conversation more intelligently
            const text = evidence.fullContext.trim()
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
                    className={`max-w-2xl px-4 py-3 rounded-lg ${
                      isUser
                        ? "bg-orange-600 text-white"
                        : isAI
                          ? "bg-white border border-orange-200 text-gray-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="text-xs font-medium opacity-75 mb-2">
                      {isAI ? "🤖 AI Assistant" : isUser ? "👤 John Doe" : speaker}
                    </div>
                    <div className="prose prose-sm max-w-none text-sm leading-relaxed">
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

  const renderCallInterface = () => (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="bg-indigo-50 p-4 border-b border-indigo-200">
        <div className="flex items-center gap-3 mb-2">
          <Phone size={20} className="text-indigo-600" />
          <h3 className="font-semibold text-indigo-900">{evidence.contextTitle}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-indigo-700">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{evidence.timestamp}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{evidence.participants.join(", ")}</span>
          </div>
        </div>
      </div>

      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="space-y-3">
          {evidence.fullContext.split("\n").map((line, index) => {
            if (line.trim() === "") return <div key={index} className="h-2" />

            const isParticipantLine = line.startsWith("John Doe:")

            return (
              <div
                key={index}
                className={`p-3 rounded-lg leading-relaxed ${
                  isParticipantLine
                    ? "bg-indigo-100 border-l-4 border-indigo-600 text-indigo-900" // Distinct style for participant
                    : "bg-gray-50 text-gray-800" // Default style for others
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

  const renderContent = () => {
    switch (evidence.type) {
      case "email":
        return renderEmailInterface()
      case "chat":
        return renderChatInterface()
      case "document":
        return renderDocumentInterface()
      case "document-creation": // New case for document creation
        return renderDocumentCreationInterface()
      case "chatbot":
        return renderChatbotInterface()
      case "call":
        return renderCallInterface()
      default:
        return renderDocumentInterface()
    }
  }

  const sourceColor = getSourceColor()

  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-lg mr-4">
      {/* Panel Header */}
      <div className={`flex items-center justify-between p-4 border-b bg-${sourceColor}-50 border-${sourceColor}-200`}>
        <div className="flex items-center gap-3">
          {getSourceIcon()}
          <div>
            <h2 className={`text-lg font-semibold text-${sourceColor}-900`}>Konteks Interaksi Penuh</h2>
            <p className={`text-sm text-${sourceColor}-700`}>
              {evidence.activityType} • {evidence.type.charAt(0).toUpperCase() + evidence.type.slice(1)}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className={`text-${sourceColor}-500 hover:text-${sourceColor}-700 p-1 rounded-md hover:bg-${sourceColor}-100 transition-colors`}
        >
          <X size={20} />
        </button>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  )
}

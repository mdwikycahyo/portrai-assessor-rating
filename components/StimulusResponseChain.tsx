"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  User,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  StimulusResponse,
  ChatMessage,
  EmailMessage,
  CallMessage,
  HighlightedSegment,
} from "../data/stimulus-response-types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { AttachmentModal } from "./AttachmentModal";
import {
  getAttachmentContent,
  type AttachmentContent,
} from "../data/attachment-content";
import { getBehaviorContext } from "../data/competency-mappings";

interface StimulusResponseChainProps {
  stimulusResponse: StimulusResponse;
  onToggleExpand: (id: string) => void;
}

export function StimulusResponseChain({
  stimulusResponse,
  onToggleExpand,
}: StimulusResponseChainProps) {
  const { aiActor, identifiedBARS, isExpanded } = stimulusResponse;

  // Modal state for attachment viewing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAttachment, setActiveAttachment] =
    useState<AttachmentContent | null>(null);

  // Handle attachment click
  const handleAttachmentClick = (filename: string) => {
    const content = getAttachmentContent(filename);
    if (content) {
      setActiveAttachment(content);
      setIsModalOpen(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setActiveAttachment(null);
  };

  // Get all highlighted segments for a specific message
  const getHighlightsForMessage = (messageId: string): HighlightedSegment[] => {
    const highlights: HighlightedSegment[] = [];
    identifiedBARS.forEach((bars) => {
      if (bars.highlightedSegments) {
        bars.highlightedSegments.forEach((segment) => {
          if (segment.messageId === messageId) {
            highlights.push({ ...segment, category: bars.category });
          }
        });
      }
    });
    return highlights;
  };

  // Smart word boundary expansion
  const expandToWordBoundaries = (
    text: string,
    startIndex: number,
    endIndex: number
  ) => {
    // Find word boundary before start
    let adjustedStart = startIndex;
    while (adjustedStart > 0 && /\w/.test(text[adjustedStart - 1])) {
      adjustedStart--;
    }

    // Find word boundary after end
    let adjustedEnd = endIndex;
    while (adjustedEnd < text.length && /\w/.test(text[adjustedEnd])) {
      adjustedEnd++;
    }

    return { adjustedStart, adjustedEnd };
  };

  // Find text segments by content matching (more robust than fixed indices)
  const findTextSegments = (text: string, targetText: string) => {
    const segments = [];
    let searchIndex = 0;

    while (true) {
      const foundIndex = text
        .toLowerCase()
        .indexOf(targetText.toLowerCase(), searchIndex);
      if (foundIndex === -1) break;

      const { adjustedStart, adjustedEnd } = expandToWordBoundaries(
        text,
        foundIndex,
        foundIndex + targetText.length
      );

      segments.push({
        startIndex: adjustedStart,
        endIndex: adjustedEnd,
        text: text.substring(adjustedStart, adjustedEnd),
      });

      searchIndex = foundIndex + targetText.length;
    }

    return segments;
  };

  // Render text with enhanced highlighted segments
  const renderHighlightedText = (text: string, messageId: string) => {
    const highlights = getHighlightsForMessage(messageId);

    if (highlights.length === 0) {
      return <span>{text}</span>;
    }

    // Convert highlights to smart segments using content matching
    const smartHighlights = highlights
      .map((highlight) => {
        const segments = findTextSegments(text, highlight.text);
        return segments.map((segment) => ({
          ...segment,
          category: highlight.category,
          behaviorId:
            identifiedBARS.find((b) =>
              b.highlightedSegments?.some(
                (s) => s.messageId === messageId && s.text === highlight.text
              )
            )?.behaviorId || "",
          description:
            identifiedBARS.find((b) =>
              b.highlightedSegments?.some(
                (s) => s.messageId === messageId && s.text === highlight.text
              )
            )?.description || "",
        }));
      })
      .flat();

    if (smartHighlights.length === 0) {
      return <span>{text}</span>;
    }

    // Sort highlights by start index
    const sortedHighlights = smartHighlights.sort(
      (a, b) => a.startIndex - b.startIndex
    );
    const parts = [];
    let lastIndex = 0;

    sortedHighlights.forEach((highlight, index) => {
      // Add text before highlight
      if (highlight.startIndex > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {text.substring(lastIndex, highlight.startIndex)}
          </span>
        );
      }

      // Simple highlighting with enhanced tooltip
      const highlightClass =
        highlight.category === "strength"
          ? "bg-green-100 text-green-800 px-1 rounded cursor-pointer"
          : highlight.category === "meet-requirement"
          ? "bg-yellow-100 text-yellow-800 px-1 rounded cursor-pointer"
          : "bg-red-100 text-red-800 px-1 rounded cursor-pointer";

      parts.push(
        <Tooltip key={`highlight-${index}`}>
          <TooltipTrigger asChild>
            <span className={highlightClass}>{highlight.text}</span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="text-xs">
              <div className="font-medium mb-1">BARS Behavior:</div>
              <div>{highlight.description}</div>
            </div>
          </TooltipContent>
        </Tooltip>
      );

      lastIndex = highlight.endIndex;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key="text-end">{text.substring(lastIndex)}</span>);
    }

    return <>{parts}</>;
  };

  // Get BARS category color
  const getBARSColor = (
    category: "strength" | "meet-requirement" | "need-improvement"
  ) => {
    switch (category) {
      case "strength":
        return "text-green-700 bg-green-50 border-green-200";
      case "meet-requirement":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "need-improvement":
        return "text-red-700 bg-red-50 border-red-200";
    }
  };

  // Get BARS category icon
  const getBARSIcon = (
    category: "strength" | "meet-requirement" | "need-improvement"
  ) => {
    switch (category) {
      case "strength":
        return "🟢";
      case "meet-requirement":
        return "🟡";
      case "need-improvement":
        return "🔴";
    }
  };

  // Detect communication medium from aiActor.communicationType or content
  const getCommunicationMedium = () => {
    // Use explicit communicationType if available
    if (aiActor.communicationType) {
      switch (aiActor.communicationType) {
        case "email":
          return {
            type: "email",
            icon: <Mail className="w-4 h-4" />,
            label: "Email",
          };
        case "chat":
          return {
            type: "chat",
            icon: <MessageSquare className="w-4 h-4" />,
            label: "Chat",
          };
        case "call":
          return {
            type: "call",
            icon: <Phone className="w-4 h-4" />,
            label: "Voice Call",
          };
        case "document":
          return {
            type: "document",
            icon: <FileText className="w-4 h-4" />,
            label: "Document",
          };
        case "system":
          return {
            type: "system",
            icon: <MessageSquare className="w-4 h-4" />,
            label: "System",
          };
      }
    }

    // Fallback: Check if content has email subject line
    if (aiActor.content.includes("Subject:")) {
      return {
        type: "email",
        icon: <Mail className="w-4 h-4" />,
        label: "Email",
      };
    }

    // Default to chat for casual communication
    return {
      type: "chat",
      icon: <MessageSquare className="w-4 h-4" />,
      label: "Chat",
    };
  };

  // Render individual chat message bubble
  const renderChatBubble = (message: ChatMessage) => {
    const isParticipant = message.sender === "participant";
    const isDocumentLink = message.type === "document-link";

    return (
      <div
        key={message.id}
        className={`flex ${
          isParticipant ? "justify-end" : "justify-start"
        } mb-3`}
      >
        {/* AI Actor Avatar */}
        {!isParticipant && (
          <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1">
            <User className="w-4 h-4 text-purple-600" />
          </div>
        )}

        <div
          className={`max-w-[70%] px-4 py-3 rounded-lg shadow-sm ${
            isParticipant
              ? "bg-blue-500 text-white rounded-br-sm"
              : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
          } ${isDocumentLink ? "border-blue-300 bg-blue-50" : ""}`}
        >
          <div className="text-sm leading-relaxed whitespace-pre-line">
            {renderHighlightedText(message.content, message.id)}
          </div>
          <div
            className={`text-xs mt-2 ${
              isParticipant ? "text-blue-100" : "text-gray-500"
            }`}
          >
            {message.timestamp}
          </div>
        </div>

        {/* Participant Avatar */}
        {isParticipant && (
          <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 ml-2 mt-1">
            <User className="w-4 h-4 text-blue-600" />
          </div>
        )}
      </div>
    );
  };

  // Render individual email in thread
  const renderEmailMessage = (email: EmailMessage) => {
    const isParticipant = email.sender === "participant";
    const isReply = email.type === "reply";

    return (
      <div key={email.id} className={`mb-4 ${isReply ? "ml-6" : ""}`}>
        {/* Email Header */}
        <div className="bg-gray-50 p-3 rounded-t-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">
                {isParticipant ? "John (You)" : aiActor.name}
              </span>
              <span className="text-xs text-gray-500">({aiActor.role})</span>
            </div>
            <span className="text-xs text-gray-500">{email.timestamp}</span>
          </div>

          <div className="text-sm">
            <div className="text-gray-600 mb-1">
              <span className="font-medium">Subject:</span> {email.subject}
            </div>
            {email.attachments && email.attachments.length > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <FileText className="w-3 h-3 text-blue-600" />
                <div className="flex flex-wrap gap-1">
                  {email.attachments.map((filename, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAttachmentClick(filename);
                      }}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                      title={`Klik untuk melihat ${filename}`}
                    >
                      {filename}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Email Body */}
        <div className="bg-white p-4 rounded-b-lg border-l border-r border-b border-gray-200">
          <div className="text-sm leading-relaxed whitespace-pre-line text-gray-800">
            {renderHighlightedText(email.content, email.id)}
          </div>
        </div>
      </div>
    );
  };

  // Render individual call message in voice call transcript
  const renderCallMessage = (callMessage: CallMessage) => {
    const isParticipant = callMessage.speaker === "John Doe";

    return (
      <div key={callMessage.id} className="mb-3">
        <div
          className={`p-3 rounded-lg border-l-4 transition-all duration-200 ${
            isParticipant
              ? "bg-blue-50 border-blue-500 ml-4"
              : "bg-gray-50 border-gray-400 mr-4"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-gray-600" />
              <span className={`text-sm font-medium ${
                isParticipant ? "text-blue-700" : "text-gray-700"
              }`}>
                {callMessage.speaker}
              </span>
            </div>
            <span className="text-xs text-gray-500">{callMessage.timestamp}</span>
          </div>
          <div className={`text-sm leading-relaxed ${
            isParticipant ? "text-blue-900" : "text-gray-800"
          }`}>
            {renderHighlightedText(callMessage.content, callMessage.id)}
          </div>
        </div>
      </div>
    );
  };

  // Render document preview for Document System interactions
  const renderDocumentPreview = () => {
    // Find document creation action to get created document info
    const documentCreationAction = stimulusResponse.participantActions?.find(
      (action) => action.type === "document-creation"
    );

    if (!documentCreationAction) return null;

    // Extract document name and content
    const documentName =
      documentCreationAction.content?.match(/"([^"]+\.docx?)"/)?.[1] ||
      "Created Document";
    const documentContent = documentCreationAction.content || "";

    return (
      <div className="mt-4">
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
          {/* Document Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 rounded-t-lg">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">
                {documentName}
              </span>
            </div>
          </div>

          {/* Document Body */}
          <div className="p-6 space-y-4">
            <div className="prose prose-sm max-w-none">
              {/* Enhanced document sections with BARS-aligned highlighting */}
              {documentContent.includes("Executive Summary") && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Executive Summary
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="bg-green-100 text-green-800 px-1 rounded">
                            Analisis komprehensif industri teknologi Q4 2024
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="text-xs">
                            <div className="font-medium mb-1">
                              BARS Evidence:
                            </div>
                            <div>
                              Menunjukkan perhatian terhadap detail dan kualitas
                              output
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>{" "}
                    menunjukkan pertumbuhan signifikan dengan fokus pada AI dan
                    automation sebagai{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="bg-green-100 text-green-800 px-1 rounded">
                            driver utama transformasi digital
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="text-xs">
                            <div className="font-medium mb-1">
                              BARS Evidence:
                            </div>
                            <div>
                              Memproses informasi dari berbagai sumber dengan
                              efektif
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    . Rekomendasi strategis disusun berdasarkan analisis data
                    pasar terkini dan proyeksi tren teknologi ke depan.
                  </p>
                </div>
              )}

              {documentContent.includes("Market Overview") && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Market Overview
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="bg-green-100 text-green-800 px-1 rounded">
                            Data pasar Q4 menunjukkan adopsi teknologi AI
                            meningkat 40%
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="text-xs">
                            <div className="font-medium mb-1">
                              BARS Evidence:
                            </div>
                            <div>
                              Memproses informasi dari berbagai sumber dengan
                              efektif
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>{" "}
                    dibanding periode sebelumnya, dengan sektor enterprise
                    memimpin implementasi.{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="bg-green-100 text-green-800 px-1 rounded">
                            Analisis mendalam terhadap segmentasi pasar
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="text-xs">
                            <div className="font-medium mb-1">
                              BARS Evidence:
                            </div>
                            <div>
                              Menunjukkan perhatian terhadap detail dan kualitas
                              output
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>{" "}
                    mengidentifikasi peluang growth di berbagai vertical
                    industry.
                  </p>
                </div>
              )}

              {documentContent.includes("Technology Trends") && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Technology Trends
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="bg-green-100 text-green-800 px-1 rounded">
                            Fokus pada AI dan automation sebagai tren utama
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="text-xs">
                            <div className="font-medium mb-1">
                              BARS Evidence:
                            </div>
                            <div>
                              Memproses informasi dari berbagai sumber dengan
                              efektif
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    , dengan emerging technologies seperti machine learning dan
                    process automation mendominasi investasi perusahaan.{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="bg-green-100 text-green-800 px-1 rounded">
                            Evaluasi komprehensif dampak teknologi
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="text-xs">
                            <div className="font-medium mb-1">
                              BARS Evidence:
                            </div>
                            <div>
                              Menunjukkan perhatian terhadap detail dan kualitas
                              output
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>{" "}
                    terhadap produktivitas dan efisiensi operasional.
                  </p>
                </div>
              )}

              {documentContent.includes("Competitive Analysis") && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Competitive Analysis
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="bg-green-100 text-green-800 px-1 rounded">
                            Analisis pemain utama di industri teknologi
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="text-xs">
                            <div className="font-medium mb-1">
                              BARS Evidence:
                            </div>
                            <div>
                              Memproses informasi dari berbagai sumber dengan
                              efektif
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>{" "}
                    menunjukkan konsolidasi market share di beberapa perusahaan
                    besar dengan fokus inovasi AI.{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="bg-green-100 text-green-800 px-1 rounded">
                            Pemetaan detail positioning kompetitor
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="text-xs">
                            <div className="font-medium mb-1">
                              BARS Evidence:
                            </div>
                            <div>
                              Menunjukkan perhatian terhadap detail dan kualitas
                              output
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>{" "}
                    dan strategi differentiation yang digunakan.
                  </p>
                </div>
              )}

              {documentContent.includes("Recommendations") && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Strategic Recommendations
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="bg-green-100 text-green-800 px-1 rounded">
                            Strategi Q1 2025 berdasarkan analisis komprehensif
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="text-xs">
                            <div className="font-medium mb-1">
                              BARS Evidence:
                            </div>
                            <div>
                              Memproses informasi dari berbagai sumber dengan
                              efektif
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>{" "}
                    meliputi investasi teknologi AI, partnership strategis, dan
                    pengembangan capability internal.{" "}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="bg-green-100 text-green-800 px-1 rounded">
                            Rencana implementasi detail dengan timeline
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="text-xs">
                            <div className="font-medium mb-1">
                              BARS Evidence:
                            </div>
                            <div>
                              Menunjukkan perhatian terhadap detail dan kualitas
                              output
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>{" "}
                    dan KPI measurement untuk mendukung transformasi digital.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const communicationMedium = getCommunicationMedium();

  return (
    <div className="border border-gray-200 rounded-lg mb-4 bg-white shadow-sm">
      {/* Stimulus Header */}
      <button
        onClick={() => onToggleExpand(stimulusResponse.id)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1">
          {/* AI Actor Icon */}
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-purple-600" />
          </div>

          {/* AI Actor Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {/* Communication Medium */}
              <div className="flex items-center gap-1 text-blue-600">
                {communicationMedium.icon}
                <span className="text-sm font-medium">
                  {communicationMedium.type === "document"
                    ? "Dokumen yang Dibuat Partisipan"
                    : communicationMedium.label}
                </span>
              </div>
              {communicationMedium.type !== "document" && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="font-semibold text-gray-900">
                    {aiActor.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({aiActor.role})
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-700 truncate">
              {aiActor.chatMessages
                ? `💬 ${
                    aiActor.chatMessages[0].content.length > 80
                      ? `${aiActor.chatMessages[0].content.substring(0, 80)}...`
                      : aiActor.chatMessages[0].content
                  }`
                : aiActor.callMessages
                ? `📞 ${
                    aiActor.callMessages[0].content.length > 80
                      ? `${aiActor.callMessages[0].content.substring(0, 80)}...`
                      : aiActor.callMessages[0].content
                  }`
                : aiActor.emailMessages
                ? `📧 ${aiActor.emailMessages[0].subject}`
                : aiActor.content.length > 100
                ? `${aiActor.content.substring(0, 100)}...`
                : aiActor.content}
            </p>
          </div>

          {/* Message & BARS Count */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-xs text-gray-500">
              {identifiedBARS.length} behaviors
            </span>
            {identifiedBARS.length > 0 && (
              <Sparkles className="w-4 h-4 text-blue-500" />
            )}
          </div>
        </div>

        {/* Expand/Collapse Icon */}
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          {/* Chat Thread or Single Stimulus Content */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              {communicationMedium.icon}
              <h4 className="font-medium text-gray-900">
                {communicationMedium.type === "document"
                  ? "Dokumen yang Dibuat Partisipan"
                  : `${communicationMedium.label} with ${aiActor.name} (${aiActor.role})`}
              </h4>
            </div>

            {/* Render Chat Thread if available */}
            {aiActor.chatMessages ? (
              <TooltipProvider>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-3 h-3 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Detail Percakapan
                      </span>
                    </div>
                    <div className="space-y-3">
                      {aiActor.chatMessages.map(renderChatBubble)}
                    </div>
                  </div>
                </div>
              </TooltipProvider>
            ) : aiActor.callMessages ? (
              /* Render Voice Call Transcript if available */
              <TooltipProvider>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Phone className="w-3 h-3 text-indigo-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Transkrip Voice Call
                      </span>
                    </div>
                    <div className="space-y-2">
                      {aiActor.callMessages.map(renderCallMessage)}
                    </div>
                  </div>
                </div>
              </TooltipProvider>
            ) : aiActor.emailMessages ? (
              /* Render Email Thread if available */
              <TooltipProvider>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Detail Thread Email
                      </span>
                    </div>
                    <div className="space-y-0">
                      {aiActor.emailMessages.map(renderEmailMessage)}
                    </div>
                  </div>
                </div>
              </TooltipProvider>
            ) : communicationMedium.type !== "document" ? (
              /* Fallback to single stimulus display */
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {aiActor.content}
                </div>
              </div>
            ) : (
              <span />
            )}

            {/* Document Preview Section for Document System */}
            {communicationMedium.type === "document" && renderDocumentPreview()}
          </div>

          {/* BARS Evidence - Original order with context labels */}
          {identifiedBARS.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <h4 className="font-medium text-gray-900">
                  Perilaku dalam BARS yang Diidentifikasi AI:
                </h4>
              </div>

              <div className="space-y-3">
                {identifiedBARS.map((bars, index) => {
                  const context = getBehaviorContext(bars.behaviorId);

                  return (
                    <div
                      key={`bars-${index}`}
                      className={`p-4 rounded-lg border ${getBARSColor(
                        bars.category
                      )}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg flex-shrink-0">
                          {getBARSIcon(bars.category)}
                        </span>
                        <div className="flex-1">
                          {/* Context label with competency and key action */}
                          {context && (
                            <div className="mb-2 flex items-center gap-2">
                              <span className="inline-flex items-center justify-center w-8 h-5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                {context.keyAction.code}
                              </span>
                              <span className="text-xs text-gray-600">
                                {context.competency.title} -{" "}
                                {context.keyAction.title}
                              </span>
                            </div>
                          )}
                          <span className="font-medium text-gray-900">
                            {bars.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Attachment Modal */}
      <AttachmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        attachment={activeAttachment}
      />
    </div>
  );
}

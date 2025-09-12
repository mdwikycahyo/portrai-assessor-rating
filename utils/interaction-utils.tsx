import { Mail, MessageCircle, FileText, Bot, Phone } from "lucide-react"
import { type Interaction } from "../data/mock-assessment"

export const getInteractionIcon = (type: Interaction["type"]) => {
  switch (type) {
    case "email":
      return <Mail size={20} className="text-blue-600" />
    case "chat":
      return <MessageCircle size={20} className="text-green-600" />
    case "document":
      return <FileText size={20} className="text-purple-600" />
    case "document-creation":
      return <FileText size={20} className="text-gray-600" />
    case "chatbot":
      return <Bot size={20} className="text-orange-600" />
    case "call":
      return <Phone size={20} className="text-indigo-600" />
    default:
      return <FileText size={20} className="text-gray-600" />
  }
}

export const getInteractionTypeLabel = (type: Interaction["type"]) => {
  switch (type) {
    case "email":
      return "Email"
    case "chat":
      return "Chat"
    case "document":
      return "Dokumen"
    case "document-creation":
      return "Membuat Dokumen"
    case "chatbot":
      return "AI Chatbot"
    case "call":
      return "Call"
    default:
      return "Dokumen"
  }
}
"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface FlagModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (comment: string) => void
  currentComment?: string
}

export function FlagModal({ isOpen, onClose, onSubmit, currentComment = "" }: FlagModalProps) {
  const [comment, setComment] = useState(currentComment)

  if (!isOpen) return null

  const handleSubmit = () => {
    onSubmit(comment)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Flag Evidence</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600 mb-3">
            Provide your assessment or override comment for this AI-detected evidence:
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment about this evidence classification..."
            className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Flag
          </button>
        </div>
      </div>
    </div>
  )
}

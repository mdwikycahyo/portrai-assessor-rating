import { type KeyAction } from "../data/mock-assessment"

export const getRatingLabel = (rating: KeyAction["rating"] | "Belum Dinilai") => {
  switch (rating) {
    case "strength":
      return <span className="text-green-600 font-bold">Strength (+)</span>
    case "meet-requirement":
      return <span className="text-yellow-600 font-bold">Meet Requirement (/)</span>
    case "need-improvement":
      return <span className="text-red-600 font-bold">Needs Improvement (-)</span>
    case "Belum Dinilai":
    default:
      return <span className="text-gray-500 font-bold">Belum Dinilai</span>
  }
}
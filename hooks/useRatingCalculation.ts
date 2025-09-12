import { useMemo } from "react"
import { type KeyAction } from "../data/mock-assessment"

export function useRatingCalculation(
  barsSelections: { [keyActionId: string]: { [interactionId: string]: { [behaviorId: string]: boolean } } },
  barsChecklist: { [keyActionId: string]: Array<{ id: string; level: "strength" | "meet-requirement" | "need-improvement" }> }
) {
  const deriveRating = useMemo(() => {
    return (keyActionId: string): KeyAction["rating"] | "Belum Dinilai" => {
      const keyActionSelections = barsSelections[keyActionId] || {}
      const behaviors = barsChecklist[keyActionId] || []

      let totalScore = 0

      Object.values(keyActionSelections).forEach((interactionSelections) => {
        Object.entries(interactionSelections).forEach(([behaviorId, isSelected]) => {
          if (isSelected) {
            const behavior = behaviors.find((b) => b.id === behaviorId)
            if (behavior) {
              switch (behavior.level) {
                case "strength":
                  totalScore += 2
                  break
                case "meet-requirement":
                  totalScore += 1
                  break
                case "need-improvement":
                  totalScore -= 1
                  break
              }
            }
          }
        })
      })

      if (totalScore >= 4) return "strength"
      if (totalScore >= 1) return "meet-requirement"
      if (totalScore < 0) return "need-improvement"
      return "Belum Dinilai"
    }
  }, [barsSelections, barsChecklist])

  const getObservedCount = (keyActionId: string, behaviorId: string): number => {
    const keyActionSelections = barsSelections[keyActionId] || {}
    let count = 0

    Object.values(keyActionSelections).forEach((interactionSelections) => {
      if (interactionSelections[behaviorId]) {
        count++
      }
    })

    return count
  }

  return { deriveRating, getObservedCount }
}
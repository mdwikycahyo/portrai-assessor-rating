export interface Participant {
  id: string
  name: string
  company: string
  batchName: string
  assessmentDate: string
  status: "Pending Rating" | "Rating In Progress" | "Completed"
}

export const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "John Doe",
    company: "DayaTech",
    batchName: "Batch 2025-A",
    assessmentDate: "5 Juli 2025",
    status: "Pending Rating",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    company: "DayaTech",
    batchName: "Batch 2025-A",
    assessmentDate: "4 Juli 2025",
    status: "Rating In Progress",
  },
  {
    id: "3",
    name: "Michael Chen",
    company: "DayaTech",
    batchName: "Batch 2025-B",
    assessmentDate: "3 Juli 2025",
    status: "Completed",
  },
  {
    id: "4",
    name: "Lisa Wong",
    company: "DayaTech",
    batchName: "Batch 2025-A",
    assessmentDate: "2 Juli 2025",
    status: "Pending Rating",
  },
  {
    id: "5",
    name: "Ahmad Rahman",
    company: "DayaTech",
    batchName: "Batch 2025-C",
    assessmentDate: "1 Juli 2025",
    status: "Completed",
  },
]

export const getPendingReviewsCount = () => {
  return mockParticipants.filter((p) => p.status === "Pending Rating").length
}

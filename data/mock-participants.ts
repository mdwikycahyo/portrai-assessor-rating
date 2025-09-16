export interface Participant {
  id: string
  name: string
  company: string
  role: string // New field for participant's role
  sessionDuration: string // New field for total session duration
  assessmentDate: string
  assessorName: string // New field for assigned assessor
  batchName: string
  status: "Pending Rating" | "Rating In Progress" | "Completed"
}

export const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "John Doe",
    company: "DayaTech",
    role: "Operation Manager",
    sessionDuration: "2h 15min",
    assessmentDate: "5 Juli 2025",
    assessorName: "Dwiky Assessor",
    batchName: "Batch 2025-A",
    status: "Pending Rating",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    company: "DayaTech",
    role: "Business Analyst",
    sessionDuration: "1h 45min",
    assessmentDate: "4 Juli 2025",
    assessorName: "Michael Brown",
    batchName: "Batch 2025-A",
    status: "Rating In Progress",
  },
  {
    id: "3",
    name: "Michael Chen",
    company: "DayaTech",
    role: "Project Manager",
    sessionDuration: "2h 30min",
    assessmentDate: "3 Juli 2025",
    assessorName: "Lisa Davis",
    batchName: "Batch 2025-B",
    status: "Completed",
  },
  {
    id: "4",
    name: "Lisa Wong",
    company: "DayaTech",
    role: "Sales Coordinator",
    sessionDuration: "1h 55min",
    assessmentDate: "2 Juli 2025",
    assessorName: "Ahmad Rahman",
    batchName: "Batch 2025-A",
    status: "Pending Rating",
  },
  {
    id: "5",
    name: "Ahmad Rahman",
    company: "DayaTech",
    role: "Operations Manager",
    sessionDuration: "2h 10min",
    assessmentDate: "1 Juli 2025",
    assessorName: "Sarah Wilson",
    batchName: "Batch 2025-C",
    status: "Completed",
  },
]

export const getPendingReviewsCount = () => {
  return mockParticipants.filter((p) => p.status === "Pending Rating").length
}

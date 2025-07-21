"use client"

import { useState, useMemo } from "react"
import { mockParticipants, type Participant } from "../data/mock-participants"
import { AssessorSidebar } from "../components/assessor-sidebar"
import { AssessorHeader } from "../components/assessor-header"
import { Edit, Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AssessorDashboard() {
  const [participants] = useState<Participant[]>(mockParticipants)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("Semua Perusahaan")
  const [selectedBatch, setSelectedBatch] = useState("Semua Batch")
  const [selectedStatus, setSelectedStatus] = useState("Semua Status")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  // Extract unique filter options
  const uniqueCompanies = useMemo(() => {
    const companies = new Set(participants.map((p) => p.company))
    return ["Semua Perusahaan", ...Array.from(companies)]
  }, [participants])

  const uniqueBatches = useMemo(() => {
    const batches = new Set(participants.map((p) => p.batchName))
    return ["Semua Batch", ...Array.from(batches)]
  }, [participants])

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(participants.map((p) => p.status))
    return ["Semua Status", ...Array.from(statuses)]
  }, [participants])

  // Filter participants based on search term and selected filters
  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      const matchesSearch =
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.batchName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCompany = selectedCompany === "Semua Perusahaan" || participant.company === selectedCompany
      const matchesBatch = selectedBatch === "Semua Batch" || participant.batchName === selectedBatch
      const matchesStatus = selectedStatus === "Semua Status" || participant.status === selectedStatus

      return matchesSearch && matchesCompany && matchesBatch && matchesStatus
    })
  }, [participants, searchTerm, selectedCompany, selectedBatch, selectedStatus])

  // Pagination logic
  const totalItems = filteredParticipants.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentParticipants = filteredParticipants.slice(startIndex, endIndex)

  const getStatusBadge = (status: Participant["status"]) => {
    const styles = {
      "Pending Rating": "bg-yellow-100 text-yellow-800",
      "Rating In Progress": "bg-blue-100 text-blue-800",
      Completed: "bg-green-100 text-green-800",
    }

    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>{status}</span>
  }

  const canRate = (status: Participant["status"]) => {
    return status === "Pending Rating" || status === "Rating In Progress"
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Sidebar */}
      <AssessorSidebar />

      {/* Main Content */}
      <div className="pl-24">
        {/* Top Header */}
        <AssessorHeader />

        {/* Page Content */}
        <div className="p-6 mr-6 bg-white border border-gray-200 rounded-lg">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Peserta Assessment</h1>
            <p className="text-gray-600">Mengelola dan memantau seluruh peserta asesmen.</p>
          </div>

          {/* Search Bar and Filters (using Grid) */}
          <div className="mb-6 grid grid-cols-[1fr_auto_auto_auto] gap-4">
            <div className="relative col-span-1">
              {" "}
              {/* Search bar takes 1fr */}
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari peserta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Company Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                  <span>{selectedCompany}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {uniqueCompanies.map((company) => (
                  <DropdownMenuItem key={company} onClick={() => setSelectedCompany(company)}>
                    {company}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Batch Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                  <span>{selectedBatch}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {uniqueBatches.map((batch) => (
                  <DropdownMenuItem key={batch} onClick={() => setSelectedBatch(batch)}>
                    {batch}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                  <span>{selectedStatus}</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {uniqueStatuses.map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setSelectedStatus(status as Participant["status"])}>
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Participants Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-medium text-gray-900 text-sm">Nama Peserta</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900 text-sm">Perusahaan</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900 text-sm">Batch Assessment</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900 text-sm">Tanggal Assessment</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900 text-sm">Status</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-900 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentParticipants.map((participant, index) => (
                    <tr key={participant.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600">{participant.company}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600">{participant.batchName}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600">{participant.assessmentDate}</div>
                      </td>
                      <td className="py-4 px-6">{getStatusBadge(participant.status)}</td>
                      <td className="py-4 px-6 text-center">
                        {canRate(participant.status) ? (
                          <Link
                            href={`/rating/${participant.id}`}
                            className="inline-flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-md transition-colors"
                            title="Start Rating"
                          >
                            <Edit size={16} />
                          </Link>
                        ) : (
                          <p className="text-gray-300 inline-flex items-center justify-center">-</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} participants
              </div>

              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      currentPage === page ? "bg-gray-600 text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Items per page dropdown */}
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="ml-4 px-2 py-1 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value={5}>5 / page</option>
                  <option value={10}>10 / page</option>
                  <option value={20}>20 / page</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

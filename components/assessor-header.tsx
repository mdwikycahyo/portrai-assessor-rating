"use client"

import { ChevronDown, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AssessorHeader() {
  const handleLogout = () => {
    console.log("Logging out...")
    // Redirect to the specified URL
    window.location.href = "https://portrai-participant-demo.vercel.app/"
  }

  return (
    <div className="px-6 py-4 flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">DA</span>
            </div>
            <span className="font-medium text-gray-900">Dwiky Assessor</span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
            <LogOut size={16} className="mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

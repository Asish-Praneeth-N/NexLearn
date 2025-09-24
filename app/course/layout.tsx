'use client'

import React from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { usePathname } from 'next/navigation'

const CourseViewLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isNotesPage = pathname.includes('/notes')

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <DashboardHeader />

      {/* Main content */}
      <main
        className={
          isNotesPage
            ? 'flex-1 mt-0'
            : 'flex-1 mx-10 md:mx-20 lg:px-40 mt-10'
        }
      >
        {children}
      </main>
    </div>
  )
}

export default CourseViewLayout

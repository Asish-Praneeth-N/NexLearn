'use client'

import React from 'react'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { usePathname } from 'next/navigation'

const CourseViewLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const isNotesPage = pathname.includes('/notes')
    
    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />
            <div className={
                isNotesPage 
                    ? 'mt-0'
                    : 'mx-10 md:mx-20 lg:px-40 mt-10'
            }>
                {children}
            </div>
        </div>
    )
}

export default CourseViewLayout

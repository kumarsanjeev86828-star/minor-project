import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function AppHeader() {
    return (
        <div>
           <SidebarTrigger/>
           <UserButton />
            {/* AppHeader */}
        </div>
    )
}

export default AppHeader

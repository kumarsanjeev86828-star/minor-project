import {SidebarProvider,SidebarTrigger} from '@/components/ui/sidebar'
import React from "react"
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
function Workspace(){
    return(
        // <div>Workspace</div>
        <div><WelcomeBanner />
        <CourseList />
        </div>
    )
}
export default Workspace
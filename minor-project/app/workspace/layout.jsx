import React from "react"
import WorkspaceProvider from "./provider"
function WorkspaceLayout({children}){
    return(
        <WorkspaceProvider>
            {children}
        </WorkspaceProvider>
        // <div>WorkspaceLayout</div>
    )
}
export default WorkspaceLayout
import React from "react"
import WorkspaceProvider from "./provider"
function WorkspaceProvider({children}){
    return(
       <WorkspaceProvider>{children}</WorkspaceProvider>
    )
}
export default WorkspaceLayout
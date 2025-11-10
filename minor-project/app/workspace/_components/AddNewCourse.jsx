import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function AddNewCourseDialog({children}){
    return(
        <Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Course Using AI</DialogTitle>
      <DialogDescription asChild>
        <div>
             <div>
                <label>Course Name</label>
                <Input placeholder="Course Name"></Input>
             </div>
             <div>
                <label>Course Description (Optional)</label>
                <Textarea placeholder="Course Description"></Textarea>
             </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    )
}

export default AddNewCourseDialog
import React, { useState } from 'react'
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
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Sparkle } from 'lucide-react'

function AddNewCourseDialog({ children }) {
  const [formData, setFormData] = useState({
  name: '',
  description: '',
  includeVideo: false,
  noOfChapters: 1,
  category: '',
  level: ''
});

  const onGenerate=()=>{
console.log(formData);
  }
  const onHandleInputChanges=(field,value)=>{
     setFormData(prev=>({
      ...prev,
      [field]:value
    }));
    console.log(formData);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className='flex flex-col gap-4 mt-3'>
              <div>
                <label>Course Name</label>
                <Input placeholder="Course Name" onChange={(event)=>onHandleInputChanges('name',event?.target.value)}></Input>
              </div>
              <div>
                <label>Course Description (Optional)</label>
                <Textarea placeholder="Course Description" onChange={(event)=>onHandleInputChanges('description',event?.target.value)}></Textarea>
              </div>
              <div>
                <label>No. Of Chapters</label>
                <Input placeholder="No. of chapters" type='number'
                onChange={(event)=>onHandleInputChanges('noOfChapters',event?.target.value)}></Input>
              </div>
              <div className='flex gap-3 items-center'>
                <label>Include Video</label>
                <Switch  onCheckedChange={()=>onHandleInputChanges('includeVideo',!formData?.includeVideo)}/>
               
              </div>
              <div>
                <label className='mb-2'>Difficulty Level</label>
                <Select onValueChange={(value)=>onHandleInputChanges('level',value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advance">Advance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <div>
                <label>Category</label>
                <Input placeholder="Category(Separated by Comma"  onChange={(event)=>onHandleInputChanges('category',event?.target.value)}></Input>
              </div>
              <div className="mt-5">
                <Button className={"w-full"} onClick={onGenerate}>  <Sparkle /> Generate Course</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewCourseDialog
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle]=useState("")
  const [category,setCategory]=useState("")

  const [createCourse,{data,error,isSuccess,isLoading}]=useCreateCourseMutation()

  const navigate = useNavigate();
  // const isLoading = false;

  const getSelectedCategory=(value)=>{
    // alert(value)
    setCategory(value);
  }

  const createCourseHandler=async()=>{
    await createCourse({courseTitle,category})
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "Course Created Successfully")
      navigate("/admin/course")
    }
  },[isSuccess,error])

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Leds Add course, Lorem ipsum dolor sit amet consectetur adipisicing
          elit.
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
          architecto.
        </p>
      </div>

      <div className="space-y-4">
        <div className="">
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            placeholder="Your Course Name"
            value={courseTitle}
            onChange={(e)=>setCourseTitle(e.target.value)}
          ></Input>
        </div>

        <div className="">
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categoty</SelectLabel>
                <SelectItem value="apple">Next JS</SelectItem>
                <SelectItem value="banana">Data Science</SelectItem>
                <SelectItem value="blueberry">Cybersecurity</SelectItem>
                <SelectItem value="grapes">Devops</SelectItem>
                <SelectItem value="pineapple">AI</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>{
              isLoading?
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                Please wait
              </>:"Create"
            }</Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;

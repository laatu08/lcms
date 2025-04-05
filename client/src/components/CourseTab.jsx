import React, { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import RichTextEditor from "./RichTextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetCourseByIdQuery } from "@/features/api/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
  const isPublished = true;

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const params=useParams()
  const courseId=params.courseId

  const {data:courseByIdData,isLoading:courseByIdLoading}=useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true})

  const course=courseByIdData?.course
  useEffect(()=>{
    if(courseByIdData?.course){
      const course=courseByIdData?.course
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      })
    }
  },[courseByIdData])

  const [previewThumbnail, setPreviewThumbnail] = useState(null);

  const navigate = useNavigate();


  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourse = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewThumbnail(fileReader.result);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({formData, courseId});
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "course updated successfully");
    }

    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);


  if(courseByIdLoading){
    return <h1>Loading.....</h1>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you are done
          </CardDescription>
        </div>

        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "Unpublished" : "Published"}
          </Button>

          <Button>Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Ex. Fullstack Developer"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
            ></Input>
          </div>

          <div>
            <Label>SubTitle</Label>
            <Input
              type="text"
              placeholder="Ex. Become a Fullstack developer from 0 to hero in 2 month"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
            ></Input>
          </div>

          <div className="flex flex-col gap-4">
            <Label>Description</Label>
            {/* <RichTextEditor></RichTextEditor> */}
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              value={input.description}
              onChange={changeEventHandler}
            ></textarea>
          </div>

          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
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

            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectCourse}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                    <SelectItem value="Mythical">Mythical</SelectItem>
                    <SelectItem value="Legendary">Legendary</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price in ($)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="$199.99"
                className="fit"
              ></Input>
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            ></Input>

            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="my-2 w-64"
                alt="course thumbanail"
              ></img>
            )}
          </div>

          <div className="flex gap-4">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button onClick={updateCourseHandler} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateCourseMutation,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  //   const isLoading = false;

  const params = useParams();
  const courseId = params.courseId;

  const navigate = useNavigate();

  const [createLecture, { data, isLoading, error, isSuccess }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    IsError: lectureError,
    refetch
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
        refetch()
      toast.success(data.message);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  console.log(lectureData);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Leds Add lecture, Lorem ipsum dolor sit amet consectetur adipisicing
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
            placeholder="Your Title Name"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          ></Input>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to Course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                Please wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>

        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading Lectures .....</p>
          ) : lectureError ? (
            <p>Failed to load lectures.</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No lecture available</p>
          ) : (
            lectureData.lectures.map((lecture,index)=>(
                <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index}></Lecture>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;

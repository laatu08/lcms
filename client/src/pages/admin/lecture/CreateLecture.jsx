import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
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
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
      setLectureTitle("");  // Clear input after success
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-auto max-w-3xl p-6">
  <div className="mb-6">
    <h1 className="font-bold text-2xl text-gray-800 dark:text-gray-100">
      Add New Lecture
    </h1>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
      Provide a title and start building your course content.
    </p>
  </div>

  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 space-y-5 border border-gray-200 dark:border-gray-700">
    <div>
      <Label className="text-md mb-1 block text-gray-800 dark:text-gray-100">
        Lecture Title
      </Label>
      <Input
        type="text"
        value={lectureTitle}
        onChange={(e) => setLectureTitle(e.target.value)}
        placeholder="Enter lecture title"
        className="w-full"
      />
    </div>

    <div className="flex items-center justify-end gap-3">
      <Button
        variant="outline"
        onClick={() => navigate(`/admin/course/${courseId}`)}
        className="rounded-xl px-5"
      >
        Back to Course
      </Button>
      <Button
        disabled={isLoading || lectureTitle.trim() === ""}
        onClick={createLectureHandler}
        className="rounded-xl px-5"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          "Create Lecture"
        )}
      </Button>
    </div>
  </div>

  <div className="mt-10">
    <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-3">
      Lectures
    </h2>
    {lectureLoading ? (
      <p className="text-gray-500 dark:text-gray-400">Loading lectures...</p>
    ) : lectureError ? (
      <p className="text-red-500 dark:text-red-400">Failed to load lectures.</p>
    ) : lectureData.lectures.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400">No lectures available yet.</p>
    ) : (
      <div className="space-y-3">
        {lectureData.lectures.map((lecture, index) => (
          <Lecture
            key={lecture._id}
            lecture={lecture}
            courseId={courseId}
            index={index}
          />
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default CreateLecture;

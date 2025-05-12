import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess || inCompletedSuccess) {
      refetch();
      toast.success(completedSuccess ? markCompleteData.message : markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  if (isLoading) return <p className="text-center text-gray-400">Loading...</p>;
  if (isError) return <p className="text-center text-red-400">Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;
  const initialLecture = currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) =>
    progress.some((prog) => prog.lectureId === lectureId && prog.viewed);

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{courseTitle}</h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          className="mt-4 sm:mt-0"
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Completed
            </div>
          ) : (
            "Mark as Completed"
          )}
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Video Section */}
        <div className="flex-1 md:w-2/3 bg-muted dark:bg-zinc-800 rounded-2xl p-5 shadow-xl">
          <div className="overflow-hidden rounded-xl">
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto rounded-xl shadow"
              onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture._id)}
            />
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) => lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              }: ${currentLecture?.lectureTitle || initialLecture.lectureTitle}`}
            </h3>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Course Lectures</h2>
          <div className="flex flex-col gap-4 max-h-[75vh] overflow-y-auto pr-2">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                onClick={() => handleSelectLecture(lecture)}
                className={`transition-all text-wrap duration-300 cursor-pointer border-none ${
                  lecture._id === (currentLecture?._id || initialLecture._id)
                    ? "bg-primary text-primary-foreground dark:bg-gray-800 dark:text-white"
                    : "bg-muted dark:bg-zinc-800 hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <CardContent className="flex text-wrap w-full items-center justify-between p-4">
                  <div className="flex gap-3 items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 className="text-green-400 mr-3" size={22} />
                    ) : (
                      <CirclePlay className="text-gray-400 mr-3" size={22} />
                    )}
                    <CardTitle className="text-base text-wrap font-medium truncate">
                      {lecture.lectureTitle}
                    </CardTitle>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge variant="outline" className="bg-green-600/10 text-green-400 border-green-400/20">
                      Done
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;

import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1 className="text-center text-lg font-medium mt-10">Loading...</h1>;
  if (isError) return <h1 className="text-center text-lg font-medium mt-10 text-red-500">Failed to load course details</h1>;

  const { course, purchased } = data;
  const previewLecture = course?.lectures.find((lec) => lec.isPreviewFree);

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 shadow-inner py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-8">
          {/* Left Text */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{course?.courseTitle}</h1>
            <p className="text-lg md:text-xl opacity-90">{course?.subTitle}</p>
            <p className="text-sm">
              Created by{" "}
              <span className="text-indigo-300 underline italic hover:text-indigo-400 transition">
                {course?.creator.name}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <BadgeInfo size={16} />
                <p>Last updated: {course?.createdAt.split("T")[0]}</p>
              </div>
              <span>•</span>
              <p>Students: {course?.enrolledStudents.length}</p>
            </div>
          </div>

          {/* Right Video Preview */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            {previewLecture ? (
              <ReactPlayer width="100%" height="100%" url={previewLecture.videoUrl} controls />
            ) : (
              <div className="w-full aspect-video bg-gray-700 flex items-center justify-center text-gray-300 italic text-sm">
                No preview available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col-reverse lg:flex-row gap-12">
        {/* Left Content */}
        <div className="w-full lg:w-2/3 space-y-12">
          {/* About */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">What you'll learn</h2>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: course.description }} />
          </div>

          {/* Course Content */}
          <Card className="shadow-lg dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-xl">Course Content</CardTitle>
              <CardDescription>{course?.lectures.length} lectures</CardDescription>
            </CardHeader>
            <Separator className="my-2" />
            <CardContent className="grid grid-cols-1 gap-4">
              {course.lectures.map((lecture, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 border rounded-lg p-3 hover:bg-muted/50 dark:hover:bg-muted/30 transition"
                >
                  {lecture.isPreviewFree ? (
                    <PlayCircle size={20} className="text-green-500 dark:text-green-400" />
                  ) : (
                    <Lock size={20} className="text-gray-400" />
                  )}
                  <p className="truncate">{lecture?.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Buy Card */}
        <div className="w-full lg:w-1/3 sticky top-24 self-start">
          <Card className="shadow-xl dark:bg-gray-900">
            <CardContent className="p-4 space-y-4">
              <h3 className="text-2xl font-bold text-primary">₹ {course?.coursePrice}</h3>

              <Separator />

              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full text-lg py-2 rounded-xl shadow-md hover:scale-105 transition">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} className="w-full text-lg py-2 rounded-xl shadow-md hover:scale-105 transition" />
              )}

              <ul className="text-sm text-muted-foreground space-y-1 mt-4">
                <li>✅ Lifetime access</li>
                <li>✅ Certificate on completion</li>
                <li>✅ Accessible on mobile & desktop</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

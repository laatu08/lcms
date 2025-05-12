import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError)
    return (
      <h1 className="text-center text-red-500 text-lg mt-10">
        Some error occurred while fetching courses.
      </h1>
    );

  return (
    <section className="bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-[#141414] dark:via-[#181818] dark:to-[#141414] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-3">
            Our Courses
          </h2>
          <div className="mx-auto h-1 w-24 bg-emerald-500 rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Explore a diverse collection of expert-led courses to level up your
            skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses &&
              data.courses.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-1 transition-transform">
      <Skeleton className="w-full h-40 rounded-t-2xl" />
      <div className="px-5 py-4 space-y-4">
        <Skeleton className="h-6 w-3/4 rounded" />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <Skeleton className="h-4 w-1/3 rounded" />
      </div>
    </div>
  );
};

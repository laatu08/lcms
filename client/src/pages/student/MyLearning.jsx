import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <section className="max-w-7xl mx-auto my-14 px-4 md:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            My Learning
          </span>
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-md max-w-xl mx-auto">
          Track your enrolled courses and continue where you left off. Happy learning!
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 transition-all duration-300">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
            {myLearning.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyLearning;

// Skeleton loader (now with shimmer effect)
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-200 dark:bg-gray-800 rounded-xl h-64 shadow-inner relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
      </div>
    ))}
  </div>
);

// Empty state component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center space-y-5 animate-fadeIn">
    <img
      src="https://www.google.com/imgres?q=online%20course%20illustration&imgurl=https%3A%2F%2Fmir-s3-cdn-cf.behance.net%2Fproject_modules%2Ffs%2F4ce1eb102339767.5f3429eeb489f.jpg&imgrefurl=https%3A%2F%2Fwww.behance.net%2Fgallery%2F102339767%2FOnline-Course-Illustrations%2Fmodules%2F589236063&docid=kiJ-aHfwUd_LZM&tbnid=AcW2ZnN5-A091M&vet=12ahUKEwiLn-CxwZ2NAxUx3jgGHZJjEzAQM3oECE8QAA..i&w=1920&h=1280&hcb=2&ved=2ahUKEwiLn-CxwZ2NAxUx3jgGHZJjEzAQM3oECE8QAA"
      alt="No courses"
      className="h-40 opacity-90"
    />
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
      You haven’t enrolled in any courses yet.
    </h2>
    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
      Browse our catalog and find something that sparks your interest. Your learning journey starts here!
    </p>
    <a
      href="/courses"
      className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow"
    >
      Explore Courses
    </a>
  </div>
);

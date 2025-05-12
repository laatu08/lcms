import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 dark:border-gray-700 py-6 gap-4 hover:shadow-md dark:hover:shadow-none transition-shadow duration-300 ease-in-out">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded-lg shadow-md"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg md:text-xl text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            {course.courseTitle}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">{course.subTitle}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Instructor:{" "}
            <span className="font-bold text-gray-800 dark:text-gray-100">
              {course.creator?.name}
            </span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
            {course.courseLevel}
          </Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl text-gray-800 dark:text-gray-100">
          ₹{course.coursePrice}
        </h1>
      </div>
    </div>
  );
};

export default SearchResult;

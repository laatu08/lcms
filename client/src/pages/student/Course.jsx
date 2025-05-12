import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`} className="block group">
      <Card className="overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-transform transform group-hover:scale-[1.025] duration-300 relative">
        <div className="relative h-44">
          <img
            src={course.courseThumbnail}
            alt="course thumbnail"
            className="w-full h-full object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-t-3xl"></div>
          <Badge className="absolute top-3 right-3 bg-blue-600 text-white text-[12px] font-semibold px-3 py-0.5 rounded-full shadow-md">
            {course.courseLevel}
          </Badge>
        </div>

        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold leading-snug line-clamp-2 text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {course.courseTitle}
          </h2>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-gray-300 dark:border-gray-700 shadow-sm">
                <AvatarImage
                  src={course.creator?.photoURL || "https://github.com/shadcn.png"}
                  alt={course.creator?.name || "Creator"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">
                {course.creator?.name}
              </span>
            </div>
            <span className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 text-base font-semibold px-3 py-0.5 rounded-full shadow-sm">
              ₹{course.coursePrice}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;

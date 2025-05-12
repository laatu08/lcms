import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit, Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600 dark:text-gray-300 text-lg">Loading courses...</p>
      </div>
    );
  }

  const badgeColor = (published) =>
    published ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">My Courses</h1>
        <Button onClick={() => navigate(`create`)} className="flex items-center gap-2">
          <Plus size={16} /> Create New Course
        </Button>
      </div>

      {data.courses.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-lg">You haven’t created any courses yet.</p>
          <Button className="mt-4" onClick={() => navigate(`create`)}>
            Create your first course
          </Button>
        </div>
      ) : (
        <Table>
          <TableCaption className="text-gray-500 dark:text-gray-400">A list of your recent courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.courses.map((course, index) => (
              <TableRow
                key={course._id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
                } hover:bg-blue-50 dark:hover:bg-gray-700`}
              >
                <TableCell className="font-medium text-gray-800 dark:text-gray-100">
                  {course?.coursePrice ? `$${course.coursePrice}` : "NA"}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm font-semibold ${badgeColor(course.isPublished)}`}>
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell className="text-gray-700 dark:text-gray-200">{course.courseTitle}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" onClick={() => navigate(`${course._id}`)}>
                    <Edit className="w-4 h-4" /> <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CourseTable;

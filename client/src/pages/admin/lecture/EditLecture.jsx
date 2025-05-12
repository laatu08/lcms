import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Link to={`/admin/course/${courseId}/lecture`}>
          <Button variant="outline" className="flex items-center gap-2 text-sm">
            <ArrowLeft size={16} />
            Back to Lectures
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 ml-2">
          Update Lecture
        </h1>
      </div>

      <div className="bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Lecture Details
        </h2>
        <LectureTab />
      </div>
    </div>
  );
};

export default EditLecture;

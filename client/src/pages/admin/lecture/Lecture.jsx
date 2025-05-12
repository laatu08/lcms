import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();

  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow my-3 group">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide font-semibold">
          Lecture {index + 1}
        </p>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
          {lecture.lectureTitle}
        </h2>
      </div>
      <button
        onClick={goToUpdateLecture}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        title="Edit Lecture"
      >
        <Edit
          size={18}
          className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
        />
      </button>
    </div>
  );
};

export default Lecture;

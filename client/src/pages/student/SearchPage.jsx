import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 rounded-lg">
      <div className=" text-center">
        {query && (
          <>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Results for "{query}"
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Showing results for{" "}
              <span className="text-blue-600 font-bold italic">{query}</span>
            </p>
          </>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter handleFilterChange={handleFilterChange} />
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course) => (
              <SearchResult key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-3 bg-gray-100 p-8 rounded-lg shadow-md">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl text-gray-800 mb-2">Course Not Found</h1>
      <p className="text-lg text-gray-600 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link" className="text-blue-600">Browse All Courses</Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-6 px-4 bg-white rounded-lg shadow-md my-4 animate-pulse">
      <div className="h-32 w-full md:w-56 bg-gray-300 rounded" />
      <div className="flex flex-col gap-4 flex-1 px-4">
        <Skeleton className="h-6 w-3/4 bg-gray-300 rounded" />
        <Skeleton className="h-4 w-1/2 bg-gray-300 rounded" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3 bg-gray-300 rounded" />
        </div>
        <Skeleton className="h-6 w-20 bg-gray-300 rounded mt-4" />
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-r from-teal-500 to-emerald-600 dark:from-gray-900 dark:to-gray-800 py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left content */}
        <div className="text-center md:text-left max-w-2xl space-y-6">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
            Find the Best Courses for You
          </h1>
          <p className="text-gray-100 dark:text-gray-400 text-lg md:text-xl">
            Discover, learn, and upskill with our wide range of high-quality courses tailored just for you.
          </p>

          <form
            onSubmit={searchHandler}
            className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800  shadow-lg overflow-hidden max-w-xl mx-auto md:mx-0 space-y-3 sm:space-y-0 sm:space-x-3 p-2 mt-4"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Courses"
              className="flex-grow border-gray-500 rounded-3xl focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
            />
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white px-6 py-3 rounded-full transition-colors w-full sm:w-auto"
            >
              Search
            </Button>
            <Button
              type="button"
              onClick={() => navigate(`/course/search?query`)}
              className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 border border-emerald-600 dark:border-gray-600 rounded-full px-6 py-3 transition-colors w-full sm:w-auto"
            >
              Explore Courses
            </Button>
          </form>
        </div>

        {/* Right image / visual */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?semt=ais_hybrid&w=740"
            alt="Online Courses Illustration"
            className="w-80 md:w-96 object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

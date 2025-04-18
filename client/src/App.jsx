import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection></HeroSection>
            <Courses></Courses>
          </>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/my-learning",
        element: <MyLearning></MyLearning>
      },
      {
        path: "/profile",
        element: <Profile></Profile>
      },
      {
        path: "/course-detail/:courseId",
        element: <CourseDetail></CourseDetail>
      },

      // admin route
      {
        path:"/admin",
        element:<Sidebar></Sidebar>,
        children:[
          {
            path:"dashboard",
            element:<Dashboard></Dashboard>
          },
          {
            path:"course",
            element:<CourseTable></CourseTable>,
          },
          {
            path:"course/create",
            element:<AddCourse></AddCourse>,
          },
          {
            path:"course/:courseId",
            element:<EditCourse></EditCourse>,
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture></CreateLecture>,
          },
          {
            path:"course/:courseId/lecture/:lectureId",
            element:<EditLecture></EditLecture>,
          }
        ]
      }
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
}

export default App;

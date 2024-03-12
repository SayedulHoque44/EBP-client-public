import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/DashboardLayout";
import MainLayouts from "../../Layouts/MainLayouts";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import PatenteBooks from "../../Pages/Dashboard/PatenteBooks/PatenteBooks";
import SingleBook from "../../Pages/Dashboard/PatenteBooks/SingleBook";
import ForgotPass from "../../Pages/Forgot/ForgotPass";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";

import Propile from "../../Pages/Propile/Propile";
import Reagister from "../../Pages/Register/Reagister";

import Adview from "../../Pages/AdView/Adview";
import BlogSection from "../../Pages/Blog/BlogSection";
import SingleBlogContainer from "../../Pages/Blog/SIngleBlogContainer/SIngleBlogContainer";
import AdminManagment from "../../Pages/Dashboard/AdminManagment/AdminManagment";
import BlogManagment from "../../Pages/Dashboard/AdminManagment/BlogManagment/BlogManagment";
import CourseManagment from "../../Pages/Dashboard/AdminManagment/CourseManagment/CourseManagment";
import FeedbackManagment from "../../Pages/Dashboard/AdminManagment/FeedbackManagment/FeedbackManagment";
import UserManagment from "../../Pages/Dashboard/AdminManagment/UserManagment/UserManagment";
import YTvideoManagment from "../../Pages/Dashboard/AdminManagment/YTvideoManagment/YTvideoManagment";
import CourseVideo from "../../Pages/Dashboard/CourseVideo/CourseVideo";
import VideoContainerLayout from "../../Pages/Dashboard/CourseVideo/VideoContainer/VideoContainer";
import PDFBook from "../../Pages/Dashboard/PatenteBooks/PDFBook";
import PrivateVideos from "../../Pages/Dashboard/PrivateVideos/PrivateVideos";
import QNAPdf from "../../Pages/Dashboard/QNA/QNAPdf";
import AllUsers from "../../Pages/Dashboard/Users/AllUsers";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import AdminPrivate from "../Private/AdminPrivate";
import PaidOnlyRoute from "../Private/PaidOnlyRoute";
import PrivateRoute from "../Private/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs",
        element: <BlogSection />,
      },
      {
        path: "/blogs/:blogId",
        element: <SingleBlogContainer />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Reagister />,
      },
      {
        path: "forgot",
        element: <ForgotPass />,
      },
      {
        path: "/propile/:id",
        element: (
          <PrivateRoute>
            <Propile />
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <ErrorPage />, //TODO
  },
  {
    path: "/adsView",
    element: <Adview />,
    errorElement: <ErrorPage />,
  },
  // Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "allUsers",
            element: (
              <AdminPrivate>
                <AllUsers />
              </AdminPrivate>
            ),
          },
          {
            path: "adminManagment",
            element: (
              <AdminPrivate>
                <AdminManagment />
              </AdminPrivate>
            ),
            children: [
              {
                path: "userManagment",
                element: <UserManagment />,
              },
              {
                path: "blogManagment",
                element: <BlogManagment />,
              },
              {
                path: "courseManagment",
                element: <CourseManagment />,
              },
              {
                path: "feedbackManagment",
                element: <FeedbackManagment />,
              },
              {
                path: "YTvideoManagment",
                element: <YTvideoManagment />,
              },
            ],
          },
          {
            path: "patenteBooks",
            element: <PatenteBooks />,
          },
          {
            path: "patenteBooks/:id",
            element: (
              <PaidOnlyRoute>
                <SingleBook />
              </PaidOnlyRoute>
            ),
          },
          {
            path: "patenteBooks/PDFBook",
            element: (
              <PaidOnlyRoute>
                <PDFBook />
              </PaidOnlyRoute>
            ),
          },
          {
            path: "courseVideo",
            element: <CourseVideo />,
          },
          {
            path: "QNAPdf",
            element: (
              <PaidOnlyRoute>
                <QNAPdf />
              </PaidOnlyRoute>
            ),
          },
          {
            path: "courseVideo/:partId",
            element: (
              <PaidOnlyRoute>
                <VideoContainerLayout />
              </PaidOnlyRoute>
            ),
          },
          {
            path: "PrivateVideos",
            element: <PrivateVideos />,
          },
        ],
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

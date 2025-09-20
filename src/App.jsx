import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
<<<<<<< HEAD
import Footer from "./components/Footer"; // ✅ استيراد الفوتر

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  startAuthListener,
  selectCurrentUser,
  selectIsAuthInitialized,
} from "./features/auth/authSlice";
=======
import { useSelector } from "react-redux";
import { selectIsAuthInitialized } from "./features/auth/authSlice";
import Reset from "./pages/Reset";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminCourseForm from "./pages/admin/AdminCourseForm";
import AdminCategories from "./pages/admin/AdminCategories";
import Courses from "./pages/Courses";
import AdminLayout from "./components/admin/AdminLayout";
>>>>>>> origin/main

export default function App() {
  const isInitialized = useSelector(selectIsAuthInitialized);

  if (!isInitialized) {
    // return <div className="p-4 text-sm text-gray-600">Loading…</div>;
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900" />
      <p>Loading…</p>
    </div>;
  }

  return (
    <BrowserRouter>
<<<<<<< HEAD
      <div className="flex min-h-screen flex-col bg-gray-50">
        {/* ✅ Navbar */}
        <Navbar user={user} dispatch={dispatch} />

        {/* ✅ المحتوى الرئيسي */}
        <main className="flex-grow">
=======
      {/* Use 100svh for mobile-safe viewport; min-h-0 lets children shrink */}
      <Navbar /> {/* fixed h-16 (make sure Navbar has h-16) */}
      {/* Main must have min-h-0 to allow overflow; pt-16 offsets fixed navbar */}
      <main className="pt-[var(--nav-h)]">
        <div className="min-h-[calc(100svh-var(--nav-h))] bg-gray-50">
>>>>>>> origin/main
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="reset" element={<Reset />} />

            <Route
              path="dashboard"
              element={
                <ProtectedRoute requireAdmin>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="courses" element={<Courses />} />
            <Route path="403" element={<Forbidden />} />
            {/* <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/courses"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/courses/new"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminCourseForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/courses/:id/edit"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminCourseForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminCategories />
                </ProtectedRoute>
              }
            />
 */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="courses/new" element={<AdminCourseForm />} />
              <Route path="courses/:id/edit" element={<AdminCourseForm />} />
              <Route path="categories" element={<AdminCategories />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
<<<<<<< HEAD
        </main>

        {/* ✅ Footer */}
        <Footer />
      </div>
=======
        </div>
      </main>
>>>>>>> origin/main
    </BrowserRouter>
  );
}

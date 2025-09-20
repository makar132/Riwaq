import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { selectIsAuthInitialized } from "./features/auth/authSlice";
import Reset from "./pages/Reset";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./pages/BlogDetails";
import CourseDetails from "./pages/CourseDetails";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminCourseForm from "./pages/admin/AdminCourseForm";
import AdminCategories from "./pages/admin/AdminCategories";
import Courses from "./pages/Courses";
import AdminLayout from "./components/admin/AdminLayout";

export default function App() {
  const isInitialized = useSelector(selectIsAuthInitialized);

  if (!isInitialized) {
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900" />
      <p>Loading…</p>
    </div>;
  }

  return (
    <BrowserRouter basename="/Riwaq">
      <Navbar />
      <main className="pt-[var(--nav-h)]">
        <div className="min-h-[calc(100svh-var(--nav-h))] bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="reset" element={<Reset />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="details" element={<BlogDetails />} />
            <Route path="course" element={<CourseDetails/>}/>
            

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
        </div>
      </main>
    </BrowserRouter>
  );
}

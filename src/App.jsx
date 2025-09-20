import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ استيراد الفوتر

import { useSelector } from "react-redux";

import { selectIsAuthInitialized } from "./features/auth/authSlice";

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
      <div className="flex min-h-screen flex-col bg-gray-50">
        {/* ✅ Navbar */}
        <Navbar user={user} dispatch={dispatch} />

        {/* ✅ المحتوى الرئيسي */}
        <main className="flex-grow">
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
        </main>

        {/* ✅ Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

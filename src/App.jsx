// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  startAuthListener,
  selectCurrentUser,
  selectIsAuthInitialized,
} from "./features/auth/authSlice";

export default function App() {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const isInitialized = useSelector(selectIsAuthInitialized);

  useEffect(() => {
    dispatch(startAuthListener());
  }, [dispatch]);

  if (!isInitialized) {
    return <div className="p-4 text-sm text-gray-600">Loading…</div>;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar المثبتة */}
        <Navbar user={user} dispatch={dispatch} />

        {/* محتوى الصفحة مع padding علشان الن navbar الثابت */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute requireAdmin>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <main className="p-4">
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

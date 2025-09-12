import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  startAuthListener,
  logoutUser,
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
      <div className="min-h-screen">
        <header className="border-b">
          <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <NavLink to="/" className="text-xl font-bold">
              Riwaq
            </NavLink>
            <div className="flex items-center gap-4">
              {!user && (
                <NavLink to="/login" className="hover:underline">
                  Login
                </NavLink>
              )}
              {!user && (
                <NavLink to="/register" className="hover:underline">
                  Register
                </NavLink>
              )}
              {user && (
                <span className="text-sm text-gray-600">{user.email}</span>
              )}
              {user && user.isAdmin && (
                <NavLink to="/dashboard" className="hover:underline">
                  Dashboard
                </NavLink>
              )}
              {user && (
                <button
                  onClick={() => {
                    dispatch(logoutUser());
                  }}
                  className="hover:underline"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </header>

        <main className="mx-auto my-auto max-w-6xl p-4">
          <Routes>
            <Route index element={<Home />} />
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
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </main>

        <footer className="border-t py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Riwaq
        </footer>
      </div>
    </BrowserRouter>
  );
}

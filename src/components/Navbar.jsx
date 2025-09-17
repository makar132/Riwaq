import { useState } from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ user, dispatch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#49BBBD] text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 text-2xl font-semibold">
        {/* Logo */}
        <NavLink to="/" className="text-4xl font-bold text-white">
          <span className="rounded-md bg-white px-2 py-1 font-bold text-[#49BBBD]">
            TOTC
          </span>
        </NavLink>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-white focus:outline-none"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Nav Links */}
        <div
          className={`text-md absolute top-16 left-0 z-50 w-full flex-col gap-6 bg-[#49BBBD] p-4 font-medium transition-all duration-300 ease-in-out md:static md:flex md:w-auto md:flex-row md:items-center md:bg-transparent md:p-0 ${
            menuOpen ? "flex" : "hidden"
          }`}
        >
          {/* Nav Item Component */}
          {[
            { label: "Home", path: "/" },
            { label: "Courses", path: "/courses" },
            { label: "Careers", path: "/careers" },
            { label: "Blog", path: "/blog" },
            { label: "About Us", path: "/about" },
          ].map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `group relative inline-block px-1 py-0.5 font-medium transition ${isActive ? "text-white after:scale-x-100" : "text-white/80 after:scale-x-0"} after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Conditional Auth Buttons */}
          {!user ? (
            <>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-full px-5 py-2 font-semibold transition hover:opacity-90 ${
                    isActive
                      ? "bg-white text-[#49BBBD]"
                      : "bg-white/20 text-white backdrop-blur-md"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-full px-5 py-2 font-semibold transition hover:opacity-90 ${
                    isActive
                      ? "bg-white text-[#49BBBD]"
                      : "bg-white/20 text-white backdrop-blur-md"
                  }`
                }
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-sm text-white">{user.email}</span>

              {user.isAdmin && (
                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `group relative inline-block px-1 py-0.5 font-medium transition ${isActive ? "text-white after:scale-x-100" : "text-white/80 after:scale-x-0"} after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100`
                  }
                >
                  Dashboard
                </NavLink>
              )}

              <button
                onClick={() => {
                  dispatch(logoutUser());
                  closeMenu();
                }}
                className="text-white transition hover:opacity-80"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

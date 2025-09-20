import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
<<<<<<< HEAD
import footerLogo from "/src/assets/footerLogo.svg";
=======
import { useDispatch, useSelector } from "react-redux";
import { signOut, selectCurrentUser } from "../features/auth/authSlice";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
>>>>>>> origin/main

export default function Navbar() {
  const { t } = useTranslation();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    await dispatch(signOut());
    closeMenu();
    navigate("/", { replace: true });
  };

  const mainLinks = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.courses"), path: "/courses" },
    { label: t("nav.careers"), path: "/careers" },
    { label: t("nav.blog"), path: "/blog" },
    { label: t("nav.about"), path: "/about" },
    ...(user?.isAdmin ? [{ label: t("nav.admin"), path: "/admin" }] : []),
  ];

  const navLinkClass = ({ isActive }) =>
    `group relative inline-block px-1 py-0.5 text-[15px] font-medium transition ${
      isActive
        ? "text-white after:scale-x-100"
        : "text-white/85 after:scale-x-0 hover:text-white"
    } after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-white after:transition-transform after:duration-300`;

  const initials = (
    user?.name?.trim()?.charAt(0) ||
    user?.email?.trim()?.charAt(0) ||
    "U"
  ).toUpperCase();

  return (
<<<<<<< HEAD
    <header className="fixed top-0 left-0 z-50 w-full bg-[#49bbbd] pr-5 pl-5 text-white">
      <nav className="PX-3 mx-auto flex max-w-7xl items-center justify-between py-4 md:py-1">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            src={footerLogo}
            alt="TOTC Logo"
            className="h-17 w-17 object-contain brightness-0 invert"
          />
        </NavLink>

        {/* Hamburger Icon (Mobile only) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Nav Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute top-[100%] left-0 z-40 w-full flex-col items-center space-y-4 bg-[#49bbbd] px-4 py-6 text-lg shadow-lg transition-all duration-300 ease-in-out md:static md:flex md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-6 md:bg-transparent md:px-0 md:py-0 md:shadow-none`}
        >
          {/* Static Links */}
          {[
            { label: "Home", path: "/" },
            { label: "Courses", path: "/courses" },
            { label: "Careers", path: "/careers" },
            { label: "Blog", path: "/blog" },
            { label: "About Us", path: "/about" },
          ].map(({ label, path }) => (
=======
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-[#49BBBD] text-white shadow-sm">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-3xl font-extrabold tracking-tight"
        >
          <span className="rounded-md bg-white px-2 py-1 text-[#49BBBD]">
            Riwaq
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          {mainLinks.map(({ label, path }) => (
>>>>>>> origin/main
            <NavLink
              key={path}
              to={path}
              onClick={closeMenu}
<<<<<<< HEAD
              className={({ isActive }) =>
                `group relative inline-block px-1 py-0.5 font-medium transition ${
                  isActive
                    ? "text-white after:scale-x-100"
                    : "text-white/80 after:scale-x-0"
                } after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100`
              }
=======
              className={navLinkClass}
>>>>>>> origin/main
            >
              {label}
            </NavLink>
          ))}
          <LanguageSwitcher />

          {!user ? (
            <>
              <NavLink
                to="/login"
                onClick={closeMenu}
<<<<<<< HEAD
                className={({ isActive }) =>
                  `rounded-full px-5 py-2 text-base font-semibold transition hover:opacity-90 ${
                    isActive
                      ? "bg-white text-[#4B3C7A]"
                      : "bg-white/20 text-white backdrop-blur-md"
                  }`
                }
=======
                className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
>>>>>>> origin/main
              >
                {t("auth.login")}
              </NavLink>
              <NavLink
                to="/register"
                onClick={closeMenu}
<<<<<<< HEAD
                className={({ isActive }) =>
                  `rounded-full px-5 py-2 text-base font-semibold transition hover:opacity-90 ${
                    isActive
                      ? "bg-white text-[#4B3C7A]"
                      : "bg-white/20 text-white backdrop-blur-md"
                  }`
                }
=======
                className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
>>>>>>> origin/main
              >
                {t("auth.register")}
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-white/25 text-sm font-bold">
                  {initials}
                </div>
                <span className="hidden text-sm text-white/90 lg:inline">
                  {user.name || user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold hover:text-white/90"
              >
                {t("auth.logout")}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="text-2xl text-white focus:outline-none md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="space-y-2 bg-[#49BBBD] px-4 pt-2 pb-4 text-white md:hidden">
          {mainLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeMenu}
              className="block px-2 py-2 text-[16px] hover:text-white/95"
            >
              {label}
            </NavLink>
          ))}

          {!user ? (
            <>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="block px-2 py-2 text-[16px] hover:text-white/95"
              >
                {t("auth.login")}
              </NavLink>
              <NavLink
                to="/register"
                onClick={closeMenu}
                className="block px-2 py-2 text-[16px] hover:text-white/95"
              >
                {t("auth.register")}
              </NavLink>
            </>
          ) : (
            <>
<<<<<<< HEAD
              <span className="text-sm">{user.email}</span>

              {user.isAdmin && (
                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `group relative inline-block px-1 py-0.5 font-medium transition ${
                      isActive
                        ? "text-white after:scale-x-100"
                        : "text-white/80 after:scale-x-0"
                    } after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-left after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100`
                  }
                >
                  Dashboard
                </NavLink>
              )}

=======
              <div className="flex items-center gap-2 px-2 py-2">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-white/25 text-sm font-bold">
                  {initials}
                </div>
                <span className="text-sm">{user.name || user.email}</span>
              </div>
>>>>>>> origin/main
              <button
                onClick={handleLogout}
                className="block w-full px-2 py-2 text-left text-[16px] hover:text-white/95"
              >
                {t("auth.logout")}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

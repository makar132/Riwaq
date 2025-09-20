import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Group from "../assets/images/Group.png";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerUser,
  selectAuthErrorMessage,
  selectAuthStatus,
  clearAuthError,
} from "../features/auth/authSlice";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(selectAuthStatus);
  const errorMessage = useSelector(selectAuthErrorMessage);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 pt-24">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-lg md:flex-row">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={Group}
            alt="Register"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full px-6 py-12 sm:px-10 md:w-1/2">
          <h2 className="mb-4 text-center text-2xl font-bold text-[#49BBBD]">
            Welcome to lorem..!
          </h2>

          {/* Toggle Buttons */}
          <div className="mb-6 flex justify-center">
            <div className="flex rounded-full bg-gray-200 p-1">
              <button
                className="rounded-full px-6 py-2 text-gray-600 transition-all duration-200 hover:bg-[#49BBBD] hover:text-white"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="rounded-full bg-[#49BBBD] px-6 py-2 text-white"
                disabled
              >
                Register
              </button>
            </div>
          </div>

          <p className="mb-6 text-center text-sm text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full rounded-full border border-[#49BBBD] px-4 py-2 focus:ring-2 focus:ring-[#49BBBD] focus:outline-none"
                placeholder="Enter your Email Address"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-sm text-red-500">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="mb-1 block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="w-full rounded-full border border-[#49BBBD] px-4 py-2 focus:ring-2 focus:ring-[#49BBBD] focus:outline-none"
                placeholder="Enter your Username"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-sm text-red-500">
                  {formik.errors.username}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full rounded-full border border-[#49BBBD] px-4 py-2 pr-10 focus:ring-2 focus:ring-[#49BBBD] focus:outline-none"
                  placeholder="Enter your Password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-sm text-red-500">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-center text-sm text-red-600">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full rounded-full bg-[#49BBBD] py-2 font-semibold text-white transition-all duration-200 ${
                status === "loading"
                  ? "cursor-not-allowed opacity-60"
                  : "hover:bg-[#3ca6a8]"
              }`}
            >
              {status === "loading" ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
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
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded-lg p-0 flex w-full max-w-5xl overflow-hidden">
   
        <div className="w-1/2 hidden md:block">
          <img
            src="/src/pages/images/Group 231.png"
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 px-10 py-12">
          <h2 className="text-center text-xl font-semibold mb-4">Welcome to lorem..!</h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-6">
            <div className="flex bg-gray-200 rounded-full p-1">
              <button
                className="px-6 py-2 text-gray-600 hover:text-white hover:bg-[#49BBBD] rounded-full transition-all duration-200"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="px-6 py-2 bg-[#49BBBD] text-white rounded-full"
                disabled
              >
                Register
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full border border-[#49BBBD] rounded-full px-4 py-2 focus:outline-none"
                placeholder="Enter your Email Address"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>

            {/* Username */}
            <div>
              <label>User name</label>
              <input
                type="text"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="w-full border border-[#49BBBD] rounded-full px-4 py-2 focus:outline-none"
                placeholder="Enter your User name"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm">{formik.errors.username}</div>
              )}
            </div>

            {/* Password */}
            <div>
              <label>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full border border-[#49BBBD] rounded-full px-4 py-2 focus:outline-none pr-10"
                  placeholder="Enter your Password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="text-red-600 text-sm text-center">{errorMessage}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full bg-[#49BBBD] text-white py-2 rounded-full ${
                status === "loading" ? "opacity-60 cursor-not-allowed" : ""
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

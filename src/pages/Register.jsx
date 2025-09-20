<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Group from "../assets/images/Group.png";
=======
// src/pages/Register.jsx
import { Formik, Form } from "formik";
>>>>>>> origin/main
import * as Yup from "yup";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import { useState, useEffect } from "react";
import { useDispatch,  } from "react-redux";
import { signUp,  clearAuthError } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const SignupSchema = Yup.object({
  name: Yup.string().min(2, "Too short").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string().min(3, "Min 3 chars").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
  locale: Yup.string().oneOf(["en", "ar"]).required("Required"),
});

export default function Register() {
  const [serverMsg, setServerMsg] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const error = useSelector(selectAuthError);

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

<<<<<<< HEAD
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
=======
  const onSuccess = () => {
    setServerMsg("Account created! You are now signed in.");
    navigate("/", { replace: true });
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join and start learning today."
      imageSrc="/register.svg"
    >
      {serverMsg && (
        <div
          role="status"
          aria-live="polite"
          className={`-mt-10 mb-3 rounded-lg px-3 py-2 text-sm ${
            serverMsg.startsWith("Account created")
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {serverMsg}
>>>>>>> origin/main
        </div>
      )}

<<<<<<< HEAD
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
=======
      <Formik
        initialValues={{
          name: "",
          email: "",
          username: "",
          password: "",
          confirm: "",
          locale: "en",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (vals, { setSubmitting, setFieldError }) => {
          setServerMsg(null);
          const { confirm, ...payload } = vals;

          const resultAction = await dispatch(signUp(payload));
          setSubmitting(false);

          if (signUp.rejected.match(resultAction)) {
            const err = resultAction.payload;
            if (err?.fieldErrors) {
              Object.entries(err.fieldErrors).forEach(([k, msg]) => {
                setFieldError(k, msg);
              });
            }
            setServerMsg(err?.message || "Signup failed.");
          } else {
            onSuccess();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <InputField name="name" label="Full name" />
            <InputField name="username" label="Username" />
            <InputField name="email" label="Email" type="email" autoComplete="email" />
            <PasswordField name="password" label="Password" />
            <PasswordField name="confirm" label="Confirm password" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-400 px-4 py-3.5 text-[17px] font-semibold text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:outline-none disabled:opacity-60"
>>>>>>> origin/main
            >
              {isSubmitting ? "Creating…" : "Create Account"}
            </button>

            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}

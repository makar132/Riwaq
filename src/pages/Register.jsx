import { Formik, Form } from "formik";
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

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

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
        </div>
      )}

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
          const { Confirm, ...payload } = vals;

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

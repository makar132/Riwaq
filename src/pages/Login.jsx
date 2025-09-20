import { Formik, Form } from "formik";
import * as Yup from "yup";
import AuthLayout from "../components/AuthLayout";
import FieldRow from "../components/InputField";
import PasswordField from "../components/PasswordField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInWithIdentifier,
  clearAuthError,
  selectCurrentUser,
} from "../features/auth/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LoginSchema = Yup.object({
  identifier: Yup.string().required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
});

export default function Login() {
  const { t } = useTranslation();

  const [serverMsg, setServerMsg] = useState(null);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectTo = new URLSearchParams(search).get("redirect") || "/";

  const onSuccess = () => navigate(redirectTo, { replace: true });

  useEffect(() => {
    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  return (
    <AuthLayout
      title={t("auth.login_title")}
      subtitle={t("auth.login_subtitle")}
      from="from-[#49BBBD]"
      via="via-[#36A2A4]"
      to="to-[#2F7E80]"
      imageSrc="/login.svg"
      brandName="Riwaq"
    >
      {serverMsg && (
        <div
          role="status"
          aria-live="polite"
          className="-mt-10 mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {serverMsg}
        </div>
      )}

      <Formik
        initialValues={{ identifier: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (vals, { setSubmitting, setFieldError }) => {
          setServerMsg(null);
          const resultAction = await dispatch(signInWithIdentifier(vals));
          setSubmitting(false);

          if (signInWithIdentifier.rejected.match(resultAction)) {
            const err = resultAction.payload;
            if (err?.fieldErrors) {
              Object.entries(err.fieldErrors).forEach(([k, msg]) => {
                setFieldError(k, msg);
              });
            }
            setServerMsg(err?.message || "Login failed.");
          } else {
            onSuccess();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <FieldRow
              name="identifier"
              label={t("auth.email_username")}
              placeholder="me@example.com or myusername"
              autoComplete="username"
            />

            <div>
              <PasswordField
                name="password"
                autoComplete="current-password"
                label={t("auth.password")}
              />
              <div className="flex w-full items-end justify-end">
                <Link
                  to="/reset"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {t("auth.forgot")}
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-400 px-4 py-3.5 text-[17px] font-semibold text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-60"
            >
              {isSubmitting ? t("common.signing_in") : t("auth.login")}
            </button>

            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Create one
              </Link>
            </p>

            {user && (
              <div className="rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
                You’re signed in as{" "}
                <span className="font-medium">{user.name || user.email}</span>.
              </div>
            )}
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}

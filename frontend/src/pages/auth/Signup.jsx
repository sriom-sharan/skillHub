
import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { postData } from "@/utils/postData";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [step, setStep] = useState("signup");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },

    onSubmit: async (values) => {
      setLoading(true);
      setErrors({});
      setServerError("");

      try {
        const response = await postData("auth/signup", values);

        if (response.success) {
          setRegisteredEmail(values.email.trim().toLowerCase());
          setStep("verify");
          setSuccessMessage(
            response.message || "OTP sent! Check your email."
          );
        }
      } catch (err) {
        console.error("Signup error:", err);

        if (err.type === "API_ERROR") {
          const apiError = err.data;

          if (apiError.errors) {
            const formattedErrors = {};

            Object.entries(apiError.errors).forEach(
              ([field, messages]) => {
                formattedErrors[field] = messages[0];
              }
            );

            setErrors(formattedErrors);
          } else {
            setServerError(
              apiError.message || "Unable to create account."
            );
          }
        } else if (err.type === "NETWORK_ERROR") {
          setServerError("Unable to connect to the server.");
        } else {
          setServerError(err.message || "Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const otpFormik = useFormik({
    initialValues: {
      otp: "",
    },

    validate: (values) => {
      const validationErrors = {};

      if (!/^\d{6}$/.test(values.otp)) {
        validationErrors.otp = "Enter a valid 6-digit OTP.";
      }

      return validationErrors;
    },

    onSubmit: async (values) => {
      setLoading(true);
      setServerError("");
      setSuccessMessage("");

      try {
        const response = await postData("auth/verify-account", {
          email: registeredEmail,
          otp: values.otp,
        });

        if (response.success) {
          setSuccessMessage(
            response.message || "Email verified successfully!"
          );

          // Redirect only after successful verification.
          // Change this destination to your preferred page.
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("OTP verification error:", err);

        if (err.type === "API_ERROR") {
          setServerError(
            err.data?.message || "Invalid or expired OTP."
          );
        } else if (err.type === "NETWORK_ERROR") {
          setServerError("Unable to connect to the server.");
        } else {
          setServerError(
            err.message || "OTP verification failed."
          );
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen w-full flex main-gradient justify-center px-4">
      <form
        className="flex flex-col w-96 max-w-full bg-black my-auto p-2 border border-zinc-700 py-8 rounded-lg px-4"
        onSubmit={
          step === "signup"
            ? formik.handleSubmit
            : otpFormik.handleSubmit
        }
      >
        <h1 className="text-2xl main-font-color poppins-semibold mb-3">
          <span className="text-white">Skill</span>Hub -{" "}
          <span className="text-lg text-zinc-500">
            {step === "signup" ? "Signup" : "Verify Email"}
          </span>
        </h1>

        <hr className="mb-5" />

        {serverError && (
          <p role="alert" className="text-red-500 text-sm mb-4">
            {serverError}
          </p>
        )}

        {successMessage && (
          <p role="status" className="text-green-400 text-sm mb-4">
            {successMessage}
          </p>
        )}

        {step === "signup" ? (
          <>
            <label htmlFor="name" className="text-white">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="py-2 rounded-sm mb-1 px-2 text-black"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mb-2">
                {errors.name}
              </p>
            )}

            <label htmlFor="password" className="text-white mt-3">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="py-2 rounded-sm mb-1 px-2 text-black"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mb-2">
                {errors.password}
              </p>
            )}

            <label htmlFor="email" className="text-white mt-3">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="py-2 rounded-sm mb-1 px-2 text-black"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mb-2">
                {errors.email}
              </p>
            )}

            <p className="text-xs text-center text-zinc-500 mt-3">
              We will email you a 6-digit verification code.
            </p>

            <button
              className="main-gradient py-2 rounded-full poppins-medium mt-6 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-zinc-400 mb-4">
              Enter the 6-digit code sent to{" "}
              <span className="text-white break-all">
                {registeredEmail}
              </span>
            </p>

            <label htmlFor="otp" className="text-white">
              Verification Code
            </label>

            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              className="py-3 rounded-sm mb-1 px-3 text-black text-center tracking-[0.5em] text-lg"
              value={otpFormik.values.otp}
              onChange={(event) => {
                const digits = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6);

                otpFormik.setFieldValue("otp", digits);
              }}
            />

            {otpFormik.errors.otp && otpFormik.touched.otp && (
              <p className="text-red-500 text-xs mt-1">
                {otpFormik.errors.otp}
              </p>
            )}

            <button
              className="main-gradient py-2 rounded-full poppins-medium mt-6 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setStep("signup");
                setServerError("");
                setSuccessMessage("");
                otpFormik.resetForm();
              }}
              className="text-sm text-zinc-400 underline mt-4 disabled:opacity-50"
            >
              Back to signup
            </button>
          </>
        )}

        {step === "signup" && (
          <div className="flex text-center gap-2 pt-4 items-center justify-center w-full">
            <p className="text-xs text-zinc-500">Already a user?</p>
            <Link to="/login" className="text-sm underline text-blue-500">
              Login
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;

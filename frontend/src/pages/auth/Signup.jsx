import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "@/utils/postData";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

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
          navigate("/verify-account");
        }
      } catch (err) {
        console.error("Signup error:", err);

        if (err.type === "API_ERROR") {
          const apiError = err.data;

          // Field validation errors
          if (apiError.errors) {
            const formattedErrors = {};

            Object.entries(apiError.errors).forEach(([field, messages]) => {
              formattedErrors[field] = messages[0];
            });

            setErrors(formattedErrors);
          }

          // General API error
          else if (apiError.message) {
            setServerError(apiError.message);
          } else {
            setServerError("Something went wrong.");
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

  return (
    <div className="min-h-screen w-full flex main-gradient justify-center">
      <form
        className="flex flex-col w-96 bg-black my-auto p-2 border-[1px] py-8 rounded-lg px-4"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-2xl main-font-color poppins-semibold mb-3">
          <span className="text-white">Skill</span>Hub -{" "}
          <span className="text-lg text-zinc-500">Signup</span>
        </h1>

        <hr className="mb-5" />

        {/* Server Error */}
        {serverError && (
          <p className="text-red-500 text-sm mb-4">{serverError}</p>
        )}

        {/* Name */}
        <label htmlFor="name" className="text-white">
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          className="py-1 rounded-sm mb-1 px-2 text-black"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />

        {errors.name && (
          <p className="text-red-500 text-xs mb-2">{errors.name}</p>
        )}

        {/* Password */}
        <label htmlFor="password" className="text-white">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          className="py-1 rounded-sm mb-1 px-2 text-black"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        {errors.password && (
          <p className="text-red-500 text-xs mb-2">{errors.password}</p>
        )}

        {/* Email */}
        <label htmlFor="email" className="text-white">
          Email Address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          className="py-1 rounded-sm mb-1 px-2 text-black"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        {errors.email && (
          <p className="text-red-500 text-xs mb-2">{errors.email}</p>
        )}

        <p className="text-xs text-center text-zinc-500">
          *We will send you verification to verify your email.
        </p>

        <button
          className="main-gradient py-2 rounded-full poppins-medium mt-8 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Next"}
        </button>

        <div className="flex text-center gap-2 pt-4 items-center justify-center w-full">
          <p className="text-xs text-center text-zinc-500">Already a user?</p>

          <Link to="/login" className="text-sm underline text-blue-600">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

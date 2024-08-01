import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/components/authContext";
import { postData } from "@/utils/postData";

const Login = () => {
  const { isLoggedin, setisLooggedin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      setError(""); // Clear previous errors
      try {
        const response = await postData('auth/login', values);
          console.log( response.msg);
        if (response.msg === "Login successful."){
          setLoading(true);
          try {
            localStorage.setItem('token', response.token)
            console.log('Data stored successfully');
          } catch (e) {
            console.error('Error storing data in localStorage:', e);
          }
          setisLooggedin(true);
          navigate('/courses')
        } else {
          setError(response.msg || "Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        // setError("Invalid email or password");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen w-full main-gradient flex justify-center">
      <form
        className="flex flex-col w-96 bg-black my-auto p-2 border-[1px] py-8 rounded-lg px-4"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-2xl main-font-color poppins-semibold mb-3">
          <span className="text-white">Skill</span>Hub -{" "}
          <span className="text-lg text-zinc-500">Login</span>
        </h1>
        <hr className="mb-5" />

        {error && (
          <div className="text-red-500 underline mx-auto mb-4">
            {error}
          </div>
        )}

        <label htmlFor="email" className="text-white">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 mb-2">{formik.errors.email}</div>
        )}

        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 mb-2">{formik.errors.password}</div>
        )}

        <button
          className={`main-gradient py-2 rounded-full poppins-medium mt-8 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="flex text-center gap-2 pt-4 items-center justify-center w-full">
          <p className="text-xs text-center text-zinc-500">New user?</p>
          <Link to="/signup" className="text-sm underline text-blue-600">
            Create new Account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

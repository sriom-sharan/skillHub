import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React,{useState} from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "@/utils/postData"; 
const Signup = () => {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      setError(""); // Clear previous errors
      try {
        const response = await postData('auth/signup',values);
        if (response.msg === "Account created successfully. OTP has been sent to email.") {
          navigate('/verify-account')
          setIsLoggedin(true);
          // Optionally, redirect to a different page
          // navigate('/dashboard'); // Example using react-router-dom
        } else {
          setError(response.msg || "Signup failed");
        }
      } catch (err) {
        setError("Invalid Input Crediationals");
        console.error("Login error:", err);
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
        <h1 className="text-2xl main-font-color  poppins-semibold mb-3">
          {" "}
          <span className="text-white">Skill</span>Hub -{" "}
          <span className="text-lg  text-zinc-500">Signup</span>
        </h1>
        <hr className="mb-5" />
        <label htmlFor="name" className="text-white">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <label htmlFor="email" className="text-white">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p className="text-xs text-center text-zinc-500">
          *We will send you verification to verify your email.
        </p>

        <button
          className="main-gradient py-2 rounded-full poppins-medium mt-8"
          type="submit"
        >
          Next
        </button>
        <div className="flex text-center gap-2 pt-4 items-center justify-center w-full">
          <p className="text-xs  text-center text-zinc-500">Already a user?</p>
          <Link to="/login" className="text-sm underline text-blue-600">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Signup;

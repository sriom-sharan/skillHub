import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const Login = () => {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="min-h-screen w-full main-gradient flex justify-center">
      <form
        className="flex flex-col w-96 bg-black my-auto p-2 border-[1px] py-8 rounded-lg px-4"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-2xl main-font-color  poppins-semibold mb-3">
          {" "}
          <span className="text-white">Skill</span>Hub -{" "}
          <span className="text-lg  text-zinc-500">Login</span>
        </h1>
        <hr className="mb-5" />

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
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />

        <button
          className="main-gradient py-2  rounded-full poppins-medium mt-8"
          type="submit"
        >
          Login
        </button>
        <div className="flex text-center gap-2 pt-4 items-center justify-center w-full">
          <p className="text-xs  text-center text-zinc-500">New user?</p>
          <Link to="/signup" className="text-sm underline text-blue-600">
            Create new Account
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;

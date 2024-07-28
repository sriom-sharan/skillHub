import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const Signup = () => {
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
        <label htmlFor="firstName" className="text-white">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />

        <label htmlFor="lastName" className="text-white">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.lastName}
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

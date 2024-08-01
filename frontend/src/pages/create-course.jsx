import { Formik, Field, Form } from "formik";
import { categories } from "@/lib/category";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "@/utils/postData";

const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      youtubePlaylistId: "",
      skills: "",
      category: "Web Development",
    },
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      setError(""); // Clear previous errors
      try {
        const response = await postData("courses/create-course", values);
        if (response.msg === "Course Created Successfully" ) {
          // Optionally, redirect to a different page
          navigate("/dashboard"); // Example using react-router-dom
        } else {
          setError(response.msg || "Course creation failed");
        }
      } catch (err) {
        setError("Invalid Input Crediationals");
        console.error("Course creation failed", err);
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
          <span className="text-lg  text-zinc-500">Create Course</span>
        </h1>
        <hr className="mb-5" />
        <label htmlFor="name" className="text-white">
          Title
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label htmlFor="description" className="text-white">
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <label htmlFor="youtubePlaylistId" className="text-white">
          Playlist Id
        </label>
        <input
          id="youtubePlaylistId"
          name="youtubePlaylistId"
          type="text"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.youtubePlaylistId}
        />
        <label htmlFor="category">Select Category</label>
        <select
          id="category"
          name="category"
          className="py-1 rounded-sm mb-2 px-2 text-black bg-white"
          onChange={formik.handleChange}
          value={formik.values.category}
        >
          {categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>

        <label htmlFor="skills" className="text-white">
          Skills
        </label>
        <input
          id="skills"
          name="skills"
          type="text"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.skills}
        />
        <p className="text-xs text-center text-zinc-500">
          *Use comma ( , ) to separate different skills.
        </p>

        <button
          className="main-gradient py-2 rounded-full poppins-medium mt-8"
          type="submit"
        >
          Create
        </button>
        <div className="flex text-center gap-2 pt-4 items-center justify-center w-full">
          <p className="text-xs  text-center text-zinc-500">Already a user?</p>
          {/* <Link to="/login" className="text-sm underline text-blue-600">
            Login
          </Link> */}
        </div>
      </form>
    </div>
  );
};
export default CreateCourse;

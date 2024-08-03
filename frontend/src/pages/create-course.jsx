import { useFormik } from "formik";
import { categories } from "@/lib/category";
import { useNavigate } from "react-router-dom";
import { postData } from "@/utils/postData";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/components/authContext";
import Error from "./Error";

const CreateCourse = () => {
  const { isLoggedin } = useContext(AuthContext);
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
      language: 'English',
      prerequisite: ''
    },
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      try {
        const response = await postData("courses/create-course", values);
        if (response.msg === "Course Created Successfully") {
          navigate("/dashboard");
        } else {
          setError(response.msg || "Course creation failed");
        }
      } catch (err) {
        setError("Invalid Input Credentials");
        console.error("Course creation failed", err);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/login');
    }
  }, [isLoggedin, navigate]);

  if (!isLoggedin) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen w-full flex main-gradient justify-center">
      <form
        className="flex flex-col w-96 bg-black my-auto p-2 border-[1px] py-8 rounded-lg px-4"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-2xl main-font-color poppins-semibold mb-3">
          <span className="text-white">Skill</span>Hub -{" "}
          <span className="text-lg text-zinc-500">Create Course</span>
        </h1>
        <hr className="mb-5" />
        <label htmlFor="name" className="text-white">Title</label>
        <input
          id="name"
          name="name"
          type="text"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label htmlFor="description" className="text-white">Description</label>
        <textarea
          id="description"
          name="description"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        
        <label htmlFor="youtubePlaylistId" className="text-white">Playlist Id</label>
        <input
          id="youtubePlaylistId"
          name="youtubePlaylistId"
          type="text"
          placeholder="*Use Youtube Playlist Id*"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.youtubePlaylistId}
        />
        
        <label htmlFor="category" className="text-white">Select Category</label>
        <select
          id="category"
          name="category"
          className="py-1 rounded-sm mb-2 px-2 text-black bg-white"
          onChange={formik.handleChange}
          value={formik.values.category}
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        
        <label htmlFor="language" className="text-white">Select Language</label>
        <select
          id="language"
          name="language"
          className="py-1 rounded-sm mb-2 px-2 text-black bg-white"
          onChange={formik.handleChange}
          value={formik.values.language}
        >
          <option value='English'>English</option>
          <option value='Hindi'>Hindi</option>
          <option value='Hinglish'>Hinglish</option>
        </select>
        
        <label htmlFor="prerequisite" className="text-white">
          Prerequisite <span className="text-white/55">(optional)</span>
        </label>
        <input
          id="prerequisite"
          name="prerequisite"
          type="text"
          className="py-1 rounded-sm mb-2 px-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.prerequisite}
        />
        
        <label htmlFor="skills" className="text-white">Skills</label>
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
      </form>
    </div>
  );
};

export default CreateCourse;

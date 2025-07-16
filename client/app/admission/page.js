"use client";

import { useColleges } from "@/Hooks/useColleges";
import { getCurrentUser } from "@/lib/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function AdmissionPage() {
  const { data: colleges, isLoading } = useColleges();
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      reset({
        name: currentUser?.name || "",
        email: currentUser?.email || "",
      });
    };
    fetchUser();
  }, [reset]);

  if (isLoading || !user)
    return <h1 className="text-center mt-20">Loading...</h1>;

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://server-gules-three-43.vercel.app";

  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const imagebbApiKey = "e6760218a1790e4b8bf13c656f8c16e0";
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imagebbApiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("Image Upload Failed");
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const imageFile = data.image[0];
      const imageUrl = await uploadImageToImgbb(imageFile);
      const formData = {
        collegeName: data.college,
        candidateName: data.name,
        subject: data.subject,
        email: data.email,
        phone: data.phone,
        address: data.address,
        dob: data.dob,
        image: imageUrl,
      };

      const res = await axios.post(`${API_BASE_URL}/admissions`, formData);
      alert("Admission Successfully");
      reset();
    } catch (error) {
      console.error("Submission Error:", error.response?.data);
      alert(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 p-6 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          College Admission Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* College Select */}
          <div>
            <label className="block mb-1 font-medium">Select College</label>
            <select
              {...register("college", { required: true })}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">-- Choose a college --</option>
              {colleges?.map((college) => (
                <option key={college._id} value={college.collegeName}>
                  {college.collegeName}
                </option>
              ))}
            </select>
            {errors.college && (
              <p className="text-sm text-red-500 mt-1">College is required</p>
            )}
          </div>

          {/* Candidate Name */}
          <div>
            <label className="block mb-1 font-medium">Candidate Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              readOnly
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded p-2"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">Name is required</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-1 font-medium">Subject</label>
            <input
              type="text"
              {...register("subject", { required: true })}
              placeholder="Applied subject"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              readOnly
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              {...register("phone", { required: true })}
              placeholder="017xxxxxxxx"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <textarea
              {...register("address", { required: true })}
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: true })}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-1 font-medium">Upload Image</label>
            <input
              type="file"
              {...register("image", { required: true })}
              accept="image/*"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-2 rounded mt-4 flex justify-center items-center space-x-2 ${
              isSubmitting ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            <span>{isSubmitting ? "Submitting..." : "Submit Admission"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdmissionPage;

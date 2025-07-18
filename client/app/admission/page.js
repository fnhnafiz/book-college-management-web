"use client";

import PrivateRoutes from "@/components/PrivateRoutes";
import { useColleges } from "@/Hooks/useColleges";
import { getCurrentUser } from "@/lib/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-emerald-700 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );

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
      toast.success("Admission Successfully");
      reset();
    } catch (error) {
      console.error("Submission Error:", error.response?.data);
      toast.error(
        error.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PrivateRoutes>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-emerald-100 pt-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content Section */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
                  Start Your
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
                    {" "}
                    Academic Journey
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Take the first step towards your bright future by applying to
                  our prestigious colleges and universities.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      World-Class Education
                    </h3>
                    <p className="text-gray-600">
                      Access to top-tier academic programs and renowned faculty
                      members.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">🔬</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Research Opportunities
                    </h3>
                    <p className="text-gray-600">
                      Engage in cutting-edge research projects and innovative
                      studies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">🌟</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Career Support
                    </h3>
                    <p className="text-gray-600">
                      Comprehensive career guidance and placement assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">
                      95%
                    </div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">
                      50+
                    </div>
                    <div className="text-sm text-gray-600">Programs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">
                      10K+
                    </div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-emerald-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Admission Application
                </h2>
                <p className="text-gray-600">
                  Fill out the form below to begin your application
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* College Select */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select College *
                  </label>
                  <select
                    {...register("college", { required: true })}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  >
                    <option value="">-- Choose a college --</option>
                    {colleges?.map((college) => (
                      <option key={college._id} value={college.collegeName}>
                        {college.collegeName}
                      </option>
                    ))}
                  </select>
                  {errors.college && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      College is required
                    </p>
                  )}
                </div>

                {/* Candidate Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Candidate Name *
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    readOnly
                    placeholder="Your full name"
                    className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      Name is required
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    {...register("subject", { required: true })}
                    placeholder="Applied subject"
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    readOnly
                    placeholder="your@email.com"
                    className="w-full border-2 border-gray-200 rounded-lg p-3 bg-gray-50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register("phone", { required: true })}
                    placeholder="017xxxxxxxx"
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    {...register("address", { required: true })}
                    placeholder="Enter your address"
                    rows={3}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    {...register("dob", { required: true })}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Upload Image *
                  </label>
                  <input
                    type="file"
                    {...register("image", { required: true })}
                    accept="image/*"
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`cursor-pointer w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex justify-center items-center space-x-2 ${
                    isSubmitting
                      ? "cursor-not-allowed opacity-70 hover:scale-100"
                      : ""
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
                  <span className="text-lg">
                    {isSubmitting ? "Submitting..." : "Submit Admission"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoutes>
  );
}

export default AdmissionPage;

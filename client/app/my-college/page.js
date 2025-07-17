"use client";
import { useMyAdmissions } from "@/Hooks/useMyAdmissions";
import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  GraduationCap,
  Star,
  Calendar,
  Phone,
  Mail,
  User,
  BookOpen,
  Eye,
  MessageSquare,
  Award,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function MyCollegePage() {
  const [email, setEmail] = useState("");
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const router = useRouter();
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user?.email) {
        setEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  const { data: myAdmissions, isLoading, reset } = useMyAdmissions(email);
  console.log(myAdmissions);

  const handleReviewSubmit = async () => {
    if (!selectedAdmission?._id || !reviewText || !rating) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/reviews`, {
        collegeId: selectedAdmission._id,
        userEmail: email,
        reviewText,
        rating,
      });

      if (res.status === 200) {
        toast.success("Review submitted successfully");
        setIsModalOpen(false);
        setReviewText("");
        setRating(1);
        setSelectedAdmission(null);
      }
      reset();
    } catch (error) {
      setReviewText("");
      setRating(1);
      setSelectedAdmission(null);
      setIsModalOpen(false);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-emerald-200 border-t-emerald-600 mx-auto mb-6"></div>
            <div
              className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-amber-400 animate-spin mx-auto"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>
          <p className="text-2xl font-bold text-emerald-700 animate-pulse mb-2">
            Loading Your Admissions...
          </p>
          <p className="text-emerald-600">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 pt-24 pb-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full mb-6 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-800 bg-clip-text text-transparent mb-4">
            My College Journey
          </h1>
          <p className="text-xl text-emerald-600 font-medium max-w-2xl mx-auto">
            Track your admissions, share your experiences, and celebrate your
            achievements
          </p>

          {/* Stats Bar */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-100">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">
                    {myAdmissions?.length || 0}
                  </div>
                  <div className="text-sm text-emerald-600">
                    Total Admissions
                  </div>
                </div>
                <div className="w-px h-12 bg-emerald-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">⭐</div>
                  <div className="text-sm text-emerald-600">Your Journey</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {myAdmissions?.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-800 mb-4">
                No Admissions Yet
              </h3>
              <p className="text-emerald-600 mb-8">
                Start your college journey by exploring and applying to your
                dream colleges!
              </p>
              <Button
                onClick={() => router.push("/colleges")}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Colleges
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myAdmissions?.map((admission, index) => (
              <div
                key={admission._id}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-emerald-100 hover:border-emerald-200 hover:-translate-y-2"
              >
                {/* Card Header */}
                <div className="relative h-48 bg-gradient-to-br from-emerald-600 to-emerald-700 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                    #{index + 1}
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full p-2 shadow-lg">
                    <Award className="w-4 h-4 text-white" />
                  </div>

                  {/* Student Image */}
                  <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full border-4 border-white/30 overflow-hidden bg-white/20 backdrop-blur-sm">
                    <img
                      src={admission.image}
                      alt="Student"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* College Name */}
                  <div className="absolute bottom-4 right-4 text-right">
                    <h3 className="text-white font-bold text-lg leading-tight max-w-48">
                      {admission.collegeName}
                    </h3>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Student Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-emerald-800">
                          {admission.candidateName}
                        </p>
                        <p className="text-sm text-emerald-600">Student</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {admission.subject}
                        </p>
                        <p className="text-sm text-gray-600">Subject</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600 truncate">
                          {admission.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-gray-600">
                          {admission.phone}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-700" />
                      <span className="text-sm text-gray-600">
                        Born: {admission.dob}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-emerald-100">
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 cursor-pointer border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                          onClick={() => {
                            setSelectedAdmission(admission);
                            setIsModalOpen(true);
                          }}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="backdrop-blur-sm sm:max-w-md bg-white/95 border-emerald-200">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-amber-500" />
                            Add Review for
                            <span className="text-emerald-600">
                              {selectedAdmission?.collegeName}
                            </span>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 mt-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="review"
                              className="text-sm font-medium text-gray-700"
                            >
                              Your Review
                            </Label>
                            <Input
                              id="review"
                              placeholder="Share your experience..."
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                              className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="rating"
                              className="text-sm font-medium text-gray-700"
                            >
                              Rating (1 to 5)
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                id="rating"
                                min={1}
                                max={5}
                                value={rating}
                                onChange={(e) =>
                                  setRating(Number(e.target.value))
                                }
                                className="w-20 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-200"
                              />
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                      i < rating
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={handleReviewSubmit}
                            className="w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Submit Review
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      size="sm"
                      className="flex-1 cursor-pointer bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => router.push(`/colleges/${admission._id}`)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCollegePage;

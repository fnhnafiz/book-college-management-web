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
import axios from "axios";

function MyCollegePage() {
  const [email, setEmail] = useState("");
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);
  const [reviewedCollegeIds, setReviewedCollegeIds] = useState([]);
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
      alert("Please fill in all fields.");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/reviews`, {
        collegeId: selectedAdmission._id,
        userEmail: email,
        reviewText,
        rating,
      });
      // console.log(res);

      if (res.status === 200) {
        alert("Review submitted successfully");
      }
      reset();
    } catch (error) {
      setReviewText("");
      setRating(1);
      setSelectedAdmission(null);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="p-6 pt-24 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My College Admissions
      </h2>

      {myAdmissions?.length === 0 ? (
        <p className="text-center">No admissions found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">College Name</th>
                <th className="px-4 py-3">Candidate Name</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">DOB</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {myAdmissions?.map((admission, index) => (
                <tr key={admission._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{index + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={admission.image}
                      alt="Student"
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">{admission.collegeName}</td>
                  <td className="px-4 py-3">{admission.candidateName}</td>
                  <td className="px-4 py-3">{admission.subject}</td>
                  <td className="px-4 py-3">{admission.email}</td>
                  <td className="px-4 py-3">{admission.phone}</td>
                  <td className="px-4 py-3">{admission.dob}</td>
                  <td className="px-4 py-3 space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedAdmission(admission)}
                        >
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="backdrop-blur-sm sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>
                            Add Review for{" "}
                            <span className="text-green-600">
                              {selectedAdmission?.collegeName}
                            </span>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="review">Your Review</Label>
                            <Input
                              id="review"
                              placeholder="Write something..."
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rating">Rating (1 to 5)</Label>
                            <Input
                              type="number"
                              id="rating"
                              min={1}
                              max={5}
                              value={rating}
                              onChange={(e) =>
                                setRating(Number(e.target.value))
                              }
                            />
                          </div>
                          <Button onClick={handleReviewSubmit}>Submit</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/colleges/${admission._id}`)}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyCollegePage;

"use client";
import { Button } from "@/components/ui/button";
import { useColleges } from "@/Hooks/useColleges";
import Image from "next/image";
import Link from "next/link";

function CollegesPage() {
  const { data: colleges, isLoading } = useColleges();
  // console.log(colleges);
  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-emerald-700 animate-pulse">
            Loading colleges...
          </p>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 pt-16">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
              Discover Your Future
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Explore top colleges and universities to find the perfect match
              for your academic journey
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <span className="text-lg font-semibold">
                  {colleges?.length || 0} Colleges Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colleges Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges?.map((college) => (
            <div
              key={college.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-emerald-100"
            >
              {/* College Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={college.collegeImage}
                  alt={college.collegeName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  ⭐ {college.rating}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors duration-200">
                  {college.collegeName}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm">🎓</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Admission Date
                      </p>
                      <p className="font-semibold text-emerald-700">
                        {college.admissionDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm">🔬</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Research Papers
                      </p>
                      <p className="font-semibold text-emerald-700">
                        {college.researchCount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link href={`/colleges/${college._id}`}>
                  <Button className="w-full cursor-pointer bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    View Details
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg opacity-90">
            Ready to take the next step in your education journey?
          </p>
          <p className="text-sm opacity-75 mt-2">
            Contact our admissions team for personalized guidance
          </p>
        </div>
      </div>
    </div>
  );
}

export default CollegesPage;

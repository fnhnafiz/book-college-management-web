// app/colleges/[id]/page.jsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useCollegeDetails } from "@/Hooks/useCollegeDetails";
import Link from "next/link";
import {
  Calendar,
  BookOpen,
  Trophy,
  Star,
  MapPin,
  Users,
  Award,
  Clock,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Target,
  Zap,
} from "lucide-react";

export default function CollegeDetailsPage() {
  const { id } = useParams();

  const { data: college, isLoading, isError, error } = useCollegeDetails(id);
  console.log(college);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="pt-16 pb-16 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      {/* Hero Banner with Parallax Effect */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <Image
          src={college?.collegeImage}
          alt={college?.collegeName}
          fill
          className="object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-amber-900/20"></div>

        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-amber-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-emerald-300/20 rounded-full blur-md animate-pulse delay-2000"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {college?.collegeName}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/90 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-300" />
                <span className="text-lg font-semibold">
                  {college?.rating || "4.8"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-300" />
                <span>Premium Location</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span>50K+ Alumni</span>
              </div>
            </div>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover excellence in education with cutting-edge facilities,
              world-class faculty, and a vibrant campus life that shapes future
              leaders.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-y border-emerald-100 py-6 mt-0">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: GraduationCap, label: "Programs", value: "200+" },
            { icon: Award, label: "Rankings", value: "Top 50" },
            {
              icon: BookOpen,
              label: "Research",
              value: college?.researchWorks?.length || "100+",
            },
            {
              icon: Trophy,
              label: "Sports",
              value: college?.sports?.length || "25+",
            },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-emerald-700">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent mb-4">
            Campus Life & Excellence
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore the vibrant ecosystem of learning, research, and sports that
            makes our college extraordinary
          </p>
        </div>

        {/* Enhanced Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events Card */}
          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 hover:border-emerald-200 hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-700">
                  Upcoming Events
                </h3>
                <p className="text-emerald-600 text-sm">
                  Stay updated with campus activities
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {college?.events?.map((event, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-emerald-50/50 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700 font-medium">{event}</p>
                    <div className="flex items-center gap-2 text-sm text-emerald-600 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>Coming Soon</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-emerald-100">
              <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold group/btn">
                <span>View All Events</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Research Card */}
          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 hover:border-amber-200 hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-700">
                  Research Excellence
                </h3>
                <p className="text-amber-600 text-sm">
                  Cutting-edge research initiatives
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {college?.researchWorks?.map((work, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700 font-medium">{work}</p>
                    <div className="flex items-center gap-2 text-sm text-amber-600 mt-1">
                      <Sparkles className="w-4 h-4" />
                      <span>Innovation Hub</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-amber-100">
              <button className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold group/btn">
                <span>Research Portfolio</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Sports Card */}
          <div className="group bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200 hover:-translate-y-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-700">
                  Sports Excellence
                </h3>
                <p className="text-blue-600 text-sm">
                  Champions in every field
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {college?.sports?.map((sport, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700 font-medium">{sport}</p>
                    <div className="flex items-center gap-2 text-sm text-blue-600 mt-1">
                      <Target className="w-4 h-4" />
                      <span>Championship Level</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-blue-100">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group/btn">
                <span>Sports Complex</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-amber-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join Our Community?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Take the first step towards your bright future. Apply now and
                become part of our legacy of excellence.
              </p>

              <Link href="/admission">
                <button className="bg-white cursor-pointer text-emerald-600 hover:text-emerald-700 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3 group">
                  <Zap className="w-5 h-5 group-hover:text-amber-600 transition-colors" />
                  Apply for Admission
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <div className="mt-6 flex items-center justify-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Quick Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Merit Based</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

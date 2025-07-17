"use client";

import Image from "next/image";
import bannerImg from "@/public/banner.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useColleges } from "@/Hooks/useColleges";
import { BookOpen, Calendar, MapPin, Search, Star } from "lucide-react";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);
  console.log(filteredColleges);

  const { data: colleges, isLoading } = useColleges();
  // console.log(colleges);

  const handleSearch = () => {
    const search = searchText.toLowerCase().trim();
    if (search && colleges) {
      const matches = colleges.filter((college) => {
        return college.collegeName.toLowerCase().includes(search);
      });
      setFilteredColleges(matches);
    } else {
      setFilteredColleges([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="py-16 min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-gray-100">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[800px] overflow-hidden">
        <Image
          src={bannerImg}
          alt="College Campus"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-emerald-800/70 to-emerald-900/80"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-8 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-amber-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Your Dream
                <span className="block text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text">
                  College Awaits
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 mb-4 font-light">
                Discover, Apply, and Secure Your Future at Top Colleges
              </p>
              <p className="text-lg text-emerald-200 max-w-2xl mx-auto leading-relaxed">
                Join thousands of students who found their perfect college match
                through our comprehensive platform. Your academic journey starts
                here.
              </p>
            </div>

            {/* Search Section */}
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto border border-white/20">
              <div className="mb-4">
                <h3 className="text-2xl font-semibold text-emerald-800 mb-2">
                  Find Your Perfect College
                </h3>
                <p className="text-gray-600">
                  Search from hundreds of top colleges and universities
                </p>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search college by name, location, or program..."
                    className="pl-12 pr-4 py-6 text-lg border-2 border-emerald-200 focus:border-emerald-500 rounded-xl shadow-sm"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Stats Section */}
            <div className=" mt-12 grid grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { number: "500+", label: "Top Colleges", icon: BookOpen },
                { number: "50K+", label: "Students Enrolled", icon: Star },
                { number: "200+", label: "Programs Available", icon: Calendar },
                { number: "95%", label: "Success Rate", icon: MapPin },
              ].map((stat, index) => (
                <div key={index} className="text-center text-white">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-3 inline-block">
                    <stat.icon className="w-6 h-6 text-amber-300 mx-auto" />
                  </div>
                  <div className="text-3xl font-bold text-amber-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-emerald-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
            <p className="text-sm mt-2 text-white/70">Scroll to explore</p>
          </div>
        </div>
      </div>

      {/* Enhanced Search Results */}
      {filteredColleges.length > 0 && (
        <div className="container mx-auto py-16 px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-emerald-800 mb-4">
              Search Results
            </h2>
            <p className="text-gray-600 text-lg">
              Found {filteredColleges.length} colleges matching your search
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredColleges.map((college) => (
              <div
                key={college._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-emerald-100"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={college?.collegeImage}
                    alt={college.collegeName}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ {college.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-emerald-800 mb-3 line-clamp-2">
                    {college.collegeName}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-sm">
                        Admission: {college.admissionDate}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-sm">
                        Research Papers: {college.researchCount}
                      </span>
                    </div>
                  </div>

                  <Link href={`/colleges/${college._id}`}>
                    <Button className="w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

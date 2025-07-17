"use client";
import { useColleges } from "@/Hooks/useColleges";
import Image from "next/image";
import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  Camera,
} from "lucide-react";

function Gallery() {
  const { data: colleges, isLoading } = useColleges();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="py-16 bg-gradient-to-br from-emerald-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-emerald-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="w-64 h-8 bg-emerald-200 rounded-lg mx-auto mb-2 animate-pulse"></div>
            <div className="w-96 h-4 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const openLightbox = (college, index) => {
    setSelectedImage(college);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (colleges && currentImageIndex < colleges.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setSelectedImage(colleges[currentImageIndex + 1]);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setSelectedImage(colleges[currentImageIndex - 1]);
    }
  };

  return (
    <div className="py-12 bg-gradient-to-br from-emerald-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full mb-6">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
            Campus Life
            <span className="block text-transparent bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text">
              Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the vibrant campus life and stunning architecture of our
            partner colleges. Each image tells a story of academic excellence
            and student achievements.
          </p>
        </div>

        {/* Gallery Grid */}
        {colleges && colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {colleges.slice(0, 8)?.map((college, index) => (
              <div
                key={college._id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => openLightbox(college, index)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={college.collegeImage}
                    alt={`${college.collegeName} Campus`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center text-white mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Campus View</span>
                      </div>
                      <div className="flex items-center text-white/90">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-xs">Graduate Community</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Camera className="w-4 h-4" />
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ {college.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-emerald-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {college.collegeName}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Campus & Graduate Photos</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No Images Available
            </h3>
            <p className="text-gray-500">
              College gallery images will appear here once loaded.
            </p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-300 mb-2">
                {colleges?.length || 0}+
              </div>
              <div className="text-emerald-100">Partner Colleges</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-300 mb-2">
                1000+
              </div>
              <div className="text-emerald-100">Campus Photos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-300 mb-2">50K+</div>
              <div className="text-emerald-100">Happy Graduates</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-amber-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            {currentImageIndex > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {colleges && currentImageIndex < colleges.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-96 md:h-[600px]">
                <Image
                  src={selectedImage.collegeImage}
                  alt={`${selectedImage.collegeName} Campus`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image Info */}
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-emerald-800">
                    {selectedImage.collegeName}
                  </h3>
                  <div className="flex items-center bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ {selectedImage.rating}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-emerald-600" />
                    <span>Campus & Graduate Community</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                    <span>Premium Educational Institution</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} of {colleges?.length || 0}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;

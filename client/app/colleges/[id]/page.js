// app/colleges/[id]/page.jsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useCollegeDetails } from "@/Hooks/useCollegeDetails";
import Link from "next/link";

export default function CollegeDetailsPage() {
  const { id } = useParams();

  const { data: college, isLoading, isError, error } = useCollegeDetails(id);
  console.log(college);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="pt-24 pb-16 px-4 md:px-6 max-w-6xl mx-auto">
      {/* Banner Image */}
      <div className="relative w-full h-[230px] md:h-[400px] overflow-hidden rounded-xl shadow-lg">
        <Image
          src={college?.collegeImage}
          alt={college?.collegeName}
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center drop-shadow">
            {college?.collegeName}
          </h1>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Events */}
        <div className="bg-white shadow rounded-xl p-5 hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Upcoming Events
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {college?.events?.map((event, i) => (
              <li key={i}>{event}</li>
            ))}
          </ul>
        </div>

        {/* Research Works */}
        <div className="bg-white shadow rounded-xl p-5 hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Research Highlights
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {college?.researchWorks?.map((work, i) => (
              <li key={i}>{work}</li>
            ))}
          </ul>
        </div>

        {/* Sports Categories */}
        <div className="bg-white shadow rounded-xl p-5 hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Sports Programs
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {college?.sports?.map((sport, i) => (
              <li key={i}>{sport}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Optional CTA */}
      <div className="mt-12 text-center">
        <Link href="/admission">
          <button className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg shadow-md transition">
            Apply for Admission
          </button>
        </Link>
      </div>
    </div>
  );
}

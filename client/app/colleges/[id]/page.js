// app/colleges/[id]/page.jsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CollegeDetailsPage() {
  const { id } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    // Simulate fetching college details by ID
    // Replace this with real API in production
    const fetchCollege = async () => {
      const mockData = {
        id,
        name: "North South University",
        image:
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
        admissionProcess: "Online application, written test, interview",
        events: ["Orientation", "Convocation", "Tech Fest"],
        researchWorks: ["AI Research", "Climate Study", "Business Trends"],
        sports: ["Football", "Basketball", "Cricket"],
      };
      setCollege(mockData);
    };

    fetchCollege();
  }, [id]);

  if (!college) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Image
        src={college.image}
        alt={college.name}
        width={1000}
        height={400}
        className="rounded-md mb-4 object-cover"
      />
      <h1 className="text-3xl font-bold text-green-700">{college.name}</h1>

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Admission Process:
        </h2>
        <p className="text-gray-600">{college.admissionProcess}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Events:</h2>
        <ul className="list-disc list-inside text-gray-600">
          {college.events.map((event, i) => (
            <li key={i}>{event}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Research Works:
        </h2>
        <ul className="list-disc list-inside text-gray-600">
          {college.researchWorks.map((work, i) => (
            <li key={i}>{work}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Sports:</h2>
        <ul className="list-disc list-inside text-gray-600">
          {college.sports.map((sport, i) => (
            <li key={i}>{sport}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

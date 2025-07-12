"use client";
import { Button } from "@/components/ui/button";
import { useColleges } from "@/Hooks/useColleges";
import Image from "next/image";
import Link from "next/link";

function CollegesPage() {
  const { data: colleges, isLoading } = useColleges();
  console.log(colleges);
  if (isLoading) return <h1>Loading.....</h1>;
  return (
    <div className="pt-20 min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        All collegess
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {colleges?.map((college) => (
          <div
            key={college._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={college?.collegeImage}
              alt={college.collegeName}
              width={600}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-bold text-green-700 mb-1">
                {college.name}
              </h2>
              <p className="text-sm text-gray-600">
                🎓 Admission:{" "}
                <span className="font-medium">{college.admissionDate}</span>
              </p>
              <p className="text-sm text-gray-600">
                ⭐ Rating: <span className="font-medium">{college.rating}</span>
              </p>
              <p className="text-sm text-gray-600">
                🔬 Research Papers:{" "}
                <span className="font-medium">{college.researchCount}</span>
              </p>

              <Link href={`/colleges/1`}>
                <Button className="mt-4">View Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollegesPage;

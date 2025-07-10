// components/CollegeCard.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CollegeCard = ({ college }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
      <Image
        src={college.image}
        alt={college.name}
        width={300}
        height={200}
        className="object-cover"
      />
      <div className="p-6 flex flex-col justify-center">
        <h2 className="text-xl font-bold text-green-700">{college.name}</h2>
        <p className="text-gray-600 mt-2">{college.shortDescription}</p>
        <Link href={`/colleges/${college.id}`}>
          <Button className="mt-4 w-fit">Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default CollegeCard;

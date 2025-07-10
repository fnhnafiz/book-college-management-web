"use client";

import Image from "next/image";
import bannerImg from "@/public/banner.webp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [showCard, setShowCard] = useState(false);

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      setShowCard(true);
    }
  };

  return (
    <div className="pt-12 min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative w-full h-[700px]">
        <Image
          src={bannerImg}
          alt="Banner"
          fill
          className="object-cover rounded-md shadow-md"
          priority
        />

        {/* Centered Search Bar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-md p-4 shadow-md max-w-xl w-full mx-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search college by name..."
                className="flex-1"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Result Section (Static College Card) */}
      {showCard && (
        <div className="container mx-auto mt-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
              alt="College"
              className="object-cover w-full md:w-1/3 h-48 md:h-auto"
            />
            <div className="p-6 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-green-700">
                North South University
              </h2>
              <p className="text-gray-600 mt-2">
                A leading private university located in Dhaka, Bangladesh.
              </p>
              <Link href="/colleges/1">
                <Button className="mt-4 w-fit">View Details</Button>
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
              alt="College"
              className="object-cover w-full md:w-1/3 h-48 md:h-auto"
            />
            <div className="p-6 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-green-700">
                North South University
              </h2>
              <p className="text-gray-600 mt-2">
                A leading private university located in Dhaka, Bangladesh.
              </p>
              <Button className="mt-4 w-fit">View Details</Button>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
              alt="College"
              className="object-cover w-full md:w-1/3 h-48 md:h-auto"
            />
            <div className="p-6 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-green-700">
                North South University
              </h2>
              <p className="text-gray-600 mt-2">
                A leading private university located in Dhaka, Bangladesh.
              </p>
              <Button className="mt-4 w-fit">View Details</Button>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
              alt="College"
              className="object-cover w-full md:w-1/3 h-48 md:h-auto"
            />
            <div className="p-6 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-green-700">
                North South University
              </h2>
              <p className="text-gray-600 mt-2">
                A leading private university located in Dhaka, Bangladesh.
              </p>
              <Button className="mt-4 w-fit">View Details</Button>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
              alt="College"
              className="object-cover w-full md:w-1/3 h-48 md:h-auto"
            />
            <div className="p-6 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-green-700">
                North South University
              </h2>
              <p className="text-gray-600 mt-2">
                A leading private university located in Dhaka, Bangladesh.
              </p>
              <Button className="mt-4 w-fit">View Details</Button>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
              alt="College"
              className="object-cover w-full md:w-1/3 h-48 md:h-auto"
            />
            <div className="p-6 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-green-700">
                North South University
              </h2>
              <p className="text-gray-600 mt-2">
                A leading private university located in Dhaka, Bangladesh.
              </p>
              <Button className="mt-4 w-fit">View Details</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

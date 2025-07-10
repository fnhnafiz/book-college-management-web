"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import avatar from "@/public/avatar-image.jpg";

function MyProfile() {
  const router = useRouter();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <h1>Loading profile.......</h1>;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <Image
          src={user?.photo || avatar}
          alt="User Photo"
          width={100}
          height={100}
          className="mx-auto mb-4 rounded-full ring-2 ring-green-500"
        />
        <h1 className="text-2xl font-bold mb-2 text-green-700">{user.name}</h1>
        <p className="text-gray-600 mb-1">{user.email}</p>
        <p className="text-sm text-gray-500 italic">Welcome to your profile</p>
      </div>
    </div>
  );
}

export default MyProfile;

"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const onSubmit = async (data) => {
    try {
      // Send form data to backend signup route
      const response = await axios.post(`${API_BASE_URL}/signup`, data);

      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register an account</CardTitle>
          <CardDescription>
            Please fill in your information to create an account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  {...register("name", { required: "Name is required" })}
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>

              {/* Photo URL */}
              <div className="grid gap-2">
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  type="url"
                  placeholder="https://example.com/your-photo.jpg"
                  {...register("photo", { required: "Photo URL is required" })}
                />
              </div>

              <Button type="submit" className="w-full mt-4">
                Register
              </Button>
            </div>
          </form>
        </CardContent>

        <CardAction className="mt-2 w-full flex justify-center">
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Login here
            </Link>
          </p>
        </CardAction>
      </Card>
    </div>
  );
}

export default RegisterPage;

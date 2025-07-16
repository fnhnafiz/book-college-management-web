"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/lib/auth";

function Navbar() {
  const [menuBar, setMenuBar] = useState(false);
  const [color, setColor] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.refresh();
    router.push("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setColor(window.scrollY >= 90);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldHide =
    pathname?.startsWith("/login") || pathname?.startsWith("/register");
  if (shouldHide) return null;

  return (
    <div
      className={`w-full z-50 fixed top-0 bg-gradient-to-r from-green-500 to-green-800 shadow-lg text-white transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo + Mobile Menu Icon */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Icon */}
          <Menu
            className="text-3xl cursor-pointer lg:hidden hover:text-yellow-200 transition-colors"
            onClick={() => setMenuBar(true)}
          />
          <Link href="/">
            <h1 className="text-2xl font-bold hover:text-yellow-200 transition-colors">
              <span className="text-yellow-200">ADMIT</span>WISE
            </h1>
          </Link>
        </div>

        {/* Center: Nav Links */}
        <ul className="hidden lg:flex gap-8 absolute left-1/2 -translate-x-1/2">
          {[
            { href: "/", label: "Home" },
            { href: "/all-colleges", label: "Colleges" },
            { href: "/admission", label: "Admission" },
            { href: "/my-college", label: "My College" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-semibold hover:text-yellow-200 transition-colors ${
                  pathname === href
                    ? "text-yellow-200 border-b-2 border-yellow-200 pb-1"
                    : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Auth */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <Link href="/login">
              <Button className="bg-white text-blue-600 hover:bg-yellow-200 hover:text-blue-700 font-semibold transition-colors shadow-md">
                Sign In
              </Button>
            </Link>
          ) : (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Image
                  src={user?.photo || "/default-avatar.png"}
                  alt="profile"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-white hover:ring-yellow-200 transition-all shadow-md"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white shadow-lg border-0"
              >
                <div className="px-4 py-2 text-sm font-medium text-gray-800 border-b border-gray-200">
                  {user?.name}
                </div>
                <DropdownMenuItem
                  onClick={() => router.push("/my-profile")}
                  className="text-blue-600 hover:bg-blue-50 px-4 py-2 font-medium"
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50 px-4 py-2 font-medium"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Sidebar: Mobile Menu */}
      <div
        className={clsx(
          "fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 -translate-x-full transition-all z-50",
          menuBar && "translate-x-0"
        )}
      >
        <section className="bg-gradient-to-b from-green-600 to-purple-600 text-white flex flex-col absolute left-0 top-0 h-screen p-8 gap-8 w-56 shadow-xl">
          {/* Close icon inside sidebar */}
          <X
            className="text-3xl cursor-pointer self-end hover:text-yellow-200 transition-colors"
            onClick={() => setMenuBar(false)}
          />
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                href="/"
                className={`font-semibold hover:text-yellow-200 transition-colors text-lg ${
                  pathname === "/"
                    ? "text-yellow-200 border-l-4 border-yellow-200 pl-2"
                    : ""
                }`}
                onClick={() => setMenuBar(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/all-colleges"
                className={`font-semibold hover:text-yellow-200 transition-colors text-lg ${
                  pathname === "/colleges"
                    ? "text-yellow-200 border-l-4 border-yellow-200 pl-2"
                    : ""
                }`}
                onClick={() => setMenuBar(false)}
              >
                Colleges
              </Link>
            </li>
            <li>
              <Link
                href="/admission"
                className={`font-semibold hover:text-yellow-200 transition-colors text-lg ${
                  pathname === "/admission"
                    ? "text-yellow-200 border-l-4 border-yellow-200 pl-2"
                    : ""
                }`}
                onClick={() => setMenuBar(false)}
              >
                Admission
              </Link>
            </li>
            <li>
              <Link
                href="/my-college"
                className={`font-semibold hover:text-yellow-200 transition-colors text-lg ${
                  pathname === "/my-college"
                    ? "text-yellow-200 border-l-4 border-yellow-200 pl-2"
                    : ""
                }`}
                onClick={() => setMenuBar(false)}
              >
                My College
              </Link>
            </li>
          </ul>

          <div className="flex flex-col gap-4 mt-4">
            {!user ? (
              <Link href="/login">
                <Button className="bg-white text-blue-600 hover:bg-yellow-200 hover:text-blue-700 font-semibold transition-colors w-full">
                  Sign In
                </Button>
              </Link>
            ) : (
              <>
                <Image
                  src={user?.photo || "/default-avatar.png"}
                  alt="profile"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full ring-2 ring-white shadow-md"
                />
                <div className="text-sm font-medium text-yellow-200">
                  {user?.name}
                </div>
                <Button
                  onClick={() => {
                    router.push("/my-profile");
                    setMenuBar(false);
                  }}
                  className="bg-white text-blue-600 hover:bg-yellow-200 hover:text-blue-700 font-semibold transition-colors mb-2"
                >
                  Profile
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="bg-white text-red-500 hover:bg-yellow-200 hover:text-red-600 font-semibold transition-colors"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Navbar;

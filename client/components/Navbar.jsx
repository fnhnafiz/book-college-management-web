"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
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

  const { data: user, isLoading } = useQuery({
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
      className={`w-full z-50 fixed top-0 transition-all duration-300 ${
        color
          ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-emerald-100"
          : "bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center relative">
        {/* Logo + Mobile Menu Icon */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Icon */}
          <Menu
            className={`text-2xl cursor-pointer lg:hidden transition-colors hover:scale-110 ${
              color
                ? "text-emerald-600 hover:text-emerald-800"
                : "text-white hover:text-amber-200"
            }`}
            onClick={() => setMenuBar(true)}
          />
          <Link className="flex items-center gap-3 group" href="/">
            <div className="p-1 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
              <Image
                src={logo}
                width={36}
                height={36}
                alt="Logo"
                className="rounded-full"
              />
            </div>
            <h1
              className={`text-2xl font-bold transition-colors ${
                color
                  ? "text-emerald-800 group-hover:text-emerald-600"
                  : "text-white group-hover:text-amber-200"
              }`}
            >
              <span className={color ? "text-amber-500" : "text-amber-200"}>
                ADMIT
              </span>
              WISE
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
                className={`font-semibold transition-all duration-200 relative px-3 py-2 rounded-md ${
                  pathname === href
                    ? color
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-amber-200 bg-white/10"
                    : color
                    ? "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"
                    : "text-white hover:text-amber-200 hover:bg-white/10"
                }`}
              >
                {label}
                {pathname === href && (
                  <div
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      color ? "bg-emerald-600" : "bg-amber-200"
                    }`}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Auth */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <Link href="/login">
              <Button
                className={`font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
                  color
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-white text-emerald-700 hover:bg-amber-100 hover:text-emerald-800"
                }`}
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <div className="relative cursor-pointer group">
                  <Image
                    src={user?.photo || "/default-avatar.png"}
                    alt="profile"
                    width={40}
                    height={40}
                    className={`w-10 h-10 rounded-full transition-all duration-200 shadow-md group-hover:shadow-lg ${
                      color
                        ? "ring-2 ring-emerald-200 group-hover:ring-emerald-400"
                        : "ring-2 ring-white/30 group-hover:ring-amber-200"
                    }`}
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${
                      color
                        ? "bg-emerald-500 border-white"
                        : "bg-amber-400 border-emerald-700"
                    }`}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white shadow-xl border-0 rounded-xl p-2 min-w-[200px]"
              >
                <div className="px-4 py-3 text-sm font-medium text-gray-800 border-b border-gray-100 rounded-t-lg bg-emerald-50">
                  <div className="font-semibold text-emerald-800">
                    {user?.name}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Student Portal
                  </div>
                </div>
                <DropdownMenuItem
                  onClick={() => router.push("/my-profile")}
                  className="text-emerald-700  hover:bg-emerald-50 px-4 py-3 font-medium rounded-lg m-1 transition-colors cursor-pointer"
                >
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50 px-4 py-3 font-medium rounded-lg m-1 transition-colors cursor-pointer"
                >
                  Sign Out
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
        <section className="bg-gradient-to-b from-emerald-600 via-emerald-700 to-emerald-800 text-white flex flex-col absolute left-0 top-0 h-screen p-6 gap-6 w-72 shadow-2xl">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                width={32}
                height={32}
                alt="Logo"
                className="rounded-full"
              />
              <h2 className="text-lg font-bold">
                <span className="text-amber-200">ADMIT</span>WISE
              </h2>
            </div>
            <X
              className="text-2xl cursor-pointer hover:text-amber-200 transition-colors hover:scale-110"
              onClick={() => setMenuBar(false)}
            />
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-2 mt-2">
            {[
              { href: "/", label: "Home" },
              { href: "/all-colleges", label: "Colleges" },
              { href: "/admission", label: "Admission" },
              { href: "/my-college", label: "My College" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`font-semibold transition-all duration-200 text-base px-4 py-3 rounded-lg flex items-center ${
                    pathname === href
                      ? "text-amber-200 bg-white/10 border-l-4 border-amber-200"
                      : "text-white hover:text-amber-200 hover:bg-white/10"
                  }`}
                  onClick={() => setMenuBar(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Section */}
          <div className="flex flex-col gap-4 mt-auto border-t border-white/20 pt-6">
            {isLoading ? null : !user ? (
              <Link href="/login">
                <Button className="bg-white cursor-pointer text-emerald-700 hover:bg-amber-100 hover:text-emerald-800 font-semibold transition-all duration-200 w-full shadow-md">
                  Sign In
                </Button>
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <Image
                    src={user?.photo || "/default-avatar.png"}
                    alt="profile"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full ring-2 ring-white/30 shadow-md"
                  />
                  <div>
                    <div className="text-sm font-semibold text-amber-200">
                      {user?.name}
                    </div>
                    <div className="text-xs text-white/70">Student</div>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    router.push("/my-profile");
                    setMenuBar(false);
                  }}
                  className="bg-white cursor-pointer text-emerald-700 hover:bg-amber-100 hover:text-emerald-800 font-semibold transition-all duration-200 w-full shadow-md"
                >
                  My Profile
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="bg-red-500 cursor-pointer text-white hover:bg-red-600 font-semibold transition-all duration-200 w-full shadow-md"
                >
                  Sign Out
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

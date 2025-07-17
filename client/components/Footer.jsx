"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
} from "lucide-react";
import { usePathname } from "next/navigation";

function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const pathname = usePathname();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };
  const isLogin = pathname?.startsWith("/login");
  const isRegister = pathname?.startsWith("/register");

  if (isRegister) {
    return null;
  }

  if (isLogin) {
    return null;
  }

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/all-colleges", label: "Colleges" },
    { to: "/admission", label: "Admission" },
    { to: "/my-college", label: "My College" },
  ];

  const socialLinks = [
    { icon: Facebook, to: "#", label: "Facebook" },
    { icon: Twitter, to: "#", label: "Twitter" },
    { icon: Instagram, to: "#", label: "Instagram" },
    { icon: Linkedin, to: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-gradient-to-r from-emerald-700 to-emerald-800 text-white overflow-hidden ">
      {/* Floating Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-12 h-12 bg-white/5 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white/15 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="relative z-10">
        {/* Stats */}
        <div className="py-12 border-b border-white/20"></div>

        {/* Main Footer */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Brand */}
              <div>
                <h2 className="text-3xl font-bold mb-3 flex items-center">
                  <Sparkles className="w-8 h-8 mr-2 text-yellow-300 animate-pulse" />
                  <span className="text-white">ADMIT</span>
                  <span className="text-yellow-300">WISE</span>
                </h2>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Empowering your academic journey by connecting you with
                  colleges and admission resources across the country.
                </p>

                {/* Social */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 group-hover:animate-pulse" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.to}
                        className="text-white/90 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                      >
                        <span className="w-2 h-2 bg-yellow-300 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center group hover:translate-x-2 transition-transform">
                    <Mail className="w-5 h-5 mr-3 text-yellow-300 group-hover:animate-bounce" />
                    <span className="text-white/90">support@admitwise.com</span>
                  </div>
                  <div className="flex items-center group hover:translate-x-2 transition-transform">
                    <Phone className="w-5 h-5 mr-3 text-yellow-300 group-hover:animate-bounce" />
                    <span className="text-white/90">+880 1234 567 890</span>
                  </div>
                  <div className="flex items-center group hover:translate-x-2 transition-transform">
                    <MapPin className="w-5 h-5 mr-3 text-yellow-300 group-hover:animate-bounce" />
                    <span className="text-white/90">Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Stay Updated
                </h3>
                <p className="text-white/90 mb-4">
                  Get admission alerts and education updates right in your
                  inbox.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribed}
                    className="w-full px-4 py-3 bg-yellow-400 hover:bg-yellow-300 text-green-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubscribed ? (
                      <>
                        <Heart className="w-5 h-5 mr-2 animate-pulse" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 bg-black/20 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/90 text-sm flex items-center">
                &copy; {year} ADMIT WISE. All rights reserved. Made with
                <Heart className="w-4 h-4 mx-1 text-red-300 animate-pulse" />
                in Bangladesh
              </div>
              <div className="flex space-x-6 text-sm">
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import ReviewSection from "@/components/ReviewSection";
import ReasearchPaper from "@/components/ReasearchPaper";
import Gallery from "@/components/Gallery";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "AdmitWise",
  description: "Your trusted platform for college admissions.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-250px)] mb-12">
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </main>

          <Gallery />
          <ReasearchPaper />
          <ReviewSection />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

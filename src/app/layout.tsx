import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Header } from "@/components/Header";
import { SubHeader } from "@/components/SubHeader";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/Toaster";

export const metadata = {
  title: "Calendar",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
        ${inter.className}
        bg-zinc-800 w-full h-screen flex flex-col
        `}
      >
        <Toaster />
        <div className="">
          <Header />
          <SubHeader />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}

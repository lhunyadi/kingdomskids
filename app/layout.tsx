import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Scroll from "@/components/Scroll";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kingdom's Kids Ministry",
  description: "Kingdom's Kids Missionary Project",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased bg-white-off text-black text-md"
      >
        <Header />
        <Scroll>{children}</Scroll>
        <Footer />
      </body>
    </html>
  );
}

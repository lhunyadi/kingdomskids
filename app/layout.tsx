import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Scroll from "@/components/Scroll";
import Footer from "@/components/Footer";
import { Theme } from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased text-md">
        <Theme attribute="class" defaultTheme="light" enableSystem={false} storageKey="theme">
          <div className="flex flex-col min-h-screen bg-background text-text">
            <Header />
            <Scroll className="flex-1">{children}</Scroll>
            <Footer />
          </div>
        </Theme>
      </body>
    </html>
  );
}
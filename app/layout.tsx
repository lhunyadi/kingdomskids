import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Scroll from "@/components/Scroll";
import Footer from "@/components/Footer";
import { ThemeProvider as Theme} from "@/components/ThemeProvider";

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
      <body
        className="flex flex-col min-h-screen font-sans antialiased bg-white-off text-black text-md"
      >
        <Theme attribute="class" defaultTheme="light" enableSystem={false}>
          <Header />
          <Scroll className="flex-1">{children}</Scroll>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
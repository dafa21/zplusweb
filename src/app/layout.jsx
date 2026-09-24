import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { BASE_URL } from "@/lib/axios";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const response = await fetch(`${BASE_URL}/api/web/about-us/identity`, {
    cache: "no-cache",
  });
  const data = await response.json();
  const identity = data.data;

  return {
    title: identity.name || "Zplus ERD Lembaga Zakat",
    description: identity.name || "ERD Lembaga Zakat",
    icons: {
      icon: identity.favicon || "/web/favicon-zplus.png",
    },
    openGraph: {
      title: "Zplus ERD Lembaga Zakat",
      description: "Zplus ERD Lembaga Zakat",
      images: [identity.favicon],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jakartaSans.variable} antialiased`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}

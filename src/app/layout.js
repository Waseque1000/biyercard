import { Playfair_Display, DM_Sans, Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

export const metadata = {
  title: "Wedly AI — Your Love Story, Beautifully Invited",
  description:
    "Create breathtaking, bespoke wedding invitations in minutes with AI. Personalized designs, elegant typography, Bengali and English bilingual support, high-resolution export, and instant sharing.",
  keywords: [
    "wedding invitation generator",
    "AI wedding card maker",
    "Bangla wedding card",
    "bespoke wedding invitation",
    "Wedly AI",
    "Gemini wedding design",
  ],
  openGraph: {
    title: "Wedly AI — Your Love Story, Beautifully Invited",
    description: "Create breathtaking wedding invitations in minutes with AI.",
    siteName: "Wedly AI",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${hindSiliguri.variable} ${notoSerifBengali.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Serif+Bengali:wght@400;500;600;700&family=Tiro+Bangla&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-[#FAF8F4] text-[#252923] antialiased flex flex-col font-sans"
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            toastOptions={{
              style: {
                background: "#FAF8F4",
                border: "1px solid #E8E2D8",
                color: "#252923",
                fontFamily: "var(--font-dm-sans)",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}

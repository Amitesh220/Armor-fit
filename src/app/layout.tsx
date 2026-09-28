import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Armor Fit Gym | Transform Sweat into Strength",
  description:
    "An uncompromising strength and conditioning facility in Gorakhnath, Gorakhpur. Pure steel, Olympic platforms, structured functional conditioning, and barbell power.",
  keywords: [
    "Armor Fit Gym",
    "Strength and Conditioning Gorakhpur",
    "CrossFit Gorakhpur",
    "Powerlifting Gorakhpur",
    "Olympic Weightlifting",
    "Gym Near MP Polytechnic",
    "Best Gym in Gorakhnath",
  ],
  authors: [{ name: "Armor Fit Athletics" }],
  openGraph: {
    title: "Armor Fit Gym | Transform Sweat into Strength",
    description:
      "Serious training facility in Gorakhpur: progressive overload, heavy barbell platforms, and metabolic engine building.",
    url: "https://armorfitgym.com",
    siteName: "Armor Fit Gym",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-screen bg-surface-container-lowest text-on-surface antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}

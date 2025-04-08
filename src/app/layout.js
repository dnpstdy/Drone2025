import "./globals.css";
import Script from "next/script";
import Navbar from "./components/navbar";

export const metadata = {
  title: "Drone",
  description: "Drone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="body">
        <Navbar />
        {children}
        <Script
          type="module"
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/momentum.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

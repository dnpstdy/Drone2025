import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "65010144_drone_api_front", 
  description: "", 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">
        <Script 
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/bouncy.js" 
          type="module" 
          strategy="lazyOnload" 
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {children}
      </body>
    </html>
  );
}

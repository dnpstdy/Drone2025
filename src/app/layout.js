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
        {children}
      <script type="module" src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/tailspin.js"></script>
      </body>
    </html>
  );
}

import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import QuickViewModal from "@/components/products/QuickViewModal";

export const metadata = {
  title: "Artistic Carpets | Handwoven Luxury Rugs",
  description:
    "Discover a curated collection of artisanal handwoven rugs that tell a story of heritage, patience, and unparalleled craftsmanship.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#FCF9F8] text-[#1E1E1E]"
      >
        <QueryProvider>
          {children}
          <QuickViewModal />
        </QueryProvider>
      </body>
    </html>
  );
}

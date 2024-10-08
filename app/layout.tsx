import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shamba assistant-ai",
  description: "Shamba-assistant - Your Digital Farming Companion",
  icons:{
    icon:"/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      {/* <script>
      window.ChatWidgetConfig = {
      primaryColor: 'green',
      serverUrl: 'http://localhost:3000'
    };
    </script> */}
    {/* <script src="http://localhost:3000/widget.js"></script> */}
      </body>
    </html>
  );
}

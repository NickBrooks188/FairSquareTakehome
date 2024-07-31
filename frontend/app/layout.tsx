import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const ReduxProvider = dynamic(() => import("@/app/redux/StoreProvider"), {
  ssr: false
}); const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fair Square",
  description: "Takehome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider> {children}</ReduxProvider>
      </body>
    </html>
  );
}

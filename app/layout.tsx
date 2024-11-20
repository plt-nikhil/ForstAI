import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.css";
import { Inter } from "next/font/google";
import "./globals.css";
import BootstrapClient from "@/components/BootstrapClient.js";
import SessionWrapper from "@/components/SessionWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Toaster } from 'react-hot-toast';
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ForstAI",
  description: "Universal ID, Rights and Royalty Automation for AI Training Data and Generated Creations",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <SessionWrapper session={session}>
      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader showSpinner={false} color="#AE46CA"/>
          {children}
          <BootstrapClient />
          <Toaster />
        </body>
      </html>
    </SessionWrapper>
  );
}

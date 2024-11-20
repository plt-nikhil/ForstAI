"use client";

import PurchaseAssetContextProvider from "@/providers/PurchaseAssetProvider";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <PurchaseAssetContextProvider>
      {children}
    </PurchaseAssetContextProvider>
  );
}

import React from "react";
import PurchaseAssetContext from "@/context/PurchaseAssetContext";
import { IPurchaseAssetContextType } from "@/@types/ContextTypes";
import { ISearchResults } from "@/@types/CommonTypes";

const PurchaseAssetContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [purchaseAssets, setPurchaseAssets] = React.useState<IPurchaseAssetContextType>({
    assetList: [],
    updateAssetListState: (value: ISearchResults[]) =>
      setPurchaseAssets({ ...purchaseAssets, assetList: value }),
  });

  return (
    <PurchaseAssetContext.Provider value={purchaseAssets}>
      {children}
    </PurchaseAssetContext.Provider>
  );
};

export default PurchaseAssetContextProvider;

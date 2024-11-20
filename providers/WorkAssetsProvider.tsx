import { IWorkAssetsContextType } from "@/@types/ContextTypes";
import WorkAssetsContext from "@/context/CommonContext";
import React from "react";

const WorkAssetsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [workAssetState, setWorkAssetState] =
    React.useState<IWorkAssetsContextType>({
      selectedItem: undefined,
      selectedAssetGroup: undefined,
      selectedAssetDetails: undefined,
      selectedContractOffer: null,
      updateWorkAssetState: (value: Record<string, string>) => {
        setWorkAssetState((prev) => ({ ...prev, ...value }));
      },
      files: undefined,
      isTraningStarted: false,
    });

  return (
    <WorkAssetsContext.Provider value={workAssetState}>
      {children}
    </WorkAssetsContext.Provider>
  );
};
export default WorkAssetsContextProvider;

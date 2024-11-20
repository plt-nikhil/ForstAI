import { ISearchResults } from "./CommonTypes";

export interface IWorkAssetsContextType {
  selectedItem: string | undefined;
  selectedAssetGroup: any | undefined;
  selectedAssetDetails: any | undefined;
  selectedContractOffer: any | undefined;
  updateWorkAssetState: (value: Record<string, string>) => void;
  files: any | undefined
  isTraningStarted: any | undefined
}

export interface IRegisterWorkContextType {
  workId: string | undefined;
  workName: string | undefined;
  updateWorkState: (value: Record<string, string>) => void;
}

export interface IPurchaseAssetContextType {
  assetList: ISearchResults[] | [],
  updateAssetListState: (value: ISearchResults[]) => void;
}

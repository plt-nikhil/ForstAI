export type IRegisterWorkType = {
  workName: string;
  likeType: string;
  workDescription: string;
  thumbnailImage: File;
  workKeywords: string[];
};
export type IAssetGroupDataType = {
  name: string;
  type: string;
  assetGroupId: string;
  children?: IAssetGroupDataType[];
  files?: any[];
  standardBrandGuidelines?: string[];
  authorizedAgent?: string;
  coBrandingRestriction?: boolean;
  restrictedBrands?: string[];
  keywordRestriction?: boolean;
  restrictedKeywords?: string[];
  dataTrainingPreAuth?: boolean;
  authorizedTrainingTools?: string[];
};

export type IGeneratedImageDataType = {
  name: string;
  type: string;
  isCopyrighted: boolean;
  generatedThumbnail?: string;
  generatedWorkId: string;
};

export type IWorkCreateResult = {
  workId: string;
  workName: string;
};

export type IWorkListData = {
  name: string;
  likeType: string;
  sourceType: string;
  copyRightNumber?: string;
  isIndexed: boolean;
  image: string;
  worksId: string;
  workAssets: number;
  assetTypes: number;
  assetGroups: number;
};

export type IFolderData = {
  works: IWorkListData[];
  folder: { name: string };
};

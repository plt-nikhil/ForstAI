export type Response<T> = {
  success: Boolean;
  code: Number;
  context: String;
  data: T;
};

type ResponseUser = {
  name: string;
  email: string;
};

export type IMessage = {
  user: ResponseUser;
  message: string;
};

export type IMessageResponse = Response<IMessage>;

export type IWorkIndex = {
  name: string;
  description: string;
  shortType: string;
  universalId: string;
};

export type IWorkIndexDetails = {
  name: string;
  action: string[];
  objects: string[];
  people: string[];
  language: string[];
  sentiment: string[];
  lighting: string[];
  emotion: string[];
  clothing: string[];
  celebrities: string[];
  camAction: string[];
  brands: string[];
};

export type IWorkStandardIndex = {
  title: string;
  description: string;
  startFrame: string;
  endFrame: string;
  scenes: {
    title: string;
    description: string;
  }[];
  universalId: string;
};

export type ISearchResults = {
  assetId: string;
  type: string;
  quantity: string;
  owner: string;
  likeType: string;
  description: string;
  license: string;
  pricing: string;
  unit: string;
  price?: number
};

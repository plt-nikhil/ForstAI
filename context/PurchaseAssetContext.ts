import { createContext } from "react";
import { IPurchaseAssetContextType } from "@/@types/ContextTypes";

const PurchaseAssetContext = createContext<IPurchaseAssetContextType | null>(null);

export default PurchaseAssetContext;

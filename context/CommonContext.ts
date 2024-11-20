import { IWorkAssetsContextType } from "@/@types/ContextTypes";
import { createContext } from "react";

const WorkAssetsContext = createContext<IWorkAssetsContextType | null>(null);

export default WorkAssetsContext;

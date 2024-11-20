import { IRegisterWorkContextType } from "@/@types/ContextTypes";
import { createContext } from "react";

const RegisterWorkContext = createContext<IRegisterWorkContextType | null>(null);

export default RegisterWorkContext;

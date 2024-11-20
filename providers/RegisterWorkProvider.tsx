import { IRegisterWorkContextType } from "@/@types/ContextTypes";
import RegisterWorkContext from "@/context/WorkContext";
import React from "react";
const RegisterWorkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [workState, setWorkState] = React.useState<IRegisterWorkContextType>({
    workId: undefined,
    workName: undefined,
    updateWorkState: (value: Record<string, string>) =>
      setWorkState({ ...workState, ...value }),
  });
  return (
    <RegisterWorkContext.Provider value={workState}>
      {children}
    </RegisterWorkContext.Provider>
  );
};
export default RegisterWorkProvider;

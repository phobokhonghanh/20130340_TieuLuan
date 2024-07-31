import { createContext, useState, useContext, FC, ReactNode } from "react";

// Define types for context data
interface ModalContextProps {
  shouldRefreshFirstModal: boolean;
  refreshFirstModal: () => void;
}
interface ModalProviderProps {
  children: ReactNode; // ReactNode is the type for any valid JSX
}

// Create context
const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Custom hook to use context
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

// Provider component
export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [shouldRefreshFirstModal, setShouldRefreshFirstModal] = useState(false);

  const refreshFirstModal = () => {
    setShouldRefreshFirstModal((prevState) => !prevState);
  };

  // Value provided by context
  const contextValue: ModalContextProps = {
    shouldRefreshFirstModal,
    refreshFirstModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

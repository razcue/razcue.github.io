import { createContext, useContext, type ReactNode } from 'react';

export type ToastType = 'download' | 'chat';
export type ActiveDialog = 'chat' | null;

interface ToastContextType {
  activeToast: ToastType | null;
  activeDialog: ActiveDialog;
}

const defaultContext: ToastContextType = {
  activeToast: null,
  activeDialog: null,
};

const ToastContext = createContext<ToastContextType>(defaultContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <ToastContext.Provider value={defaultContext}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
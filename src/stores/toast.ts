import { create } from 'zustand';

export type ToastType = 'download' | 'chat' | null;

interface ToastState {
  activeToast: ToastType;
  activeDialog: 'chat' | null;
  showDownloadToast: () => void;
  showChatToast: () => void;
  dismissToast: () => void;
  openChatDialog: () => void;
  closeDialog: () => void;
}

const ONE_HOUR_MS = 60 * 60 * 1000;

export const useToastStore = create<ToastState>((set, get) => {
  let intervalId: ReturnType<typeof setInterval> | null = null;

  const checkAndShowToast = () => {
    const now = Date.now();
    const downloadDismissed = localStorage.getItem('downloadToastDismissed');
    const chatDismissed = localStorage.getItem('chatToastDismissed');
    const { activeToast, activeDialog } = get();

    if (activeDialog || activeToast) return;

    const downloadTime = downloadDismissed ? now - parseInt(downloadDismissed) : ONE_HOUR_MS + 1;
    const chatTime = chatDismissed ? now - parseInt(chatDismissed) : ONE_HOUR_MS + 1;

    if (!downloadDismissed || downloadTime > ONE_HOUR_MS) {
      set({ activeToast: 'download' });
      return;
    }

    if (!chatDismissed || chatTime > ONE_HOUR_MS) {
      set({ activeToast: 'chat' });
    }
  };

  const startInterval = () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(checkAndShowToast, 60000);
  };

  if (typeof window !== 'undefined') {
    setTimeout(startInterval, 2000);
  }

  return {
    activeToast: null,
    activeDialog: null,

    showDownloadToast: () => {
      set({ activeToast: 'download' });
    },

    showChatToast: () => {
      set({ activeToast: 'chat' });
    },

    dismissToast: () => {
      const { activeToast } = get();
      if (activeToast === 'download') {
        localStorage.setItem('downloadToastDismissed', Date.now().toString());
      } else if (activeToast === 'chat') {
        localStorage.setItem('chatToastDismissed', Date.now().toString());
      }
      set({ activeToast: null });
    },

    openChatDialog: () => {
      set({ activeDialog: 'chat' });
    },

    closeDialog: () => {
      set({ activeDialog: null });
    },
  };
});
import { useState, useEffect } from 'react';
import ChatWidget from './ChatWidget';

const ONE_HOUR_MS = 60 * 60 * 1000;
const TWO_MINUTES_MS = 2 * 60 * 1000;

export default function ChatWithToast() {
  const [showToast, setShowToast] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Auto-show chat toast 2 minutes after download is dismissed
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const checkAndShowChatToast = () => {
      const downloadDismissed = localStorage.getItem('downloadToastDismissed');
      const chatDismissed = localStorage.getItem('chatToastDismissed');
      const now = Date.now();

      // If download hasn't been dismissed, don't show chat toast
      if (!downloadDismissed) return;

      const downloadDismissedTime = parseInt(downloadDismissed);
      const chatDismissedTime = chatDismissed ? parseInt(chatDismissed) : 0;

      // Show chat if 2 minutes passed since download dismiss AND chat not shown in last hour
      if ((now - downloadDismissedTime) >= TWO_MINUTES_MS) {
        if (!chatDismissed || (now - chatDismissedTime) > ONE_HOUR_MS) {
          setShowToast(true);
        }
      } else {
        // Wait until 2 minutes have passed
        timeoutId = setTimeout(checkAndShowChatToast, TWO_MINUTES_MS - (now - downloadDismissedTime));
      }
    };

    // Check on mount and periodically
    checkAndShowChatToast();
    const interval = setInterval(checkAndShowChatToast, 10000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, []);

  // Click button opens dialog directly
  const handleChatClick = () => {
    setShowToast(false);
    setIsChatOpen(true);
  };

  const handleDismiss = () => {
    setShowToast(false);
    localStorage.setItem('chatToastDismissed', Date.now().toString());
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="relative">
      {/* Icon Button - opens dialog directly */}
      <button
        onClick={handleChatClick}
        className="text-text-secondary hover:text-accent transition-colors cursor-pointer"
        aria-label="Chat with AI assistant"
        title="Chat with AI"
      >
        <i className="i-tabler-message w-6 h-6" />
      </button>

      {/* Chat Window - desktop */}
      {isChatOpen && (
        <div
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 z-50 hidden lg:block animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-surface border border-surface rounded-xl shadow-2xl w-96 h-[500px] flex flex-col">
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-px bg-accent"
              style={{
                width: '12px',
                height: '12px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderRight: '1px solid rgba(255,255,255,0.1)',
                transform: 'translateX(50%) rotate(45deg)',
                boxShadow: '3px 3px 6px rgba(0,0,0,0.3)',
              }}
            />
            <ChatWidget isOpen={true} onOpen={handleCloseChat} />
          </div>
        </div>
      )}

      {/* Chat Window - mobile/tablet (full screen with blur) */}
      {isChatOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-start justify-center pt-16 p-2">
          <ChatWidget isOpen={true} onOpen={handleCloseChat} />
        </div>
      )}

      {/* Background blur for mobile */}
      {isChatOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-bg/80 backdrop-blur-md" />
      )}

      {/* Toast - auto-triggered, shows only when dialog is not open */}
      {showToast && !isChatOpen && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 z-40 animate-fade-in">
          <div className="relative bg-surface border border-surface p-4 rounded-xl shadow-xl w-64 sm:w-96">
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-px bg-accent"
              style={{
                width: '10px',
                height: '10px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderRight: '1px solid rgba(255,255,255,0.1)',
                transform: 'translateX(50%) rotate(45deg)',
                boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            />
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <i className="i-tabler-robot text-accent text-sm" />
              </div>
              <div className="flex-1">
                <p className="text-text text-sm">
                  Hi! I can answer questions about Rayko&apos;s experience,
                  skills, and availability.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <button
                    onClick={handleChatClick}
                    className="px-3 py-1.5 bg-accent text-surface text-xs font-medium rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Chat now
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-3 py-1.5 text-text-secondary text-xs hover:text-text transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-text-secondary hover:text-text transition-colors"
                aria-label="Dismiss"
              >
                <i className="i-tabler-x text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useToastStore } from '../stores/toast';
import ChatWidget from './ChatWidget';

export default function ChatWithToast() {
  const { activeToast, activeDialog, openChatDialog, dismissToast, closeDialog } = useToastStore();
  const isToastVisible = activeToast === 'chat';
  const isDialogVisible = activeDialog === 'chat';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChatClick = () => {
    openChatDialog();
  };

  const handleDismiss = () => {
    dismissToast();
  };

  const handleCloseChat = () => {
    closeDialog();
  };

  return (
    <div className="relative">
      <button
        onClick={handleChatClick}
        className="text-text-secondary hover:text-accent transition-colors cursor-pointer"
        aria-label="Chat with AI assistant"
        title="Chat with AI"
      >
        <i className="i-tabler-message w-6 h-6" />
      </button>

      {isDialogVisible && (
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

      {isDialogVisible && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-start justify-center pt-16 p-2">
          <ChatWidget isOpen={true} onOpen={handleCloseChat} />
        </div>
      )}

      {isDialogVisible && (
        <div className="lg:hidden fixed inset-0 z-40 bg-bg/80 backdrop-blur-md" />
      )}

      {isToastVisible && !isDialogVisible && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 z-40 animate-fade-in">
          <div className="relative bg-surface border border-surface p-4 rounded-xl shadow-xl w-64">
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
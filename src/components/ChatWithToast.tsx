import { useState, useEffect, useRef } from 'react';
import ChatWidget from './ChatWidget';

const CHAT_TOAST_KEY = 'chatToastDismissed';
const ONE_HOUR_MS = 60 * 60 * 1000;

export default function ChatWithToast() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dismissedAt = localStorage.getItem(CHAT_TOAST_KEY);
    if (!dismissedAt) {
      setShowToast(true);
    } else {
      const dismissedTime = parseInt(dismissedAt, 10);
      const now = Date.now();
      if (now - dismissedTime > ONE_HOUR_MS) {
        setShowToast(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showToast && buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
  }, [showToast]);

  // Lock page scroll and handle Esc/click outside when chat is open
  useEffect(() => {
    if (!isOpen) return;

    // Add a class to body to signal chat is open
    document.body.classList.add('chat-open');

    // Handle Esc key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    // Handle click outside - only on desktop (lg breakpoint and above)
    const handleClickOutside = (e: MouseEvent) => {
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop) return;

      if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEsc);
    // Use setTimeout to avoid triggering immediately on button click
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);

    return () => {
      document.body.classList.remove('chat-open');
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleChatClick = () => {
    setIsOpen(true);
  };

  const handleToastChat = () => {
    setShowToast(false);
    localStorage.setItem(CHAT_TOAST_KEY, Date.now().toString());
    setIsOpen(true);
  };

  const handleToastDismiss = () => {
    setShowToast(false);
    localStorage.setItem(CHAT_TOAST_KEY, Date.now().toString());
  };

  return (
    <div className="relative">
      {/* Chat Button */}
      <button
        ref={buttonRef}
        onClick={handleChatClick}
        className="text-text-secondary hover:text-accent transition-colors cursor-pointer"
        aria-label="Chat with AI assistant"
        title="Chat with AI"
      >
        <i className="i-tabler-message w-6 h-6" />
      </button>

      {/* Chat Window - positioned relative to chat button (desktop only) */}
      {isOpen && (
        <div
          ref={chatRef}
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 z-50 hidden lg:block animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-surface border border-surface rounded-xl shadow-2xl w-96 h-[500px] flex flex-col">
            {/* Arrow pointing right toward button */}
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
            <ChatWidget isOpen={isOpen} onOpen={setIsOpen} />
          </div>
        </div>
      )}

      {/* Chat Window - mobile/tablet (full screen with blur) */}
      {isOpen && (
        <div
          ref={chatRef}
          className="lg:hidden fixed inset-0 z-50 flex items-start justify-center pt-16 p-2"
        >
          <ChatWidget isOpen={isOpen} onOpen={setIsOpen} />
        </div>
      )}

      {/* Chat Window - mobile/tablet (full screen with blur) */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-bg/80 backdrop-blur-md" />
      )}

      {/* Toast - positioned relative to chat button */}
      {showToast && !isOpen && buttonRect && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 z-40 animate-fade-in">
          <div className="relative bg-surface border border-surface p-4 rounded-xl shadow-xl w-64 sm:w-96">
            {/* Arrow pointing right toward button */}
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
                    onClick={handleToastChat}
                    className="px-3 py-1.5 bg-accent text-surface text-xs font-medium rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Chat now
                  </button>
                  <button
                    onClick={handleToastDismiss}
                    className="px-3 py-1.5 text-text-secondary text-xs hover:text-text transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
              <button
                onClick={handleToastDismiss}
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

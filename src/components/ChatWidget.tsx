import { useState, useRef, useEffect } from 'react';
import { getTranslation, type Locale } from '../utils/i18n';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  isOpen?: boolean;
  onOpen?: (open: boolean) => void;
  locale?: Locale;
}

export default function ChatWidget({
  isOpen: externalIsOpen,
  onOpen,
  locale = 'en',
}: ChatWidgetProps) {
  const t = getTranslation(locale);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: t.chat.welcomeMessage,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const setIsOpen = (open: boolean) => {
    if (isControlled) {
      onOpen?.(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiBase =
        import.meta.env.PUBLIC_API_URL ||
        'https://razcue-github-io.vercel.app/api/';
      const response = await fetch(`${apiBase}chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(1),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to get response');

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile: Full screen with blur backdrop - handled by parent */}
      <div
        className="fixed inset-0 z-50 sm:hidden flex items-center justify-center p-2 pt-16"
        data-chat-container
      >
        <div className="w-full max-w-md bg-surface border border-surface rounded-xl shadow-2xl flex flex-col animate-slide-up h-[85%]">
          {/* Arrow at top - outside overflow to show properly */}
          <div
            className="hidden lg:block absolute -top-2 left-1/2 -translate-x-1/2"
            style={{
              width: '14px',
              height: '14px',
              background: '#0f172a',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              transform: 'rotate(135deg)',
              boxShadow: '-2px -2px 4px rgba(0,0,0,0.2)',
            }}
          />
          <ChatContent
            input={input}
            isLoading={isLoading}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onClose={() => setIsOpen(false)}
            messagesEndRef={messagesEndRef}
            messages={messages}
            isMobile
            t={t}
          />
        </div>
      </div>

      {/* Desktop: Standard chat window */}
      <div className="hidden sm:block w-full h-full">
        <ChatContent
          input={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
          messagesEndRef={messagesEndRef}
          messages={messages}
          isMobile={false}
          t={t}
        />
      </div>
    </>
  );
}

interface ChatContentProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
  t: ReturnType<typeof getTranslation>;
}

function ChatContent({
  messages,
  input,
  isLoading,
  onInputChange,
  onSubmit,
  onClose,
  messagesEndRef,
  isMobile,
  t,
}: ChatContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Fixed Header */}
      <div
        className={`flex-shrink-0 p-4 bg-accent text-surface flex items-center justify-between rounded-t-lg ${isMobile ? 'rounded-t-xl' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface/20 flex items-center justify-center">
            <i className="i-tabler-robot text-lg" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{t.chat.title}</h3>
            <p className="text-xs text-surface/70">{t.chat.subtitle}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 w-8 h-8 hover:bg-surface/20 rounded-lg transition-colors cursor-pointer"
          aria-label={t.chat.closeChat}
        >
          <i className="i-tabler-x text-lg" />
        </button>
      </div>

      {/* Scrollable Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 mr-2.5 mt-2 space-y-4 chat-scroll"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-accent text-surface rounded-br-md' : 'bg-background text-text rounded-bl-md'}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-background text-text px-4 py-2 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <span
                  className="w-2 h-2 bg-text/40 rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="w-2 h-2 bg-text/40 rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-2 h-2 bg-text/40 rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input */}
      <form
        onSubmit={onSubmit}
        className="flex-shrink-0 p-4 border-t border-surface"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={t.chat.placeholder}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-background border border-text-secondary rounded-full text-text text-sm placeholder-text-secondary focus:outline-none focus:border-0 focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 w-10 h-10 cursor-pointer bg-accent text-surface rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="i-tabler-send text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
}

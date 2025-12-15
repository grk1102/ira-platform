import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { useIra } from '@/contexts/IraContext';

interface Message {
  id: string;
  role: 'ira' | 'user';
  content: string;
}

const responses = [
  "I hear you. What else comes up when you think about that?",
  "That sounds like a lot. Want to say more?",
  "Thank you for sharing. How does it feel to put that into words?",
  "Take your time. There is no rush here.",
  "What would feel helpful right now?",
];

const ChatPage = () => {
  const { getChatOpening, feeling } = useIra();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ira', content: getChatOpening() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      const responseIndex = Math.floor(Math.random() * responses.length);
      const iraResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ira',
        content: responses[responseIndex],
      };
      setMessages(prev => [...prev, iraResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-14 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="ira-container py-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-lg'
                      : 'bg-muted text-foreground rounded-bl-lg'
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-lg">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-soft" />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border bg-background">
          <div className="ira-container py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Say something, or just be here..."
                className="ira-input flex-1"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="ira-btn-primary disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';
import { usePersonalization } from '@/contexts/PersonalizationContext';

interface Message {
  id: string;
  role: 'ira' | 'user';
  content: string;
}

const reflectiveResponses = [
  "That sounds important. Can you tell me more about how that feels?",
  "I hear you. What comes up when you sit with that feeling?",
  "Thank you for sharing. What do you notice in your body right now?",
  "That takes courage to express. What would feel supportive right now?",
  "I'm here with you. Is there anything else you'd like to explore?",
];

export function ChatbotSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { getChatbotGreeting, isOverwhelmed } = usePersonalization();
  
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ira', content: getChatbotGreeting() }
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

    // Simulate Ira's response
    setTimeout(() => {
      const responseIndex = Math.floor(Math.random() * reflectiveResponses.length);
      const iraResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ira',
        content: isOverwhelmed 
          ? "I hear you, and I'm glad you're here. There's no rush. Take a breath if you need to. What feels true right now?"
          : reflectiveResponses[responseIndex],
      };
      setMessages(prev => [...prev, iraResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <section id="talk-to-ira" className="ira-section" ref={ref}>
      <div className="ira-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <p className="text-ira-sage font-serif italic text-lg mb-4">
              A conversation with Ira
            </p>
            <h2 className="ira-heading-display mb-6">
              Talk to Ira
            </h2>
            <p className="ira-text-large text-muted-foreground">
              Sometimes, we just need someone to listen. Ira is here — no judgment, no advice, just presence.
            </p>
          </div>

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card rounded-3xl shadow-card overflow-hidden"
          >
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ira-sage-light flex items-center justify-center">
                <span className="font-serif text-ira-sage text-lg">I</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Ira</p>
                <p className="text-xs text-muted-foreground">Here to listen</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse-soft" />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse-soft" style={{ animationDelay: '0.2s' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse-soft" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-border">
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
                  placeholder="Share what's on your mind..."
                  className="flex-1 px-4 py-3 bg-muted rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="px-4 py-3 bg-primary text-primary-foreground rounded-2xl transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-3">
                This is a gentle space. Ira listens and reflects — no diagnosis, no advice.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

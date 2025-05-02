
import { useState, useRef, useEffect } from "react";
import { SendIcon, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatBubble, TypingIndicator } from "@/components/chat/chat-bubble";
import { ThemeToggle } from "@/components/theme-toggle";
import { Message, sendMessage } from "@/services/api";
import { toast } from "sonner";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "¡Hola! Soy tu asistente IA. ¿En qué puedo ayudarte hoy?",
  timestamp: new Date(),
};

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Filter out the welcome message for API requests
    const apiMessages = messages
      .filter(msg => msg.id !== "welcome")
      .concat(userMessage);
    
    const response = await sendMessage(apiMessages);
    setIsTyping(false);
    
    if (response.success && response.data) {
      setMessages(prev => [...prev, response.data!]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([INITIAL_MESSAGE]);
    toast.success("Conversación borrada");
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 animate-fade-in" onClick={onClose} />
      <div className="fixed bottom-20 right-5 sm:bottom-5 sm:right-5 w-[calc(100%-40px)] sm:w-[400px] max-w-[500px] h-[600px] max-h-[calc(100vh-50px)] bg-background border rounded-lg shadow-lg flex flex-col z-50 animate-slide-in">
        {/* Chat header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <Bot className="h-6 w-6 text-primary mr-2" />
            <h2 className="font-medium">Asistente DeepSeek</h2>
          </div>
          <div className="flex items-center space-x-1">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full" 
              onClick={clearConversation}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Borrar Conversación</span>
            </Button>
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Chat input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              placeholder="Escribe tu mensaje..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isTyping}
              size="icon"
            >
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Enviar</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

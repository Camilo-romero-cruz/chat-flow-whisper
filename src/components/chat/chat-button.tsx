
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "@/components/chat/chat-window";

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <Button
        className="fixed bottom-5 right-5 h-14 w-14 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50"
        aria-label="Open chat"
        onClick={toggleChat}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

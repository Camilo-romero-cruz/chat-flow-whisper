
import { Message } from "@/services/api";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full my-4 animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-chat-bubble-bot dark:bg-chat-bubble-bot-dark text-foreground flex items-start"
        )}
      >
        {!isUser && (
          <Bot className="h-5 w-5 mr-2 mt-1 shrink-0 text-primary" />
        )}
        <div className="whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start w-full my-4">
      <div className="bg-chat-bubble-bot dark:bg-chat-bubble-bot-dark rounded-2xl px-4 py-3 flex items-center max-w-[80%]">
        <Bot className="h-5 w-5 mr-2 shrink-0 text-primary" />
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "300ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "600ms" }} />
        </div>
      </div>
    </div>
  );
}

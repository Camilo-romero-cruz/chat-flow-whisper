
import { ChatButton } from "@/components/chat/chat-button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Interactive Chat Experience
        </h1>
        <p className="text-xl text-muted-foreground">
          Try our AI assistant powered by DeepSeek. Click the chat button in the corner to get started.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <div className="p-6 bg-card text-card-foreground rounded-lg shadow-md max-w-md">
            <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
            <ul className="text-left space-y-2">
              <li>• Click the chat button in the bottom-right corner</li>
              <li>• Enter your DeepSeek API key when prompted</li>
              <li>• Start asking questions to the AI assistant</li>
              <li>• Toggle between light and dark mode as needed</li>
            </ul>
          </div>
        </div>
      </div>

      <ChatButton />
    </div>
  );
};

export default Index;

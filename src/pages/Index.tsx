
import { ChatButton } from "@/components/chat/chat-button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Experiencia de Chat Interactiva
        </h1>
        <p className="text-xl text-muted-foreground">
          Prueba nuestro asistente IA impulsado por DeepSeek. Haz clic en el botón de chat en la esquina para comenzar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <div className="p-6 bg-card text-card-foreground rounded-lg shadow-md max-w-md">
            <h2 className="text-2xl font-semibold mb-3">Cómo Funciona</h2>
            <ul className="text-left space-y-2">
              <li>• Haz clic en el botón de chat en la esquina inferior derecha</li>
              <li>• Comienza a hacer preguntas al asistente IA</li>
              <li>• Cambia entre modo claro y oscuro según necesites</li>
              <li>• Disfruta de una experiencia conversacional fluida</li>
            </ul>
          </div>
        </div>
      </div>

      <ChatButton />
    </div>
  );
};

export default Index;

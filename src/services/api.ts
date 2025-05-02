
import { toast } from "sonner";

export type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
};

const API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_API_KEY = "sk-cfacd9a871164ae09d2ab64f81bfc943";

// Rate limiting parameters
const MAX_REQUESTS_PER_MINUTE = 10;
const requestTimestamps: number[] = [];

// Check if we're exceeding our rate limit
const checkRateLimit = (): boolean => {
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;
  
  // Filter out timestamps older than one minute
  const recentRequests = requestTimestamps.filter(timestamp => timestamp > oneMinuteAgo);
  
  // Update our timestamps array
  requestTimestamps.length = 0;
  requestTimestamps.push(...recentRequests);
  
  // Check if we're over the limit
  if (requestTimestamps.length >= MAX_REQUESTS_PER_MINUTE) {
    return true;
  }
  
  // Add current request timestamp
  requestTimestamps.push(now);
  return false;
};

export const sendMessage = async (
  messages: Message[]
): Promise<{ success: boolean; data?: Message; error?: string }> => {
  try {
    // Check rate limiting
    if (checkRateLimit()) {
      toast.error("Límite de velocidad excedido. Por favor, inténtalo de nuevo en un minuto.");
      return { 
        success: false, 
        error: "Límite de velocidad excedido. Por favor, inténtalo de nuevo en un minuto." 
      };
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: messages.map(msg => ({ 
          role: msg.role, 
          content: msg.content 
        }))
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error:", errorData);
      
      let errorMessage = "Error al enviar el mensaje";
      if (response.status === 401) {
        errorMessage = "Clave API inválida. Por favor, verifica tu clave API.";
      } else if (response.status === 429) {
        errorMessage = "Demasiadas solicitudes. Por favor, inténtalo de nuevo más tarde.";
      }
      
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }

    const data = await response.json();
    
    const responseMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: data.choices[0].message.content,
      timestamp: new Date(),
    };

    return { success: true, data: responseMessage };
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    toast.error("Error al conectar con la API de DeepSeek");
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Ocurrió un error inesperado" 
    };
  }
};

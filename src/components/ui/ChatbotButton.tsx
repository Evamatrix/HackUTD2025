// src/components/ui/ChatbotButton.tsx

import { useState } from "react";
import { ChatbotWidget } from "./ChatbotWidget";
import { MessageCircle } from "lucide-react";

export function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatbotWidget onClose={() => setOpen(false)} />}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-[#1E4DB7] hover:bg-[#153C91] p-5 rounded-full shadow-2xl border-4 border-white transition-all active:scale-95 z-50 flex items-center justify-center"
        aria-label="Open chatbot"
        style={{ width: '70px', height: '70px' }}
      >
        {/* Simplified test: just the icon */}
        <MessageCircle className="w-8 h-8 text-white stroke-2" />
        
        {/* Debug indicator - shows a red dot if button renders */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </button>
    </>
  );
}
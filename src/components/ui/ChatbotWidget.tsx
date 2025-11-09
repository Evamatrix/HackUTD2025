import { useState } from "react";
import { sendMessageToGemini } from "./ChatbotAPI";

interface ChatbotWidgetProps {
  onClose: () => void;
}

export function ChatbotWidget({ onClose }: ChatbotWidgetProps) {
  const [step, setStep] = useState<"form" | "chat">("form");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [userInfo, setUserInfo] = useState({ first: "", last: "", email: "", state: "TX" });
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    if (!userInfo.first || !userInfo.last || !userInfo.email) return;
    setStep("chat");
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const reply = await sendMessageToGemini(input);
    setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 h-[480px] bg-white rounded-xl shadow-2xl border border-gray-300 flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="bg-[#1E4DB7] text-white p-3 flex justify-between items-center">
        <h2 className="font-semibold text-sm">Thanks for chatting!</h2>
        <button onClick={onClose} className="hover:text-gray-200 text-lg">×</button>
      </div>

      {step === "form" ? (
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <input
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="First Name *"
              value={userInfo.first}
              onChange={(e) => setUserInfo({ ...userInfo, first: e.target.value })}
            />
            <input
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Last Name *"
              value={userInfo.last}
              onChange={(e) => setUserInfo({ ...userInfo, last: e.target.value })}
            />
            <input
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Email *"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
            <select
              className="w-full border border-gray-300 p-2 rounded-md"
              value={userInfo.state}
              onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}
            >
              {["TX", "CA", "FL", "NY", "AK"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStart}
            className="mt-4 w-full bg-[#1E4DB7] hover:bg-[#153C91] text-white font-semibold py-2 rounded-md"
          >
            Start Chatting
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 text-sm rounded-lg max-w-[75%] ${
                  msg.role === "user"
                    ? "ml-auto bg-[#1E4DB7] text-white"
                    : "mr-auto bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <p className="text-xs text-gray-400">Thinking...</p>}
          </div>

          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input
              className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-[#1E4DB7] hover:bg-[#153C91] text-white px-3 py-2 rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
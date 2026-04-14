import { useEffect, useRef, useState } from "react";
import CommentCard from "./CommentCard";
import { getMessages, Message } from "../services/sharepointApi";

interface LivePanelProps {
  triggerReaction: () => void;
  onTotalChange: (total: number) => void;
  total: number;
}

export default function LivePanel({
  triggerReaction,
  onTotalChange,
  total,
}: LivePanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const previousCount = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const isProcessing = useRef(false);

  async function load() {
    if (isProcessing.current) return; // cegah tabrakan
    isProcessing.current = true;

    try {
      const data = await getMessages();
      let newCount = 0;

      if (data.total > previousCount.current) {
        const startIndex = previousCount.current;
        const newMessages = data.messages.slice(startIndex);
        newCount = newMessages.length;

        for (let i = 0; i < newMessages.length; i++) {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              setMessages((prev) => [...prev, newMessages[i]]);
              triggerReaction();
              resolve();
            }, 1000);
          });
        }
      }

      previousCount.current = data.total;
      onTotalChange(data.total);

      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    } catch (e) {
      console.error("Error loading messages:", e);
    } finally {
      isProcessing.current = false;
    }
  }

  useEffect(() => {
    load();

    const interval = setInterval(() => {
      load();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-[#0f0f0f] flex flex-col p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-yellow-400 text-lg sm:text-2xl font-bold">
          Live Appreciation
        </h2>

        <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
          <span className="text-lg sm:text-xl">💬</span>

          <span className="font-semibold">{total.toLocaleString()}</span>

          <span className="text-xs sm:text-sm">Messages</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pr-2">
        {messages.map((m, i) => {
          console.log(m); // Debugging data
          return <CommentCard key={i} name={m.Name} message={m.Message} />;
        })}
        <div ref={bottomRef}></div>
      </div>
    </div>
  );
}

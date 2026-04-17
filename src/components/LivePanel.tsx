import { useEffect, useRef, useState } from "react";
import CommentCard from "./CommentCard";
import { getMessages } from "../services/sharepointApi";

interface LivePanelProps {
  triggerReaction: () => void;
}

export default function LivePanel({ triggerReaction }: LivePanelProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [totalMessages, setTotalMessages] = useState(0);

  const prevCount = useRef(0);
  const queueRef = useRef<any[]>([]);
  const isProcessing = useRef(false);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const processQueue = async () => {
    if (isProcessing.current) return;

    isProcessing.current = true;

    while (queueRef.current.length > 0) {
      const msg = queueRef.current.shift();

      setMessages((prev) => [...prev, msg]);
      triggerReaction?.();
      scrollToBottom();

      await delay(400);
    }
    scrollToBottom();

    isProcessing.current = false;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getMessages();

        if (data.total > prevCount.current) {
          const newMessages = data.messages.slice(prevCount.current);

          if (newMessages.length === 0) return;

          queueRef.current.push(...newMessages);

          processQueue();

          prevCount.current = data.total;
        }
        setTotalMessages(data.total);
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 h-full w-full bg-transparent flex flex-col rounded-xl border-4 border-white backdrop-blur-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 p-4 sm:p-6 backdrop-blur-3xl">
        <h2 className="text-gray-900 text-lg sm:text-3xl font-bold">
          Say something to him
        </h2>

        <button className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-semibold shadow-lg shadow-red-500/40 overflow-hidden mr-3">
          {/* DOT LIVE */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          LIVE
        </button>
      </div>
      <div className="flex-1 backdrop-blur-3xl overflow-y-auto p-4 sm:pr-6 sm:pl-6 sm:pb-6  ">
        {messages.map((m, i) => {
          return <CommentCard key={i} name={m.Name} message={m.Message} />;
        })}
        <div ref={bottomRef}></div>
      </div>
      <div className="p-6 backdrop-blur-3xl">
        <div className="bg-gray-700 text-white px-5 py-3 rounded-xl flex items-center gap-3 w-full p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 opacity-80"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M2 3h20v14H6l-4 4V3z" />
          </svg>

          <p className="text-lg">
            <span className="font-semibold">
              {totalMessages.toLocaleString()}
            </span>
            <span className="opacity-80"> Messages Sent</span>
          </p>
        </div>
      </div>
    </div>
  );
}

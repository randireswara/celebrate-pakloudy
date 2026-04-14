import { useState } from "react";
import { useEmojiReaction } from "./components/EmojiRain";
import TributeHero from "./components/TributeHero";
import LivePanel from "./components/LivePanel";
import EmojiRain from "./components/EmojiRain";
import background from "./assets/Background.png";

export default function App() {
  const { items, triggerReaction } = useEmojiReaction();
  const [totalMessages, setTotalMessages] = useState(0);

  return (
    <div
      className="w-screen h-screen flex flex-col lg:flex-row text-white overflow-hidden bg-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full lg:w-[65%] h-1/2 lg:h-full overflow-y-auto lg:overflow-hidden bg-[url('/src/assets/Background.png')">
        <TributeHero messageCount={totalMessages} />
      </div>

      {/* RIGHT LIVE PANEL */}
      <div className="w-full lg:w-[35%] h-1/2 lg:h-full border-t lg:border-t-0 lg:border-l border-gray-800">
        <LivePanel
          triggerReaction={triggerReaction}
          onTotalChange={setTotalMessages}
          total={totalMessages}
        />
      </div>

      {/* FLOATING EMOJI */}
      <EmojiRain items={items} />
    </div>
  );
}

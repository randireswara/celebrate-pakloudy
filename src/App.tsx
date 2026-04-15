import { useState } from "react";
import { useEmojiReaction } from "./components/EmojiRain";
import TributeHero from "./components/TributeHero";
import LivePanel from "./components/LivePanel";
import EmojiRain from "./components/EmojiRain";
import pakLoudy from "./assets/pak-loudy-2.png";
import background from "./assets/Background.png";

export default function App() {
  const { items, triggerReaction } = useEmojiReaction();
  const [totalMessages, setTotalMessages] = useState(0);

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row text-white overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      />

      <div className="w-full lg:w-[65%] h-1/2 lg:h-full overflow-y-auto lg:overflow-hidden">
        <TributeHero messageCount={totalMessages} />
      </div>

      {/* RIGHT LIVE PANEL */}
      <div className="relative z-20 w-full lg:w-[35%] h-1/2 lg:h-full border-t lg:border-t-0 lg:border-l  p-5">
        <LivePanel
          triggerReaction={triggerReaction}
          onTotalChange={setTotalMessages}
          total={totalMessages}
        />
      </div>
      <div className="absolute inset-0 z-10 flex items-end justify-center overflow-hidden ">
        <img
          src={pakLoudy}
          className="translate-x-20 "
          alt="Pak Loudy Irwanto Ellias"
        />
      </div>

      {/* FLOATING EMOJI */}
      <EmojiRain items={items} />
    </div>
  );
}

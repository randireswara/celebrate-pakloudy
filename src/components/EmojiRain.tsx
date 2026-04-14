import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import reactionSound from '../assets/pop.mp3';

const emojis = ['❤️', '👏', '👍'];

type EmojiItem = {
  id: number;
  emoji: string;
  left: number;
};

export function useEmojiReaction() {
  const [items, setItems] = useState<EmojiItem[]>([]);
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const sound = useMemo(() => new Audio(reactionSound), []);
  const idCounter = useRef(0);

  useEffect(() => {
    const unlockSound = () => {
      sound
        .play()
        .then(() => {
          sound.pause();
          sound.currentTime = 0;
          setSoundUnlocked(true);
        })
        .catch(() => {
          // Autoplay prevented; wait for another user gesture.
        });
    };

    window.addEventListener('pointerdown', unlockSound, { once: true });
    return () => window.removeEventListener('pointerdown', unlockSound);
  }, [sound]);

  const triggerReaction = useCallback(() => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const id = ++idCounter.current;
    const left = Math.random() * 90;

    setItems((prev) => [...prev, { id, emoji, left }]);

    sound.currentTime = 0;
    if (soundUnlocked) {
      sound.play().catch(() => {
        /* ignore blocked playback */
      });
    }

    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }, 3000);
  }, [sound, soundUnlocked]);

  return { items, triggerReaction };
}

export default function EmojiRain({ items }: { items: EmojiItem[] }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute bottom-0 text-4xl animate-float"
          style={{ left: `${item.left}%` }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}

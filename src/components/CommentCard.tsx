import { motion } from "framer-motion";

type Props = {
  name: string;
  message: string;
  isNew?: boolean;
};

export default function CommentCard({ name, message, isNew }: Props) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-lg
      ${isNew ? "bg-yellow-900/40 border border-yellow-400" : "bg-white"}`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
          {initials}
        </div>

        <div className="font-semibold text-red-700 text-sm sm:text-base truncate">
          {name}
        </div>
      </div>

      <div className="text-black font-semibold mt-2 text-xs sm:text-base leading-relaxed">
        {message}
      </div>
    </motion.div>
  );
}

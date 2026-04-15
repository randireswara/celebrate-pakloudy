import { motion } from "framer-motion";

type Props = {
  name: string;
  message: string;
  isNew?: boolean;
};

export default function CommentCard({ name, message, isNew }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 shadow-lg
      ${isNew ? "bg-yellow-900/40 border border-yellow-400" : "bg-white"}`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="font-semibold text-[20px] truncate text-[#B07600]">
          {name}
        </div>
      </div>

      <div className="text-black font-semibold mt-2 text-[20px] leading-relaxed">
        {message}
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";

export default function ViewModeSwitch({ viewMode, setViewMode }) {
  return (
    <div className="relative w-[120px] h-7 bg-toggle-switch rounded-full flex items-center px-[2px] py-[2px] font-semibold text-xs">
      <motion.div
        className="absolute h-5.5 w-[58px] rounded-full bg-dark-blue z-0"
        layout
        initial={false}
        animate={{
          x: viewMode === "monthly" ? 0 : 58,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      <div className="flex justify-between w-full z-10">
        <button
          onClick={() => setViewMode("monthly")}
          className={`w-[58px] h-6 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
            viewMode === "monthly" ? "text-white" : "text-dark-gray"
          }`}
        >
          Mensual
        </button>
        <button
          onClick={() => setViewMode("yearly")}
          className={`w-[58px] h-6 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
            viewMode === "yearly" ? "text-white" : "text-dark-gray"
          }`}
        >
          Anual
        </button>
      </div>
    </div>
  );
}

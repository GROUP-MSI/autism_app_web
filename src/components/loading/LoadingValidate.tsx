"use client"

import { motion } from "framer-motion"

export const LoadingValidate = () => {
  return (
    <div className="w-full h-screen flex items-center flex-col justify-center bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="relative w-[300px] h-[300px] mb-16">
        {/* Outer spinning ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-blue-400 border-b-blue-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Middle spinning ring - opposite direction */}
        <motion.div
          className="absolute inset-[20px] rounded-full border-[8px] border-transparent border-l-blue-300 border-r-blue-300"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-[60px] rounded-full bg-blue-500"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7],
            boxShadow: [
              "0 0 20px 5px rgba(59, 130, 246, 0.3)",
              "0 0 30px 10px rgba(59, 130, 246, 0.5)",
              "0 0 20px 5px rgba(59, 130, 246, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Text with animation */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-semibold text-3xl text-blue-100 tracking-wider mb-2">VALIDANDO TU ACCESO</h2>
        <motion.div
          className="flex justify-center space-x-1 text-blue-300 text-2xl"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

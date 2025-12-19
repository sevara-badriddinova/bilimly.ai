import React from "react";
import { motion } from "framer-motion";

export default function XPCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center"
        >
            <img
                src="/profile.png"
                alt="profile"
                className="w-20 h-20 rounded-full object-cover mb-4"
            />

            <h3 className="text-xl font-semibold text-[#003F88]">Sevara B.</h3>
            <p className="text-sm text-gray-500 mb-4">Tashkent, Uzbekistan</p>

            <div className="text-center">
                <h2 className="text-4xl font-bold text-[#FFB703]">2400 XP</h2>
                <p className="text-gray-500 mt-1">Keep going! 💪</p>
            </div>

            <div className="flex gap-3 mt-6">
                <button className="px-4 py-2 bg-[#FFB703] text-white rounded-xl font-semibold text-sm">
                    Redeem XP
                </button>
                <button className="px-4 py-2 border border-[#003F88] text-[#003F88] rounded-xl font-semibold text-sm">
                    Achievements
                </button>
            </div>
        </motion.div>
    );
}

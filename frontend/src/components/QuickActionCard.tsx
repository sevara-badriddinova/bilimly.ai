import React from "react";
import { motion } from "framer-motion";

export default function QuickActionCard({ title, icon, color,}: { title: string; icon: string; color: string; }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl p-6 shadow-xl text-white cursor-pointer"
            style={{ background: color } as React.CSSProperties}
        >
            <img
                src={icon}
                className="w-16 h-16 mb-4 drop-shadow-md"
                alt={title}
            />

            <h3 className="text-lg font-bold">{title}</h3>
        </motion.div>
    );
}

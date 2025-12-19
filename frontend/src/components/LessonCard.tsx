import React from "react";
import { motion } from "framer-motion";

interface LessonCardProps {
    title: string;
    percentage: number;
    icon: string;
}

export default function LessonCard({ title, percentage, icon }: LessonCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 shadow-xl flex gap-4 items-center"
        >
            <img src={icon} alt={title} className="w-16 h-16" />

            <div className="flex-1">
                <h3 className="font-semibold text-[#003F88]">{title}</h3>
                <p className="text-sm text-gray-500">{percentage}% complete</p>

                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div
                        className="h-full bg-[#219EBC] rounded-full"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        </motion.div>
    );
}

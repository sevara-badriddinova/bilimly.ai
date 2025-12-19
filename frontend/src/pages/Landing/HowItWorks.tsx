import React from "react"
import {motion} from "framer-motion";
import {MessageCircle, BookOpen, Rocket} from "lucide-react";

export default function HowItWorks(){
    const items = [
        {
            img: "/chat-icon.png",
            title: "Chat with AI in 3 languages: Uzbek, Russian, English",
            desc: "Ask anything about learning and get simple, clear explanations!",
        },
        {
            img: "/robot-icon.png",
            title: "Learn Step-By-Step",
            desc: "Follow structured lessons for grammar, vocabulary and speaking",
        },
        {
            img: "/rocket-icon.png",
            title: "Track your progress",
            desc: "Earn XP, move up levels and watch your English improve every day!"

        },
    ];

return (
    <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003F88]">
                How It Works?
            </h2>
            <p className="mt-2 text-[#003F88]/70 max-w-xl mx-auto">
                Learning English has never been this easy — or this fun.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white w-full shadow-xl rounded-3xl p-10 flex flex-col items-center text-center ring-1 ring-gray-100 hover:shadow-2xl transition-all duration-300"
                    >
                        <img src={item.img} alt={item.title} className="w-50 h-50 object-contain mb-4 drop-shadow-md"/>
                        <h3 className="text-xl font-bold text-[#003F88]">{item.title}</h3>
                        <p className="text-[#0F172A]/70 mt-2 text-sm">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);
}
import React from "react"
import {motion} from "framer-motion"
import {useTranslation} from "react-i18next"

export default function HowItWorks() {
    const {t} = useTranslation()

    const steps = [
        {
            img: "/chat-icon.png",
            number: "01",
            title: t("howItWorks.step1.title"),
            desc: t("howItWorks.step1.desc"),
            color: "#0EA5C9",
            bg: "rgba(14,165,201,0.08)",
            border: "rgba(14,165,201,0.2)",
        },
        {
            img: "/robot-icon.png",
            number: "02",
            title: t("howItWorks.step2.title"),
            desc: t("howItWorks.step2.desc"),
            color: "#F59E0B",
            bg: "rgba(245,158,11,0.08)",
            border: "rgba(245,158,11,0.2)",
        },
        {
            img: "/rocket-icon.png",
            number: "03",
            title: t("howItWorks.step3.title"),
            desc: t("howItWorks.step3.desc"),
            color: "#10B981",
            bg: "rgba(16,185,129,0.08)",
            border: "rgba(16,185,129,0.2)",
        },
    ]

    return (
        <section className="py-24" style={{background: "#F0F6FF"}}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{opacity: 0, y: 16}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5}}
                >
					<span
                        className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full"
                        style={{background: "rgba(14,165,201,0.12)", color: "#0284C7"}}>
						{t("howItWorks.badge")}
					</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold" style={{color: "#0D1B2A"}}>
                        {t("howItWorks.title")}
                    </h2>
                    <p className="mt-3 text-base max-w-md mx-auto" style={{color: "#4A6280"}}>
                        {t("howItWorks.subtitle")}
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{opacity: 0, y: 24}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5, delay: i * 0.1}}
                            whileHover={{y: -4}}
                            className="rounded-2xl p-8 flex flex-col cursor-default transition-shadow"
                            style={{
                                background: "white",
                                border: `1px solid ${step.border}`,
                                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                            }}
                        >
                            <div className="text-xs font-black tracking-widest mb-5" style={{color: step.color}}>
                                {step.number}
                            </div>
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                                 style={{background: step.bg}}>
                                <img src={step.img} alt={step.title} className="w-10 h-10 object-contain"/>
                            </div>
                            <h3 className="text-lg font-bold mb-2" style={{color: "#0D1B2A"}}>{step.title}</h3>
                            <p className="text-sm leading-relaxed" style={{color: "#4A6280"}}>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA row */}
                <motion.div
                    className="mt-16 rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6"
                    style={{background: "#0D1B2A"}}
                    initial={{opacity: 0, y: 16}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5}}
                >
                    <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white">{t("howItWorks.cta.title")}</h3>
                        <p className="mt-1 text-sm" style={{color: "rgba(255,255,255,0.5)"}}>
                            {t("howItWorks.cta.subtitle")}
                        </p>
                    </div>
                    <a href="/auth/sign-up">
                        <button
                            className="shrink-0 px-7 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
                            style={{
                                background: "linear-gradient(135deg, #0EA5C9, #0284C7)",
                                color: "white",
                                boxShadow: "0 8px 24px rgba(14,165,201,0.35)"
                            }}>
                            {t("howItWorks.cta.button")}
                        </button>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
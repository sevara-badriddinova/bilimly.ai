import React from "react";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ArrowRight} from "lucide-react";
import suzaniPattern from "../../assets/suzani-pattern.png";
import anorMotif from "../../assets/anor-motif.png";
import owlSuzani from "../../assets/owl-suzani.png";

const steps = [
    {
        number: "01",
        label: "Place yourself",
        title: "Start with your real English level",
        description: "Bilimly opens with practical grammar, vocabulary, listening, and speaking checks so the path feels personal from day one.",
        metric: "4 skills",
    },
    {
        number: "02",
        label: "Practice daily",
        title: "Learn in small, focused sessions",
        description: "Each lesson blends examples, guided exercises, and AI explanations in English, Uzbek, or Russian when a concept needs to click.",
        metric: "10 min",
    },
    {
        number: "03",
        label: "Use the coach",
        title: "Ask the AI when you get stuck",
        description: "The chat coach corrects your sentences, explains mistakes, and turns confusing topics into clear next steps.",
        metric: "24/7",
    },
    {
        number: "04",
        label: "Build momentum",
        title: "Watch progress turn into confidence",
        description: "XP, streaks, skill progress, and completed lessons make improvement visible, so learners know exactly what to do next.",
        metric: "XP",
    },
];

const lessonPills = ["Grammar", "Vocabulary", "Speaking", "Listening"];

export default function HowItWorks() {
    const {t} = useTranslation();

    return (
        <section id="how-it-works" className="relative overflow-hidden bg-[#F8F0DC] py-20 sm:py-24">
            <div
                className="absolute inset-x-0 top-0 h-5 opacity-80"
                style={{
                    backgroundImage: `url(${suzaniPattern})`,
                    backgroundRepeat: "repeat-x",
                    backgroundSize: "auto 100%"
                }}
            />
            <img src={anorMotif} alt=""
                 className="pointer-events-none absolute -right-12 top-24 h-44 w-44 rotate-12 object-contain opacity-20"/>
            <img src={anorMotif} alt=""
                 className="pointer-events-none absolute -left-14 bottom-20 h-40 w-40 -rotate-12 object-contain opacity-15"/>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
                    initial={{opacity: 0, y: 18}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.35}}
                    transition={{duration: 0.55}}
                >
                    <div>
            <span
                className="inline-flex rounded-full border border-[#8F2F24]/15 bg-white/75 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#8F2F24] shadow-sm">
              {t("howItWorks.badge", "How it works")}
            </span>
                        <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-[#1E2042] sm:text-5xl">
                            A clear path from hesitant sentences to confident English.
                        </h2>
                    </div>
                    <p className="max-w-2xl text-base leading-8 text-[#4A3D68] lg:justify-self-end">
                        Bilimly blends your current navy AI-learning design with a warmer Uzbek-inspired system:
                        structured lessons, familiar explanation language, visible progress, and a coach that keeps
                        learners moving.
                    </p>
                </motion.div>

                <div id="learning-path" className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <motion.div
                        className="relative overflow-hidden rounded-[2rem] border border-[#1E2042]/10 bg-[#1E2042] p-5 shadow-[0_28px_70px_rgba(30,32,66,0.22)] sm:p-7"
                        initial={{opacity: 0, x: -24}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true, amount: 0.35}}
                        transition={{duration: 0.55}}
                    >
                        <div
                            className="absolute inset-x-0 top-0 h-4 opacity-70"
                            style={{
                                backgroundImage: `url(${suzaniPattern})`,
                                backgroundRepeat: "repeat-x",
                                backgroundSize: "auto 100%"
                            }}
                        />

                        <div className="relative rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#F7C948]/80">Today
                                        plan</p>
                                    <h3 className="mt-2 text-2xl font-black text-white">Interview English sprint</h3>
                                </div>
                                <div className="rounded-2xl bg-[#F7C948] px-3 py-2 text-center text-[#1E2042]">
                                    <div className="text-lg font-black">72%</div>
                                    <div className="text-[10px] font-black uppercase tracking-wide">ready</div>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {lessonPills.map((pill) => (
                                    <span key={pill}
                                          className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-white/78">
                    {pill}
                  </span>
                                ))}
                            </div>

                            <div className="mt-7 space-y-4">
                                {[
                                    ["Explain your project", 92, "#0EA5C9"],
                                    ["Past tense accuracy", 76, "#F7C948"],
                                    ["Technical vocabulary", 64, "#C44536"],
                                ].map(([skill, progress, color]) => (
                                    <div key={skill}>
                                        <div className="mb-2 flex items-center justify-between text-xs font-bold">
                                            <span className="text-white/82">{skill}</span>
                                            <span className="text-white/45">{progress}%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white/10">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{background: color as string}}
                                                initial={{width: 0}}
                                                whileInView={{width: `${progress}%`}}
                                                viewport={{once: true}}
                                                transition={{duration: 0.9, delay: 0.15}}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative mt-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                            <div className="flex items-start gap-3">
                                <img src={owlSuzani} alt=""
                                     className="mt-1 h-12 w-12 rounded-2xl bg-white/10 object-contain p-1"/>
                                <div>
                                    <p className="text-sm font-black text-white">AI coach note</p>
                                    <p className="mt-2 text-sm leading-6 text-white/64">
                                        Try answering: “Tell me about a project you built.” I’ll correct grammar, make
                                        it sound natural, and explain the changes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid gap-4">
                        {steps.map((step, index) => (
                            <motion.article
                                key={step.number}
                                className="group grid gap-4 rounded-3xl border border-[#1E2042]/10 bg-white/88 p-5 shadow-[0_12px_36px_rgba(30,32,66,0.07)] backdrop-blur transition hover:-translate-y-1 hover:border-[#C44536]/25 hover:shadow-[0_24px_60px_rgba(196,69,54,0.15)] sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:p-6"
                                initial={{opacity: 0, y: 22}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, amount: 0.35}}
                                transition={{duration: 0.5, delay: index * 0.08}}
                            >
                                <div
                                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F6FF] text-xl font-black text-[#0EA5C9] transition group-hover:bg-[#C44536] group-hover:text-white">
                                    {step.number}
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4A3D68]/70">{step.label}</p>
                                    <h3 className="mt-2 text-xl font-black text-[#1E2042]">{step.title}</h3>
                                    <p className="mt-2 text-sm leading-7 text-[#4A3D68]">{step.description}</p>
                                </div>
                                <div
                                    className="w-fit rounded-2xl border border-[#F7C948]/50 bg-[#F7C948]/20 px-4 py-3 text-center text-sm font-black text-[#7A4E00] sm:w-20">
                                    {step.metric}
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="mt-8 flex flex-col gap-4 rounded-3xl border border-[#1E2042]/10 bg-white p-5 shadow-[0_18px_50px_rgba(30,32,66,0.08)] sm:flex-row sm:items-center sm:justify-between sm:p-6"
                    initial={{opacity: 0, y: 18}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.4}}
                    transition={{duration: 0.5}}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E2042]">
                            <img src={owlSuzani} alt="" className="h-11 w-11 object-contain"/>
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-[#1E2042]">{t("howItWorks.cta.title", "Ready to start?")}</h3>
                            <p className="mt-1 text-sm text-[#4A3D68]">Start with a short lesson, then let the AI coach
                                help with the hard parts.</p>
                        </div>
                    </div>
                    <Link
                        to="/auth/sign-up"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C44536] px-6 text-sm font-black text-white shadow-[0_14px_32px_rgba(196,69,54,0.22)] transition hover:-translate-y-0.5"
                    >
                        {t("howItWorks.cta.button", "Start free")}
                        <ArrowRight className="h-4 w-4 text-white"/>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

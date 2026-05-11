import React from 'react'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

export default function HeroSection() {
    const {t} = useTranslation()

    return (
        <section className="relative overflow-hidden" style={{background: '#0D1B2A', minHeight: '88vh'}}>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20"
                     style={{
                         background: 'radial-gradient(ellipse, #0EA5C9 0%, transparent 70%)',
                         filter: 'blur(60px)'
                     }}/>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
                     style={{
                         background: 'radial-gradient(ellipse, #F59E0B 0%, transparent 70%)',
                         filter: 'blur(80px)'
                     }}/>
                <svg className="absolute inset-0 w-full h-full opacity-[0.04]"
                     xmlns="frontend/src/assets/humo-bird.png">
                    <defs>
                        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" fill="white"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)"/>
                </svg>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10 lg:pt-28 lg:pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left — copy */}
                    <motion.div
                        initial={{opacity: 0, y: 28}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.65, ease: [0.22, 1, 0.36, 1]}}
                    >
                        {/* Badge */}
                        <div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                            style={{
                                background: 'rgba(14,165,201,0.15)',
                                color: '#38BDF8',
                                border: '1px solid rgba(14,165,201,0.3)'
                            }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse inline-block"/>
                            {t('hero.badge')}
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-white">
                            {t('hero.titleLine1')}
                            <br/>
                            <span style={{color: '#0EA5C9'}}>{t('hero.titleLine2')}</span>
                            <br/>
                            {t('hero.titleLine3')}
                        </h1>

                        <p className="mt-5 text-base sm:text-lg leading-relaxed max-w-md"
                           style={{color: 'rgba(255,255,255,0.6)'}}>
                            {t('hero.subtitle')}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/auth/sign-up">
                                <button
                                    className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95"
                                    style={{
                                        background: 'linear-gradient(135deg, #0EA5C9, #0284C7)',
                                        color: 'white',
                                        boxShadow: '0 8px 24px rgba(14,165,201,0.35)'
                                    }}>
                                    {t('hero.cta')}
                                </button>
                            </Link>
                            <Link to="/auth/sign-in">
                                <button
                                    className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/10"
                                    style={{border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)'}}>
                                    {t('signIn')}
                                </button>
                            </Link>
                        </div>

                        {/* Stats row */}
                        <div className="mt-10 flex gap-8">
                            {[
                                ['100+', t('hero.stats.learners')],
                                ['3', t('hero.stats.languages')],
                                ['500+', t('hero.stats.lessons')],
                            ].map(([val, label]) => (
                                <div key={label}>
                                    <div className="text-2xl font-extrabold text-white">{val}</div>
                                    <div className="text-xs mt-0.5"
                                         style={{color: 'rgba(255,255,255,0.45)'}}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — visual card stack */}
                    <motion.div
                        initial={{opacity: 0, x: 24}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1]}}
                        className="relative flex justify-center"
                    >
                        <div className="relative w-full max-w-sm rounded-2xl p-6"
                             style={{
                                 background: 'rgba(255,255,255,0.05)',
                                 border: '1px solid rgba(255,255,255,0.1)',
                                 backdropFilter: 'blur(20px)'
                             }}>

                            <div className="flex items-center justify-between mb-5">
                                <span className="text-xs font-semibold tracking-wide"
                                      style={{color: '#38BDF8'}}>{t('hero.card.todaysLesson')}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full" style={{
                                    background: 'rgba(245,158,11,0.2)',
                                    color: '#FCD34D'
                                }}>{t('grammar')}</span>
                            </div>

                            <img src="/logo2.png" alt="Bilimly mascot"
                                 className="w-40 h-40 object-contain mx-auto my-2 drop-shadow-2xl"/>

                            <div className="mt-4 space-y-2">
                                {[
                                    [t('grammar'), 72],
                                    [t('vocabulary'), 58],
                                    [t('speaking'), 45],
                                ].map(([skill, pct]) => (
                                    <div key={skill} className="flex items-center gap-3">
                                        <span className="text-xs w-20 shrink-0"
                                              style={{color: 'rgba(255,255,255,0.6)'}}>{skill}</span>
                                        <div className="flex-1 h-1.5 rounded-full"
                                             style={{background: 'rgba(255,255,255,0.1)'}}>
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{
                                                    background: 'linear-gradient(90deg, #0EA5C9, #38BDF8)',
                                                    width: `${pct}%`
                                                }}
                                                initial={{width: 0}}
                                                animate={{width: `${pct}%`}}
                                                transition={{duration: 1, delay: 0.5 + Number(pct) * 0.002}}
                                            />
                                        </div>
                                        <span className="text-xs w-7 text-right"
                                              style={{color: 'rgba(255,255,255,0.45)'}}>{pct}%</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 flex items-center justify-between px-4 py-2.5 rounded-xl"
                                 style={{
                                     background: 'rgba(245,158,11,0.12)',
                                     border: '1px solid rgba(245,158,11,0.2)'
                                 }}>
                                <span className="text-xs font-semibold"
                                      style={{color: '#FCD34D'}}>{t('hero.card.xpEarned')}</span>
                                <span className="text-xs"
                                      style={{color: 'rgba(255,255,255,0.4)'}}>{t('hero.card.level')}</span>
                            </div>
                        </div>

                        <motion.div
                            className="absolute -top-4 -right-4 px-3 py-2 rounded-xl text-xs font-bold shadow-xl"
                            style={{background: '#0EA5C9', color: 'white'}}
                            animate={{y: [0, -6, 0]}}
                            transition={{duration: 3, repeat: Infinity, ease: 'easeInOut'}}
                        >
                            {t('hero.card.streak')}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
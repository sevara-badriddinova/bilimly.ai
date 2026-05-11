import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {getListeningLessonById} from '../../data/listeningLessons';
import {useProgress} from '../../hooks/useProgress';
import {useTTS} from '../../hooks/useSpeech';

export default function ListeningLessonPage() {
    const {lessonId} = useParams<{ lessonId: string }>();
    const navigate = useNavigate();
    const lesson = lessonId ? getListeningLessonById(lessonId) : null;
    const {completeLesson} = useProgress();
    const {speak, speaking} = useTTS();

    const [index, setIndex] = useState(0);
    const [hasListened, setHasListened] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);
    const [playCount, setPlayCount] = useState(0);

    if (!lesson) return (
        <div className="p-10 text-center">
            <p style={{color: '#64748B'}} className="mb-4">Lesson not found.</p>
            <button onClick={() => navigate('/listening')} className="text-sm underline" style={{color: '#F59E0B'}}>←
                Back
            </button>
        </div>
    );

    const ex = lesson.exercises[index] as any;
    const isCorrect = selected === ex.correctAnswer;
    const progress = (index / lesson.exercises.length) * 100;

    const handlePlay = () => {
        speak(ex.transcript, 0.9);
        setHasListened(true);
        setPlayCount(c => c + 1);
    };

    const handleSelect = (opt: string) => {
        if (showResult) return;
        setSelected(opt);
        setShowResult(true);
        if (opt === ex.correctAnswer) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (index + 1 < lesson.exercises.length) {
            setIndex(i => i + 1);
            setSelected(null);
            setShowResult(false);
            setHasListened(false);
            setPlayCount(0);
        } else {
            completeLesson(lessonId!, lesson.xpReward ?? 15);
            setDone(true);
        }
    };

    return (
        <div className="p-6 lg:p-10 max-w-2xl mx-auto">
            <button onClick={() => navigate('/listening')}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-70"
                    style={{color: '#F59E0B'}}>
                ← Listening
            </button>

            {/* Header */}
            <motion.div className="mb-6" initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}}>
                <h1 className="text-2xl font-extrabold mb-1" style={{color: '#0D1B2A'}}>{lesson.title}</h1>
                <p className="text-xs italic mb-4" style={{color: '#F59E0B'}}>{lesson.titleUz}</p>
                <div className="h-1.5 rounded-full" style={{background: '#E2EDF8'}}>
                    <div className="h-full rounded-full transition-all duration-500"
                         style={{width: `${progress}%`, background: 'linear-gradient(90deg, #F59E0B, #FCD34D)'}}/>
                </div>
                <div className="flex items-center justify-between mt-1">
                    <p className="text-xs" style={{color: '#94A3B8'}}>{index + 1} of {lesson.exercises.length}</p>
                    <p className="text-xs font-bold" style={{color: '#F59E0B'}}>{score} correct</p>
                </div>
            </motion.div>

            {!done ? (
                <AnimatePresence mode="wait">
                    <motion.div key={index} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -20}}>

                        {/* Audio player card */}
                        <div className="rounded-2xl p-6 mb-4 text-center"
                             style={{background: '#0D1B2A', border: '1px solid rgba(245,158,11,0.15)'}}>
                            <p className="text-xs mb-4 font-semibold tracking-widest uppercase"
                               style={{color: 'rgba(255,255,255,0.4)'}}>
                                🎧 Listen carefully
                            </p>

                            {/* Waveform visualization */}
                            <div className="flex items-center justify-center gap-1 h-10 mb-5">
                                {Array.from({length: 20}).map((_, i) => (
                                    <motion.div key={i}
                                                className="w-1 rounded-full"
                                                style={{background: speaking ? '#F59E0B' : hasListened ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.15)'}}
                                                animate={speaking ? {
                                                    height: [`${8 + Math.random() * 8}px`, `${16 + Math.random() * 16}px`, `${8 + Math.random() * 8}px`]
                                                } : {height: '6px'}}
                                                transition={{
                                                    duration: 0.4 + Math.random() * 0.4,
                                                    repeat: speaking ? Infinity : 0
                                                }}
                                    />
                                ))}
                            </div>

                            <button onClick={handlePlay} disabled={speaking}
                                    className="px-8 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-60 mb-2"
                                    style={{
                                        background: speaking ? 'rgba(245,158,11,0.3)' : 'linear-gradient(135deg, #F59E0B, #D97706)',
                                        color: speaking ? '#FCD34D' : 'white'
                                    }}>
                                {speaking ? '🔊 Playing...' : hasListened ? `🔊 Play Again (${playCount}×)` : '🔊 Play Audio'}
                            </button>

                            {!hasListened && (
                                <p className="text-xs" style={{color: 'rgba(255,255,255,0.3)'}}>
                                    You must listen before answering
                                </p>
                            )}

                            {/* Transcript reveal after answering */}
                            {showResult && (
                                <motion.div initial={{opacity: 0, y: 4}} animate={{opacity: 1, y: 0}}
                                            className="mt-4 p-3 rounded-xl text-left"
                                            style={{
                                                background: 'rgba(255,255,255,0.05)',
                                                border: '1px solid rgba(255,255,255,0.08)'
                                            }}>
                                    <p className="text-xs mb-1" style={{color: 'rgba(255,255,255,0.4)'}}>Transcript:</p>
                                    <p className="text-sm text-white italic">"{ex.transcript}"</p>
                                </motion.div>
                            )}
                        </div>

                        {/* Question + options */}
                        <div className="rounded-2xl p-6"
                             style={{background: 'white', border: '1px solid rgba(0,0,0,0.07)'}}>
                            <p className="font-bold text-base mb-1" style={{color: '#0D1B2A'}}>{ex.question}</p>
                            {ex.questionUz &&
                                <p className="text-xs mb-4 italic" style={{color: '#94A3B8'}}>{ex.questionUz}</p>}

                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {ex.options?.map((opt: string) => {
                                    let bg = '#F8FAFF';
                                    let color = '#374151';
                                    let border = 'rgba(0,0,0,0.08)';
                                    let cursor = hasListened ? 'pointer' : 'not-allowed';
                                    if (showResult && opt === ex.correctAnswer) {
                                        bg = 'rgba(16,185,129,0.1)';
                                        color = '#059669';
                                        border = 'rgba(16,185,129,0.4)';
                                    } else if (showResult && opt === selected && opt !== ex.correctAnswer) {
                                        bg = 'rgba(239,68,68,0.08)';
                                        color = '#DC2626';
                                        border = 'rgba(239,68,68,0.3)';
                                    } else if (!showResult && selected === opt) {
                                        bg = 'rgba(245,158,11,0.1)';
                                        border = 'rgba(245,158,11,0.4)';
                                    }
                                    return (
                                        <button key={opt}
                                                onClick={() => hasListened && handleSelect(opt)}
                                                className="rounded-xl px-4 py-3 text-sm font-medium text-left transition-all"
                                                style={{
                                                    background: bg,
                                                    color,
                                                    border: `1px solid ${border}`,
                                                    cursor,
                                                    opacity: !hasListened ? 0.5 : 1
                                                }}>
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>

                            <AnimatePresence>
                                {showResult && (
                                    <motion.div initial={{opacity: 0, y: 4}} animate={{opacity: 1, y: 0}}
                                                className="rounded-xl p-3 mb-4 text-sm"
                                                style={{
                                                    background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                                                    border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                                                    color: isCorrect ? '#059669' : '#DC2626'
                                                }}>
                                        {isCorrect ? '✓ Correct! ' : '✗ Not quite. '}{ex.explanation}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {showResult && (
                                <button onClick={handleNext}
                                        className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                                        style={{
                                            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                                            color: 'white'
                                        }}>
                                    {index + 1 < lesson.exercises.length ? 'Next Question →' : 'See Results →'}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            ) : (
                <motion.div className="rounded-2xl p-8 text-center" style={{background: '#0D1B2A'}}
                            initial={{opacity: 0}} animate={{opacity: 1}}>
                    <div
                        className="text-4xl mb-3">{score === lesson.exercises.length ? '🏆' : score >= lesson.exercises.length / 2 ? '👍' : '📚'}</div>
                    <h3 className="text-white font-extrabold text-xl mb-1">
                        {score} / {lesson.exercises.length} correct
                    </h3>
                    <p className="text-sm mb-6" style={{color: 'rgba(255,255,255,0.5)'}}>
                        {score === lesson.exercises.length ? 'Perfect score! Excellent listening.' : 'Keep practicing — listening improves with repetition!'}
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => {
                            setIndex(0);
                            setSelected(null);
                            setShowResult(false);
                            setScore(0);
                            setDone(false);
                            setHasListened(false);
                            setPlayCount(0);
                        }}
                                className="px-5 py-2 rounded-xl text-sm font-semibold"
                                style={{background: 'rgba(255,255,255,0.1)', color: 'white'}}>
                            Try Again
                        </button>
                        <button onClick={() => navigate('/listening')}
                                className="px-5 py-2 rounded-xl text-sm font-bold"
                                style={{background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: 'white'}}>
                            Back to Listening
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
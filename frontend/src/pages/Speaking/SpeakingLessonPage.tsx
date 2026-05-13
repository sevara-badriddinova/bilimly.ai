import React, {useState, useEffect, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {ArrowRight} from 'lucide-react';
import {getSpeakingLessonById} from '../../data/speakingLessons';
import {useProgress} from '../../hooks/useProgress';
import {useTTS, useRecorder, useSpeechRecognition} from '../../hooks/useSpeech';

type Step = 'listen' | 'record' | 'result';

function similarity(a: string, b: string): number {
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z\s]/g, '').trim();
    const na = normalize(a);
    const nb = normalize(b);
    if (na === nb) return 1;
    const wordsA = na.split(' ');
    const wordsB = nb.split(' ');
    const matches = wordsA.filter(w => wordsB.includes(w)).length;
    return matches / Math.max(wordsA.length, wordsB.length);
}

export default function SpeakingLessonPage() {
    const {lessonId} = useParams<{ lessonId: string }>();
    const navigate = useNavigate();
    const lesson = lessonId ? getSpeakingLessonById(lessonId) : null;
    const {completeLesson} = useProgress();
    const {speak, speaking} = useTTS();
    const {startRecording, stopRecording, recording, audioUrl, setAudioUrl, error: micError} = useRecorder();
    const {listen, listening, transcript, supported: srSupported} = useSpeechRecognition();

    const [index, setIndex] = useState(0);
    const [step, setStep] = useState<Step>('listen');
    const [recognized, setRecognized] = useState('');
    const [score, setScore] = useState<number | null>(null);
    const [totalScore, setTotalScore] = useState(0);
    const [done, setDone] = useState(false);
    const [recordSeconds, setRecordSeconds] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    if (!lesson) return (
        <div className="p-10 text-center">
            <p style={{color: '#64748B'}} className="mb-4">Lesson not found.</p>
            <button onClick={() => navigate('/speaking')} className="text-sm underline" style={{color: '#8B5CF6'}}>←
                Back
            </button>
        </div>
    );

    const ex = lesson.exercises[index] as any;
    const progress = (index / lesson.exercises.length) * 100;

    const handleListen = () => speak(ex.targetPhrase, 0.8);

    const handleStartRecord = async () => {
        setAudioUrl(null);
        setRecognized('');
        setScore(null);
        setRecordSeconds(0);
        await startRecording();

        // Auto-stop after 5s
        timerRef.current = setInterval(() => {
            setRecordSeconds(s => {
                if (s >= 4) {
                    clearInterval(timerRef.current!);
                    stopRecording();
                    return 5;
                }
                return s + 1;
            });
        }, 1000);

        // Try speech recognition simultaneously
        if (srSupported) {
            listen((text) => {
                setRecognized(text);
                const sim = similarity(text, ex.targetPhrase || ex.correctAnswer || '');
                const s = Math.round(sim * 100);
                setScore(s);
                setTotalScore(prev => prev + s);
                setStep('result');
            });
        }
    };

    const handleStopRecord = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        stopRecording();
        if (!srSupported) {
            setStep('result');
            setScore(null); // no recognition available
        }
    };

    const handleNext = () => {
        if (index + 1 < lesson.exercises.length) {
            setIndex(i => i + 1);
            setStep('listen');
            setRecognized('');
            setScore(null);
            setAudioUrl(null);
        } else {
            completeLesson(lessonId!, lesson.xpReward ?? 15);
            setDone(true);
        }
    };

    const avgScore = lesson.exercises.length > 0 ? Math.round(totalScore / lesson.exercises.length) : 0;

    return (
        <div className="p-6 lg:p-10 max-w-2xl mx-auto">
            <button onClick={() => navigate('/speaking')}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-70 transition-opacity"
                    style={{color: '#8B5CF6'}}>
                ← Speaking
            </button>

            {/* Header */}
            <motion.div className="mb-6" initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}}>
                <h1 className="text-2xl font-extrabold mb-1" style={{color: '#0D1B2A'}}>{lesson.title}</h1>
                <p className="text-xs italic mb-4" style={{color: '#8B5CF6'}}>{lesson.titleUz}</p>
                <div className="h-1.5 rounded-full" style={{background: '#E2EDF8'}}>
                    <div className="h-full rounded-full transition-all duration-500"
                         style={{width: `${progress}%`, background: 'linear-gradient(90deg, #8B5CF6, #A78BFA)'}}/>
                </div>
                <p className="text-xs mt-1" style={{color: '#94A3B8'}}>{index + 1} of {lesson.exercises.length}</p>
            </motion.div>

            {!done ? (
                <AnimatePresence mode="wait">
                    <motion.div key={index} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -20}}>

                        {/* Phrase card */}
                        <div className="rounded-2xl p-6 mb-4"
                             style={{background: 'white', border: '1px solid rgba(139,92,246,0.15)'}}>
                            {ex.phoneticSpelling && (
                                <p className="text-xs font-mono mb-2"
                                   style={{color: '#A78BFA'}}>{ex.phoneticSpelling}</p>
                            )}
                            <p className="text-2xl font-bold mb-2" style={{color: '#0D1B2A'}}>{ex.targetPhrase}</p>
                            <p className="text-xs" style={{color: '#64748B'}}>{ex.question}</p>
                            {ex.questionUz &&
                                <p className="text-xs mt-0.5" style={{color: '#94A3B8'}}>{ex.questionUz}</p>}
                            {ex.explanation && (
                                <p className="text-xs mt-3 leading-relaxed p-3 rounded-xl"
                                   style={{background: 'rgba(139,92,246,0.06)', color: '#64748B'}}>
                                    💡 {ex.explanation}
                                </p>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="rounded-2xl p-6" style={{background: '#0D1B2A'}}>

                            {/* Step indicator */}
                            <div className="flex items-center gap-3 mb-5">
                                {(['listen', 'record', 'result'] as Step[]).map((s, i) => (
                                    <div key={s} className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                                            style={{
                                                background: step === s ? '#8B5CF6' : index > i || step === 'result' ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.1)',
                                                color: step === s ? 'white' : 'rgba(255,255,255,0.5)'
                                            }}>
                                            {i + 1}
                                        </div>
                                        <span className="text-xs capitalize"
                                              style={{color: step === s ? 'white' : 'rgba(255,255,255,0.4)'}}>{s}</span>
                                        {i < 2 && <span style={{color: 'rgba(255,255,255,0.2)'}}>→</span>}
                                    </div>
                                ))}
                            </div>

                            {/* Listen step */}
                            {step === 'listen' && (
                                <div className="text-center">
                                    <p className="text-sm mb-4" style={{color: 'rgba(255,255,255,0.6)'}}>
                                        Listen to the phrase, then try to say it yourself.
                                    </p>
                                    <button onClick={handleListen} disabled={speaking}
                                            className="w-full py-3 rounded-xl text-sm font-bold mb-3 transition-all hover:scale-[1.02] disabled:opacity-60"
                                            style={{
                                                background: speaking ? 'rgba(139,92,246,0.3)' : 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                                                color: 'white'
                                            }}>
                                        {speaking ? '🔊 Playing...' : '🔊 Listen to Phrase'}
                                    </button>
                                    <button onClick={() => setStep('record')}
                                            className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:bg-white/10"
                                            style={{
                                                border: '1px solid rgba(255,255,255,0.15)',
                                                color: 'rgba(255,255,255,0.7)'
                                            }}>
                                        Ready to Record →
                                    </button>
                                </div>
                            )}

                            {/* Record step */}
                            {step === 'record' && (
                                <div className="text-center">
                                    <p className="text-sm mb-4" style={{color: 'rgba(255,255,255,0.6)'}}>
                                        Say the phrase clearly into your microphone.
                                    </p>

                                    {micError && (
                                        <p className="text-xs mb-3 p-2 rounded-lg"
                                           style={{background: 'rgba(239,68,68,0.15)', color: '#FCA5A5'}}>
                                            {micError}
                                        </p>
                                    )}

                                    {!recording ? (
                                        <button onClick={handleStartRecord}
                                                className="w-full py-4 rounded-xl text-sm font-bold mb-3 transition-all hover:scale-[1.02]"
                                                style={{
                                                    background: 'linear-gradient(135deg, #EC4899, #BE185D)',
                                                    color: 'white'
                                                }}>
                                            🎤 Start Recording
                                        </button>
                                    ) : (
                                        <div>
                                            {/* Recording animation */}
                                            <div className="flex items-center justify-center gap-1 mb-3 h-8">
                                                {[0, 1, 2, 3, 4].map(i => (
                                                    <motion.div key={i} className="w-1.5 rounded-full"
                                                                style={{background: '#EC4899'}}
                                                                animate={{height: ['8px', '24px', '8px']}}
                                                                transition={{
                                                                    duration: 0.6,
                                                                    repeat: Infinity,
                                                                    delay: i * 0.1
                                                                }}/>
                                                ))}
                                            </div>
                                            <p className="text-xs mb-3" style={{color: 'rgba(255,255,255,0.5)'}}>
                                                Recording... {5 - recordSeconds}s remaining
                                            </p>
                                            <button onClick={handleStopRecord}
                                                    className="w-full py-3 rounded-xl text-sm font-bold transition-all"
                                                    style={{
                                                        background: 'rgba(239,68,68,0.2)',
                                                        color: '#FCA5A5',
                                                        border: '1px solid rgba(239,68,68,0.3)'
                                                    }}>
                                                ⏹ Stop
                                            </button>
                                        </div>
                                    )}

                                    <button onClick={() => setStep('listen')}
                                            className="w-full py-2.5 mt-2 rounded-xl text-xs transition-all"
                                            style={{color: 'rgba(255,255,255,0.35)'}}>
                                        ← Back to listen
                                    </button>
                                </div>
                            )}

                            {/* Result step */}
                            {step === 'result' && (
                                <div>
                                    {/* Playback */}
                                    {audioUrl && (
                                        <div className="mb-4 p-3 rounded-xl flex items-center gap-3"
                                             style={{
                                                 background: 'rgba(255,255,255,0.06)',
                                                 border: '1px solid rgba(255,255,255,0.1)'
                                             }}>
                                            <span className="text-sm">🎧</span>
                                            <span className="text-xs flex-1" style={{color: 'rgba(255,255,255,0.6)'}}>Your recording</span>
                                            <audio src={audioUrl} controls className="h-7" style={{width: '140px'}}/>
                                        </div>
                                    )}

                                    {/* Score / recognition */}
                                    {srSupported && score !== null ? (
                                        <div className="mb-4 text-center">
                                            <div className="text-4xl font-extrabold mb-1"
                                                 style={{color: score >= 70 ? '#6EE7B7' : score >= 40 ? '#FCD34D' : '#FCA5A5'}}>
                                                {score}%
                                            </div>
                                            <p className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>
                                                {score >= 70 ? '✓ Great pronunciation!' : score >= 40 ? 'Close! Keep practicing.' : 'Try again — listen carefully first.'}
                                            </p>
                                            {recognized && (
                                                <p className="text-xs mt-2 italic"
                                                   style={{color: 'rgba(255,255,255,0.35)'}}>
                                                    You said: "{recognized}"
                                                </p>
                                            )}
                                        </div>
                                    ) : !srSupported ? (
                                        <div className="mb-4 p-3 rounded-xl text-center"
                                             style={{
                                                 background: 'rgba(255,255,255,0.05)',
                                                 border: '1px solid rgba(255,255,255,0.08)'
                                             }}>
                                            <p className="text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>
                                                Listen to your recording above. Speech recognition is only available in
                                                Chrome.
                                            </p>
                                        </div>
                                    ) : null}

                                    {/* Compare */}
                                    <div className="mb-4 p-3 rounded-xl" style={{
                                        background: 'rgba(139,92,246,0.1)',
                                        border: '1px solid rgba(139,92,246,0.2)'
                                    }}>
                                        <p className="text-xs mb-1" style={{color: 'rgba(255,255,255,0.4)'}}>Target
                                            phrase:</p>
                                        <p className="text-sm font-semibold text-white">{ex.targetPhrase}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => setStep('record')}
                                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                                style={{
                                                    background: 'rgba(255,255,255,0.08)',
                                                    color: 'rgba(255,255,255,0.7)'
                                                }}>
                                            🎤 Try Again
                                        </button>
                                        <button onClick={handleNext}
                                                className="inline-flex flex-1 items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                                                style={{
                                                    background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                                                    color: 'white'
                                                }}>
                                            {index + 1 < lesson.exercises.length ? 'Next' : 'Finish'}
                                            <ArrowRight className="h-4 w-4 text-white"/>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            ) : (
                <motion.div className="rounded-2xl p-8 text-center" style={{background: '#0D1B2A'}}
                            initial={{opacity: 0}} animate={{opacity: 1}}>
                    <div className="text-4xl mb-3">{avgScore >= 70 ? '🏆' : '🎉'}</div>
                    <h3 className="text-white font-extrabold text-xl mb-1">Lesson Complete!</h3>
                    {srSupported && <p className="text-3xl font-black mb-1" style={{color: '#A78BFA'}}>{avgScore}%</p>}
                    <p className="text-sm mb-6" style={{color: 'rgba(255,255,255,0.5)'}}>
                        You
                        practiced {lesson.exercises.length} phrases.{srSupported ? ` Average score: ${avgScore}%.` : ' Keep it up!'}
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => {
                            setIndex(0);
                            setStep('listen');
                            setScore(null);
                            setTotalScore(0);
                            setDone(false);
                        }}
                                className="px-5 py-2 rounded-xl text-sm font-semibold"
                                style={{background: 'rgba(255,255,255,0.1)', color: 'white'}}>
                            Practice Again
                        </button>
                        <button onClick={() => navigate('/speaking')}
                                className="px-5 py-2 rounded-xl text-sm font-bold"
                                style={{background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', color: 'white'}}>
                            Back to Speaking
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

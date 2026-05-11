import React, {useState} from 'react';
import {useProgress} from '../../hooks/useProgress';
import {useParams, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';

const LESSONS: Record<string, {
    title: string; titleUz: string; color: string; icon: string;
    explanation: string; explanationUz: string;
    examples: { en: string; uz: string }[];
    quiz: { question: string; options: string[]; correct: string; explanation: string }[];
}> = {
    'present-simple': {
        title: 'Present Simple Tense', titleUz: 'Hozirgi oddiy zamon',
        color: '#0EA5C9', icon: '📅',
        explanation: 'Present Simple is used for habits, facts, and repeated actions. The verb takes "-s" or "-es" in the third person singular (he/she/it).',
        explanationUz: 'Present Simple odatlar, faktlar va takrorlanadigan harakatlar uchun ishlatiladi. Uchinchi shaxs birlikda (he/she/it) fe\'lga "-s" yoki "-es" qo\'shiladi.',
        examples: [
            {en: 'I go to school every day.', uz: 'Men har kuni maktabga boraman.'},
            {en: 'She works at a hospital.', uz: 'U kasalxonada ishlaydi.'},
            {en: 'They play football on weekends.', uz: 'Ular dam olish kunlari futbol o\'ynaydi.'},
        ],
        quiz: [
            {
                question: 'She ___ to work by bus.',
                options: ['go', 'goes', 'going', 'gone'],
                correct: 'goes',
                explanation: 'With he/she/it we add -s to the verb.'
            },
            {
                question: 'I ___ coffee every morning.',
                options: ['drink', 'drinks', 'drank', 'drinking'],
                correct: 'drink',
                explanation: 'With I/you/we/they, the verb has no -s.'
            },
            {
                question: 'He ___ English very well.',
                options: ['speak', 'speaks', 'spoke', 'speaking'],
                correct: 'speaks',
                explanation: 'He is third person singular, so we add -s.'
            },
        ],
    },
    'past-simple': {
        title: 'Past Simple Tense', titleUz: "O'tgan oddiy zamon",
        color: '#8B5CF6', icon: '⏮️',
        explanation: 'Past Simple is used for completed actions in the past. Regular verbs add "-ed". Irregular verbs have special forms (go→went, see→saw).',
        explanationUz: "Past Simple o'tgandag tugallangan harakatlar uchun ishlatiladi. Oddiy fe'llarga \"-ed\" qo'shiladi. Noto'g'ri fe'llar maxsus shakllarga ega.",
        examples: [
            {en: 'I visited my grandmother yesterday.', uz: "Kecha buvimnikiga bordim."},
            {en: 'She went to Paris last year.', uz: "U o'tgan yili Parijga bordi."},
            {en: 'They watched a movie last night.', uz: "Kecha kechasi ular film ko'rishdi."},
        ],
        quiz: [
            {
                question: 'Yesterday I ___ to the market.',
                options: ['go', 'goes', 'went', 'gone'],
                correct: 'went',
                explanation: 'Go is irregular: go → went.'
            },
            {
                question: 'She ___ a letter last week.',
                options: ['write', 'writes', 'written', 'wrote'],
                correct: 'wrote',
                explanation: 'Write is irregular: write → wrote.'
            },
            {
                question: 'They ___ football this morning.',
                options: ['play', 'plays', 'played', 'playing'],
                correct: 'played',
                explanation: 'Regular verbs add -ed in Past Simple.'
            },
        ],
    },
    'present-continuous': {
        title: 'Present Continuous', titleUz: 'Hozirgi davomli zamon',
        color: '#10B981', icon: '▶️',
        explanation: 'Present Continuous is used for actions happening right now or around this time. Formed with: am/is/are + verb-ing.',
        explanationUz: "Present Continuous hozir yoki shu paytlarda sodir bo'layotgan harakatlar uchun ishlatiladi. am/is/are + fe'l-ing bilan tuziladi.",
        examples: [
            {en: 'I am studying English right now.', uz: "Men hozir ingliz tilini o'qiyapman."},
            {en: 'She is cooking dinner.', uz: "U kechki ovqat pishiryapti."},
            {en: 'They are playing in the park.', uz: "Ular parkda o'ynayapti."},
        ],
        quiz: [
            {
                question: 'She ___ a book right now.',
                options: ['read', 'reads', 'is reading', 'was reading'],
                correct: 'is reading',
                explanation: 'Right now = Present Continuous: is + reading.'
            },
            {
                question: 'I ___ to music at the moment.',
                options: ['listen', 'am listening', 'listened', 'listens'],
                correct: 'am listening',
                explanation: 'At the moment = Present Continuous: am + listening.'
            },
            {
                question: 'They ___ football now.',
                options: ['play', 'played', 'are playing', 'plays'],
                correct: 'are playing',
                explanation: 'They + are + playing = Present Continuous.'
            },
        ],
    },
    'future-tenses': {
        title: 'Future Tenses', titleUz: 'Kelasi zamon',
        color: '#F59E0B', icon: '🔮',
        explanation: 'English has two main ways to express the future: "will + verb" for predictions/decisions, and "be going to + verb" for plans.',
        explanationUz: "Ingliz tilida kelajakni ifodalashning ikki asosiy yo'li bor: bashorat/qarorlar uchun \"will + fe'l\", rejalar uchun \"be going to + fe'l\".",
        examples: [
            {en: 'I will call you tomorrow.', uz: "Ertaga sizga qo'ng'iroq qilaman."},
            {en: "She's going to study medicine.", uz: "U tibbiyot o'qishni rejalashtirmoqda."},
            {en: 'It will rain tomorrow.', uz: "Ertaga yomg'ir yog'adi."},
        ],
        quiz: [
            {
                question: 'Look at those clouds — it ___ rain.',
                options: ['will', 'is going to', 'goes to', 'shall'],
                correct: 'is going to',
                explanation: 'Evidence (clouds) suggests a plan/prediction: going to.'
            },
            {
                question: 'I decided just now — I ___ have the pizza.',
                options: ["'m going to", 'will', 'am', 'shall'],
                correct: 'will',
                explanation: 'Spontaneous decision = will.'
            },
            {
                question: 'She ___ visit London next summer.',
                options: ['will', 'is going to', 'both are correct', 'neither'],
                correct: 'both are correct',
                explanation: 'Both will and going to can express future plans.'
            },
        ],
    },
    'modal-verbs': {
        title: 'Modal Verbs', titleUz: "Modal fe'llar",
        color: '#EC4899', icon: '🎭',
        explanation: 'Modal verbs (can, could, must, should, may, might) express ability, permission, obligation, or possibility. They are followed by the base form of the verb.',
        explanationUz: "Modal fe'llar (can, could, must, should, may, might) qobiliyat, ruxsat, majburiyat yoki imkoniyatni bildiradi. Ulardan keyin fe'lning asosiy shakli keladi.",
        examples: [
            {en: 'She can speak three languages.', uz: "U uch tilda gapira oladi."},
            {en: 'You must wear a seatbelt.', uz: "Siz xavfsizlik kamarini taqishingiz shart."},
            {en: 'It might rain later.', uz: "Keyinroq yomg'ir yog'ishi mumkin."},
        ],
        quiz: [
            {
                question: 'You ___ smoke here. It\'s forbidden.',
                options: ['can', 'must', "can't", 'should'],
                correct: "can't",
                explanation: "Can't expresses prohibition."
            },
            {
                question: 'She ___ swim very fast — she\'s a champion.',
                options: ['must', 'can', 'might', 'should'],
                correct: 'can',
                explanation: 'Can expresses ability.'
            },
            {
                question: 'You ___ study more if you want to pass.',
                options: ['can', 'might', 'should', 'must not'],
                correct: 'should',
                explanation: 'Should gives advice/recommendation.'
            },
        ],
    },
};

export default function GrammarLessonPage() {
    const {unitId} = useParams<{ unitId: string }>();
    const navigate = useNavigate();
    const lesson = unitId ? LESSONS[unitId] : null;

    const {completeLesson, isLessonDone} = useProgress();
    const [quizIndex, setQuizIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);

    if (!lesson) return (
        <div className="p-10 text-center">
            <p className="text-gray-500 mb-4">Lesson not found.</p>
            <button onClick={() => navigate('/grammar')} className="text-sm text-blue-500 underline">← Back to Grammar
            </button>
        </div>
    );

    const q = lesson.quiz[quizIndex];
    const isCorrect = selected === q.correct;

    const handleSelect = (opt: string) => {
        if (showResult) return;
        setSelected(opt);
        setShowResult(true);
        if (opt === q.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (quizIndex + 1 < lesson.quiz.length) {
            setQuizIndex(i => i + 1);
            setSelected(null);
            setShowResult(false);
        } else {
            setDone(true);
            if (lesson) completeLesson(unitId!, lesson.quiz.length * 10);
        }
    };

    return (
        <div className="p-6 lg:p-10 max-w-3xl mx-auto">
            {/* Back */}
            <button onClick={() => navigate('/grammar')}
                    className="flex items-center gap-1.5 text-xs font-semibold mb-6 hover:opacity-70 transition-opacity"
                    style={{color: lesson.color}}>
                ← Grammar
            </button>

            {/* Header */}
            <motion.div className="mb-8" initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}}>
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{lesson.icon}</span>
                    <div>
                        <h1 className="text-2xl font-extrabold" style={{color: '#0D1B2A'}}>{lesson.title}</h1>
                        <p className="text-xs italic" style={{color: lesson.color}}>{lesson.titleUz}</p>
                    </div>
                </div>
            </motion.div>

            {/* Explanation */}
            <motion.div className="rounded-2xl p-6 mb-4"
                        style={{background: 'white', border: '1px solid rgba(0,0,0,0.07)'}}
                        initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} transition={{delay: 0.05}}>
                <h3 className="font-bold text-sm mb-2" style={{color: '#0D1B2A'}}>Explanation</h3>
                <p className="text-sm leading-relaxed mb-3" style={{color: '#374151'}}>{lesson.explanation}</p>
                <div className="rounded-xl p-3 text-sm leading-relaxed"
                     style={{background: `${lesson.color}10`, color: '#4A6280', border: `1px solid ${lesson.color}25`}}>
                    🇺🇿 {lesson.explanationUz}
                </div>
            </motion.div>

            {/* Examples */}
            <motion.div className="rounded-2xl p-6 mb-6"
                        style={{background: 'white', border: '1px solid rgba(0,0,0,0.07)'}}
                        initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}}>
                <h3 className="font-bold text-sm mb-3" style={{color: '#0D1B2A'}}>Examples</h3>
                <div className="space-y-3">
                    {lesson.examples.map((ex, i) => (
                        <div key={i} className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium" style={{color: '#0D1B2A'}}>→ {ex.en}</span>
                            <span className="text-xs pl-3" style={{color: '#94A3B8'}}>{ex.uz}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Quiz */}
            <motion.div className="rounded-2xl p-6" style={{background: '#0D1B2A'}}
                        initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} transition={{delay: 0.15}}>
                {!done ? (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-white text-sm">Quick Quiz</h3>
                            <span className="text-xs"
                                  style={{color: 'rgba(255,255,255,0.4)'}}>{quizIndex + 1} / {lesson.quiz.length}</span>
                        </div>
                        <p className="text-white font-semibold mb-4">{q.question}</p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {q.options.map(opt => {
                                let bg = 'rgba(255,255,255,0.08)';
                                let color = 'rgba(255,255,255,0.8)';
                                let border = 'rgba(255,255,255,0.1)';
                                if (showResult && opt === q.correct) {
                                    bg = 'rgba(16,185,129,0.2)';
                                    color = '#6EE7B7';
                                    border = 'rgba(16,185,129,0.4)';
                                } else if (showResult && opt === selected && opt !== q.correct) {
                                    bg = 'rgba(239,68,68,0.2)';
                                    color = '#FCA5A5';
                                    border = 'rgba(239,68,68,0.4)';
                                }
                                return (
                                    <button key={opt} onClick={() => handleSelect(opt)}
                                            className="rounded-xl px-4 py-2.5 text-sm font-medium text-left transition-all"
                                            style={{background: bg, color, border: `1px solid ${border}`}}>
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                        <AnimatePresence>
                            {showResult && (
                                <motion.div initial={{opacity: 0, y: 4}} animate={{opacity: 1, y: 0}} className="mb-4">
                                    <p className="text-xs" style={{color: isCorrect ? '#6EE7B7' : '#FCA5A5'}}>
                                        {isCorrect ? '✓ Correct! ' : '✗ Not quite. '}{q.explanation}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {showResult && (
                            <button onClick={handleNext}
                                    className="w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02]"
                                    style={{
                                        background: `linear-gradient(135deg, ${lesson.color}, ${lesson.color}cc)`,
                                        color: 'white'
                                    }}>
                                {quizIndex + 1 < lesson.quiz.length ? 'Next Question →' : 'See Results →'}
                            </button>
                        )}
                    </>
                ) : (
                    <motion.div className="text-center py-4" initial={{opacity: 0}} animate={{opacity: 1}}>
                        <div
                            className="text-4xl mb-3">{score === lesson.quiz.length ? '🏆' : score >= lesson.quiz.length / 2 ? '👍' : '📚'}</div>
                        <h3 className="text-white font-extrabold text-xl mb-1">{score} / {lesson.quiz.length} correct</h3>
                        <p className="text-sm mb-5" style={{color: 'rgba(255,255,255,0.5)'}}>
                            {score === lesson.quiz.length ? 'Perfect score! Excellent work.' : score >= lesson.quiz.length / 2 ? 'Good job! Keep practicing.' : 'Keep studying — you\'ll get it!'}
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button onClick={() => {
                                setQuizIndex(0);
                                setSelected(null);
                                setShowResult(false);
                                setScore(0);
                                setDone(false);
                            }}
                                    className="px-5 py-2 rounded-xl text-sm font-semibold"
                                    style={{background: 'rgba(255,255,255,0.1)', color: 'white'}}>
                                Retry Quiz
                            </button>
                            <button onClick={() => navigate('/grammar')}
                                    className="px-5 py-2 rounded-xl text-sm font-bold"
                                    style={{
                                        background: `linear-gradient(135deg, ${lesson.color}, ${lesson.color}cc)`,
                                        color: 'white'
                                    }}>
                                Back to Grammar
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
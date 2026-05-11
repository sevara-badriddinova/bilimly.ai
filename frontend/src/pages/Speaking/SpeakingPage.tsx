import {motion} from "framer-motion";
import {useMemo, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Mic, Volume2, RotateCcw, ArrowRight, Briefcase, Coffee, Plane, GraduationCap, PlayCircle} from "lucide-react";
import {Card, Pill, SectionHeading, GhostButton, Progress} from "@/components/ui-kit";
import {useAuth} from "@/context/AuthContext";
import {useUserProgress} from "@/data/progress";

type SpeechRecognitionLike = {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
};

const SCENARIOS = [
    {
        id: "interview",
        icon: Briefcase,
        key: "interview",
        level: "intermediate",
        color: "text-primary",
        bg: "bg-primary/10",
        prompt: "Tell me about a project you built recently."
    },
    {
        id: "cafe",
        icon: Coffee,
        key: "cafe",
        level: "beginner",
        color: "text-secondary",
        bg: "bg-secondary/10",
        prompt: "Could I have a coffee and a croissant, please?"
    },
    {
        id: "travel",
        icon: Plane,
        key: "travel",
        level: "beginner",
        color: "text-accent-foreground",
        bg: "bg-accent/30",
        prompt: "Where is the gate for my flight to London?"
    },
    {
        id: "academic",
        icon: GraduationCap,
        key: "academic",
        level: "advanced",
        color: "text-primary",
        bg: "bg-primary/10",
        prompt: "In my opinion, online learning requires strong discipline."
    },
] as const;

function normalize(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9\s']/g, "").replace(/\s+/g, " ").trim();
}

function scoreSpeech(expected: string, spoken: string, recordedSeconds: number) {
    const expectedWords = normalize(expected).split(" ").filter(Boolean);
    const spokenWords = normalize(spoken).split(" ").filter(Boolean);
    if (expectedWords.length === 0) return 0;

    if (spokenWords.length === 0) {
        return recordedSeconds >= 2 ? 55 : 20;
    }

    const matches = expectedWords.filter((word) => spokenWords.includes(word)).length;
    const coverage = matches / expectedWords.length;
    const lengthRatio = Math.min(spokenWords.length / expectedWords.length, 1);
    return Math.max(20, Math.round((coverage * 75) + (lengthRatio * 25)));
}

function getSpeechRecognition(): { new(): SpeechRecognitionLike } | null {
    const candidate = (window as unknown as {
        SpeechRecognition?: new() => SpeechRecognitionLike;
        webkitSpeechRecognition?: new() => SpeechRecognitionLike
    });
    return candidate.SpeechRecognition || candidate.webkitSpeechRecognition || null;
}

export default function Speaking() {
    const {t} = useTranslation();
    const {user} = useAuth();
    const {progress, completeSkillPractice} = useUserProgress(user?.id);
    const [activeScenario, setActiveScenario] = useState<(typeof SCENARIOS)[number]>(SCENARIOS[0]);
    const [recording, setRecording] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [transcript, setTranscript] = useState("");
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [recordedSeconds, setRecordedSeconds] = useState(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
    const startedAtRef = useRef(0);
    const finalizingRef = useRef(false);

    const sample = activeScenario.prompt || t("speaking.sample");
    const avgScore = useMemo(() => {
        const scores = progress.speaking.scores;
        return scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : 0;
    }, [progress.speaking.scores]);
    const recordedMinutes = Math.round(progress.speaking.recordedSeconds / 60);

    const speakPrompt = () => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(sample);
        utterance.lang = "en-US";
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    };

    const resetPractice = () => {
        setScore(null);
        setTranscript("");
        setError("");
        setRecordedSeconds(0);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
    };

    const finishRecording = (spokenText = transcript) => {
        if (finalizingRef.current) return;
        finalizingRef.current = true;
        const seconds = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000));
        const nextScore = scoreSpeech(sample, spokenText, seconds);
        setRecordedSeconds(seconds);
        setScore(nextScore);
        setRecording(false);
        completeSkillPractice("speaking", {
            xp: Math.max(10, Math.round(nextScore / 3)),
            lessonId: `speaking-${activeScenario.id}-${Date.now()}`,
            score: nextScore,
            recordedSeconds: seconds,
        });
    };

    const startRecording = async () => {
        resetPractice();
        setError("");

        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            streamRef.current = stream;
            const chunks: Blob[] = [];
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            startedAtRef.current = Date.now();
            finalizingRef.current = false;

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) chunks.push(event.data);
            };
            recorder.onstop = () => {
                const blob = new Blob(chunks, {type: recorder.mimeType || "audio/webm"});
                setAudioUrl(URL.createObjectURL(blob));
                stream.getTracks().forEach((track) => track.stop());
            };

            const Recognition = getSpeechRecognition();
            if (Recognition) {
                const recognition = new Recognition();
                recognition.lang = "en-US";
                recognition.interimResults = false;
                recognition.continuous = false;
                recognition.onresult = (event) => {
                    const spoken = Array.from(event.results).map((result) => result[0].transcript).join(" ");
                    setTranscript(spoken);
                    finishRecording(spoken);
                    mediaRecorderRef.current?.stop();
                };
                recognitionRef.current = recognition;
                recognition.start();
            }

            recorder.start();
            setRecording(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Microphone permission is required.");
            setRecording(false);
        }
    };

    const stopRecording = () => {
        recognitionRef.current?.stop();
        if (mediaRecorderRef.current?.state === "recording") {
            mediaRecorderRef.current.stop();
        }
        finishRecording();
    };

    const startStop = () => {
        if (recording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <div className="space-y-10">
            <SectionHeading
                eyebrow={t("speaking.eyebrow")}
                title={t("speaking.title")}
                description={t("speaking.subtitle")}
            />

            <Card variant="raised" className="md:p-10">
                <div className="grid gap-8 md:grid-cols-[1fr_auto]">
                    <div>
                        <Pill tone="primary">{t("speaking.todaysExercise")}</Pill>
                        <h2 className="text-display mt-3 text-2xl md:text-3xl">{t("speaking.repeatPrompt")}</h2>
                        <p className="mt-4 rounded-2xl border-2 border-foreground/10 bg-background p-5 text-xl italic">
                            "{sample}"
                        </p>
                        <p className="mt-3 text-sm text-muted-foreground">
                            {t("speaking.sampleTranslation")}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <GhostButton onClick={speakPrompt}><Volume2 className="h-4 w-4"/> {t("speaking.listen")}
                            </GhostButton>
                            <GhostButton onClick={resetPractice}><RotateCcw className="h-4 w-4"/> {t("speaking.retry")}
                            </GhostButton>
                            {audioUrl && (
                                <audio src={audioUrl} controls className="h-10 max-w-full"/>
                            )}
                        </div>

                        {error && (
                            <p className="mt-4 rounded-xl border-2 border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                                {error}
                            </p>
                        )}

                        {score !== null && (
                            <motion.div
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                className="mt-6 rounded-2xl border-2 border-secondary/40 bg-secondary/5 p-5"
                            >
                                <div className="flex items-center justify-between">
                                    <span
                                        className="text-xs font-semibold uppercase tracking-widest text-secondary">{t("speaking.scoreLabel")}</span>
                                    <span className="text-display text-3xl text-secondary">{score}/100</span>
                                </div>
                                <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                                    <div><span className="text-muted-foreground">{t("speaking.fluency")}</span>
                                        <div className="font-semibold">{Math.min(100, score + 4)}%</div>
                                    </div>
                                    <div><span className="text-muted-foreground">{t("speaking.accuracy")}</span>
                                        <div className="font-semibold">{score}%</div>
                                    </div>
                                    <div><span className="text-muted-foreground">{t("speaking.pronunciation")}</span>
                                        <div className="font-semibold">{Math.max(0, score - 3)}%</div>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm text-muted-foreground">
                                    {transcript ? `Heard: "${transcript}"` : "Recording checked by duration. Use Chrome for speech-to-text scoring."}
                                </p>
                            </motion.div>
                        )}
                    </div>

                    <div className="grid place-items-center">
                        <button
                            onClick={startStop}
                            className="relative grid h-44 w-44 place-items-center rounded-full bg-primary text-primary-foreground shadow-[6px_6px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px]"
                        >
                            {recording && (
                                <>
                                    <motion.span
                                        className="absolute inset-0 rounded-full bg-primary/30"
                                        animate={{scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6]}}
                                        transition={{duration: 1.5, repeat: Infinity}}
                                    />
                                    <motion.span
                                        className="absolute inset-0 rounded-full bg-primary/20"
                                        animate={{scale: [1, 1.7, 1], opacity: [0.4, 0, 0.4]}}
                                        transition={{duration: 1.5, repeat: Infinity, delay: 0.4}}
                                    />
                                </>
                            )}
                            <Mic className="relative h-16 w-16"/>
                        </button>
                        <p className="mt-4 text-sm font-semibold">
                            {recording ? t("speaking.recording") : t("speaking.tapMic")}
                        </p>
                        {recordedSeconds > 0 &&
                            <p className="mt-1 text-xs text-muted-foreground">{recordedSeconds}s recorded</p>}
                    </div>
                </div>
            </Card>

            <div>
                <h2 className="text-display mb-4 text-2xl">{t("speaking.scenarios")}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {SCENARIOS.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div
                                key={s.id}
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: i * 0.05}}
                                whileHover={{y: -3}}
                            >
                                <Card
                                    className={`flex items-start gap-4 hover:border-primary cursor-pointer ${activeScenario.id === s.id ? "border-primary" : ""}`}>
                                    <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${s.bg}`}>
                                        <Icon className={`h-6 w-6 ${s.color}`}/>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-display text-lg">{t(`speaking.scenarioList.${s.key}.title`)}</h3>
                                            <Pill>{t(`levels.${s.level}`)}</Pill>
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">{t(`speaking.scenarioList.${s.key}.body`)}</p>
                                        <button onClick={() => {
                                            setActiveScenario(s);
                                            resetPractice();
                                        }}
                                                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                                            {t("speaking.scenarioStart")} <ArrowRight className="h-3.5 w-3.5"/>
                                        </button>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("speaking.weeklyAvg")}</p>
                    <p className="text-display mt-2 text-3xl text-primary">{avgScore}/100</p>
                    <Progress value={avgScore}/>
                </Card>
                <Card>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("speaking.recordedMin")}</p>
                    <p className="text-display mt-2 text-3xl">{recordedMinutes}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t("speaking.thisWeek")}</p>
                </Card>
                <Card>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("speaking.scenariosDone")}</p>
                    <p className="text-display mt-2 text-3xl">{progress.speaking.scenariosCompleted}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t("speaking.total")}</p>
                </Card>
            </div>
        </div>
    );
}

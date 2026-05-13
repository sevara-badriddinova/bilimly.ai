import {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {ArrowRight} from 'lucide-react';
import {getVocabularyThemeById} from '../../data/vocabularyLessons';
import type {VocabularyWord} from '../../types/lesson';

export default function VocabularyLessonPage() {
    const {themeId} = useParams<{ themeId: string }>();
    const navigate = useNavigate();

    const theme = getVocabularyThemeById(themeId || '');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [mode, setMode] = useState<'learn' | 'quiz'>('learn');

    if (!theme) {
        return <div>Theme not found</div>;
    }

    const currentWord = theme.words[currentIndex];
    const progress = ((currentIndex + 1) / theme.words.length) * 100;

    const handleNext = () => {
        if (currentIndex < theme.words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowTranslation(false);
        } else {
            // Completed all words
            navigate('/vocabulary');
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowTranslation(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="mb-6">
                <button
                    onClick={() => navigate('/vocabulary')}
                    className="text-[#023047] hover:underline mb-4"
                >
                    ← Back to Vocabulary
                </button>

                {/* Progress */}
                <div className="bg-white shadow-sm p-4 rounded-xl mb-4">
                    <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-[#023047]">
              Word {currentIndex + 1} of {theme.words.length}
            </span>
                        <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-[#FFB703] to-[#FB8500] h-full rounded-full transition-all"
                            style={{width: `${progress}%`}}
                        />
                    </div>
                </div>

                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold text-[#023047]">{theme.title}</h2>
                    <p className="text-gray-600 text-sm italic">{theme.titleUz}</p>
                </div>
            </div>

            {/* Flashcard */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 min-h-[400px] flex flex-col justify-center">
                {/* Word */}
                <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-[#023047] mb-4">
                        {currentWord.word}
                    </div>
                    <div className="text-gray-500 text-sm mb-2">
                        {currentWord.pronunciation}
                    </div>
                    <div
                        className="inline-block bg-[#FFB703] text-[#023047] px-4 py-1 rounded-full text-sm font-semibold">
                        {currentWord.partOfSpeech}
                    </div>
                </div>

                {/* Show/Hide Translation Button */}
                <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="mb-6 text-[#023047] hover:text-[#FFB703] transition-colors"
                >
                    {showTranslation ? 'Hide' : 'Show'} Translation
                </button>

                {/* Translation & Details */}
                {showTranslation && (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="bg-[#EAF6FB] rounded-xl p-4">
                            <p className="text-gray-600 text-sm mb-1">Translation:</p>
                            <p className="text-2xl font-semibold text-[#023047]">
                                {currentWord.translation}
                            </p>
                        </div>

                        <div className="bg-[#FFF9E6] rounded-xl p-4">
                            <p className="text-gray-600 text-sm mb-2">Example:</p>
                            <p className="text-lg text-[#023047] mb-2">
                                "{currentWord.example}"
                            </p>
                            <p className="text-sm text-gray-600 italic">
                                {currentWord.exampleTranslation}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    ← Previous
                </button>
                <button
                    onClick={handleNext}
                    className="inline-flex flex-1 items-center justify-center gap-2 bg-[#FFB703] text-[#023047] font-bold py-3 px-6 rounded-xl hover:bg-[#FB8500] transition-colors"
                >
                    {currentIndex < theme.words.length - 1 ? 'Next' : 'Finish'}
                    <ArrowRight className="h-4 w-4"/>
                </button>
            </div>

            {/* Word Counter */}
            <div className="mt-6 flex justify-center gap-1">
                {theme.words.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentIndex
                                ? 'bg-[#FFB703] w-4'
                                : idx < currentIndex
                                    ? 'bg-[#023047]'
                                    : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

import { useState } from 'react';
import type { SentenceBuilderExercise } from '../../types/lesson';

interface Props {
  exercise: SentenceBuilderExercise;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  showFeedback: boolean;
}

export default function SentenceBuilderExerciseComponent({ exercise, onAnswer, showFeedback }: Props) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([...exercise.words]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (hasAnswered) return;

    if (fromAvailable) {
      setSelectedWords([...selectedWords, word]);
      setAvailableWords(availableWords.filter((w, i) => availableWords.indexOf(word) !== i || availableWords.indexOf(word) === i && availableWords.lastIndexOf(word) !== i ? true : w !== word));
    } else {
      const index = selectedWords.lastIndexOf(word);
      if (index > -1) {
        const newSelected = [...selectedWords];
        newSelected.splice(index, 1);
        setSelectedWords(newSelected);
        setAvailableWords([...availableWords, word]);
      }
    }
  };

  const handleCheck = () => {
    if (hasAnswered) return;

    const userSentence = selectedWords.join(' ');
    const normalizedUser = userSentence.trim().toLowerCase().replace(/[.,!?]/g, '');
    const normalizedCorrect = exercise.correctAnswer.trim().toLowerCase().replace(/[.,!?]/g, '');

    const correct = normalizedUser === normalizedCorrect;
    setIsCorrect(correct);
    setHasAnswered(true);
    onAnswer(correct, userSentence);
  };

  const handleReset = () => {
    if (hasAnswered) return;
    setSelectedWords([]);
    setAvailableWords([...exercise.words]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#023047] mb-2">
          {exercise.question}
        </h3>
        {exercise.questionUz && (
          <p className="text-gray-600 text-sm italic">
            {exercise.questionUz}
          </p>
        )}
        <p className="text-sm text-gray-600 mt-2">
          Tap the words to build the sentence
        </p>
      </div>

      {/* Selected Words Area */}
      <div className="bg-[#EAF6FB] p-6 rounded-xl mb-4 min-h-[100px] flex flex-wrap items-center gap-2">
        {selectedWords.length === 0 ? (
          <p className="text-gray-400 italic w-full text-center">
            Select words to build your sentence...
          </p>
        ) : (
          selectedWords.map((word, index) => (
            <button
              key={`selected-${index}`}
              onClick={() => handleWordClick(word, false)}
              disabled={hasAnswered}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                hasAnswered
                  ? isCorrect
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-red-100 text-red-700 cursor-default'
                  : 'bg-white text-[#023047] hover:bg-gray-100 cursor-pointer border-2 border-gray-300'
              }`}
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Available Words */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-600 mb-2">Available words:</p>
        <div className="flex flex-wrap gap-2">
          {availableWords.map((word, index) => (
            <button
              key={`available-${index}`}
              onClick={() => handleWordClick(word, true)}
              disabled={hasAnswered}
              className="px-4 py-2 bg-white border-2 border-[#FFB703] text-[#023047] rounded-lg font-medium hover:bg-[#FFF9E6] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      {!hasAnswered && (
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleCheck}
            disabled={selectedWords.length === 0}
            className="flex-1 bg-[#FFB703] text-[#023047] font-bold py-3 px-6 rounded-xl hover:bg-[#FB8500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && hasAnswered && (
        <div className={`mt-6 p-4 rounded-xl ${
          isCorrect
            ? 'bg-green-50 border-2 border-green-500'
            : 'bg-red-50 border-2 border-red-500'
        }`}>
          <p className="font-semibold text-[#023047] mb-1">
            {isCorrect ? '✓ Perfect!' : '✗ Not quite right'}
          </p>
          {!isCorrect && (
            <p className="text-sm text-gray-700">
              <strong>Correct answer:</strong> {exercise.correctAnswer}
            </p>
          )}
          {exercise.explanation && (
            <p className="text-sm text-gray-700 mt-1">{exercise.explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}

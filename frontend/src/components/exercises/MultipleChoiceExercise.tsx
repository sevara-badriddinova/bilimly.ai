import { useState } from 'react';
import type { MultipleChoiceExercise } from '../../types/lesson';

interface Props {
  exercise: MultipleChoiceExercise;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  showFeedback: boolean;
}

export default function MultipleChoiceExerciseComponent({ exercise, onAnswer, showFeedback }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelectOption = (option: string) => {
    if (hasAnswered) return;

    setSelectedAnswer(option);
    setHasAnswered(true);
    const isCorrect = option === exercise.correctAnswer;
    onAnswer(isCorrect, option);
  };

  const getOptionStyle = (option: string) => {
    if (!hasAnswered) {
      return 'bg-white border-2 border-gray-300 hover:border-[#FFB703] hover:bg-[#FFF9E6] cursor-pointer';
    }

    if (option === exercise.correctAnswer) {
      return 'bg-green-50 border-2 border-green-500';
    }

    if (option === selectedAnswer && option !== exercise.correctAnswer) {
      return 'bg-red-50 border-2 border-red-500';
    }

    return 'bg-gray-50 border-2 border-gray-200 opacity-50';
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
      </div>

      <div className="space-y-3">
        {exercise.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectOption(option)}
            disabled={hasAnswered}
            className={`w-full p-4 rounded-xl text-left font-medium transition-all ${getOptionStyle(option)}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#023047] text-white flex items-center justify-center font-bold flex-shrink-0">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-[#023047]">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {showFeedback && hasAnswered && exercise.explanation && (
        <div className={`mt-6 p-4 rounded-xl ${
          selectedAnswer === exercise.correctAnswer
            ? 'bg-green-50 border-2 border-green-500'
            : 'bg-blue-50 border-2 border-blue-500'
        }`}>
          <p className="font-semibold text-[#023047] mb-1">
            {selectedAnswer === exercise.correctAnswer ? '✓ Correct!' : 'ℹ️ Explanation:'}
          </p>
          <p className="text-sm text-gray-700">{exercise.explanation}</p>
          {exercise.explanationUz && (
            <p className="text-sm text-gray-600 italic mt-1">{exercise.explanationUz}</p>
          )}
        </div>
      )}
    </div>
  );
}

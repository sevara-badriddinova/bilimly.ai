import { useState, Fragment } from 'react';
import type { FillInBlankExercise } from '../../types/lesson';

interface Props {
  exercise: FillInBlankExercise;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  showFeedback: boolean;
}

export default function FillInBlankExerciseComponent({ exercise, onAnswer, showFeedback }: Props) {
  const [userInput, setUserInput] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasAnswered || !userInput.trim()) return;

    const normalizedInput = userInput.trim().toLowerCase();
    const correctAnswers = [
      exercise.correctAnswer.toLowerCase(),
      ...(exercise.acceptableAnswers?.map(a => a.toLowerCase()) || [])
    ];

    const correct = correctAnswers.includes(normalizedInput);
    setIsCorrect(correct);
    setHasAnswered(true);
    onAnswer(correct, userInput);
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

      <div className="bg-[#EAF6FB] p-6 rounded-xl mb-4">
        <p className="text-lg text-[#023047] mb-4">
          {exercise.sentence.split('___').map((part, index, array) => (
            <Fragment key={index}>
              {part}
              {index < array.length - 1 && (
                hasAnswered ? (
                  <span className={`font-bold px-3 py-1 rounded ${
                    isCorrect ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                  }`}>
                    {userInput || '_____'}
                  </span>
                ) : (
                  <span className="inline-block mx-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                      className="border-b-2 border-[#FFB703] bg-transparent outline-none px-2 py-1 text-center min-w-[120px] font-semibold"
                      placeholder="___"
                      autoFocus
                      disabled={hasAnswered}
                    />
                  </span>
                )
              )}
            </Fragment>
          ))}
        </p>
      </div>

      {!hasAnswered && (
        <button
          onClick={handleSubmit}
          disabled={!userInput.trim()}
          className="w-full bg-[#FFB703] text-[#023047] font-bold py-3 px-6 rounded-xl hover:bg-[#FB8500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Answer
        </button>
      )}

      {showFeedback && hasAnswered && (
        <div className={`mt-6 p-4 rounded-xl ${
          isCorrect
            ? 'bg-green-50 border-2 border-green-500'
            : 'bg-red-50 border-2 border-red-500'
        }`}>
          <p className="font-semibold text-[#023047] mb-1">
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          {!isCorrect && (
            <>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Correct answer:</strong> {exercise.correctAnswer}
              </p>
              {exercise.explanation && (
                <p className="text-sm text-gray-700">{exercise.explanation}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

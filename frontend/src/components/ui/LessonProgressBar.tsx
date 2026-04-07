

interface Props {
  current: number;
  total: number;
  hearts?: number;
}

export default function LessonProgressBar({ current, total, hearts }: Props) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-white shadow-sm p-4 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-[#023047]">
          Question {current} of {total}
        </span>
        {hearts !== undefined && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xl">
                {i < hearts ? '❤️' : '🤍'}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#FFB703] to-[#FB8500] h-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

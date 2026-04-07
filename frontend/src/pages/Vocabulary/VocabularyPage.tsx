
import SkillCard from '../../components/ui/SkillCard';
import { vocabularyThemes, getTotalWordCount } from '../../data/vocabularyLessons';
import { useTranslation } from 'react-i18next';

export default function VocabularyPage() {
  const { t } = useTranslation();
  const totalWords = getTotalWordCount();

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#023047] mb-2">
          {t('vocabularyPage.title')} 📚
        </h1>
        <p className="text-gray-600">
          {t('vocabularyPage.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vocabularyThemes.map((theme) => (
          <SkillCard
            key={theme.id}
            id={theme.id}
            title={theme.title}
            titleUz={theme.titleUz}
            description={theme.description}
            icon={theme.icon || '📝'}
            wordsCount={theme.words.length}
            path={`/vocabulary/${theme.id}`}
            progress={0}
            isLocked={false}
          />
        ))}
      </div>

      {/* Learning Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-4xl mb-2">📖</div>
          <div className="text-3xl font-bold text-[#023047]">{vocabularyThemes.length}</div>
          <div className="text-sm text-gray-600">Themes</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-4xl mb-2">✨</div>
          <div className="text-3xl font-bold text-[#023047]">{totalWords}+</div>
          <div className="text-sm text-gray-600">Words to Learn</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-4xl mb-2">🎯</div>
          <div className="text-3xl font-bold text-[#023047]">0</div>
          <div className="text-sm text-gray-600">Words Mastered</div>
        </div>
      </div>

      {/* Learning Tips */}
      <div className="mt-8 bg-gradient-to-r from-[#023047] to-[#0F4C75] rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-3">💡 {t('vocabularyPage.tips.title')}</h3>
        <ul className="space-y-2 text-sm">
          <li>• {t('vocabularyPage.tips.tip1')}</li>
          <li>• {t('vocabularyPage.tips.tip2')}</li>
          <li>• {t('vocabularyPage.tips.tip3')}</li>
          <li>• {t('vocabularyPage.tips.tip4')}</li>
        </ul>
      </div>
    </div>
  );
}

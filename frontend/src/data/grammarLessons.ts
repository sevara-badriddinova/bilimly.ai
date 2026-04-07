import type { Unit, Lesson, MultipleChoiceExercise, FillInBlankExercise, TranslationExercise, SentenceBuilderExercise } from '../types/lesson';

// Grammar Units with comprehensive content
export const grammarUnits: Unit[] = [
  {
    id: 'unit-1',
    title: 'Present Simple Tense',
    titleUz: 'Hozirgi oddiy zamon',
    description: 'Learn to talk about habits, facts, and regular actions',
    descriptionUz: 'Odatlar, faktlar va muntazam harakatlar haqida gapirishni o\'rganing',
    icon: '📅',
    order: 1,
    lessons: [
      {
        id: 'ps-1',
        title: 'Present Simple - Positive Statements',
        titleUz: 'Hozirgi oddiy zamon - Tasdiq gaplar',
        description: 'Form positive sentences in present simple',
        descriptionUz: 'Hozirgi oddiy zamonda tasdiq gaplar tuzish',
        difficulty: 'beginner',
        category: 'grammar',
        xpReward: 10,
        estimatedTime: 5,
        icon: '✅',
        exercises: [
          {
            id: 'ps-1-1',
            type: 'multiple-choice',
            question: 'I ___ coffee every morning.',
            questionUz: 'Men har kuni ertalab kofe ichaman.',
            correctAnswer: 'drink',
            options: ['drink', 'drinks', 'drinking', 'drunk'],
            explanation: 'Use the base form of the verb with I/you/we/they',
            explanationUz: 'I/you/we/they bilan fe\'lning asosiy shaklini ishlating'
          } as MultipleChoiceExercise,
          {
            id: 'ps-1-2',
            type: 'multiple-choice',
            question: 'She ___ English at school.',
            questionUz: 'U maktabda ingliz tilini o\'rganadi.',
            correctAnswer: 'studies',
            options: ['study', 'studies', 'studying', 'studied'],
            explanation: 'Add -es/-s to verbs with he/she/it',
            explanationUz: 'He/she/it bilan fe\'llarga -es/-s qo\'shing'
          } as MultipleChoiceExercise,
          {
            id: 'ps-1-3',
            type: 'fill-in-blank',
            question: 'They ___ soccer on weekends.',
            questionUz: 'Ular dam olish kunlari futbol o\'ynaydilar.',
            sentence: 'They ___ soccer on weekends.',
            correctAnswer: 'play',
            acceptableAnswers: ['play'],
            explanation: 'Use base form with they'
          } as FillInBlankExercise,
          {
            id: 'ps-1-4',
            type: 'multiple-choice',
            question: 'He ___ to work by bus.',
            questionUz: 'U ishga avtobusda boradi.',
            correctAnswer: 'goes',
            options: ['go', 'goes', 'going', 'gone']
          } as MultipleChoiceExercise,
          {
            id: 'ps-1-5',
            type: 'fill-in-blank',
            question: 'We ___ movies on Friday nights.',
            sentence: 'We ___ movies on Friday nights.',
            correctAnswer: 'watch',
            acceptableAnswers: ['watch']
          } as FillInBlankExercise,
          {
            id: 'ps-1-6',
            type: 'multiple-choice',
            question: 'The sun ___ in the east.',
            correctAnswer: 'rises',
            options: ['rise', 'rises', 'rising', 'rose'],
            explanation: 'Facts always use present simple'
          } as MultipleChoiceExercise,
          {
            id: 'ps-1-7',
            type: 'multiple-choice',
            question: 'My sister ___ pizza.',
            correctAnswer: 'loves',
            options: ['love', 'loves', 'loving', 'loved']
          } as MultipleChoiceExercise,
          {
            id: 'ps-1-8',
            type: 'sentence-builder',
            question: 'Arrange: every / reads / day / books / She',
            correctAnswer: 'She reads books every day',
            words: ['She', 'reads', 'books', 'every', 'day']
          } as SentenceBuilderExercise,
          {
            id: 'ps-1-9',
            type: 'fill-in-blank',
            question: 'You ___ very well!',
            sentence: 'You ___ very well!',
            correctAnswer: 'sing',
            acceptableAnswers: ['sing']
          } as FillInBlankExercise,
          {
            id: 'ps-1-10',
            type: 'multiple-choice',
            question: 'It ___ a lot in London.',
            correctAnswer: 'rains',
            options: ['rain', 'rains', 'raining', 'rained']
          } as MultipleChoiceExercise
        ]
      },
      {
        id: 'ps-2',
        title: 'Present Simple - Negative Statements',
        titleUz: 'Hozirgi oddiy zamon - Inkor gaplar',
        description: 'Form negative sentences with don\'t and doesn\'t',
        descriptionUz: 'Don\'t va doesn\'t bilan inkor gaplar tuzish',
        difficulty: 'beginner',
        category: 'grammar',
        xpReward: 10,
        estimatedTime: 5,
        icon: '❌',
        exercises: [
          {
            id: 'ps-2-1',
            type: 'multiple-choice',
            question: 'I ___ like vegetables.',
            questionUz: 'Men sabzavotlarni yoqtirmayman.',
            correctAnswer: 'don\'t',
            options: ['don\'t', 'doesn\'t', 'not', 'am not'],
            explanation: 'Use don\'t with I/you/we/they',
            explanationUz: 'I/you/we/they bilan don\'t ishlating'
          } as MultipleChoiceExercise,
          {
            id: 'ps-2-2',
            type: 'multiple-choice',
            question: 'She ___ drink coffee.',
            questionUz: 'U kofe ichmaydi.',
            correctAnswer: 'doesn\'t',
            options: ['don\'t', 'doesn\'t', 'not', 'isn\'t'],
            explanation: 'Use doesn\'t with he/she/it',
            explanationUz: 'He/she/it bilan doesn\'t ishlating'
          } as MultipleChoiceExercise,
          {
            id: 'ps-2-3',
            type: 'fill-in-blank',
            question: 'They ___ live in New York.',
            sentence: 'They ___ live in New York.',
            correctAnswer: 'don\'t',
            acceptableAnswers: ['don\'t', 'do not']
          } as FillInBlankExercise,
          {
            id: 'ps-2-4',
            type: 'multiple-choice',
            question: 'He ___ watch TV often.',
            correctAnswer: 'doesn\'t',
            options: ['don\'t', 'doesn\'t', 'not', 'isn\'t']
          } as MultipleChoiceExercise,
          {
            id: 'ps-2-5',
            type: 'sentence-builder',
            question: 'Arrange: speak / We / English / don\'t / at home',
            correctAnswer: 'We don\'t speak English at home',
            words: ['We', 'don\'t', 'speak', 'English', 'at', 'home']
          } as SentenceBuilderExercise,
          {
            id: 'ps-2-6',
            type: 'fill-in-blank',
            question: 'My cat ___ like water.',
            sentence: 'My cat ___ like water.',
            correctAnswer: 'doesn\'t',
            acceptableAnswers: ['doesn\'t', 'does not']
          } as FillInBlankExercise,
          {
            id: 'ps-2-7',
            type: 'multiple-choice',
            question: 'You ___ need a jacket today.',
            correctAnswer: 'don\'t',
            options: ['don\'t', 'doesn\'t', 'not', 'aren\'t']
          } as MultipleChoiceExercise,
          {
            id: 'ps-2-8',
            type: 'translation',
            question: 'Translate to English: U erta turmayd',
            questionUz: 'U erta turmayd',
            correctAnswer: 'He doesn\'t wake up early',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise,
          {
            id: 'ps-2-9',
            type: 'multiple-choice',
            question: 'It ___ snow in summer.',
            correctAnswer: 'doesn\'t',
            options: ['don\'t', 'doesn\'t', 'not', 'isn\'t']
          } as MultipleChoiceExercise,
          {
            id: 'ps-2-10',
            type: 'fill-in-blank',
            question: 'We ___ eat meat.',
            sentence: 'We ___ eat meat.',
            correctAnswer: 'don\'t',
            acceptableAnswers: ['don\'t', 'do not']
          } as FillInBlankExercise
        ]
      },
      {
        id: 'ps-3',
        title: 'Present Simple - Questions',
        titleUz: 'Hozirgi oddiy zamon - Savol gaplar',
        description: 'Ask questions using do and does',
        descriptionUz: 'Do va does yordamida savol so\'rash',
        difficulty: 'beginner',
        category: 'grammar',
        xpReward: 10,
        estimatedTime: 6,
        icon: '❓',
        exercises: [
          {
            id: 'ps-3-1',
            type: 'multiple-choice',
            question: '___ you like pizza?',
            correctAnswer: 'Do',
            options: ['Do', 'Does', 'Are', 'Is'],
            explanation: 'Use Do with I/you/we/they'
          } as MultipleChoiceExercise,
          {
            id: 'ps-3-2',
            type: 'multiple-choice',
            question: '___ she speak French?',
            correctAnswer: 'Does',
            options: ['Do', 'Does', 'Is', 'Are'],
            explanation: 'Use Does with he/she/it'
          } as MultipleChoiceExercise,
          {
            id: 'ps-3-3',
            type: 'sentence-builder',
            question: 'Arrange: they / Where / live / do / ?',
            correctAnswer: 'Where do they live?',
            words: ['Where', 'do', 'they', 'live', '?']
          } as SentenceBuilderExercise,
          {
            id: 'ps-3-4',
            type: 'fill-in-blank',
            question: '___ he work on Sundays?',
            sentence: '___ he work on Sundays?',
            correctAnswer: 'Does',
            acceptableAnswers: ['Does']
          } as FillInBlankExercise,
          {
            id: 'ps-3-5',
            type: 'multiple-choice',
            question: 'What time ___ you wake up?',
            correctAnswer: 'do',
            options: ['do', 'does', 'are', 'is']
          } as MultipleChoiceExercise,
          {
            id: 'ps-3-6',
            type: 'sentence-builder',
            question: 'Arrange: does / When / start / school / ?',
            correctAnswer: 'When does school start?',
            words: ['When', 'does', 'school', 'start', '?']
          } as SentenceBuilderExercise,
          {
            id: 'ps-3-7',
            type: 'multiple-choice',
            question: '___ your parents travel often?',
            correctAnswer: 'Do',
            options: ['Do', 'Does', 'Are', 'Is']
          } as MultipleChoiceExercise,
          {
            id: 'ps-3-8',
            type: 'fill-in-blank',
            question: 'Why ___ she study English?',
            sentence: 'Why ___ she study English?',
            correctAnswer: 'does',
            acceptableAnswers: ['does']
          } as FillInBlankExercise,
          {
            id: 'ps-3-9',
            type: 'multiple-choice',
            question: '___ it rain a lot here?',
            correctAnswer: 'Does',
            options: ['Do', 'Does', 'Is', 'Are']
          } as MultipleChoiceExercise,
          {
            id: 'ps-3-10',
            type: 'translation',
            question: 'Translate: Siz ingliz tilini gapirasizmi?',
            correctAnswer: 'Do you speak English?',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    title: 'Past Simple Tense',
    titleUz: 'O\'tgan oddiy zamon',
    description: 'Talk about completed actions in the past',
    descriptionUz: 'O\'tmishda tugallangan harakatlar haqida gapirish',
    icon: '⏮️',
    order: 2,
    lessons: [
      {
        id: 'past-1',
        title: 'Past Simple - Regular Verbs',
        titleUz: 'O\'tgan zamon - Muntazam fe\'llar',
        description: 'Form past tense with -ed endings',
        descriptionUz: '-ed qo\'shimchasi bilan o\'tgan zamon',
        difficulty: 'beginner',
        category: 'grammar',
        xpReward: 10,
        estimatedTime: 5,
        icon: '📖',
        exercises: [
          {
            id: 'past-1-1',
            type: 'multiple-choice',
            question: 'I ___ the movie yesterday.',
            correctAnswer: 'watched',
            options: ['watch', 'watched', 'watching', 'watches'],
            explanation: 'Add -ed to regular verbs for past tense'
          } as MultipleChoiceExercise,
          {
            id: 'past-1-2',
            type: 'fill-in-blank',
            question: 'She ___ (cook) dinner last night.',
            sentence: 'She ___ dinner last night.',
            correctAnswer: 'cooked',
            acceptableAnswers: ['cooked']
          } as FillInBlankExercise,
          {
            id: 'past-1-3',
            type: 'multiple-choice',
            question: 'They ___ soccer last weekend.',
            correctAnswer: 'played',
            options: ['play', 'played', 'plays', 'playing']
          } as MultipleChoiceExercise,
          {
            id: 'past-1-4',
            type: 'fill-in-blank',
            question: 'We ___ (visit) Paris in 2020.',
            sentence: 'We ___ Paris in 2020.',
            correctAnswer: 'visited',
            acceptableAnswers: ['visited']
          } as FillInBlankExercise,
          {
            id: 'past-1-5',
            type: 'sentence-builder',
            question: 'Arrange: cleaned / yesterday / I / room / my',
            correctAnswer: 'I cleaned my room yesterday',
            words: ['I', 'cleaned', 'my', 'room', 'yesterday']
          } as SentenceBuilderExercise,
          {
            id: 'past-1-6',
            type: 'multiple-choice',
            question: 'He ___ for the test.',
            correctAnswer: 'studied',
            options: ['study', 'studied', 'studies', 'studying']
          } as MultipleChoiceExercise,
          {
            id: 'past-1-7',
            type: 'fill-in-blank',
            question: 'You ___ (help) me a lot.',
            sentence: 'You ___ me a lot.',
            correctAnswer: 'helped',
            acceptableAnswers: ['helped']
          } as FillInBlankExercise,
          {
            id: 'past-1-8',
            type: 'multiple-choice',
            question: 'The baby ___ all night.',
            correctAnswer: 'cried',
            options: ['cry', 'cried', 'cries', 'crying']
          } as MultipleChoiceExercise,
          {
            id: 'past-1-9',
            type: 'translation',
            question: 'Translate: Men kecha maktabga bordim',
            correctAnswer: 'I walked to school yesterday',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise,
          {
            id: 'past-1-10',
            type: 'fill-in-blank',
            question: 'It ___ (rain) last week.',
            sentence: 'It ___ last week.',
            correctAnswer: 'rained',
            acceptableAnswers: ['rained']
          } as FillInBlankExercise
        ]
      },
      {
        id: 'past-2',
        title: 'Past Simple - Irregular Verbs (Part 1)',
        titleUz: 'O\'tgan zamon - Nomuntazam fe\'llar (1-qism)',
        description: 'Learn common irregular past tense verbs',
        descriptionUz: 'Keng tarqalgan nomuntazam fe\'llarni o\'rganish',
        difficulty: 'beginner',
        category: 'grammar',
        xpReward: 12,
        estimatedTime: 6,
        icon: '⚡',
        exercises: [
          {
            id: 'past-2-1',
            type: 'multiple-choice',
            question: 'I ___ to school yesterday. (go)',
            correctAnswer: 'went',
            options: ['goed', 'went', 'gone', 'go'],
            explanation: 'Go → went (irregular verb)'
          } as MultipleChoiceExercise,
          {
            id: 'past-2-2',
            type: 'fill-in-blank',
            question: 'She ___ (eat) breakfast at 8 AM.',
            sentence: 'She ___ breakfast at 8 AM.',
            correctAnswer: 'ate',
            acceptableAnswers: ['ate']
          } as FillInBlankExercise,
          {
            id: 'past-2-3',
            type: 'multiple-choice',
            question: 'We ___ a movie last night. (see)',
            correctAnswer: 'saw',
            options: ['seed', 'saw', 'seen', 'see']
          } as MultipleChoiceExercise,
          {
            id: 'past-2-4',
            type: 'fill-in-blank',
            question: 'He ___ (buy) a new car.',
            sentence: 'He ___ a new car.',
            correctAnswer: 'bought',
            acceptableAnswers: ['bought']
          } as FillInBlankExercise,
          {
            id: 'past-2-5',
            type: 'multiple-choice',
            question: 'They ___ the answer. (know)',
            correctAnswer: 'knew',
            options: ['knowed', 'knew', 'known', 'know']
          } as MultipleChoiceExercise,
          {
            id: 'past-2-6',
            type: 'fill-in-blank',
            question: 'I ___ (write) a letter.',
            sentence: 'I ___ a letter.',
            correctAnswer: 'wrote',
            acceptableAnswers: ['wrote']
          } as FillInBlankExercise,
          {
            id: 'past-2-7',
            type: 'multiple-choice',
            question: 'She ___ her keys. (find)',
            correctAnswer: 'found',
            options: ['finded', 'found', 'find', 'founded']
          } as MultipleChoiceExercise,
          {
            id: 'past-2-8',
            type: 'sentence-builder',
            question: 'Arrange: yesterday / book / read / I / a',
            correctAnswer: 'I read a book yesterday',
            words: ['I', 'read', 'a', 'book', 'yesterday']
          } as SentenceBuilderExercise,
          {
            id: 'past-2-9',
            type: 'fill-in-blank',
            question: 'You ___ (make) a mistake.',
            sentence: 'You ___ a mistake.',
            correctAnswer: 'made',
            acceptableAnswers: ['made']
          } as FillInBlankExercise,
          {
            id: 'past-2-10',
            type: 'multiple-choice',
            question: 'It ___ very cold. (be)',
            correctAnswer: 'was',
            options: ['is', 'was', 'were', 'be']
          } as MultipleChoiceExercise
        ]
      },
      {
        id: 'past-3',
        title: 'Past Simple - Questions and Negatives',
        titleUz: 'O\'tgan zamon - Savol va inkor',
        description: 'Form questions and negatives in past tense',
        descriptionUz: 'O\'tgan zamonda savol va inkor gaplar',
        difficulty: 'intermediate',
        category: 'grammar',
        xpReward: 12,
        estimatedTime: 6,
        icon: '🔄',
        exercises: [
          {
            id: 'past-3-1',
            type: 'multiple-choice',
            question: '___ you watch TV yesterday?',
            correctAnswer: 'Did',
            options: ['Did', 'Do', 'Does', 'Was'],
            explanation: 'Use Did for questions in past simple'
          } as MultipleChoiceExercise,
          {
            id: 'past-3-2',
            type: 'multiple-choice',
            question: 'She ___ go to work yesterday.',
            correctAnswer: 'didn\'t',
            options: ['didn\'t', 'don\'t', 'doesn\'t', 'wasn\'t'],
            explanation: 'Use didn\'t for negatives'
          } as MultipleChoiceExercise,
          {
            id: 'past-3-3',
            type: 'sentence-builder',
            question: 'Arrange: did / Where / go / you / ?',
            correctAnswer: 'Where did you go?',
            words: ['Where', 'did', 'you', 'go', '?']
          } as SentenceBuilderExercise,
          {
            id: 'past-3-4',
            type: 'fill-in-blank',
            question: 'They ___ like the movie.',
            sentence: 'They ___ like the movie.',
            correctAnswer: 'didn\'t',
            acceptableAnswers: ['didn\'t', 'did not']
          } as FillInBlankExercise,
          {
            id: 'past-3-5',
            type: 'multiple-choice',
            question: '___ he call you?',
            correctAnswer: 'Did',
            options: ['Did', 'Do', 'Does', 'Was']
          } as MultipleChoiceExercise,
          {
            id: 'past-3-6',
            type: 'fill-in-blank',
            question: 'I ___ understand the question.',
            sentence: 'I ___ understand the question.',
            correctAnswer: 'didn\'t',
            acceptableAnswers: ['didn\'t', 'did not']
          } as FillInBlankExercise,
          {
            id: 'past-3-7',
            type: 'multiple-choice',
            question: 'What ___ you eat for lunch?',
            correctAnswer: 'did',
            options: ['did', 'do', 'does', 'was']
          } as MultipleChoiceExercise,
          {
            id: 'past-3-8',
            type: 'sentence-builder',
            question: 'Arrange: didn\'t / We / yesterday / study',
            correctAnswer: 'We didn\'t study yesterday',
            words: ['We', 'didn\'t', 'study', 'yesterday']
          } as SentenceBuilderExercise,
          {
            id: 'past-3-9',
            type: 'translation',
            question: 'Translate: Siz kecha qayerda edingiz?',
            correctAnswer: 'Where were you yesterday?',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise,
          {
            id: 'past-3-10',
            type: 'fill-in-blank',
            question: '___ it rain last night?',
            sentence: '___ it rain last night?',
            correctAnswer: 'Did',
            acceptableAnswers: ['Did']
          } as FillInBlankExercise
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    title: 'Present Continuous',
    titleUz: 'Hozirgi davomli zamon',
    description: 'Talk about actions happening now',
    descriptionUz: 'Hozir sodir bo\'layotgan harakatlar haqida gapirish',
    icon: '▶️',
    order: 3,
    lessons: [
      {
        id: 'pc-1',
        title: 'Present Continuous - Formation',
        titleUz: 'Hozirgi davomli - Shakllanishi',
        description: 'Learn to form -ing verbs',
        descriptionUz: '-ing fe\'llarni yasash',
        difficulty: 'beginner',
        category: 'grammar',
        xpReward: 10,
        estimatedTime: 5,
        icon: '🔨',
        exercises: [
          {
            id: 'pc-1-1',
            type: 'multiple-choice',
            question: 'I ___ reading a book right now.',
            correctAnswer: 'am',
            options: ['am', 'is', 'are', 'be'],
            explanation: 'Use am with I, is with he/she/it, are with you/we/they'
          } as MultipleChoiceExercise,
          {
            id: 'pc-1-2',
            type: 'fill-in-blank',
            question: 'She ___ (watch) TV.',
            sentence: 'She ___ watching TV.',
            correctAnswer: 'is',
            acceptableAnswers: ['is', '\'s']
          } as FillInBlankExercise,
          {
            id: 'pc-1-3',
            type: 'multiple-choice',
            question: 'They ___ playing soccer.',
            correctAnswer: 'are',
            options: ['am', 'is', 'are', 'be']
          } as MultipleChoiceExercise,
          {
            id: 'pc-1-4',
            type: 'fill-in-blank',
            question: 'He is ___ (eat) lunch.',
            sentence: 'He is ___ lunch.',
            correctAnswer: 'eating',
            acceptableAnswers: ['eating']
          } as FillInBlankExercise,
          {
            id: 'pc-1-5',
            type: 'sentence-builder',
            question: 'Arrange: is / now / She / studying / right',
            correctAnswer: 'She is studying right now',
            words: ['She', 'is', 'studying', 'right', 'now']
          } as SentenceBuilderExercise,
          {
            id: 'pc-1-6',
            type: 'multiple-choice',
            question: 'We ___ having dinner.',
            correctAnswer: 'are',
            options: ['am', 'is', 'are', 'be']
          } as MultipleChoiceExercise,
          {
            id: 'pc-1-7',
            type: 'fill-in-blank',
            question: 'You are ___ (run) fast!',
            sentence: 'You are ___ fast!',
            correctAnswer: 'running',
            acceptableAnswers: ['running']
          } as FillInBlankExercise,
          {
            id: 'pc-1-8',
            type: 'multiple-choice',
            question: 'It ___ raining.',
            correctAnswer: 'is',
            options: ['am', 'is', 'are', 'be']
          } as MultipleChoiceExercise,
          {
            id: 'pc-1-9',
            type: 'translation',
            question: 'Translate: Men hozir o\'qiyapman',
            correctAnswer: 'I am reading now',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise,
          {
            id: 'pc-1-10',
            type: 'fill-in-blank',
            question: 'My sister is ___ (sleep).',
            sentence: 'My sister is ___.',
            correctAnswer: 'sleeping',
            acceptableAnswers: ['sleeping']
          } as FillInBlankExercise
        ]
      },
      {
        id: 'pc-2',
        title: 'Present Continuous - Negatives',
        titleUz: 'Hozirgi davomli - Inkor',
        description: 'Form negative continuous sentences',
        descriptionUz: 'Inkor davomli gaplar',
        difficulty: 'beginner',
        category: 'grammar',
        xpReward: 10,
        estimatedTime: 5,
        icon: '⛔',
        exercises: [
          {
            id: 'pc-2-1',
            type: 'multiple-choice',
            question: 'I ___ not working today.',
            correctAnswer: 'am',
            options: ['am', 'is', 'are', 'be']
          } as MultipleChoiceExercise,
          {
            id: 'pc-2-2',
            type: 'fill-in-blank',
            question: 'She ___ listening to me.',
            sentence: 'She ___ listening to me.',
            correctAnswer: 'isn\'t',
            acceptableAnswers: ['isn\'t', 'is not']
          } as FillInBlankExercise,
          {
            id: 'pc-2-3',
            type: 'multiple-choice',
            question: 'They ___ coming to the party.',
            correctAnswer: 'aren\'t',
            options: ['isn\'t', 'aren\'t', 'am not', 'not']
          } as MultipleChoiceExercise,
          {
            id: 'pc-2-4',
            type: 'sentence-builder',
            question: 'Arrange: not / We / studying / are',
            correctAnswer: 'We are not studying',
            words: ['We', 'are', 'not', 'studying']
          } as SentenceBuilderExercise,
          {
            id: 'pc-2-5',
            type: 'fill-in-blank',
            question: 'He ___ playing games.',
            sentence: 'He ___ playing games.',
            correctAnswer: 'isn\'t',
            acceptableAnswers: ['isn\'t', 'is not']
          } as FillInBlankExercise,
          {
            id: 'pc-2-6',
            type: 'multiple-choice',
            question: 'You ___ paying attention.',
            correctAnswer: 'aren\'t',
            options: ['isn\'t', 'aren\'t', 'am not', 'not']
          } as MultipleChoiceExercise,
          {
            id: 'pc-2-7',
            type: 'fill-in-blank',
            question: 'It ___ snowing.',
            sentence: 'It ___ snowing.',
            correctAnswer: 'isn\'t',
            acceptableAnswers: ['isn\'t', 'is not']
          } as FillInBlankExercise,
          {
            id: 'pc-2-8',
            type: 'multiple-choice',
            question: 'I ___ feeling well.',
            correctAnswer: 'am not',
            options: ['am not', 'is not', 'are not', 'not']
          } as MultipleChoiceExercise,
          {
            id: 'pc-2-9',
            type: 'translation',
            question: 'Translate: Biz hozir uyqulayotganmiz emas',
            correctAnswer: 'We are not sleeping now',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise,
          {
            id: 'pc-2-10',
            type: 'sentence-builder',
            question: 'Arrange: The / working / not / is / computer',
            correctAnswer: 'The computer is not working',
            words: ['The', 'computer', 'is', 'not', 'working']
          } as SentenceBuilderExercise
        ]
      },
      {
        id: 'pc-3',
        title: 'Present Continuous - Questions',
        titleUz: 'Hozirgi davomli - Savollar',
        description: 'Ask questions in present continuous',
        descriptionUz: 'Hozirgi davomli zamonda savol so\'rash',
        difficulty: 'intermediate',
        category: 'grammar',
        xpReward: 12,
        estimatedTime: 6,
        icon: '❔',
        exercises: [
          {
            id: 'pc-3-1',
            type: 'sentence-builder',
            question: 'Arrange: Are / studying / you / ?',
            correctAnswer: 'Are you studying?',
            words: ['Are', 'you', 'studying', '?']
          } as SentenceBuilderExercise,
          {
            id: 'pc-3-2',
            type: 'multiple-choice',
            question: '___ she coming to dinner?',
            correctAnswer: 'Is',
            options: ['Am', 'Is', 'Are', 'Do']
          } as MultipleChoiceExercise,
          {
            id: 'pc-3-3',
            type: 'fill-in-blank',
            question: 'What ___ you doing?',
            sentence: 'What ___ you doing?',
            correctAnswer: 'are',
            acceptableAnswers: ['are']
          } as FillInBlankExercise,
          {
            id: 'pc-3-4',
            type: 'multiple-choice',
            question: '___ they playing outside?',
            correctAnswer: 'Are',
            options: ['Am', 'Is', 'Are', 'Do']
          } as MultipleChoiceExercise,
          {
            id: 'pc-3-5',
            type: 'sentence-builder',
            question: 'Arrange: Where / going / you / are / ?',
            correctAnswer: 'Where are you going?',
            words: ['Where', 'are', 'you', 'going', '?']
          } as SentenceBuilderExercise,
          {
            id: 'pc-3-6',
            type: 'fill-in-blank',
            question: '___ he working today?',
            sentence: '___ he working today?',
            correctAnswer: 'Is',
            acceptableAnswers: ['Is']
          } as FillInBlankExercise,
          {
            id: 'pc-3-7',
            type: 'multiple-choice',
            question: 'Why ___ you crying?',
            correctAnswer: 'are',
            options: ['am', 'is', 'are', 'do']
          } as MultipleChoiceExercise,
          {
            id: 'pc-3-8',
            type: 'sentence-builder',
            question: 'Arrange: listening / Is / she / music / to / ?',
            correctAnswer: 'Is she listening to music?',
            words: ['Is', 'she', 'listening', 'to', 'music', '?']
          } as SentenceBuilderExercise,
          {
            id: 'pc-3-9',
            type: 'translation',
            question: 'Translate: Ular nimani kutishyapti?',
            correctAnswer: 'What are they waiting for?',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise,
          {
            id: 'pc-3-10',
            type: 'fill-in-blank',
            question: '___ it raining outside?',
            sentence: '___ it raining outside?',
            correctAnswer: 'Is',
            acceptableAnswers: ['Is']
          } as FillInBlankExercise
        ]
      }
    ]
  },
  {
    id: 'unit-4',
    title: 'Future Tenses',
    titleUz: 'Kelasi zamon',
    description: 'Talk about future plans and predictions',
    descriptionUz: 'Kelajakdagi rejalar va bashoratlar',
    icon: '🔮',
    order: 4,
    lessons: [
      {
        id: 'future-1',
        title: 'Future with "will"',
        titleUz: 'Will bilan kelasi zamon',
        description: 'Make promises and predictions',
        descriptionUz: 'Va\'dalar va bashoratlar',
        difficulty: 'intermediate',
        category: 'grammar',
        xpReward: 12,
        estimatedTime: 6,
        icon: '🎯',
        exercises: [
          {
            id: 'future-1-1',
            type: 'multiple-choice',
            question: 'I ___ help you tomorrow.',
            correctAnswer: 'will',
            options: ['will', 'am', 'going', 'have'],
            explanation: 'Use will for promises and spontaneous decisions'
          } as MultipleChoiceExercise,
          {
            id: 'future-1-2',
            type: 'fill-in-blank',
            question: 'She ___ be here soon.',
            sentence: 'She ___ be here soon.',
            correctAnswer: 'will',
            acceptableAnswers: ['will', '\'ll']
          } as FillInBlankExercise,
          {
            id: 'future-1-3',
            type: 'multiple-choice',
            question: 'It ___ rain tomorrow.',
            correctAnswer: 'will',
            options: ['will', 'is', 'going', 'have']
          } as MultipleChoiceExercise,
          {
            id: 'future-1-4',
            type: 'sentence-builder',
            question: 'Arrange: call / tomorrow / will / I / you',
            correctAnswer: 'I will call you tomorrow',
            words: ['I', 'will', 'call', 'you', 'tomorrow']
          } as SentenceBuilderExercise,
          {
            id: 'future-1-5',
            type: 'fill-in-blank',
            question: 'They ___ arrive at 6 PM.',
            sentence: 'They ___ arrive at 6 PM.',
            correctAnswer: 'will',
            acceptableAnswers: ['will', '\'ll']
          } as FillInBlankExercise,
          {
            id: 'future-1-6',
            type: 'multiple-choice',
            question: 'We ___ not go to the party.',
            correctAnswer: 'will',
            options: ['will', 'are', 'do', 'have']
          } as MultipleChoiceExercise,
          {
            id: 'future-1-7',
            type: 'fill-in-blank',
            question: '___ you help me?',
            sentence: '___ you help me?',
            correctAnswer: 'Will',
            acceptableAnswers: ['Will']
          } as FillInBlankExercise,
          {
            id: 'future-1-8',
            type: 'multiple-choice',
            question: 'He ___ pass the exam.',
            correctAnswer: 'will',
            options: ['will', 'is', 'going', 'have']
          } as MultipleChoiceExercise,
          {
            id: 'future-1-9',
            type: 'translation',
            question: 'Translate: Men sizga yordam beraman',
            correctAnswer: 'I will help you',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise,
          {
            id: 'future-1-10',
            type: 'sentence-builder',
            question: 'Arrange: be / won\'t / It / easy',
            correctAnswer: 'It won\'t be easy',
            words: ['It', 'won\'t', 'be', 'easy']
          } as SentenceBuilderExercise
        ]
      },
      {
        id: 'future-2',
        title: 'Future with "going to"',
        titleUz: 'Going to bilan kelasi zamon',
        description: 'Talk about planned future actions',
        descriptionUz: 'Rejalashtirilgan harakatlar haqida',
        difficulty: 'intermediate',
        category: 'grammar',
        xpReward: 12,
        estimatedTime: 6,
        icon: '📅',
        exercises: [
          {
            id: 'future-2-1',
            type: 'multiple-choice',
            question: 'I ___ going to study tonight.',
            correctAnswer: 'am',
            options: ['am', 'is', 'are', 'will'],
            explanation: 'Use be + going to for planned actions'
          } as MultipleChoiceExercise,
          {
            id: 'future-2-2',
            type: 'fill-in-blank',
            question: 'She ___ going to visit Paris.',
            sentence: 'She ___ going to visit Paris.',
            correctAnswer: 'is',
            acceptableAnswers: ['is', '\'s']
          } as FillInBlankExercise,
          {
            id: 'future-2-3',
            type: 'multiple-choice',
            question: 'They ___ going to buy a house.',
            correctAnswer: 'are',
            options: ['am', 'is', 'are', 'will']
          } as MultipleChoiceExercise,
          {
            id: 'future-2-4',
            type: 'sentence-builder',
            question: 'Arrange: going / We / to / are / travel',
            correctAnswer: 'We are going to travel',
            words: ['We', 'are', 'going', 'to', 'travel']
          } as SentenceBuilderExercise,
          {
            id: 'future-2-5',
            type: 'fill-in-blank',
            question: 'He ___ going to call you.',
            sentence: 'He ___ going to call you.',
            correctAnswer: 'is',
            acceptableAnswers: ['is', '\'s']
          } as FillInBlankExercise,
          {
            id: 'future-2-6',
            type: 'multiple-choice',
            question: 'What ___ you going to do?',
            correctAnswer: 'are',
            options: ['am', 'is', 'are', 'will']
          } as MultipleChoiceExercise,
          {
            id: 'future-2-7',
            type: 'fill-in-blank',
            question: 'I\'m ___ to start a business.',
            sentence: 'I\'m ___ to start a business.',
            correctAnswer: 'going',
            acceptableAnswers: ['going']
          } as FillInBlankExercise,
          {
            id: 'future-2-8',
            type: 'multiple-choice',
            question: 'It ___ going to snow.',
            correctAnswer: 'is',
            options: ['am', 'is', 'are', 'will']
          } as MultipleChoiceExercise,
          {
            id: 'future-2-9',
            type: 'translation',
            question: 'Translate: Biz ertaga kinoga boramiz',
            correctAnswer: 'We are going to go to the cinema tomorrow',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise,
          {
            id: 'future-2-10',
            type: 'sentence-builder',
            question: 'Arrange: not / going / They / to / are / come',
            correctAnswer: 'They are not going to come',
            words: ['They', 'are', 'not', 'going', 'to', 'come']
          } as SentenceBuilderExercise
        ]
      }
    ]
  },
  {
    id: 'unit-5',
    title: 'Modal Verbs',
    titleUz: 'Modal fe\'llar',
    description: 'Express ability, permission, and obligation',
    descriptionUz: 'Qobiliyat, ruxsat va majburiyat',
    icon: '🎭',
    order: 5,
    lessons: [
      {
        id: 'modal-1',
        title: 'Can / Could - Ability',
        titleUz: 'Can / Could - Qobiliyat',
        description: 'Express ability and possibility',
        descriptionUz: 'Qobiliyat va imkoniyat',
        difficulty: 'beginner',
        category: 'grammar',
        xpReward: 10,
        estimatedTime: 5,
        icon: '💪',
        exercises: [
          {
            id: 'modal-1-1',
            type: 'multiple-choice',
            question: 'I ___ speak English.',
            correctAnswer: 'can',
            options: ['can', 'could', 'must', 'should'],
            explanation: 'Can expresses present ability'
          } as MultipleChoiceExercise,
          {
            id: 'modal-1-2',
            type: 'fill-in-blank',
            question: 'She ___ swim very well.',
            sentence: 'She ___ swim very well.',
            correctAnswer: 'can',
            acceptableAnswers: ['can']
          } as FillInBlankExercise,
          {
            id: 'modal-1-3',
            type: 'multiple-choice',
            question: 'When I was young, I ___ run fast.',
            correctAnswer: 'could',
            options: ['can', 'could', 'must', 'should'],
            explanation: 'Could expresses past ability'
          } as MultipleChoiceExercise,
          {
            id: 'modal-1-4',
            type: 'fill-in-blank',
            question: '___ you help me?',
            sentence: '___ you help me?',
            correctAnswer: 'Can',
            acceptableAnswers: ['Can', 'Could']
          } as FillInBlankExercise,
          {
            id: 'modal-1-5',
            type: 'multiple-choice',
            question: 'He ___ play the guitar.',
            correctAnswer: 'can',
            options: ['can', 'must', 'should', 'may']
          } as MultipleChoiceExercise,
          {
            id: 'modal-1-6',
            type: 'sentence-builder',
            question: 'Arrange: speak / languages / can / She / three',
            correctAnswer: 'She can speak three languages',
            words: ['She', 'can', 'speak', 'three', 'languages']
          } as SentenceBuilderExercise,
          {
            id: 'modal-1-7',
            type: 'fill-in-blank',
            question: 'We ___ not see anything.',
            sentence: 'We ___ not see anything.',
            correctAnswer: 'could',
            acceptableAnswers: ['could', 'can']
          } as FillInBlankExercise,
          {
            id: 'modal-1-8',
            type: 'multiple-choice',
            question: '___ you ride a bike?',
            correctAnswer: 'Can',
            options: ['Can', 'Must', 'Should', 'Have']
          } as MultipleChoiceExercise,
          {
            id: 'modal-1-9',
            type: 'translation',
            question: 'Translate: Men suzishni bilaman',
            correctAnswer: 'I can swim',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise,
          {
            id: 'modal-1-10',
            type: 'fill-in-blank',
            question: 'They ___ solve the problem.',
            sentence: 'They ___ solve the problem.',
            correctAnswer: 'can',
            acceptableAnswers: ['can', 'could']
          } as FillInBlankExercise
        ]
      },
      {
        id: 'modal-2',
        title: 'Must / Have to - Obligation',
        titleUz: 'Must / Have to - Majburiyat',
        description: 'Express necessity and obligation',
        descriptionUz: 'Zaruriyat va majburiyat',
        difficulty: 'intermediate',
        category: 'grammar',
        xpReward: 12,
        estimatedTime: 6,
        icon: '⚖️',
        exercises: [
          {
            id: 'modal-2-1',
            type: 'multiple-choice',
            question: 'You ___ wear a seatbelt.',
            correctAnswer: 'must',
            options: ['must', 'can', 'may', 'could'],
            explanation: 'Must expresses strong obligation'
          } as MultipleChoiceExercise,
          {
            id: 'modal-2-2',
            type: 'fill-in-blank',
            question: 'I ___ go to work tomorrow.',
            sentence: 'I ___ go to work tomorrow.',
            correctAnswer: 'have to',
            acceptableAnswers: ['have to', 'must']
          } as FillInBlankExercise,
          {
            id: 'modal-2-3',
            type: 'multiple-choice',
            question: 'She ___ study for the exam.',
            correctAnswer: 'must',
            options: ['must', 'can', 'may', 'could']
          } as MultipleChoiceExercise,
          {
            id: 'modal-2-4',
            type: 'sentence-builder',
            question: 'Arrange: You / be / on / must / time',
            correctAnswer: 'You must be on time',
            words: ['You', 'must', 'be', 'on', 'time']
          } as SentenceBuilderExercise,
          {
            id: 'modal-2-5',
            type: 'fill-in-blank',
            question: 'We ___ pay taxes.',
            sentence: 'We ___ pay taxes.',
            correctAnswer: 'have to',
            acceptableAnswers: ['have to', 'must']
          } as FillInBlankExercise,
          {
            id: 'modal-2-6',
            type: 'multiple-choice',
            question: 'He ___ finish his homework.',
            correctAnswer: 'has to',
            options: ['must', 'has to', 'can', 'should']
          } as MultipleChoiceExercise,
          {
            id: 'modal-2-7',
            type: 'fill-in-blank',
            question: 'You ___ not smoke here.',
            sentence: 'You ___ not smoke here.',
            correctAnswer: 'must',
            acceptableAnswers: ['must', 'can']
          } as FillInBlankExercise,
          {
            id: 'modal-2-8',
            type: 'multiple-choice',
            question: 'They ___ arrive early.',
            correctAnswer: 'must',
            options: ['must', 'can', 'may', 'could']
          } as MultipleChoiceExercise,
          {
            id: 'modal-2-9',
            type: 'translation',
            question: 'Translate: Men bu ishni qilishim kerak',
            correctAnswer: 'I must do this work',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise,
          {
            id: 'modal-2-10',
            type: 'sentence-builder',
            question: 'Arrange: to / doesn\'t / She / work / have',
            correctAnswer: 'She doesn\'t have to work',
            words: ['She', 'doesn\'t', 'have', 'to', 'work']
          } as SentenceBuilderExercise
        ]
      },
      {
        id: 'modal-3',
        title: 'Should / Ought to - Advice',
        titleUz: 'Should / Ought to - Maslahat',
        description: 'Give advice and recommendations',
        descriptionUz: 'Maslahat va tavsiyalar berish',
        difficulty: 'intermediate',
        category: 'grammar',
        xpReward: 12,
        estimatedTime: 6,
        icon: '💡',
        exercises: [
          {
            id: 'modal-3-1',
            type: 'multiple-choice',
            question: 'You ___ see a doctor.',
            correctAnswer: 'should',
            options: ['should', 'must', 'can', 'may'],
            explanation: 'Should is used for advice'
          } as MultipleChoiceExercise,
          {
            id: 'modal-3-2',
            type: 'fill-in-blank',
            question: 'He ___ eat healthier.',
            sentence: 'He ___ eat healthier.',
            correctAnswer: 'should',
            acceptableAnswers: ['should', 'ought to']
          } as FillInBlankExercise,
          {
            id: 'modal-3-3',
            type: 'multiple-choice',
            question: 'We ___ leave now.',
            correctAnswer: 'should',
            options: ['should', 'must', 'can', 'will']
          } as MultipleChoiceExercise,
          {
            id: 'modal-3-4',
            type: 'sentence-builder',
            question: 'Arrange: should / You / more / exercise',
            correctAnswer: 'You should exercise more',
            words: ['You', 'should', 'exercise', 'more']
          } as SentenceBuilderExercise,
          {
            id: 'modal-3-5',
            type: 'fill-in-blank',
            question: 'She ___ study harder.',
            sentence: 'She ___ study harder.',
            correctAnswer: 'should',
            acceptableAnswers: ['should', 'ought to']
          } as FillInBlankExercise,
          {
            id: 'modal-3-6',
            type: 'multiple-choice',
            question: 'They ___ not waste money.',
            correctAnswer: 'should',
            options: ['should', 'must', 'can', 'will']
          } as MultipleChoiceExercise,
          {
            id: 'modal-3-7',
            type: 'fill-in-blank',
            question: '___ I call him?',
            sentence: '___ I call him?',
            correctAnswer: 'Should',
            acceptableAnswers: ['Should']
          } as FillInBlankExercise,
          {
            id: 'modal-3-8',
            type: 'multiple-choice',
            question: 'You ___ be more careful.',
            correctAnswer: 'should',
            options: ['should', 'must', 'can', 'will']
          } as MultipleChoiceExercise,
          {
            id: 'modal-3-9',
            type: 'translation',
            question: 'Translate: Siz dam olishingiz kerak',
            correctAnswer: 'You should rest',
            sourceLanguage: 'uz',
            targetLanguage: 'en'
          } as TranslationExercise,
          {
            id: 'modal-3-10',
            type: 'sentence-builder',
            question: 'Arrange: ought / We / to / early / arrive',
            correctAnswer: 'We ought to arrive early',
            words: ['We', 'ought', 'to', 'arrive', 'early']
          } as SentenceBuilderExercise
        ]
      }
    ]
  }
];

// Helper function to get lesson by ID
export function getLessonById(lessonId: string): Lesson | undefined {
  for (const unit of grammarUnits) {
    const lesson = unit.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

// Helper function to get unit by ID
export function getUnitById(unitId: string): Unit | undefined {
  return grammarUnits.find(u => u.id === unitId);
}

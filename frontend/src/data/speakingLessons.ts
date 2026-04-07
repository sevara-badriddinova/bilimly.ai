import type { Lesson, SpeakingExercise } from '../types/lesson';

// Speaking Lessons with Pronunciation Practice
export const speakingLessons: Lesson[] = [
  {
    id: 'speak-basics-1',
    title: 'Basic Greetings',
    titleUz: 'Asosiy salomlar',
    description: 'Practice common greetings and introductions',
    descriptionUz: 'Keng tarqalgan salomlar va tanishishni mashq qiling',
    difficulty: 'beginner',
    category: 'speaking',
    xpReward: 15,
    estimatedTime: 10,
    icon: '👋',
    exercises: [
      {
        id: 'speak-1-1',
        type: 'speaking',
        question: 'Say: Hello, how are you?',
        questionUz: 'Ayting: Salom, qalaysiz?',
        targetPhrase: 'Hello, how are you?',
        correctAnswer: 'Hello, how are you?',
        phoneticSpelling: '/həˈloʊ, haʊ ɑːr juː/',
        explanation: 'Common greeting to ask about someone\'s wellbeing',
        explanationUz: 'Birovning ahvolini so\'rash uchun keng tarqalgan salom'
      } as SpeakingExercise,
      {
        id: 'speak-1-2',
        type: 'speaking',
        question: 'Say: Good morning!',
        questionUz: 'Ayting: Xayrli tong!',
        targetPhrase: 'Good morning!',
        correctAnswer: 'Good morning!',
        phoneticSpelling: '/ɡʊd ˈmɔːrnɪŋ/',
        explanation: 'Greeting used before noon',
        explanationUz: 'Tushgacha ishlatiladigan salom'
      } as SpeakingExercise,
      {
        id: 'speak-1-3',
        type: 'speaking',
        question: 'Say: Good evening!',
        questionUz: 'Ayting: Xayrli kech!',
        targetPhrase: 'Good evening!',
        correctAnswer: 'Good evening!',
        phoneticSpelling: '/ɡʊd ˈiːvnɪŋ/',
        explanation: 'Greeting used after 6 PM',
        explanationUz: 'Soat 6dan keyin ishlatiladigan salom'
      } as SpeakingExercise,
      {
        id: 'speak-1-4',
        type: 'speaking',
        question: 'Say: Nice to meet you.',
        questionUz: 'Ayting: Tanishganimdan xursandman.',
        targetPhrase: 'Nice to meet you.',
        correctAnswer: 'Nice to meet you.',
        phoneticSpelling: '/naɪs tuː miːt juː/',
        explanation: 'Used when meeting someone for the first time',
        explanationUz: 'Biror kishi bilan birinchi marta uchrashganda ishlatiladi'
      } as SpeakingExercise,
      {
        id: 'speak-1-5',
        type: 'speaking',
        question: 'Say: My name is...',
        questionUz: 'Ayting: Mening ismim...',
        targetPhrase: 'My name is John.',
        correctAnswer: 'My name is',
        phoneticSpelling: '/maɪ neɪm ɪz/',
        explanation: 'Introducing yourself',
        explanationUz: 'O\'zingizni tanishtirishda'
      } as SpeakingExercise
    ]
  },
  {
    id: 'speak-basics-2',
    title: 'Common Questions',
    titleUz: 'Keng tarqalgan savollar',
    description: 'Practice asking everyday questions',
    descriptionUz: 'Kundalik savollarni mashq qiling',
    difficulty: 'beginner',
    category: 'speaking',
    xpReward: 15,
    estimatedTime: 10,
    icon: '❓',
    exercises: [
      {
        id: 'speak-2-1',
        type: 'speaking',
        question: 'Say: Where is the bathroom?',
        questionUz: 'Ayting: Hammom qayerda?',
        targetPhrase: 'Where is the bathroom?',
        correctAnswer: 'Where is the bathroom?',
        phoneticSpelling: '/wer ɪz ðə ˈbæθruːm/',
        explanation: 'Asking for directions to the bathroom'
      } as SpeakingExercise,
      {
        id: 'speak-2-2',
        type: 'speaking',
        question: 'Say: How much does it cost?',
        questionUz: 'Ayting: Bu qancha turadi?',
        targetPhrase: 'How much does it cost?',
        correctAnswer: 'How much does it cost?',
        phoneticSpelling: '/haʊ mʌtʃ dʌz ɪt kɔːst/',
        explanation: 'Asking about the price'
      } as SpeakingExercise,
      {
        id: 'speak-2-3',
        type: 'speaking',
        question: 'Say: Can you help me?',
        questionUz: 'Ayting: Menga yordam bera olasizmi?',
        targetPhrase: 'Can you help me?',
        correctAnswer: 'Can you help me?',
        phoneticSpelling: '/kæn juː help miː/',
        explanation: 'Politely asking for help'
      } as SpeakingExercise,
      {
        id: 'speak-2-4',
        type: 'speaking',
        question: 'Say: What time is it?',
        questionUz: 'Ayting: Soat necha bo\'ldi?',
        targetPhrase: 'What time is it?',
        correctAnswer: 'What time is it?',
        phoneticSpelling: '/wʌt taɪm ɪz ɪt/',
        explanation: 'Asking about the current time'
      } as SpeakingExercise,
      {
        id: 'speak-2-5',
        type: 'speaking',
        question: 'Say: Do you speak English?',
        questionUz: 'Ayting: Siz inglizcha gapira olasizmi?',
        targetPhrase: 'Do you speak English?',
        correctAnswer: 'Do you speak English?',
        phoneticSpelling: '/duː juː spiːk ˈɪŋɡlɪʃ/',
        explanation: 'Asking if someone speaks English'
      } as SpeakingExercise
    ]
  },
  {
    id: 'speak-phonics-1',
    title: 'Vowel Sounds',
    titleUz: 'Unli tovushlar',
    description: 'Practice English vowel pronunciation',
    descriptionUz: 'Ingliz unli tovushlarini mashq qiling',
    difficulty: 'intermediate',
    category: 'speaking',
    xpReward: 20,
    estimatedTime: 15,
    icon: '🗣️',
    exercises: [
      {
        id: 'speak-3-1',
        type: 'speaking',
        question: 'Say: sheep (long ee sound)',
        questionUz: 'Ayting: sheep (uzun ee tovush)',
        targetPhrase: 'sheep',
        correctAnswer: 'sheep',
        phoneticSpelling: '/ʃiːp/',
        explanation: 'Long /iː/ sound as in sheep, see, tree'
      } as SpeakingExercise,
      {
        id: 'speak-3-2',
        type: 'speaking',
        question: 'Say: ship (short i sound)',
        questionUz: 'Ayting: ship (qisqa i tovush)',
        targetPhrase: 'ship',
        correctAnswer: 'ship',
        phoneticSpelling: '/ʃɪp/',
        explanation: 'Short /ɪ/ sound as in ship, sit, big'
      } as SpeakingExercise,
      {
        id: 'speak-3-3',
        type: 'speaking',
        question: 'Say: cat (short a sound)',
        questionUz: 'Ayting: cat (qisqa a tovush)',
        targetPhrase: 'cat',
        correctAnswer: 'cat',
        phoneticSpelling: '/kæt/',
        explanation: 'Short /æ/ sound as in cat, hat, bad'
      } as SpeakingExercise,
      {
        id: 'speak-3-4',
        type: 'speaking',
        question: 'Say: father (long a sound)',
        questionUz: 'Ayting: father (uzun a tovush)',
        targetPhrase: 'father',
        correctAnswer: 'father',
        phoneticSpelling: '/ˈfɑːðər/',
        explanation: 'Long /ɑː/ sound as in father, car, park'
      } as SpeakingExercise,
      {
        id: 'speak-3-5',
        type: 'speaking',
        question: 'Say: book (short u sound)',
        questionUz: 'Ayting: book (qisqa u tovush)',
        targetPhrase: 'book',
        correctAnswer: 'book',
        phoneticSpelling: '/bʊk/',
        explanation: 'Short /ʊ/ sound as in book, look, good'
      } as SpeakingExercise
    ]
  },
  {
    id: 'speak-restaurant-1',
    title: 'At a Restaurant',
    titleUz: 'Restoranda',
    description: 'Practice ordering food and drinks',
    descriptionUz: 'Ovqat va ichimlik buyurtma qilishni mashq qiling',
    difficulty: 'intermediate',
    category: 'speaking',
    xpReward: 20,
    estimatedTime: 12,
    icon: '🍽️',
    exercises: [
      {
        id: 'speak-4-1',
        type: 'speaking',
        question: 'Say: I would like a table for two, please.',
        questionUz: 'Ayting: Iltimos, ikki kishilik stol.',
        targetPhrase: 'I would like a table for two, please.',
        correctAnswer: 'I would like a table for two, please.',
        phoneticSpelling: '/aɪ wʊd laɪk ə ˈteɪbl fɔːr tuː pliːz/',
        explanation: 'Requesting a table at a restaurant'
      } as SpeakingExercise,
      {
        id: 'speak-4-2',
        type: 'speaking',
        question: 'Say: Can I see the menu?',
        questionUz: 'Ayting: Menyuni ko\'rsam bo\'ladimi?',
        targetPhrase: 'Can I see the menu?',
        correctAnswer: 'Can I see the menu?',
        phoneticSpelling: '/kæn aɪ siː ðə ˈmenjuː/',
        explanation: 'Asking to see the menu'
      } as SpeakingExercise,
      {
        id: 'speak-4-3',
        type: 'speaking',
        question: 'Say: I\'ll have the chicken, please.',
        questionUz: 'Ayting: Iltimos, tovuq olib beraveringlar.',
        targetPhrase: 'I\'ll have the chicken, please.',
        correctAnswer: 'I\'ll have the chicken, please.',
        phoneticSpelling: '/aɪl hæv ðə ˈtʃɪkɪn pliːz/',
        explanation: 'Ordering food'
      } as SpeakingExercise,
      {
        id: 'speak-4-4',
        type: 'speaking',
        question: 'Say: Could I have the bill, please?',
        questionUz: 'Ayting: Iltimos, hisobni olib kelsangiz?',
        targetPhrase: 'Could I have the bill, please?',
        correctAnswer: 'Could I have the bill, please?',
        phoneticSpelling: '/kʊd aɪ hæv ðə bɪl pliːz/',
        explanation: 'Requesting the check'
      } as SpeakingExercise,
      {
        id: 'speak-4-5',
        type: 'speaking',
        question: 'Say: The food was delicious!',
        questionUz: 'Ayting: Ovqat juda mazali edi!',
        targetPhrase: 'The food was delicious!',
        correctAnswer: 'The food was delicious!',
        phoneticSpelling: '/ðə fuːd wʌz dɪˈlɪʃəs/',
        explanation: 'Complimenting the food'
      } as SpeakingExercise
    ]
  },
  {
    id: 'speak-directions-1',
    title: 'Asking for Directions',
    titleUz: 'Yo\'l so\'rash',
    description: 'Practice asking and giving directions',
    descriptionUz: 'Yo\'l so\'rash va ko\'rsatishni mashq qiling',
    difficulty: 'intermediate',
    category: 'speaking',
    xpReward: 20,
    estimatedTime: 12,
    icon: '🗺️',
    exercises: [
      {
        id: 'speak-5-1',
        type: 'speaking',
        question: 'Say: Excuse me, where is the train station?',
        questionUz: 'Ayting: Kechirasiz, poyezd vokzali qayerda?',
        targetPhrase: 'Excuse me, where is the train station?',
        correctAnswer: 'Excuse me, where is the train station?',
        phoneticSpelling: '/ɪkˈskjuːz miː wer ɪz ðə treɪn ˈsteɪʃn/',
        explanation: 'Politely asking for directions'
      } as SpeakingExercise,
      {
        id: 'speak-5-2',
        type: 'speaking',
        question: 'Say: Go straight and turn left.',
        questionUz: 'Ayting: To\'g\'ri boring va chapga buriling.',
        targetPhrase: 'Go straight and turn left.',
        correctAnswer: 'Go straight and turn left.',
        phoneticSpelling: '/ɡoʊ streɪt ænd tɜːrn left/',
        explanation: 'Giving basic directions'
      } as SpeakingExercise,
      {
        id: 'speak-5-3',
        type: 'speaking',
        question: 'Say: It\'s on your right.',
        questionUz: 'Ayting: U sizning o\'ng tomoningizda.',
        targetPhrase: 'It\'s on your right.',
        correctAnswer: 'It\'s on your right.',
        phoneticSpelling: '/ɪts ɑːn jɔːr raɪt/',
        explanation: 'Indicating location'
      } as SpeakingExercise,
      {
        id: 'speak-5-4',
        type: 'speaking',
        question: 'Say: How far is it?',
        questionUz: 'Ayting: U qanchalik uzoqda?',
        targetPhrase: 'How far is it?',
        correctAnswer: 'How far is it?',
        phoneticSpelling: '/haʊ fɑːr ɪz ɪt/',
        explanation: 'Asking about distance'
      } as SpeakingExercise,
      {
        id: 'speak-5-5',
        type: 'speaking',
        question: 'Say: It\'s about ten minutes walk.',
        questionUz: 'Ayting: Taxminan o\'n daqiqalik piyoda yo\'l.',
        targetPhrase: 'It\'s about ten minutes walk.',
        correctAnswer: 'It\'s about ten minutes walk.',
        phoneticSpelling: '/ɪts əˈbaʊt ten ˈmɪnɪts wɔːk/',
        explanation: 'Describing walking distance'
      } as SpeakingExercise
    ]
  },
  {
    id: 'speak-shopping-1',
    title: 'Shopping Phrases',
    titleUz: 'Xarid iboralari',
    description: 'Practice shopping conversations',
    descriptionUz: 'Xarid qilish suhbatlarini mashq qiling',
    difficulty: 'intermediate',
    category: 'speaking',
    xpReward: 20,
    estimatedTime: 12,
    icon: '🛍️',
    exercises: [
      {
        id: 'speak-6-1',
        type: 'speaking',
        question: 'Say: How much is this?',
        questionUz: 'Ayting: Bu qancha turadi?',
        targetPhrase: 'How much is this?',
        correctAnswer: 'How much is this?',
        phoneticSpelling: '/haʊ mʌtʃ ɪz ðɪs/',
        explanation: 'Asking about price'
      } as SpeakingExercise,
      {
        id: 'speak-6-2',
        type: 'speaking',
        question: 'Say: Can I try it on?',
        questionUz: 'Ayting: Kiyib ko\'rsam bo\'ladimi?',
        targetPhrase: 'Can I try it on?',
        correctAnswer: 'Can I try it on?',
        phoneticSpelling: '/kæn aɪ traɪ ɪt ɑːn/',
        explanation: 'Asking to try clothes'
      } as SpeakingExercise,
      {
        id: 'speak-6-3',
        type: 'speaking',
        question: 'Say: Do you have this in a smaller size?',
        questionUz: 'Ayting: Bundan kichikroq o\'lchami bormi?',
        targetPhrase: 'Do you have this in a smaller size?',
        correctAnswer: 'Do you have this in a smaller size?',
        phoneticSpelling: '/duː juː hæv ðɪs ɪn ə ˈsmɔːlər saɪz/',
        explanation: 'Asking for different sizes'
      } as SpeakingExercise,
      {
        id: 'speak-6-4',
        type: 'speaking',
        question: 'Say: I\'ll take it.',
        questionUz: 'Ayting: Men buni olaman.',
        targetPhrase: 'I\'ll take it.',
        correctAnswer: 'I\'ll take it.',
        phoneticSpelling: '/aɪl teɪk ɪt/',
        explanation: 'Deciding to buy something'
      } as SpeakingExercise,
      {
        id: 'speak-6-5',
        type: 'speaking',
        question: 'Say: Do you accept credit cards?',
        questionUz: 'Ayting: Kredit karta qabul qilasizmi?',
        targetPhrase: 'Do you accept credit cards?',
        correctAnswer: 'Do you accept credit cards?',
        phoneticSpelling: '/duː juː əkˈsept ˈkredɪt kɑːrdz/',
        explanation: 'Asking about payment methods'
      } as SpeakingExercise
    ]
  },
  {
    id: 'speak-phone-1',
    title: 'Phone Conversations',
    titleUz: 'Telefon suhbatlari',
    description: 'Practice talking on the phone',
    descriptionUz: 'Telefonda gapirashni mashq qiling',
    difficulty: 'advanced',
    category: 'speaking',
    xpReward: 25,
    estimatedTime: 15,
    icon: '📞',
    exercises: [
      {
        id: 'speak-7-1',
        type: 'speaking',
        question: 'Say: Hello, may I speak to John?',
        questionUz: 'Ayting: Salom, Jon bilan gaplasha olamanmi?',
        targetPhrase: 'Hello, may I speak to John?',
        correctAnswer: 'Hello, may I speak to John?',
        phoneticSpelling: '/həˈloʊ meɪ aɪ spiːk tuː dʒɑːn/',
        explanation: 'Asking to speak with someone'
      } as SpeakingExercise,
      {
        id: 'speak-7-2',
        type: 'speaking',
        question: 'Say: Could you speak more slowly, please?',
        questionUz: 'Ayting: Iltimos, sekinroq gapira olasizmi?',
        targetPhrase: 'Could you speak more slowly, please?',
        correctAnswer: 'Could you speak more slowly, please?',
        phoneticSpelling: '/kʊd juː spiːk mɔːr ˈsloʊli pliːz/',
        explanation: 'Asking someone to slow down'
      } as SpeakingExercise,
      {
        id: 'speak-7-3',
        type: 'speaking',
        question: 'Say: I\'m calling about the job position.',
        questionUz: 'Ayting: Men ish o\'rni haqida qo\'ng\'iroq qilyapman.',
        targetPhrase: 'I\'m calling about the job position.',
        correctAnswer: 'I\'m calling about the job position.',
        phoneticSpelling: '/aɪm ˈkɔːlɪŋ əˈbaʊt ðə dʒɑːb pəˈzɪʃn/',
        explanation: 'Stating reason for calling'
      } as SpeakingExercise,
      {
        id: 'speak-7-4',
        type: 'speaking',
        question: 'Say: Can I leave a message?',
        questionUz: 'Ayting: Xabar qoldirsam bo\'ladimi?',
        targetPhrase: 'Can I leave a message?',
        correctAnswer: 'Can I leave a message?',
        phoneticSpelling: '/kæn aɪ liːv ə ˈmesɪdʒ/',
        explanation: 'Offering to leave a message'
      } as SpeakingExercise,
      {
        id: 'speak-7-5',
        type: 'speaking',
        question: 'Say: Thank you for calling.',
        questionUz: 'Ayting: Qo\'ng\'iroq qilganingiz uchun rahmat.',
        targetPhrase: 'Thank you for calling.',
        correctAnswer: 'Thank you for calling.',
        phoneticSpelling: '/θæŋk juː fɔːr ˈkɔːlɪŋ/',
        explanation: 'Ending a phone call politely'
      } as SpeakingExercise
    ]
  }
];

// Helper function
export function getSpeakingLessonById(id: string): Lesson | undefined {
  return speakingLessons.find(lesson => lesson.id === id);
}

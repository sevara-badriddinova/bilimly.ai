import type { Lesson, ListeningExercise, MultipleChoiceExercise } from '../types/lesson';

// Listening Lessons (Note: audioUrl would be actual audio file paths in production)
export const listeningLessons: Lesson[] = [
  {
    id: 'listen-intro-1',
    title: 'Simple Introductions',
    titleUz: 'Oddiy tanishuvlar',
    description: 'Listen to people introducing themselves',
    descriptionUz: 'Odamlarning o\'zlarini tanishtirishini tinglang',
    difficulty: 'beginner',
    category: 'listening',
    xpReward: 15,
    estimatedTime: 8,
    icon: '👂',
    exercises: [
      {
        id: 'listen-1-1',
        type: 'listening',
        question: 'Listen and answer: What is the person\'s name?',
        questionUz: 'Tinglang va javob bering: Bu odamning ismi nima?',
        audioUrl: '/audio/intro1.mp3', // Placeholder
        transcript: 'Hello, my name is Sarah. I am from London.',
        correctAnswer: 'Sarah',
        options: ['Sarah', 'Susan', 'Sandra', 'Samantha'],
        explanation: 'The speaker says "my name is Sarah"'
      } as ListeningExercise,
      {
        id: 'listen-1-2',
        type: 'listening',
        question: 'Where is Sarah from?',
        questionUz: 'Sarah qayerdan?',
        audioUrl: '/audio/intro1.mp3',
        transcript: 'Hello, my name is Sarah. I am from London.',
        correctAnswer: 'London',
        options: ['London', 'Paris', 'New York', 'Berlin'],
        explanation: 'She says "I am from London"'
      } as ListeningExercise,
      {
        id: 'listen-1-3',
        type: 'listening',
        question: 'What is his job?',
        questionUz: 'Uning ish joyi nima?',
        audioUrl: '/audio/intro2.mp3',
        transcript: 'Hi, I\'m David. I work as a teacher in Manchester.',
        correctAnswer: 'Teacher',
        options: ['Teacher', 'Doctor', 'Engineer', 'Student'],
        explanation: 'He says "I work as a teacher"'
      } as ListeningExercise,
      {
        id: 'listen-1-4',
        type: 'listening',
        question: 'Where does David work?',
        questionUz: 'David qayerda ishlaydi?',
        audioUrl: '/audio/intro2.mp3',
        transcript: 'Hi, I\'m David. I work as a teacher in Manchester.',
        correctAnswer: 'Manchester',
        options: ['Manchester', 'Liverpool', 'Birmingham', 'Leeds'],
        explanation: 'He mentions working "in Manchester"'
      } as ListeningExercise,
      {
        id: 'listen-1-5',
        type: 'listening',
        question: 'How old is Emma?',
        questionUz: 'Emma necha yoshda?',
        audioUrl: '/audio/intro3.mp3',
        transcript: 'My name is Emma and I am twenty-five years old.',
        correctAnswer: '25',
        options: ['23', '24', '25', '26'],
        explanation: 'She clearly states "twenty-five years old"'
      } as ListeningExercise
    ]
  },
  {
    id: 'listen-daily-1',
    title: 'Daily Routines',
    titleUz: 'Kundalik rejalar',
    description: 'Understand people talking about their day',
    descriptionUz: 'Odamlar kunlari haqida gapirganini tushunish',
    difficulty: 'beginner',
    category: 'listening',
    xpReward: 15,
    estimatedTime: 10,
    icon: '📅',
    exercises: [
      {
        id: 'listen-2-1',
        type: 'listening',
        question: 'What time does John wake up?',
        questionUz: 'John soat nechada uyg\'onadi?',
        audioUrl: '/audio/routine1.mp3',
        transcript: 'I usually wake up at seven o\'clock in the morning.',
        correctAnswer: '7:00 AM',
        options: ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM'],
        explanation: 'He says "seven o\'clock in the morning"'
      } as ListeningExercise,
      {
        id: 'listen-2-2',
        type: 'listening',
        question: 'What does she eat for breakfast?',
        questionUz: 'U nonushtaga nima yeydi?',
        audioUrl: '/audio/routine2.mp3',
        transcript: 'For breakfast, I always have toast and coffee.',
        correctAnswer: 'Toast and coffee',
        options: ['Toast and coffee', 'Eggs and tea', 'Cereal and milk', 'Fruit and juice'],
        explanation: 'She mentions "toast and coffee"'
      } as ListeningExercise,
      {
        id: 'listen-2-3',
        type: 'listening',
        question: 'How does he go to work?',
        questionUz: 'U ishga qanday boradi?',
        audioUrl: '/audio/routine3.mp3',
        transcript: 'I take the bus to work every day. It takes about thirty minutes.',
        correctAnswer: 'By bus',
        options: ['By bus', 'By car', 'By train', 'On foot'],
        explanation: 'He says "I take the bus to work"'
      } as ListeningExercise,
      {
        id: 'listen-2-4',
        type: 'listening',
        question: 'What does she do in the evening?',
        questionUz: 'U kechqurun nima qiladi?',
        audioUrl: '/audio/routine4.mp3',
        transcript: 'In the evening, I like to watch TV and relax.',
        correctAnswer: 'Watch TV',
        options: ['Watch TV', 'Read books', 'Exercise', 'Cook dinner'],
        explanation: 'She says "I like to watch TV"'
      } as ListeningExercise,
      {
        id: 'listen-2-5',
        type: 'listening',
        question: 'When does he go to bed?',
        questionUz: 'U soat nechada uxlaydi?',
        audioUrl: '/audio/routine5.mp3',
        transcript: 'I usually go to bed around eleven at night.',
        correctAnswer: '11:00 PM',
        options: ['10:00 PM', '11:00 PM', '12:00 AM', '1:00 AM'],
        explanation: 'He says "around eleven at night"'
      } as ListeningExercise
    ]
  },
  {
    id: 'listen-shop-1',
    title: 'At the Store',
    titleUz: 'Do\'konda',
    description: 'Listen to shopping conversations',
    descriptionUz: 'Xarid suhbatlarini tinglang',
    difficulty: 'intermediate',
    category: 'listening',
    xpReward: 20,
    estimatedTime: 12,
    icon: '🛒',
    exercises: [
      {
        id: 'listen-3-1',
        type: 'listening',
        question: 'How much is the shirt?',
        questionUz: 'Ko\'ylak qancha turadi?',
        audioUrl: '/audio/shop1.mp3',
        transcript: 'Customer: How much is this shirt? Clerk: It\'s twenty-five pounds.',
        correctAnswer: '£25',
        options: ['£15', '£20', '£25', '£30'],
        explanation: 'The clerk says "twenty-five pounds"'
      } as ListeningExercise,
      {
        id: 'listen-3-2',
        type: 'listening',
        question: 'What size does she need?',
        questionUz: 'U qanday o\'lcham kerak?',
        audioUrl: '/audio/shop2.mp3',
        transcript: 'Do you have this in a medium size?',
        correctAnswer: 'Medium',
        options: ['Small', 'Medium', 'Large', 'Extra Large'],
        explanation: 'She asks for "a medium size"'
      } as ListeningExercise,
      {
        id: 'listen-3-3',
        type: 'listening',
        question: 'What color does he want?',
        questionUz: 'U qanday rang xohlaydi?',
        audioUrl: '/audio/shop3.mp3',
        transcript: 'I\'m looking for a blue jacket.',
        correctAnswer: 'Blue',
        options: ['Black', 'Blue', 'Red', 'Green'],
        explanation: 'He specifically mentions "a blue jacket"'
      } as ListeningExercise,
      {
        id: 'listen-3-4',
        type: 'listening',
        question: 'Is there a discount?',
        questionUz: 'Chegirma bormi?',
        audioUrl: '/audio/shop4.mp3',
        transcript: 'Yes, there\'s a twenty percent discount today.',
        correctAnswer: 'Yes, 20%',
        options: ['No discount', 'Yes, 10%', 'Yes, 20%', 'Yes, 30%'],
        explanation: 'The speaker mentions "twenty percent discount"'
      } as ListeningExercise,
      {
        id: 'listen-3-5',
        type: 'listening',
        question: 'How will she pay?',
        questionUz: 'U qanday to\'laydi?',
        audioUrl: '/audio/shop5.mp3',
        transcript: 'I\'ll pay with my credit card, please.',
        correctAnswer: 'Credit card',
        options: ['Cash', 'Credit card', 'Debit card', 'Check'],
        explanation: 'She says "pay with my credit card"'
      } as ListeningExercise
    ]
  },
  {
    id: 'listen-weather-1',
    title: 'Weather Forecast',
    titleUz: 'Ob-havo ma\'lumoti',
    description: 'Listen to weather reports',
    descriptionUz: 'Ob-havo hisobotlarini tinglang',
    difficulty: 'intermediate',
    category: 'listening',
    xpReward: 20,
    estimatedTime: 10,
    icon: '🌤️',
    exercises: [
      {
        id: 'listen-4-1',
        type: 'listening',
        question: 'What will the weather be like tomorrow?',
        questionUz: 'Ertaga ob-havo qanday bo\'ladi?',
        audioUrl: '/audio/weather1.mp3',
        transcript: 'Tomorrow will be sunny with temperatures around twenty degrees.',
        correctAnswer: 'Sunny',
        options: ['Sunny', 'Rainy', 'Cloudy', 'Snowy'],
        explanation: 'The forecast says "sunny"'
      } as ListeningExercise,
      {
        id: 'listen-4-2',
        type: 'listening',
        question: 'What is the temperature?',
        questionUz: 'Harorat qancha?',
        audioUrl: '/audio/weather1.mp3',
        transcript: 'Tomorrow will be sunny with temperatures around twenty degrees.',
        correctAnswer: '20°C',
        options: ['15°C', '20°C', '25°C', '30°C'],
        explanation: 'It mentions "around twenty degrees"'
      } as ListeningExercise,
      {
        id: 'listen-4-3',
        type: 'listening',
        question: 'Will it rain on Saturday?',
        questionUz: 'Shanbada yomg\'ir yog\'adimi?',
        audioUrl: '/audio/weather2.mp3',
        transcript: 'Saturday will bring rain in the afternoon with strong winds.',
        correctAnswer: 'Yes',
        options: ['Yes', 'No', 'Maybe', 'Not mentioned'],
        explanation: 'The forecast says "rain in the afternoon"'
      } as ListeningExercise,
      {
        id: 'listen-4-4',
        type: 'listening',
        question: 'What else is expected on Saturday?',
        questionUz: 'Shanbada yana nima kutilmoqda?',
        audioUrl: '/audio/weather2.mp3',
        transcript: 'Saturday will bring rain in the afternoon with strong winds.',
        correctAnswer: 'Strong winds',
        options: ['Snow', 'Fog', 'Strong winds', 'Sunshine'],
        explanation: 'It also mentions "strong winds"'
      } as ListeningExercise,
      {
        id: 'listen-4-5',
        type: 'listening',
        question: 'What is the weather warning for?',
        questionUz: 'Ob-havo ogohlantirishi nima haqida?',
        audioUrl: '/audio/weather3.mp3',
        transcript: 'There is a weather warning for heavy snow this evening.',
        correctAnswer: 'Heavy snow',
        options: ['Heavy rain', 'Heavy snow', 'Strong winds', 'Thunderstorms'],
        explanation: 'The warning is specifically for "heavy snow"'
      } as ListeningExercise
    ]
  },
  {
    id: 'listen-travel-1',
    title: 'Travel Announcements',
    titleUz: 'Sayohat e\'lonlari',
    description: 'Understand airport and station announcements',
    descriptionUz: 'Aeroport va vokzal e\'lonlarini tushunish',
    difficulty: 'advanced',
    category: 'listening',
    xpReward: 25,
    estimatedTime: 15,
    icon: '✈️',
    exercises: [
      {
        id: 'listen-5-1',
        type: 'listening',
        question: 'What is the flight number?',
        questionUz: 'Parvoz raqami nima?',
        audioUrl: '/audio/travel1.mp3',
        transcript: 'Attention passengers on flight BA207 to Paris.',
        correctAnswer: 'BA207',
        options: ['BA205', 'BA206', 'BA207', 'BA208'],
        explanation: 'The announcement mentions "flight BA207"'
      } as ListeningExercise,
      {
        id: 'listen-5-2',
        type: 'listening',
        question: 'Where is the flight going?',
        questionUz: 'Parvoz qayerga ketmoqda?',
        audioUrl: '/audio/travel1.mp3',
        transcript: 'Attention passengers on flight BA207 to Paris.',
        correctAnswer: 'Paris',
        options: ['London', 'Paris', 'Rome', 'Madrid'],
        explanation: 'The destination is "to Paris"'
      } as ListeningExercise,
      {
        id: 'listen-5-3',
        type: 'listening',
        question: 'What is the boarding gate?',
        questionUz: 'Bortga chiqish eshigi qaysi?',
        audioUrl: '/audio/travel2.mp3',
        transcript: 'Boarding will begin at gate fifteen in twenty minutes.',
        correctAnswer: 'Gate 15',
        options: ['Gate 13', 'Gate 14', 'Gate 15', 'Gate 16'],
        explanation: 'Boarding is at "gate fifteen"'
      } as ListeningExercise,
      {
        id: 'listen-5-4',
        type: 'listening',
        question: 'When does boarding begin?',
        questionUz: 'Bortga chiqish qachon boshlanadi?',
        audioUrl: '/audio/travel2.mp3',
        transcript: 'Boarding will begin at gate fifteen in twenty minutes.',
        correctAnswer: 'In 20 minutes',
        options: ['In 10 minutes', 'In 15 minutes', 'In 20 minutes', 'In 30 minutes'],
        explanation: 'Boarding begins "in twenty minutes"'
      } as ListeningExercise,
      {
        id: 'listen-5-5',
        type: 'listening',
        question: 'What is the train platform number?',
        questionUz: 'Poyezd platformasi raqami nima?',
        audioUrl: '/audio/travel3.mp3',
        transcript: 'The train to Manchester will depart from platform nine.',
        correctAnswer: 'Platform 9',
        options: ['Platform 7', 'Platform 8', 'Platform 9', 'Platform 10'],
        explanation: 'The train departs from "platform nine"'
      } as ListeningExercise
    ]
  },
  {
    id: 'listen-convo-1',
    title: 'Short Conversations',
    titleUz: 'Qisqa suhbatlar',
    description: 'Listen to everyday conversations',
    descriptionUz: 'Kundalik suhbatlarni tinglang',
    difficulty: 'advanced',
    category: 'listening',
    xpReward: 25,
    estimatedTime: 15,
    icon: '💬',
    exercises: [
      {
        id: 'listen-6-1',
        type: 'listening',
        question: 'Why is John calling?',
        questionUz: 'John nima uchun qo\'ng\'iroq qilyapti?',
        audioUrl: '/audio/convo1.mp3',
        transcript: 'Hi Sarah, it\'s John. I\'m calling to ask if you want to meet for coffee tomorrow.',
        correctAnswer: 'To invite her for coffee',
        options: ['To invite her for coffee', 'To cancel plans', 'To borrow money', 'To ask for help'],
        explanation: 'He wants to "meet for coffee tomorrow"'
      } as ListeningExercise,
      {
        id: 'listen-6-2',
        type: 'listening',
        question: 'What is the problem?',
        questionUz: 'Muammo nima?',
        audioUrl: '/audio/convo2.mp3',
        transcript: 'I\'m sorry, but I can\'t come to the party because I\'m sick.',
        correctAnswer: 'The person is sick',
        options: ['The person is busy', 'The person is sick', 'The person forgot', 'The person is traveling'],
        explanation: 'The reason given is "because I\'m sick"'
      } as ListeningExercise,
      {
        id: 'listen-6-3',
        type: 'listening',
        question: 'When is the meeting?',
        questionUz: 'Uchrashuv qachon?',
        audioUrl: '/audio/convo3.mp3',
        transcript: 'Don\'t forget, we have a meeting at three o\'clock this afternoon.',
        correctAnswer: '3:00 PM',
        options: ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
        explanation: 'The meeting is "at three o\'clock this afternoon"'
      } as ListeningExercise,
      {
        id: 'listen-6-4',
        type: 'listening',
        question: 'What does she want to order?',
        questionUz: 'U nima buyurtma qilmoqchi?',
        audioUrl: '/audio/convo4.mp3',
        transcript: 'I\'d like to order a large pizza with mushrooms and olives.',
        correctAnswer: 'Pizza with mushrooms and olives',
        options: ['Pizza with cheese', 'Pizza with mushrooms and olives', 'Pasta', 'Sandwich'],
        explanation: 'She orders "pizza with mushrooms and olives"'
      } as ListeningExercise,
      {
        id: 'listen-6-5',
        type: 'listening',
        question: 'How does he feel about the movie?',
        questionUz: 'U film haqida qanday fikrda?',
        audioUrl: '/audio/convo5.mp3',
        transcript: 'I thought the movie was amazing! The acting was superb.',
        correctAnswer: 'He loved it',
        options: ['He hated it', 'He disliked it', 'It was okay', 'He loved it'],
        explanation: 'He says it was "amazing" and "superb"'
      } as ListeningExercise
    ]
  }
];

// Helper function
export function getListeningLessonById(id: string): Lesson | undefined {
  return listeningLessons.find(lesson => lesson.id === id);
}

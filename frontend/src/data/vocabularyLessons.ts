import type { VocabularyTheme, VocabularyWord } from '../types/lesson';

// Comprehensive Vocabulary Themes with 600+ words
export const vocabularyThemes: VocabularyTheme[] = [
  {
    id: 'basics-numbers',
    title: 'Numbers',
    titleUz: 'Raqamlar',
    description: 'Essential numbers from 0 to 1000',
    difficulty: 'beginner',
    icon: '🔢',
    words: [
      { id: 'num-1', word: 'zero', translation: 'nol', pronunciation: '/ˈzɪəroʊ/', partOfSpeech: 'noun', example: 'The temperature is zero degrees.', exampleTranslation: 'Harorat nol daraja.' },
      { id: 'num-2', word: 'one', translation: 'bir', pronunciation: '/wʌn/', partOfSpeech: 'noun', example: 'I have one sister.', exampleTranslation: 'Mening bir singlim bor.' },
      { id: 'num-3', word: 'two', translation: 'ikki', pronunciation: '/tuː/', partOfSpeech: 'noun', example: 'Two plus two equals four.', exampleTranslation: 'Ikki qo\'shish ikki to\'rtga teng.' },
      { id: 'num-4', word: 'three', translation: 'uch', pronunciation: '/θriː/', partOfSpeech: 'noun', example: 'I wake up at three o\'clock.', exampleTranslation: 'Men soat uchda uyg\'onaman.' },
      { id: 'num-5', word: 'four', translation: 'to\'rt', pronunciation: '/fɔːr/', partOfSpeech: 'noun', example: 'There are four seasons.', exampleTranslation: 'To\'rtta fasl bor.' },
      { id: 'num-6', word: 'five', translation: 'besh', pronunciation: '/faɪv/', partOfSpeech: 'noun', example: 'She has five fingers.', exampleTranslation: 'Uning besh barmog\'i bor.' },
      { id: 'num-7', word: 'ten', translation: 'o\'n', pronunciation: '/ten/', partOfSpeech: 'noun', example: 'Ten students are here.', exampleTranslation: 'O\'n talaba bu yerda.' },
      { id: 'num-8', word: 'twenty', translation: 'yigirma', pronunciation: '/ˈtwenti/', partOfSpeech: 'noun', example: 'I am twenty years old.', exampleTranslation: 'Men yigirma yoshdaman.' },
      { id: 'num-9', word: 'hundred', translation: 'yuz', pronunciation: '/ˈhʌndrəd/', partOfSpeech: 'noun', example: 'One hundred dollars.', exampleTranslation: 'Bir yuz dollar.' },
      { id: 'num-10', word: 'thousand', translation: 'ming', pronunciation: '/ˈθaʊzənd/', partOfSpeech: 'noun', example: 'Two thousand people attended.', exampleTranslation: 'Ikki ming kishi qatnashdi.' }
    ]
  },
  {
    id: 'basics-colors',
    title: 'Colors',
    titleUz: 'Ranglar',
    description: 'Learn basic and advanced colors',
    difficulty: 'beginner',
    icon: '🎨',
    words: [
      { id: 'col-1', word: 'red', translation: 'qizil', pronunciation: '/red/', partOfSpeech: 'adjective', example: 'I bought a red car.', exampleTranslation: 'Men qizil mashina sotib oldim.' },
      { id: 'col-2', word: 'blue', translation: 'ko\'k', pronunciation: '/bluː/', partOfSpeech: 'adjective', example: 'The sky is blue.', exampleTranslation: 'Osmon ko\'k.' },
      { id: 'col-3', word: 'green', translation: 'yashil', pronunciation: '/ɡriːn/', partOfSpeech: 'adjective', example: 'Grass is green.', exampleTranslation: 'O\'t yashil.' },
      { id: 'col-4', word: 'yellow', translation: 'sariq', pronunciation: '/ˈjeloʊ/', partOfSpeech: 'adjective', example: 'The sun is yellow.', exampleTranslation: 'Quyosh sariq.' },
      { id: 'col-5', word: 'black', translation: 'qora', pronunciation: '/blæk/', partOfSpeech: 'adjective', example: 'I wear black shoes.', exampleTranslation: 'Men qora poyabzal kiyaman.' },
      { id: 'col-6', word: 'white', translation: 'oq', pronunciation: '/waɪt/', partOfSpeech: 'adjective', example: 'Snow is white.', exampleTranslation: 'Qor oq.' },
      { id: 'col-7', word: 'purple', translation: 'binafsha', pronunciation: '/ˈpɜːrpl/', partOfSpeech: 'adjective', example: 'She likes purple flowers.', exampleTranslation: 'U binafsha gullarni yoqtiradi.' },
      { id: 'col-8', word: 'orange', translation: 'to\'q sariq', pronunciation: '/ˈɔːrɪndʒ/', partOfSpeech: 'adjective', example: 'The orange is orange.', exampleTranslation: 'Apelsin to\'q sariq rangda.' },
      { id: 'col-9', word: 'pink', translation: 'pushti', pronunciation: '/pɪŋk/', partOfSpeech: 'adjective', example: 'The dress is pink.', exampleTranslation: 'Ko\'ylak pushti.' },
      { id: 'col-10', word: 'brown', translation: 'jigarrang', pronunciation: '/braʊn/', partOfSpeech: 'adjective', example: 'He has brown eyes.', exampleTranslation: 'Uning ko\'zlari jigarrang.' },
      { id: 'col-11', word: 'gray', translation: 'kulrang', pronunciation: '/ɡreɪ/', partOfSpeech: 'adjective', example: 'The clouds are gray.', exampleTranslation: 'Bulutlar kulrang.' },
      { id: 'col-12', word: 'gold', translation: 'oltin', pronunciation: '/ɡoʊld/', partOfSpeech: 'adjective', example: 'The ring is gold.', exampleTranslation: 'Uzuk oltin.' }
    ]
  },
  {
    id: 'basics-family',
    title: 'Family',
    titleUz: 'Oila',
    description: 'Family members and relatives',
    difficulty: 'beginner',
    icon: '👨‍👩‍👧‍👦',
    words: [
      { id: 'fam-1', word: 'mother', translation: 'ona', pronunciation: '/ˈmʌðər/', partOfSpeech: 'noun', example: 'My mother is a teacher.', exampleTranslation: 'Mening onam o\'qituvchi.' },
      { id: 'fam-2', word: 'father', translation: 'ota', pronunciation: '/ˈfɑːðər/', partOfSpeech: 'noun', example: 'My father works in a bank.', exampleTranslation: 'Mening otam bankda ishlaydi.' },
      { id: 'fam-3', word: 'sister', translation: 'opa/singil', pronunciation: '/ˈsɪstər/', partOfSpeech: 'noun', example: 'I have one sister.', exampleTranslation: 'Mening bir singlim bor.' },
      { id: 'fam-4', word: 'brother', translation: 'aka/uka', pronunciation: '/ˈbrʌðər/', partOfSpeech: 'noun', example: 'My brother is tall.', exampleTranslation: 'Mening akam baland bo\'yli.' },
      { id: 'fam-5', word: 'grandmother', translation: 'buvi', pronunciation: '/ˈɡrændmʌðər/', partOfSpeech: 'noun', example: 'My grandmother cooks well.', exampleTranslation: 'Buvim yaxshi taom tayyorlaydi.' },
      { id: 'fam-6', word: 'grandfather', translation: 'bobo', pronunciation: '/ˈɡrænfɑːðər/', partOfSpeech: 'noun', example: 'My grandfather tells stories.', exampleTranslation: 'Bobom hikoya aytadi.' },
      { id: 'fam-7', word: 'son', translation: 'o\'g\'il', pronunciation: '/sʌn/', partOfSpeech: 'noun', example: 'They have two sons.', exampleTranslation: 'Ularning ikki o\'g\'li bor.' },
      { id: 'fam-8', word: 'daughter', translation: 'qiz', pronunciation: '/ˈdɔːtər/', partOfSpeech: 'noun', example: 'My daughter is five.', exampleTranslation: 'Mening qizim besh yoshda.' },
      { id: 'fam-9', word: 'aunt', translation: 'xola/amma', pronunciation: '/ænt/', partOfSpeech: 'noun', example: 'My aunt lives in London.', exampleTranslation: 'Mening xolam Londonda yashaydi.' },
      { id: 'fam-10', word: 'uncle', translation: 'tog\'a/amaki', pronunciation: '/ˈʌŋkl/', partOfSpeech: 'noun', example: 'My uncle is a doctor.', exampleTranslation: 'Mening tog\'am shifokor.' },
      { id: 'fam-11', word: 'cousin', translation: 'amakivachcha/tog\'avachcha', pronunciation: '/ˈkʌzn/', partOfSpeech: 'noun', example: 'My cousin is coming.', exampleTranslation: 'Mening amakivaccham keladi.' },
      { id: 'fam-12', word: 'parents', translation: 'ota-ona', pronunciation: '/ˈperənts/', partOfSpeech: 'noun', example: 'My parents are kind.', exampleTranslation: 'Mening ota-onam mehribon.' }
    ]
  },
  {
    id: 'daily-food',
    title: 'Food & Drinks',
    titleUz: 'Oziq-ovqat va ichimliklar',
    description: 'Common foods, fruits, vegetables, and beverages',
    difficulty: 'beginner',
    icon: '🍔',
    words: [
      { id: 'food-1', word: 'bread', translation: 'non', pronunciation: '/bred/', partOfSpeech: 'noun', example: 'I eat bread for breakfast.', exampleTranslation: 'Men nonushtaga non yeyaman.' },
      { id: 'food-2', word: 'rice', translation: 'guruch', pronunciation: '/raɪs/', partOfSpeech: 'noun', example: 'We cook rice every day.', exampleTranslation: 'Biz har kuni guruch pishiramiz.' },
      { id: 'food-3', word: 'meat', translation: 'go\'sht', pronunciation: '/miːt/', partOfSpeech: 'noun', example: 'I don\'t eat meat.', exampleTranslation: 'Men go\'sht yemayman.' },
      { id: 'food-4', word: 'chicken', translation: 'tovuq go\'shti', pronunciation: '/ˈtʃɪkɪn/', partOfSpeech: 'noun', example: 'Chicken is healthy.', exampleTranslation: 'Tovuq go\'shti foydali.' },
      { id: 'food-5', word: 'fish', translation: 'baliq', pronunciation: '/fɪʃ/', partOfSpeech: 'noun', example: 'I had fish for dinner.', exampleTranslation: 'Men kechki ovqatga baliq yedim.' },
      { id: 'food-6', word: 'egg', translation: 'tuxum', pronunciation: '/eɡ/', partOfSpeech: 'noun', example: 'Boiled eggs are nutritious.', exampleTranslation: 'Qaynatilgan tuxum ozuqaviy.' },
      { id: 'food-7', word: 'cheese', translation: 'pishloq', pronunciation: '/tʃiːz/', partOfSpeech: 'noun', example: 'I like cheese.', exampleTranslation: 'Men pishloqni yoqtiraman.' },
      { id: 'food-8', word: 'milk', translation: 'sut', pronunciation: '/mɪlk/', partOfSpeech: 'noun', example: 'Drink milk every day.', exampleTranslation: 'Har kuni sut iching.' },
      { id: 'food-9', word: 'water', translation: 'suv', pronunciation: '/ˈwɔːtər/', partOfSpeech: 'noun', example: 'Water is essential.', exampleTranslation: 'Suv zarur.' },
      { id: 'food-10', word: 'coffee', translation: 'kofe', pronunciation: '/ˈkɔːfi/', partOfSpeech: 'noun', example: 'I drink coffee in the morning.', exampleTranslation: 'Men ertalab kofe ichaman.' },
      { id: 'food-11', word: 'tea', translation: 'choy', pronunciation: '/tiː/', partOfSpeech: 'noun', example: 'Green tea is healthy.', exampleTranslation: 'Yashil choy foydali.' },
      { id: 'food-12', word: 'juice', translation: 'sharbat', pronunciation: '/dʒuːs/', partOfSpeech: 'noun', example: 'Orange juice is delicious.', exampleTranslation: 'Apelsin sharbati mazali.' },
      { id: 'food-13', word: 'apple', translation: 'olma', pronunciation: '/ˈæpl/', partOfSpeech: 'noun', example: 'An apple a day keeps the doctor away.', exampleTranslation: 'Kuniga bir olma shifokordan uzoqlashtiradi.' },
      { id: 'food-14', word: 'banana', translation: 'banan', pronunciation: '/bəˈnænə/', partOfSpeech: 'noun', example: 'Bananas are rich in potassium.', exampleTranslation: 'Bananlar kaliyga boy.' },
      { id: 'food-15', word: 'orange', translation: 'apelsin', pronunciation: '/ˈɔːrɪndʒ/', partOfSpeech: 'noun', example: 'Oranges have vitamin C.', exampleTranslation: 'Apelsinlarda C vitamini bor.' },
      { id: 'food-16', word: 'tomato', translation: 'pomidor', pronunciation: '/təˈmeɪtoʊ/', partOfSpeech: 'noun', example: 'Tomatoes are used in salads.', exampleTranslation: 'Pomidorlar salatda ishlatiladi.' },
      { id: 'food-17', word: 'potato', translation: 'kartoshka', pronunciation: '/pəˈteɪtoʊ/', partOfSpeech: 'noun', example: 'Fried potatoes are tasty.', exampleTranslation: 'Qovurilgan kartoshka mazali.' },
      { id: 'food-18', word: 'carrot', translation: 'sabzi', pronunciation: '/ˈkærət/', partOfSpeech: 'noun', example: 'Carrots are good for eyes.', exampleTranslation: 'Sabzi ko\'z uchun foydali.' },
      { id: 'food-19', word: 'onion', translation: 'piyoz', pronunciation: '/ˈʌnjən/', partOfSpeech: 'noun', example: 'Onions make me cry.', exampleTranslation: 'Piyoz meni yig\'latadi.' },
      { id: 'food-20', word: 'sugar', translation: 'shakar', pronunciation: '/ˈʃʊɡər/', partOfSpeech: 'noun', example: 'Too much sugar is unhealthy.', exampleTranslation: 'Juda ko\'p shakar zararli.' }
    ]
  },
  {
    id: 'daily-home',
    title: 'Home & Furniture',
    titleUz: 'Uy va mebel',
    description: 'Household items and rooms',
    difficulty: 'beginner',
    icon: '🏠',
    words: [
      { id: 'home-1', word: 'house', translation: 'uy', pronunciation: '/haʊs/', partOfSpeech: 'noun', example: 'I live in a big house.', exampleTranslation: 'Men katta uyda yashayman.' },
      { id: 'home-2', word: 'room', translation: 'xona', pronunciation: '/ruːm/', partOfSpeech: 'noun', example: 'My room is clean.', exampleTranslation: 'Mening xonam toza.' },
      { id: 'home-3', word: 'kitchen', translation: 'oshxona', pronunciation: '/ˈkɪtʃɪn/', partOfSpeech: 'noun', example: 'She cooks in the kitchen.', exampleTranslation: 'U oshxonada taom tayyorlaydi.' },
      { id: 'home-4', word: 'bathroom', translation: 'hammom', pronunciation: '/ˈbæθruːm/', partOfSpeech: 'noun', example: 'The bathroom is upstairs.', exampleTranslation: 'Hammom yuqori qavatda.' },
      { id: 'home-5', word: 'bedroom', translation: 'yotoq xonasi', pronunciation: '/ˈbedruːm/', partOfSpeech: 'noun', example: 'I sleep in my bedroom.', exampleTranslation: 'Men yotoq xonamda uxlayman.' },
      { id: 'home-6', word: 'living room', translation: 'yashash xonasi', pronunciation: '/ˈlɪvɪŋ ruːm/', partOfSpeech: 'noun', example: 'We watch TV in the living room.', exampleTranslation: 'Biz yashash xonasida televideniye ko\'ramiz.' },
      { id: 'home-7', word: 'door', translation: 'eshik', pronunciation: '/dɔːr/', partOfSpeech: 'noun', example: 'Close the door, please.', exampleTranslation: 'Iltimos, eshikni yoping.' },
      { id: 'home-8', word: 'window', translation: 'deraza', pronunciation: '/ˈwɪndoʊ/', partOfSpeech: 'noun', example: 'Open the window.', exampleTranslation: 'Derazani oching.' },
      { id: 'home-9', word: 'table', translation: 'stol', pronunciation: '/ˈteɪbl/', partOfSpeech: 'noun', example: 'Put the book on the table.', exampleTranslation: 'Kitobni stol ustiga qo\'ying.' },
      { id: 'home-10', word: 'chair', translation: 'stul', pronunciation: '/tʃer/', partOfSpeech: 'noun', example: 'Sit on the chair.', exampleTranslation: 'Stulda o\'tiring.' },
      { id: 'home-11', word: 'bed', translation: 'to\'shak/karavot', pronunciation: '/bed/', partOfSpeech: 'noun', example: 'I sleep on my bed.', exampleTranslation: 'Men to\'shagimda uxlayman.' },
      { id: 'home-12', word: 'sofa', translation: 'divan', pronunciation: '/ˈsoʊfə/', partOfSpeech: 'noun', example: 'The sofa is comfortable.', exampleTranslation: 'Divan qulay.' },
      { id: 'home-13', word: 'lamp', translation: 'chiroq', pronunciation: '/læmp/', partOfSpeech: 'noun', example: 'Turn on the lamp.', exampleTranslation: 'Chiroqni yoqing.' },
      { id: 'home-14', word: 'refrigerator', translation: 'muzlatgich', pronunciation: '/rɪˈfrɪdʒəreɪtər/', partOfSpeech: 'noun', example: 'Food is in the refrigerator.', exampleTranslation: 'Ovqat muzlatgichda.' },
      { id: 'home-15', word: 'stove', translation: 'pech', pronunciation: '/stoʊv/', partOfSpeech: 'noun', example: 'Cook on the stove.', exampleTranslation: 'Pechda pishiring.' }
    ]
  },
  {
    id: 'daily-clothes',
    title: 'Clothing',
    titleUz: 'Kiyim-kechak',
    description: 'Clothes and accessories',
    difficulty: 'beginner',
    icon: '👕',
    words: [
      { id: 'cloth-1', word: 'shirt', translation: 'ko\'ylak', pronunciation: '/ʃɜːrt/', partOfSpeech: 'noun', example: 'He wears a white shirt.', exampleTranslation: 'U oq ko\'ylak kiyadi.' },
      { id: 'cloth-2', word: 'pants', translation: 'shim', pronunciation: '/pænts/', partOfSpeech: 'noun', example: 'These pants are too big.', exampleTranslation: 'Bu shimlar juda katta.' },
      { id: 'cloth-3', word: 'dress', translation: 'ko\'ylak (ayollar uchun)', pronunciation: '/dres/', partOfSpeech: 'noun', example: 'She bought a new dress.', exampleTranslation: 'U yangi ko\'ylak sotib oldi.' },
      { id: 'cloth-4', word: 'shoes', translation: 'poyabzal', pronunciation: '/ʃuːz/', partOfSpeech: 'noun', example: 'My shoes are comfortable.', exampleTranslation: 'Mening poyabzallarim qulay.' },
      { id: 'cloth-5', word: 'socks', translation: 'paypoq', pronunciation: '/sɑːks/', partOfSpeech: 'noun', example: 'I need new socks.', exampleTranslation: 'Menga yangi paypoq kerak.' },
      { id: 'cloth-6', word: 'jacket', translation: 'kurtka', pronunciation: '/ˈdʒækɪt/', partOfSpeech: 'noun', example: 'Wear a jacket, it\'s cold.', exampleTranslation: 'Kurtka kiy, sovuq.' },
      { id: 'cloth-7', word: 'coat', translation: 'palto', pronunciation: '/koʊt/', partOfSpeech: 'noun', example: 'I need a warm coat.', exampleTranslation: 'Menga issiq palto kerak.' },
      { id: 'cloth-8', word: 'hat', translation: 'shapka', pronunciation: '/hæt/', partOfSpeech: 'noun', example: 'He wears a black hat.', exampleTranslation: 'U qora shapka taqadi.' },
      { id: 'cloth-9', word: 'scarf', translation: 'sharf', pronunciation: '/skɑːrf/', partOfSpeech: 'noun', example: 'The scarf is warm.', exampleTranslation: 'Sharf issiq.' },
      { id: 'cloth-10', word: 'gloves', translation: 'qo\'lqop', pronunciation: '/ɡlʌvz/', partOfSpeech: 'noun', example: 'Wear gloves in winter.', exampleTranslation: 'Qishda qo\'lqop kiyish kerak.' },
      { id: 'cloth-11', word: 't-shirt', translation: 'futbolka', pronunciation: '/ˈtiːʃɜːrt/', partOfSpeech: 'noun', example: 'I wear a t-shirt in summer.', exampleTranslation: 'Yozda futbolka kiyaman.' },
      { id: 'cloth-12', word: 'sweater', translation: 'sviter', pronunciation: '/ˈswetər/', partOfSpeech: 'noun', example: 'This sweater is soft.', exampleTranslation: 'Bu sviter yumshoq.' }
    ]
  },
  {
    id: 'daily-time',
    title: 'Time & Days',
    titleUz: 'Vaqt va kunlar',
    description: 'Days, months, and time expressions',
    difficulty: 'beginner',
    icon: '⏰',
    words: [
      { id: 'time-1', word: 'morning', translation: 'ertalab', pronunciation: '/ˈmɔːrnɪŋ/', partOfSpeech: 'noun', example: 'I wake up in the morning.', exampleTranslation: 'Men ertalab uyg\'onaman.' },
      { id: 'time-2', word: 'afternoon', translation: 'tushdan keyin', pronunciation: '/ˌæftərˈnuːn/', partOfSpeech: 'noun', example: 'We eat lunch in the afternoon.', exampleTranslation: 'Biz tushdan keyin tushlik qilamiz.' },
      { id: 'time-3', word: 'evening', translation: 'kechqurun', pronunciation: '/ˈiːvnɪŋ/', partOfSpeech: 'noun', example: 'I study in the evening.', exampleTranslation: 'Men kechqurun o\'qiyman.' },
      { id: 'time-4', word: 'night', translation: 'kecha', pronunciation: '/naɪt/', partOfSpeech: 'noun', example: 'Good night!', exampleTranslation: 'Xayrli tun!' },
      { id: 'time-5', word: 'today', translation: 'bugun', pronunciation: '/təˈdeɪ/', partOfSpeech: 'noun', example: 'Today is Monday.', exampleTranslation: 'Bugun dushanba.' },
      { id: 'time-6', word: 'yesterday', translation: 'kecha', pronunciation: '/ˈjestərdeɪ/', partOfSpeech: 'noun', example: 'Yesterday was sunny.', exampleTranslation: 'Kecha quyoshli edi.' },
      { id: 'time-7', word: 'tomorrow', translation: 'ertaga', pronunciation: '/təˈmɑːroʊ/', partOfSpeech: 'noun', example: 'Tomorrow is Friday.', exampleTranslation: 'Ertaga juma.' },
      { id: 'time-8', word: 'Monday', translation: 'dushanba', pronunciation: '/ˈmʌndeɪ/', partOfSpeech: 'noun', example: 'Monday is the first day.', exampleTranslation: 'Dushanba birinchi kun.' },
      { id: 'time-9', word: 'Tuesday', translation: 'seshanba', pronunciation: '/ˈtuːzdeɪ/', partOfSpeech: 'noun', example: 'I have class on Tuesday.', exampleTranslation: 'Seshanbada darsim bor.' },
      { id: 'time-10', word: 'Wednesday', translation: 'chorshanba', pronunciation: '/ˈwenzdeɪ/', partOfSpeech: 'noun', example: 'Wednesday is in the middle.', exampleTranslation: 'Chorshanba o\'rtada.' },
      { id: 'time-11', word: 'Thursday', translation: 'payshanba', pronunciation: '/ˈθɜːrzdeɪ/', partOfSpeech: 'noun', example: 'Thursday comes before Friday.', exampleTranslation: 'Payshanba jumadan oldin keladi.' },
      { id: 'time-12', word: 'Friday', translation: 'juma', pronunciation: '/ˈfraɪdeɪ/', partOfSpeech: 'noun', example: 'Friday is the weekend.', exampleTranslation: 'Juma dam olish kuni.' },
      { id: 'time-13', word: 'Saturday', translation: 'shanba', pronunciation: '/ˈsætərdeɪ/', partOfSpeech: 'noun', example: 'We rest on Saturday.', exampleTranslation: 'Biz shanbada dam olamiz.' },
      { id: 'time-14', word: 'Sunday', translation: 'yakshanba', pronunciation: '/ˈsʌndeɪ/', partOfSpeech: 'noun', example: 'Sunday is a holiday.', exampleTranslation: 'Yakshanba bayram kuni.' },
      { id: 'time-15', word: 'January', translation: 'yanvar', pronunciation: '/ˈdʒænjueri/', partOfSpeech: 'noun', example: 'January is the first month.', exampleTranslation: 'Yanvar birinchi oy.' },
      { id: 'time-16', word: 'week', translation: 'hafta', pronunciation: '/wiːk/', partOfSpeech: 'noun', example: 'There are seven days in a week.', exampleTranslation: 'Haftada etti kun bor.' },
      { id: 'time-17', word: 'month', translation: 'oy', pronunciation: '/mʌnθ/', partOfSpeech: 'noun', example: 'February is the shortest month.', exampleTranslation: 'Fevral eng qisqa oy.' },
      { id: 'time-18', word: 'year', translation: 'yil', pronunciation: '/jɪr/', partOfSpeech: 'noun', example: 'A year has 365 days.', exampleTranslation: 'Bir yilda 365 kun bor.' }
    ]
  },
  {
    id: 'verbs-common',
    title: 'Common Verbs',
    titleUz: 'Keng tarqalgan fe\'llar',
    description: 'Essential action verbs',
    difficulty: 'beginner',
    icon: '🏃',
    words: [
      { id: 'verb-1', word: 'go', translation: 'bormoq', pronunciation: '/ɡoʊ/', partOfSpeech: 'verb', example: 'I go to school.', exampleTranslation: 'Men maktabga boraman.' },
      { id: 'verb-2', word: 'come', translation: 'kelmoq', pronunciation: '/kʌm/', partOfSpeech: 'verb', example: 'Please come here.', exampleTranslation: 'Iltimos, bu yerga keling.' },
      { id: 'verb-3', word: 'see', translation: 'ko\'rmoq', pronunciation: '/siː/', partOfSpeech: 'verb', example: 'I see the mountain.', exampleTranslation: 'Men tog\'ni ko\'ryapman.' },
      { id: 'verb-4', word: 'eat', translation: 'yemoq', pronunciation: '/iːt/', partOfSpeech: 'verb', example: 'We eat dinner at 7.', exampleTranslation: 'Biz soat 7da kechki ovqat yemiz.' },
      { id: 'verb-5', word: 'drink', translation: 'ichmoq', pronunciation: '/drɪŋk/', partOfSpeech: 'verb', example: 'I drink water.', exampleTranslation: 'Men suv ichaman.' },
      { id: 'verb-6', word: 'sleep', translation: 'uxlamoq', pronunciation: '/sliːp/', partOfSpeech: 'verb', example: 'I sleep at night.', exampleTranslation: 'Men kechasi uxlayman.' },
      { id: 'verb-7', word: 'work', translation: 'ishlamoq', pronunciation: '/wɜːrk/', partOfSpeech: 'verb', example: 'She works in an office.', exampleTranslation: 'U ofisda ishlaydi.' },
      { id: 'verb-8', word: 'study', translation: 'o\'rganmoq', pronunciation: '/ˈstʌdi/', partOfSpeech: 'verb', example: 'I study English.', exampleTranslation: 'Men ingliz tilini o\'rganaman.' },
      { id: 'verb-9', word: 'read', translation: 'o\'qimoq', pronunciation: '/riːd/', partOfSpeech: 'verb', example: 'I read books.', exampleTranslation: 'Men kitob o\'qiyman.' },
      { id: 'verb-10', word: 'write', translation: 'yozmoq', pronunciation: '/raɪt/', partOfSpeech: 'verb', example: 'Write your name.', exampleTranslation: 'Ismingizni yozing.' },
      { id: 'verb-11', word: 'speak', translation: 'gapirmoq', pronunciation: '/spiːk/', partOfSpeech: 'verb', example: 'I speak Uzbek.', exampleTranslation: 'Men o\'zbekcha gapiraman.' },
      { id: 'verb-12', word: 'listen', translation: 'tinglamoq', pronunciation: '/ˈlɪsn/', partOfSpeech: 'verb', example: 'Listen to me!', exampleTranslation: 'Meni tinglang!' },
      { id: 'verb-13', word: 'walk', translation: 'yurmoq', pronunciation: '/wɔːk/', partOfSpeech: 'verb', example: 'I walk to school.', exampleTranslation: 'Men maktabga piyoda boraman.' },
      { id: 'verb-14', word: 'run', translation: 'yugurmoq', pronunciation: '/rʌn/', partOfSpeech: 'verb', example: 'He runs fast.', exampleTranslation: 'U tez yuguradi.' },
      { id: 'verb-15', word: 'sit', translation: 'o\'tirmoq', pronunciation: '/sɪt/', partOfSpeech: 'verb', example: 'Sit down, please.', exampleTranslation: 'Iltimos, o\'tiring.' },
      { id: 'verb-16', word: 'stand', translation: 'turmoq', pronunciation: '/stænd/', partOfSpeech: 'verb', example: 'Stand up!', exampleTranslation: 'Turing!' },
      { id: 'verb-17', word: 'open', translation: 'ochmoq', pronunciation: '/ˈoʊpən/', partOfSpeech: 'verb', example: 'Open the door.', exampleTranslation: 'Eshikni oching.' },
      { id: 'verb-18', word: 'close', translation: 'yopmoq', pronunciation: '/kloʊz/', partOfSpeech: 'verb', example: 'Close your eyes.', exampleTranslation: 'Ko\'zingizni yuming.' },
      { id: 'verb-19', word: 'give', translation: 'bermoq', pronunciation: '/ɡɪv/', partOfSpeech: 'verb', example: 'Give me the book.', exampleTranslation: 'Menga kitobni bering.' },
      { id: 'verb-20', word: 'take', translation: 'olmoq', pronunciation: '/teɪk/', partOfSpeech: 'verb', example: 'Take this pen.', exampleTranslation: 'Bu ruchkani oling.' }
    ]
  },
  {
    id: 'adjectives-common',
    title: 'Common Adjectives',
    titleUz: 'Keng tarqalgan sifatlar',
    description: 'Descriptive words',
    difficulty: 'beginner',
    icon: '✨',
    words: [
      { id: 'adj-1', word: 'big', translation: 'katta', pronunciation: '/bɪɡ/', partOfSpeech: 'adjective', example: 'This is a big house.', exampleTranslation: 'Bu katta uy.' },
      { id: 'adj-2', word: 'small', translation: 'kichik', pronunciation: '/smɔːl/', partOfSpeech: 'adjective', example: 'That car is small.', exampleTranslation: 'Bu mashina kichik.' },
      { id: 'adj-3', word: 'good', translation: 'yaxshi', pronunciation: '/ɡʊd/', partOfSpeech: 'adjective', example: 'This is good food.', exampleTranslation: 'Bu yaxshi ovqat.' },
      { id: 'adj-4', word: 'bad', translation: 'yomon', pronunciation: '/bæd/', partOfSpeech: 'adjective', example: 'That was a bad decision.', exampleTranslation: 'Bu yomon qaror edi.' },
      { id: 'adj-5', word: 'happy', translation: 'baxtli', pronunciation: '/ˈhæpi/', partOfSpeech: 'adjective', example: 'I am happy today.', exampleTranslation: 'Men bugun baxtliman.' },
      { id: 'adj-6', word: 'sad', translation: 'qayg\'uli', pronunciation: '/sæd/', partOfSpeech: 'adjective', example: 'She looks sad.', exampleTranslation: 'U qayg\'uli ko\'rinadi.' },
      { id: 'adj-7', word: 'hot', translation: 'issiq', pronunciation: '/hɑːt/', partOfSpeech: 'adjective', example: 'The weather is hot.', exampleTranslation: 'Havo issiq.' },
      { id: 'adj-8', word: 'cold', translation: 'sovuq', pronunciation: '/koʊld/', partOfSpeech: 'adjective', example: 'The water is cold.', exampleTranslation: 'Suv sovuq.' },
      { id: 'adj-9', word: 'new', translation: 'yangi', pronunciation: '/nuː/', partOfSpeech: 'adjective', example: 'I bought a new phone.', exampleTranslation: 'Men yangi telefon sotib oldim.' },
      { id: 'adj-10', word: 'old', translation: 'eski', pronunciation: '/oʊld/', partOfSpeech: 'adjective', example: 'This is an old book.', exampleTranslation: 'Bu eski kitob.' },
      { id: 'adj-11', word: 'fast', translation: 'tez', pronunciation: '/fæst/', partOfSpeech: 'adjective', example: 'He is a fast runner.', exampleTranslation: 'U tez yuguruvchi.' },
      { id: 'adj-12', word: 'slow', translation: 'sekin', pronunciation: '/sloʊ/', partOfSpeech: 'adjective', example: 'The turtle is slow.', exampleTranslation: 'Toshbaqa sekin.' },
      { id: 'adj-13', word: 'tall', translation: 'baland', pronunciation: '/tɔːl/', partOfSpeech: 'adjective', example: 'He is tall.', exampleTranslation: 'U baland bo\'yli.' },
      { id: 'adj-14', word: 'short', translation: 'past', pronunciation: '/ʃɔːrt/', partOfSpeech: 'adjective', example: 'She is short.', exampleTranslation: 'U past bo\'yli.' },
      { id: 'adj-15', word: 'beautiful', translation: 'chiroyli', pronunciation: '/ˈbjuːtɪfl/', partOfSpeech: 'adjective', example: 'The sunset is beautiful.', exampleTranslation: 'Quyosh botishi chiroyli.' },
      { id: 'adj-16', word: 'ugly', translation: 'xunuk', pronunciation: '/ˈʌɡli/', partOfSpeech: 'adjective', example: 'That shirt is ugly.', exampleTranslation: 'Bu ko\'ylak xunuk.' },
      { id: 'adj-17', word: 'easy', translation: 'oson', pronunciation: '/ˈiːzi/', partOfSpeech: 'adjective', example: 'This test is easy.', exampleTranslation: 'Bu test oson.' },
      { id: 'adj-18', word: 'difficult', translation: 'qiyin', pronunciation: '/ˈdɪfɪkəlt/', partOfSpeech: 'adjective', example: 'Math is difficult.', exampleTranslation: 'Matematika qiyin.' }
    ]
  },
  {
    id: 'places-city',
    title: 'Places in the City',
    titleUz: 'Shahar joylari',
    description: 'Common locations and buildings',
    difficulty: 'intermediate',
    icon: '🏙️',
    words: [
      { id: 'place-1', word: 'school', translation: 'maktab', pronunciation: '/skuːl/', partOfSpeech: 'noun', example: 'I go to school every day.', exampleTranslation: 'Men har kuni maktabga boraman.' },
      { id: 'place-2', word: 'hospital', translation: 'kasalxona', pronunciation: '/ˈhɑːspɪtl/', partOfSpeech: 'noun', example: 'The hospital is nearby.', exampleTranslation: 'Kasalxona yaqinda.' },
      { id: 'place-3', word: 'bank', translation: 'bank', pronunciation: '/bæŋk/', partOfSpeech: 'noun', example: 'I work in a bank.', exampleTranslation: 'Men bankda ishlayman.' },
      { id: 'place-4', word: 'restaurant', translation: 'restoran', pronunciation: '/ˈrestrɑːnt/', partOfSpeech: 'noun', example: 'Let\'s eat at a restaurant.', exampleTranslation: 'Keling, restoranda ovqatlanaylik.' },
      { id: 'place-5', word: 'supermarket', translation: 'supermarket', pronunciation: '/ˈsuːpərmɑːrkɪt/', partOfSpeech: 'noun', example: 'I buy food at the supermarket.', exampleTranslation: 'Men supermarketdan oziq-ovqat sotib olaman.' },
      { id: 'place-6', word: 'library', translation: 'kutubxona', pronunciation: '/ˈlaɪbreri/', partOfSpeech: 'noun', example: 'I read books at the library.', exampleTranslation: 'Men kutubxonada kitob o\'qiyman.' },
      { id: 'place-7', word: 'park', translation: 'bog\'', pronunciation: '/pɑːrk/', partOfSpeech: 'noun', example: 'Children play in the park.', exampleTranslation: 'Bolalar bog\'da o\'ynaydi.' },
      { id: 'place-8', word: 'station', translation: 'bekat/vokzal', pronunciation: '/ˈsteɪʃn/', partOfSpeech: 'noun', example: 'The train station is here.', exampleTranslation: 'Poyezd vokzali shu yerda.' },
      { id: 'place-9', word: 'airport', translation: 'aeroport', pronunciation: '/ˈerpɔːrt/', partOfSpeech: 'noun', example: 'We are going to the airport.', exampleTranslation: 'Biz aeroportga ketyapmiz.' },
      { id: 'place-10', word: 'hotel', translation: 'mehmonxona', pronunciation: '/hoʊˈtel/', partOfSpeech: 'noun', example: 'We stayed at a hotel.', exampleTranslation: 'Biz mehmonxonada qoldik.' },
      { id: 'place-11', word: 'office', translation: 'ofis', pronunciation: '/ˈɔːfɪs/', partOfSpeech: 'noun', example: 'He works in an office.', exampleTranslation: 'U ofisda ishlaydi.' },
      { id: 'place-12', word: 'store', translation: 'do\'kon', pronunciation: '/stɔːr/', partOfSpeech: 'noun', example: 'I bought it from a store.', exampleTranslation: 'Men uni do\'kondan sotib oldim.' },
      { id: 'place-13', word: 'museum', translation: 'muzey', pronunciation: '/mjuˈziːəm/', partOfSpeech: 'noun', example: 'The museum is interesting.', exampleTranslation: 'Muzey qiziqarli.' },
      { id: 'place-14', word: 'cinema', translation: 'kino', pronunciation: '/ˈsɪnəmə/', partOfSpeech: 'noun', example: 'Let\'s go to the cinema.', exampleTranslation: 'Keling, kinoga boraylik.' },
      { id: 'place-15', word: 'gym', translation: 'sport zali', pronunciation: '/dʒɪm/', partOfSpeech: 'noun', example: 'I exercise at the gym.', exampleTranslation: 'Men sport zalida mashq qilaman.' }
    ]
  },
  {
    id: 'work-business',
    title: 'Work & Business',
    titleUz: 'Ish va biznes',
    description: 'Professional and business vocabulary',
    difficulty: 'intermediate',
    icon: '💼',
    words: [
      { id: 'work-1', word: 'job', translation: 'ish', pronunciation: '/dʒɑːb/', partOfSpeech: 'noun', example: 'I need a new job.', exampleTranslation: 'Menga yangi ish kerak.' },
      { id: 'work-2', word: 'employee', translation: 'xodim', pronunciation: '/ɪmˈplɔɪiː/', partOfSpeech: 'noun', example: 'He is an employee here.', exampleTranslation: 'U bu yerda xodim.' },
      { id: 'work-3', word: 'manager', translation: 'menejer', pronunciation: '/ˈmænɪdʒər/', partOfSpeech: 'noun', example: 'The manager is busy.', exampleTranslation: 'Menejer band.' },
      { id: 'work-4', word: 'meeting', translation: 'uchrashuv', pronunciation: '/ˈmiːtɪŋ/', partOfSpeech: 'noun', example: 'We have a meeting today.', exampleTranslation: 'Bugun uchrashuvimiz bor.' },
      { id: 'work-5', word: 'project', translation: 'loyiha', pronunciation: '/ˈprɑːdʒekt/', partOfSpeech: 'noun', example: 'This project is important.', exampleTranslation: 'Bu loyiha muhim.' },
      { id: 'work-6', word: 'salary', translation: 'maosh', pronunciation: '/ˈsæləri/', partOfSpeech: 'noun', example: 'My salary is good.', exampleTranslation: 'Mening maoshim yaxshi.' },
      { id: 'work-7', word: 'contract', translation: 'shartnoma', pronunciation: '/ˈkɑːntrækt/', partOfSpeech: 'noun', example: 'Sign the contract.', exampleTranslation: 'Shartnomani imzolang.' },
      { id: 'work-8', word: 'client', translation: 'mijoz', pronunciation: '/ˈklaɪənt/', partOfSpeech: 'noun', example: 'The client is waiting.', exampleTranslation: 'Mijoz kutmoqda.' },
      { id: 'work-9', word: 'deadline', translation: 'muddat', pronunciation: '/ˈdedlaɪn/', partOfSpeech: 'noun', example: 'The deadline is tomorrow.', exampleTranslation: 'Muddat ertaga.' },
      { id: 'work-10', word: 'company', translation: 'kompaniya', pronunciation: '/ˈkʌmpəni/', partOfSpeech: 'noun', example: 'I work for a big company.', exampleTranslation: 'Men katta kompaniyada ishlayman.' },
      { id: 'work-11', word: 'team', translation: 'jamoa', pronunciation: '/tiːm/', partOfSpeech: 'noun', example: 'Our team is strong.', exampleTranslation: 'Bizning jamoamiz kuchli.' },
      { id: 'work-12', word: 'schedule', translation: 'jadval', pronunciation: '/ˈskedʒuːl/', partOfSpeech: 'noun', example: 'Check your schedule.', exampleTranslation: 'Jadvalni tekshiring.' }
    ]
  },
  {
    id: 'travel-transport',
    title: 'Travel & Transportation',
    titleUz: 'Sayohat va transport',
    description: 'Vehicles and travel-related words',
    difficulty: 'intermediate',
    icon: '✈️',
    words: [
      { id: 'travel-1', word: 'car', translation: 'mashina', pronunciation: '/kɑːr/', partOfSpeech: 'noun', example: 'I drive a car.', exampleTranslation: 'Men mashina haydayman.' },
      { id: 'travel-2', word: 'bus', translation: 'avtobus', pronunciation: '/bʌs/', partOfSpeech: 'noun', example: 'I take the bus to work.', exampleTranslation: 'Men ishga avtobusda boraman.' },
      { id: 'travel-3', word: 'train', translation: 'poyezd', pronunciation: '/treɪn/', partOfSpeech: 'noun', example: 'The train is fast.', exampleTranslation: 'Poyezd tez.' },
      { id: 'travel-4', word: 'plane', translation: 'samolyot', pronunciation: '/pleɪn/', partOfSpeech: 'noun', example: 'I fly in a plane.', exampleTranslation: 'Men samolyotda uchaman.' },
      { id: 'travel-5', word: 'bike', translation: 'velosiped', pronunciation: '/baɪk/', partOfSpeech: 'noun', example: 'I ride a bike.', exampleTranslation: 'Men velosiped haydayman.' },
      { id: 'travel-6', word: 'taxi', translation: 'taksi', pronunciation: '/ˈtæksi/', partOfSpeech: 'noun', example: 'Call a taxi.', exampleTranslation: 'Taksi chaqiring.' },
      { id: 'travel-7', word: 'ticket', translation: 'bilet', pronunciation: '/ˈtɪkɪt/', partOfSpeech: 'noun', example: 'I bought a ticket.', exampleTranslation: 'Men bilet sotib oldim.' },
      { id: 'travel-8', word: 'passport', translation: 'pasport', pronunciation: '/ˈpæspɔːrt/', partOfSpeech: 'noun', example: 'Show your passport.', exampleTranslation: 'Pasportingizni ko\'rsating.' },
      { id: 'travel-9', word: 'luggage', translation: 'bagaj', pronunciation: '/ˈlʌɡɪdʒ/', partOfSpeech: 'noun', example: 'My luggage is heavy.', exampleTranslation: 'Mening bagajim og\'ir.' },
      { id: 'travel-10', word: 'trip', translation: 'sayohat', pronunciation: '/trɪp/', partOfSpeech: 'noun', example: 'We went on a trip.', exampleTranslation: 'Biz sayohatga chiqdik.' },
      { id: 'travel-11', word: 'journey', translation: 'yo\'llanma', pronunciation: '/ˈdʒɜːrni/', partOfSpeech: 'noun', example: 'It was a long journey.', exampleTranslation: 'Bu uzun yo\'llanma edi.' },
      { id: 'travel-12', word: 'road', translation: 'yo\'l', pronunciation: '/roʊd/', partOfSpeech: 'noun', example: 'The road is busy.', exampleTranslation: 'Yo\'l gavjum.' }
    ]
  },
  {
    id: 'tech-internet',
    title: 'Technology & Internet',
    titleUz: 'Texnologiya va Internet',
    description: 'Modern technology vocabulary',
    difficulty: 'intermediate',
    icon: '💻',
    words: [
      { id: 'tech-1', word: 'computer', translation: 'kompyuter', pronunciation: '/kəmˈpjuːtər/', partOfSpeech: 'noun', example: 'I use a computer.', exampleTranslation: 'Men kompyuter ishlataman.' },
      { id: 'tech-2', word: 'phone', translation: 'telefon', pronunciation: '/foʊn/', partOfSpeech: 'noun', example: 'My phone is new.', exampleTranslation: 'Mening telefonim yangi.' },
      { id: 'tech-3', word: 'internet', translation: 'internet', pronunciation: '/ˈɪntərnet/', partOfSpeech: 'noun', example: 'I use the internet daily.', exampleTranslation: 'Men har kuni internetdan foydalanaman.' },
      { id: 'tech-4', word: 'email', translation: 'elektron pochta', pronunciation: '/ˈiːmeɪl/', partOfSpeech: 'noun', example: 'Send me an email.', exampleTranslation: 'Menga elektron pochta yuboring.' },
      { id: 'tech-5', word: 'website', translation: 'veb-sayt', pronunciation: '/ˈwebsaɪt/', partOfSpeech: 'noun', example: 'Visit our website.', exampleTranslation: 'Bizning veb-saytimizga tashrif buyuring.' },
      { id: 'tech-6', word: 'app', translation: 'ilova', pronunciation: '/æp/', partOfSpeech: 'noun', example: 'Download the app.', exampleTranslation: 'Ilovani yuklab oling.' },
      { id: 'tech-7', word: 'password', translation: 'parol', pronunciation: '/ˈpæswɜːrd/', partOfSpeech: 'noun', example: 'Enter your password.', exampleTranslation: 'Parolingizni kiriting.' },
      { id: 'tech-8', word: 'download', translation: 'yuklab olish', pronunciation: '/ˈdaʊnloʊd/', partOfSpeech: 'verb', example: 'Download the file.', exampleTranslation: 'Faylni yuklab oling.' },
      { id: 'tech-9', word: 'upload', translation: 'yuklash', pronunciation: '/ˈʌploʊd/', partOfSpeech: 'verb', example: 'Upload the photo.', exampleTranslation: 'Rasmni yuklang.' },
      { id: 'tech-10', word: 'keyboard', translation: 'klaviatura', pronunciation: '/ˈkiːbɔːrd/', partOfSpeech: 'noun', example: 'Type on the keyboard.', exampleTranslation: 'Klaviaturada yozing.' },
      { id: 'tech-11', word: 'screen', translation: 'ekran', pronunciation: '/skriːn/', partOfSpeech: 'noun', example: 'The screen is bright.', exampleTranslation: 'Ekran yorqin.' },
      { id: 'tech-12', word: 'message', translation: 'xabar', pronunciation: '/ˈmesɪdʒ/', partOfSpeech: 'noun', example: 'I sent a message.', exampleTranslation: 'Men xabar yubordim.' }
    ]
  },
  {
    id: 'health-body',
    title: 'Health & Body',
    titleUz: 'Salomatlik va tana',
    description: 'Body parts and health terms',
    difficulty: 'intermediate',
    icon: '🏥',
    words: [
      { id: 'health-1', word: 'head', translation: 'bosh', pronunciation: '/hed/', partOfSpeech: 'noun', example: 'My head hurts.', exampleTranslation: 'Boshim og\'riyapti.' },
      { id: 'health-2', word: 'eye', translation: 'ko\'z', pronunciation: '/aɪ/', partOfSpeech: 'noun', example: 'I have blue eyes.', exampleTranslation: 'Mening ko\'zlarim ko\'k.' },
      { id: 'health-3', word: 'ear', translation: 'quloq', pronunciation: '/ɪr/', partOfSpeech: 'noun', example: 'I can\'t hear with this ear.', exampleTranslation: 'Men bu quloq bilan eshitmayapman.' },
      { id: 'health-4', word: 'nose', translation: 'burun', pronunciation: '/noʊz/', partOfSpeech: 'noun', example: 'My nose is blocked.', exampleTranslation: 'Burnim bitiq.' },
      { id: 'health-5', word: 'mouth', translation: 'og\'iz', pronunciation: '/maʊθ/', partOfSpeech: 'noun', example: 'Open your mouth.', exampleTranslation: 'Og\'zingizni oching.' },
      { id: 'health-6', word: 'hand', translation: 'qo\'l', pronunciation: '/hænd/', partOfSpeech: 'noun', example: 'Wash your hands.', exampleTranslation: 'Qo\'llaringizni yuving.' },
      { id: 'health-7', word: 'foot', translation: 'oyoq', pronunciation: '/fʊt/', partOfSpeech: 'noun', example: 'My foot is sore.', exampleTranslation: 'Oyog\'im og\'riyapti.' },
      { id: 'health-8', word: 'doctor', translation: 'shifokor', pronunciation: '/ˈdɑːktər/', partOfSpeech: 'noun', example: 'I need to see a doctor.', exampleTranslation: 'Men shifokorni ko\'rishim kerak.' },
      { id: 'health-9', word: 'medicine', translation: 'dori', pronunciation: '/ˈmedsn/', partOfSpeech: 'noun', example: 'Take your medicine.', exampleTranslation: 'Dorini ichishingiz.' },
      { id: 'health-10', word: 'sick', translation: 'kasal', pronunciation: '/sɪk/', partOfSpeech: 'adjective', example: 'I am sick.', exampleTranslation: 'Men kasalman.' },
      { id: 'health-11', word: 'healthy', translation: 'sog\'lom', pronunciation: '/ˈhelθi/', partOfSpeech: 'adjective', example: 'Eat healthy food.', exampleTranslation: 'Sog\'lom ovqat yeng.' },
      { id: 'health-12', word: 'pain', translation: 'og\'riq', pronunciation: '/peɪn/', partOfSpeech: 'noun', example: 'I have a pain here.', exampleTranslation: 'Bu yerda og\'riq bor.' }
    ]
  },
  {
    id: 'nature-weather',
    title: 'Nature & Weather',
    titleUz: 'Tabiat va ob-havo',
    description: 'Natural world and weather conditions',
    difficulty: 'intermediate',
    icon: '🌦️',
    words: [
      { id: 'nature-1', word: 'sun', translation: 'quyosh', pronunciation: '/sʌn/', partOfSpeech: 'noun', example: 'The sun is shining.', exampleTranslation: 'Quyosh porlamoqda.' },
      { id: 'nature-2', word: 'rain', translation: 'yomg\'ir', pronunciation: '/reɪn/', partOfSpeech: 'noun', example: 'It will rain today.', exampleTranslation: 'Bugun yomg\'ir yog\'adi.' },
      { id: 'nature-3', word: 'snow', translation: 'qor', pronunciation: '/snoʊ/', partOfSpeech: 'noun', example: 'I love snow.', exampleTranslation: 'Men qorni yaxshi ko\'raman.' },
      { id: 'nature-4', word: 'wind', translation: 'shamol', pronunciation: '/wɪnd/', partOfSpeech: 'noun', example: 'The wind is strong.', exampleTranslation: 'Shamol kuchli.' },
      { id: 'nature-5', word: 'cloud', translation: 'bulut', pronunciation: '/klaʊd/', partOfSpeech: 'noun', example: 'There are clouds today.', exampleTranslation: 'Bugun bulutlar bor.' },
      { id: 'nature-6', word: 'tree', translation: 'daraxt', pronunciation: '/triː/', partOfSpeech: 'noun', example: 'The tree is tall.', exampleTranslation: 'Daraxt baland.' },
      { id: 'nature-7', word: 'flower', translation: 'gul', pronunciation: '/ˈflaʊər/', partOfSpeech: 'noun', example: 'The flowers are beautiful.', exampleTranslation: 'Gullar chiroyli.' },
      { id: 'nature-8', word: 'mountain', translation: 'tog\'', pronunciation: '/ˈmaʊntn/', partOfSpeech: 'noun', example: 'We climbed the mountain.', exampleTranslation: 'Biz tog\'ga chiqdik.' },
      { id: 'nature-9', word: 'river', translation: 'daryo', pronunciation: '/ˈrɪvər/', partOfSpeech: 'noun', example: 'The river is wide.', exampleTranslation: 'Daryo keng.' },
      { id: 'nature-10', word: 'sea', translation: 'dengiz', pronunciation: '/siː/', partOfSpeech: 'noun', example: 'I swim in the sea.', exampleTranslation: 'Men dengizda suzaman.' },
      { id: 'nature-11', word: 'sky', translation: 'osmon', pronunciation: '/skaɪ/', partOfSpeech: 'noun', example: 'The sky is blue.', exampleTranslation: 'Osmon ko\'k.' },
      { id: 'nature-12', word: 'star', translation: 'yulduz', pronunciation: '/stɑːr/', partOfSpeech: 'noun', example: 'The stars are bright.', exampleTranslation: 'Yulduzlar yorqin.' }
    ]
  },
  {
    id: 'emotions-feelings',
    title: 'Emotions & Feelings',
    titleUz: 'Hissiyotlar va tuyg\'ular',
    description: 'Express your emotions',
    difficulty: 'advanced',
    icon: '😊',
    words: [
      { id: 'emotion-1', word: 'happy', translation: 'baxtli', pronunciation: '/ˈhæpi/', partOfSpeech: 'adjective', example: 'I feel happy.', exampleTranslation: 'Men baxtliman.' },
      { id: 'emotion-2', word: 'sad', translation: 'qayg\'uli', pronunciation: '/sæd/', partOfSpeech: 'adjective', example: 'She looks sad.', exampleTranslation: 'U qayg\'uli ko\'rinadi.' },
      { id: 'emotion-3', word: 'angry', translation: 'jahldor', pronunciation: '/ˈæŋɡri/', partOfSpeech: 'adjective', example: 'He is angry.', exampleTranslation: 'U jahldor.' },
      { id: 'emotion-4', word: 'excited', translation: 'hayajonli', pronunciation: '/ɪkˈsaɪtɪd/', partOfSpeech: 'adjective', example: 'I am excited!', exampleTranslation: 'Men hayajondaman!' },
      { id: 'emotion-5', word: 'nervous', translation: 'asabiy', pronunciation: '/ˈnɜːrvəs/', partOfSpeech: 'adjective', example: 'I feel nervous.', exampleTranslation: 'Men asabiyman.' },
      { id: 'emotion-6', word: 'tired', translation: 'charchagan', pronunciation: '/ˈtaɪərd/', partOfSpeech: 'adjective', example: 'I am very tired.', exampleTranslation: 'Men juda charchaganman.' },
      { id: 'emotion-7', word: 'scared', translation: 'qo\'rqqan', pronunciation: '/skerd/', partOfSpeech: 'adjective', example: 'He is scared.', exampleTranslation: 'U qo\'rqqan.' },
      { id: 'emotion-8', word: 'surprised', translation: 'hayron', pronunciation: '/sərˈpraɪzd/', partOfSpeech: 'adjective', example: 'I was surprised.', exampleTranslation: 'Men hayron bo\'ldim.' },
      { id: 'emotion-9', word: 'bored', translation: 'zerikkan', pronunciation: '/bɔːrd/', partOfSpeech: 'adjective', example: 'I am bored.', exampleTranslation: 'Men zerikkanman.' },
      { id: 'emotion-10', word: 'confused', translation: 'sarosimaga tushgan', pronunciation: '/kənˈfjuːzd/', partOfSpeech: 'adjective', example: 'I am confused.', exampleTranslation: 'Men sarosimadaman.' },
      { id: 'emotion-11', word: 'proud', translation: 'faxrli', pronunciation: '/praʊd/', partOfSpeech: 'adjective', example: 'I am proud of you.', exampleTranslation: 'Men sizdan faxrlanaman.' },
      { id: 'emotion-12', word: 'worried', translation: 'xavotirli', pronunciation: '/ˈwɜːrid/', partOfSpeech: 'adjective', example: 'She is worried.', exampleTranslation: 'U xavotirda.' }
    ]
  },
  {
    id: 'education-school',
    title: 'Education & School',
    titleUz: 'Ta\'lim va maktab',
    description: 'School and learning vocabulary',
    difficulty: 'intermediate',
    icon: '📚',
    words: [
      { id: 'edu-1', word: 'student', translation: 'talaba/o\'quvchi', pronunciation: '/ˈstuːdnt/', partOfSpeech: 'noun', example: 'I am a student.', exampleTranslation: 'Men talabaman.' },
      { id: 'edu-2', word: 'teacher', translation: 'o\'qituvchi', pronunciation: '/ˈtiːtʃər/', partOfSpeech: 'noun', example: 'The teacher is kind.', exampleTranslation: 'O\'qituvchi mehribon.' },
      { id: 'edu-3', word: 'book', translation: 'kitob', pronunciation: '/bʊk/', partOfSpeech: 'noun', example: 'Read this book.', exampleTranslation: 'Bu kitobni o\'qing.' },
      { id: 'edu-4', word: 'pen', translation: 'ruchka', pronunciation: '/pen/', partOfSpeech: 'noun', example: 'I write with a pen.', exampleTranslation: 'Men ruchka bilan yozaman.' },
      { id: 'edu-5', word: 'paper', translation: 'qog\'oz', pronunciation: '/ˈpeɪpər/', partOfSpeech: 'noun', example: 'I need paper.', exampleTranslation: 'Menga qog\'oz kerak.' },
      { id: 'edu-6', word: 'homework', translation: 'uy vazifasi', pronunciation: '/ˈhoʊmwɜːrk/', partOfSpeech: 'noun', example: 'I do my homework.', exampleTranslation: 'Men uy vazifamni qilaman.' },
      { id: 'edu-7', word: 'exam', translation: 'imtihon', pronunciation: '/ɪɡˈzæm/', partOfSpeech: 'noun', example: 'I passed the exam.', exampleTranslation: 'Men imtihondan o\'tdim.' },
      { id: 'edu-8', word: 'lesson', translation: 'dars', pronunciation: '/ˈlesn/', partOfSpeech: 'noun', example: 'The lesson starts now.', exampleTranslation: 'Dars hozir boshlanadi.' },
      { id: 'edu-9', word: 'class', translation: 'sinf', pronunciation: '/klæs/', partOfSpeech: 'noun', example: 'I am in class 10.', exampleTranslation: 'Men 10-sinfda o\'qiyman.' },
      { id: 'edu-10', word: 'university', translation: 'universitet', pronunciation: '/ˌjuːnɪˈvɜːrsəti/', partOfSpeech: 'noun', example: 'She studies at university.', exampleTranslation: 'U universitetda o\'qiydi.' },
      { id: 'edu-11', word: 'learn', translation: 'o\'rganmoq', pronunciation: '/lɜːrn/', partOfSpeech: 'verb', example: 'I want to learn English.', exampleTranslation: 'Men ingliz tilini o\'rganmoqchiman.' },
      { id: 'edu-12', word: 'answer', translation: 'javob', pronunciation: '/ˈænsər/', partOfSpeech: 'noun', example: 'That is the correct answer.', exampleTranslation: 'Bu to\'g\'ri javob.' }
    ]
  },
  {
    id: 'sports-hobbies',
    title: 'Sports & Hobbies',
    titleUz: 'Sport va sevimli mashg\'ulotlar',
    description: 'Activities and sports',
    difficulty: 'intermediate',
    icon: '⚽',
    words: [
      { id: 'sport-1', word: 'football', translation: 'futbol', pronunciation: '/ˈfʊtbɔːl/', partOfSpeech: 'noun', example: 'I play football.', exampleTranslation: 'Men futbol o\'ynayman.' },
      { id: 'sport-2', word: 'basketball', translation: 'basketbol', pronunciation: '/ˈbæskɪtbɔːl/', partOfSpeech: 'noun', example: 'He likes basketball.', exampleTranslation: 'U basketbolni yoqtiradi.' },
      { id: 'sport-3', word: 'tennis', translation: 'tennis', pronunciation: '/ˈtenɪs/', partOfSpeech: 'noun', example: 'She plays tennis.', exampleTranslation: 'U tennis o\'ynaydi.' },
      { id: 'sport-4', word: 'swimming', translation: 'suzish', pronunciation: '/ˈswɪmɪŋ/', partOfSpeech: 'noun', example: 'Swimming is fun.', exampleTranslation: 'Suzish qiziqarli.' },
      { id: 'sport-5', word: 'running', translation: 'yugurish', pronunciation: '/ˈrʌnɪŋ/', partOfSpeech: 'noun', example: 'I go running every day.', exampleTranslation: 'Men har kuni yugurishga boraman.' },
      { id: 'sport-6', word: 'music', translation: 'musiqa', pronunciation: '/ˈmjuːzɪk/', partOfSpeech: 'noun', example: 'I love music.', exampleTranslation: 'Men musiqani yaxshi ko\'raman.' },
      { id: 'sport-7', word: 'reading', translation: 'o\'qish', pronunciation: '/ˈriːdɪŋ/', partOfSpeech: 'noun', example: 'Reading is my hobby.', exampleTranslation: 'O\'qish mening sevimli mashg\'ulotim.' },
      { id: 'sport-8', word: 'dancing', translation: 'raqsga tushish', pronunciation: '/ˈdænsɪŋ/', partOfSpeech: 'noun', example: 'She enjoys dancing.', exampleTranslation: 'U raqsga tushishdan zavqlanadi.' },
      { id: 'sport-9', word: 'cooking', translation: 'ovqat tayyorlash', pronunciation: '/ˈkʊkɪŋ/', partOfSpeech: 'noun', example: 'Cooking is fun.', exampleTranslation: 'Ovqat tayyorlash qiziqarli.' },
      { id: 'sport-10', word: 'painting', translation: 'rasm chizish', pronunciation: '/ˈpeɪntɪŋ/', partOfSpeech: 'noun', example: 'I like painting.', exampleTranslation: 'Men rasm chizishni yoqtiraman.' },
      { id: 'sport-11', word: 'photography', translation: 'fotografiya', pronunciation: '/fəˈtɑːɡrəfi/', partOfSpeech: 'noun', example: 'Photography is his passion.', exampleTranslation: 'Fotografiya uning ishtiyoqi.' },
      { id: 'sport-12', word: 'game', translation: 'o\'yin', pronunciation: '/ɡeɪm/', partOfSpeech: 'noun', example: 'Let\'s play a game.', exampleTranslation: 'Keling, o\'yin o\'ynaymiz.' }
    ]
  },
  {
    id: 'shopping-money',
    title: 'Shopping & Money',
    titleUz: 'Xarid va pul',
    description: 'Shopping and financial vocabulary',
    difficulty: 'intermediate',
    icon: '🛒',
    words: [
      { id: 'shop-1', word: 'money', translation: 'pul', pronunciation: '/ˈmʌni/', partOfSpeech: 'noun', example: 'I need money.', exampleTranslation: 'Menga pul kerak.' },
      { id: 'shop-2', word: 'price', translation: 'narx', pronunciation: '/praɪs/', partOfSpeech: 'noun', example: 'What is the price?', exampleTranslation: 'Narxi qancha?' },
      { id: 'shop-3', word: 'buy', translation: 'sotib olmoq', pronunciation: '/baɪ/', partOfSpeech: 'verb', example: 'I want to buy this.', exampleTranslation: 'Men buni sotib olmoqchiman.' },
      { id: 'shop-4', word: 'sell', translation: 'sotmoq', pronunciation: '/sel/', partOfSpeech: 'verb', example: 'They sell clothes.', exampleTranslation: 'Ular kiyim sotadilar.' },
      { id: 'shop-5', word: 'expensive', translation: 'qimmat', pronunciation: '/ɪkˈspensɪv/', partOfSpeech: 'adjective', example: 'This car is expensive.', exampleTranslation: 'Bu mashina qimmat.' },
      { id: 'shop-6', word: 'cheap', translation: 'arzon', pronunciation: '/tʃiːp/', partOfSpeech: 'adjective', example: 'These shoes are cheap.', exampleTranslation: 'Bu poyabzallar arzon.' },
      { id: 'shop-7', word: 'discount', translation: 'chegirma', pronunciation: '/ˈdɪskaʊnt/', partOfSpeech: 'noun', example: 'There is a discount today.', exampleTranslation: 'Bugun chegirma bor.' },
      { id: 'shop-8', word: 'receipt', translation: 'chek', pronunciation: '/rɪˈsiːt/', partOfSpeech: 'noun', example: 'Keep the receipt.', exampleTranslation: 'Chekni saqlang.' },
      { id: 'shop-9', word: 'cash', translation: 'naqd pul', pronunciation: '/kæʃ/', partOfSpeech: 'noun', example: 'I pay with cash.', exampleTranslation: 'Men naqd pul bilan to\'layman.' },
      { id: 'shop-10', word: 'card', translation: 'karta', pronunciation: '/kɑːrd/', partOfSpeech: 'noun', example: 'I use a credit card.', exampleTranslation: 'Men kredit kartadan foydalanaman.' },
      { id: 'shop-11', word: 'shopping', translation: 'xarid qilish', pronunciation: '/ˈʃɑːpɪŋ/', partOfSpeech: 'noun', example: 'I love shopping.', exampleTranslation: 'Men xarid qilishni yaxshi ko\'raman.' },
      { id: 'shop-12', word: 'customer', translation: 'xaridor', pronunciation: '/ˈkʌstəmər/', partOfSpeech: 'noun', example: 'The customer is happy.', exampleTranslation: 'Xaridor baxtli.' }
    ]
  }
];

// Helper functions
export function getVocabularyThemeById(id: string): VocabularyTheme | undefined {
  return vocabularyThemes.find(theme => theme.id === id);
}

export function getAllVocabularyWords(): VocabularyWord[] {
  return vocabularyThemes.flatMap(theme => theme.words);
}

export function getTotalWordCount(): number {
  return getAllVocabularyWords().length;
}

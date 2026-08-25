import { GameLevel, QuizQuestion } from '../types/flexbox';

export const GAME_LEVELS: GameLevel[] = [
  {
    id: 1,
    title: 'Рівень 1: Перша ягода в кошику',
    story: 'Стигла малинка висить на початку гілки. Допоможи їй потрапити в кошик, перемістивши її в правий край!',
    instruction: 'Використай властивість justify-content, щоб перемістити малинку вправо (в кінець головної осі).',
    hint: 'Спробуй justify-content: flex-end;',
    targetBaskets: [
      {
        id: 'basket-1',
        color: '#e11d48',
        positionStyles: { justifyContent: 'flex-end', alignItems: 'center' },
        label: 'Кошик №1',
      },
    ],
    initialContainerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    requiredProperties: ['justifyContent'],
    solution: {
      justifyContent: 'flex-end',
    },
    items: [
      { id: 'item-1', label: 'Малинка', type: 'raspberry' },
    ],
  },
  {
    id: 2,
    title: 'Рівень 2: Центр збору ягід',
    story: 'Кошик знаходиться прямо по центру поля. Знайди ідеальну гармонію!',
    instruction: 'Вирівняй малинку рівно по центру горизонтальної осі контейнера.',
    hint: 'justify-content: center;',
    targetBaskets: [
      {
        id: 'basket-1',
        color: '#e11d48',
        positionStyles: { justifyContent: 'center', alignItems: 'center' },
        label: 'Центральний кошик',
      },
    ],
    initialContainerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    requiredProperties: ['justifyContent'],
    solution: {
      justifyContent: 'center',
    },
    items: [
      { id: 'item-1', label: 'Малинка', type: 'raspberry' },
    ],
  },
  {
    id: 3,
    title: 'Рівень 3: Дві малинки по краях',
    story: 'Два кошики розставлені по протилежних кутках столу. Розсунь ягоди!',
    instruction: 'Розподіли дві малинки так, щоб перша була зліва, а друга — справа.',
    hint: 'justify-content: space-between;',
    targetBaskets: [
      {
        id: 'basket-1',
        color: '#e11d48',
        positionStyles: { justifyContent: 'space-between', alignItems: 'center' },
        label: 'Кутові кошики',
      },
    ],
    initialContainerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    requiredProperties: ['justifyContent'],
    solution: {
      justifyContent: 'space-between',
    },
    items: [
      { id: 'item-1', label: 'Малина 1', type: 'raspberry' },
      { id: 'item-2', label: 'Малина 2', type: 'raspberry' },
    ],
  },
  {
    id: 4,
    title: 'Рівень 4: Падіння в кошик (align-items)',
    story: 'Кошик впав на самісіньке дно контейнера. Час використати поперечну вісь!',
    instruction: 'Опусти малинку на дно за допомогою властивості align-items.',
    hint: 'align-items: flex-end;',
    targetBaskets: [
      {
        id: 'basket-1',
        color: '#e11d48',
        positionStyles: { justifyContent: 'flex-start', alignItems: 'flex-end' },
        label: 'Нижній кошик',
      },
    ],
    initialContainerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    requiredProperties: ['alignItems'],
    solution: {
      alignItems: 'flex-end',
    },
    items: [
      { id: 'item-1', label: 'Малинка', type: 'raspberry' },
    ],
  },
  {
    id: 5,
    title: 'Рівень 5: Абсолютний центр (Дві осі)',
    story: 'Кошик висить прямо посередині кімнати у повітрі!',
    instruction: 'Поєднай justify-content та align-items для створення ідеального центрування.',
    hint: 'justify-content: center; align-items: center;',
    targetBaskets: [
      {
        id: 'basket-1',
        color: '#e11d48',
        positionStyles: { justifyContent: 'center', alignItems: 'center' },
        label: 'Центр всесвіту',
      },
    ],
    initialContainerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    requiredProperties: ['justifyContent', 'alignItems'],
    solution: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    items: [
      { id: 'item-1', label: 'Золота малина', type: 'goldberry' },
    ],
  },
  {
    id: 6,
    title: 'Рівень 6: Зміна напрямку гілки (flex-direction)',
    story: 'Гілка малини росте зверху вниз. Кошики вишикувалися в стовпчик!',
    instruction: 'Зміни flex-direction на column і розташуй ягоди на дні стовпчика.',
    hint: 'flex-direction: column; justify-content: flex-end;',
    targetBaskets: [
      {
        id: 'basket-1',
        color: '#e11d48',
        positionStyles: { flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start' },
        label: 'Вертикальний кошик',
      },
    ],
    initialContainerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    requiredProperties: ['flexDirection', 'justifyContent'],
    solution: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    items: [
      { id: 'item-1', label: 'Малина 1', type: 'raspberry' },
      { id: 'item-2', label: 'Малина 2', type: 'raspberry' },
    ],
  },
  {
    id: 7,
    title: 'Рівень 7: Рівномірний простір (space-evenly)',
    story: 'Три кошики потребують ідеально рівних відстаней як від країв, так і між собою.',
    instruction: 'Розподіли три малинки за допомогою space-evenly.',
    hint: 'justify-content: space-evenly;',
    targetBaskets: [
      {
        id: 'basket-1',
        color: '#e11d48',
        positionStyles: { justifyContent: 'space-evenly', alignItems: 'center' },
        label: 'Рівномірні кошики',
      },
    ],
    initialContainerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    requiredProperties: ['justifyContent'],
    solution: {
      justifyContent: 'space-evenly',
    },
    items: [
      { id: 'item-1', label: 'М1', type: 'raspberry' },
      { id: 'item-2', label: 'М2', type: 'blackberry' },
      { id: 'item-3', label: 'М3', type: 'raspberry' },
    ],
  },
  {
    id: 8,
    title: 'Рівень 8: Індивідуальне стрибання (align-self)',
    story: 'Дві малинки лишаються вгорі, а ожина має стрибнути в нижній кошик!',
    instruction: 'Для всього контейнера задай align-items: flex-start, або використай align-self.',
    hint: 'justify-content: space-around; alignItems: flex-start;',
    targetBaskets: [
      {
        id: 'basket-1',
        color: '#e11d48',
        positionStyles: { justifyContent: 'space-around', alignItems: 'flex-start' },
        label: 'Кошик-мікс',
      },
    ],
    initialContainerStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    requiredProperties: ['justifyContent', 'alignItems'],
    solution: {
      justifyContent: 'space-around',
      alignItems: 'flex-start',
    },
    items: [
      { id: 'item-1', label: 'Малина 1', type: 'raspberry' },
      { id: 'item-2', label: 'Ожина', type: 'blackberry' },
      { id: 'item-3', label: 'Малина 2', type: 'raspberry' },
    ],
  },
];

// Infinite Quiz Bank Generator
export const BASE_QUIZ_TEMPLATES: QuizQuestion[] = [
  {
    id: 'q-axis-1',
    question: 'Якщо встановлено flex-direction: column, яка вісь стає Головною (Main Axis)?',
    options: [
      'Горизонтальна вісь (зліва направо)',
      'Вертикальна вісь (зверху вниз)',
      'Діагональна вісь',
      'Обидві осі стають поперечними',
    ],
    correctIndex: 1,
    explanation: 'При flex-direction: column головна вісь розгортається на 90 градусів і стає вертикальною. Тому justify-content тепер керує розташуванням по висоті.',
    analogyTip: 'Уявіть рух колони поїзда зверху вниз.',
  },
  {
    id: 'q-center-2',
    question: 'Яка комбінація властивостей центрує елемент рівно посередині контейнера по обох осях?',
    codeSnippet: `.box {
  display: flex;
  /* Що сюди додати? */
}`,
    options: [
      'justify-content: center; align-items: center;',
      'align-content: center; margin: 0 auto;',
      'text-align: center; vertical-align: middle;',
      'justify-items: center; align-self: center;',
    ],
    correctIndex: 0,
    explanation: 'justify-content: center центрує вздовж головної осі, а align-items: center — вздовж поперечної осі.',
    analogyTip: 'Це класичне правило "Подвійного центру" у Flexbox.',
  },
  {
    id: 'q-wrap-3',
    question: 'Що станеться з елементами при нестачі місця за замовчуванням (flex-wrap: nowrap)?',
    options: [
      'Вони автоматично перейдуть на наступний рядок',
      'Вони будуть стискатися (якщо flex-shrink > 0) або випадуть за межі',
      'Вони миттєво сховаються (display: none)',
      'Браузер покаже помилку в консолі',
    ],
    correctIndex: 1,
    explanation: 'За замовчуванням flex-wrap дорівнює nowrap, тому елементи намагаються вміститися в один рядок і стискаються згідно зі своїм коефіцієнтом flex-shrink.',
  },
  {
    id: 'q-grow-4',
    question: 'Якщо у трьох елементів flex-grow встановлено як 0, 1 та 2, хто отримає найбільше ВІЛЬНОГО простору?',
    options: [
      'Перший елемент (0)',
      'Другий елемент (1)',
      'Третій елемент (2)',
      'Усі отримають порівну',
    ],
    correctIndex: 2,
    explanation: 'Елемент з flex-grow: 2 отримає рівно у 2 рази більше доступного вільного простору, ніж елемент з flex-grow: 1. Елемент з 0 не отримає вільного простору взагалі.',
  },
  {
    id: 'q-shrink-5',
    question: 'Яку властивість потрібно задати аватарці чи іконці, щоб вона НІКОЛИ не сплющувалася в рядку?',
    codeSnippet: `.avatar {
  width: 48px;
  height: 48px;
  /* Захист від зминання */
}`,
    options: [
      'flex-shrink: 0;',
      'flex-grow: 0;',
      'flex-basis: 100%;',
      'align-items: stretch;',
    ],
    correctIndex: 0,
    explanation: 'flex-shrink: 0 забороняє браузеру зменшувати розмір елемента при дефіциті вільного місця в контейнері.',
  },
  {
    id: 'q-align-content-6',
    question: 'Коли властивість align-content ДІЙСНО має візуальний ефект?',
    options: [
      'Завжди, для будь-якого flex-контейнера',
      'Тільки коли flex-wrap: wrap і в контейнері є кілька рядків та вільна висота',
      'Тільки коли в контейнері рівно один елемент',
      'Тільки при flex-direction: column-reverse',
    ],
    correctIndex: 1,
    explanation: 'align-content управляє відстанню між цілими рядками, тому вона працює виключно у багаторядкових контейнерах (flex-wrap: wrap/wrap-reverse) із надлишковим простором.',
  },
  {
    id: 'q-order-7',
    question: 'Яке значення властивості order перемістить елемент у самий початок контейнера, якщо в інших елементів стандартні значення?',
    options: [
      'order: 1;',
      'order: 100;',
      'order: -1;',
      'order: auto;',
    ],
    correctIndex: 2,
    explanation: 'Стандартне значення order для всіх елементів — 0. Від’ємне значення (наприклад, -1) розмістить елемент перед нульовими.',
  },
  {
    id: 'q-margin-auto-8',
    question: 'Як у Flexbox елегантно притиснути останній елемент навігації праворуч без розбиття на зайві <div>?',
    options: [
      'Задати останньому елементу margin-left: auto;',
      'Задати контейнеру text-align: right;',
      'Задати останньому елементу float: right;',
      'Задати останньому елементу position: absolute;',
    ],
    correctIndex: 0,
    explanation: 'margin-left: auto на flex-елементі поглинає весь вільний простір зліва від нього, штовхаючи його в правий край.',
  },
  {
    id: 'q-gap-9',
    question: 'У чому головна перевага властивості gap порівняно зі старими margin-right?',
    options: [
      'gap пришвидшує завантаження сайту на 50%',
      'gap додає відступи виключно МІЖ елементами, не створюючи зайвого відступу в останнього елемента',
      'gap працює навіть без display: flex',
      'gap автоматично змінює колір фону',
    ],
    correctIndex: 1,
    explanation: 'gap позбавляє необхідності писати хаки на зразок :last-child { margin-right: 0 } або від’ємні margin на батькові.',
  },
];

// Generator function for infinite random variations
export function generateRandomQuizQuestion(seed: number): QuizQuestion {
  const baseIndex = Math.abs(seed) % BASE_QUIZ_TEMPLATES.length;
  const base = BASE_QUIZ_TEMPLATES[baseIndex];

  // Shuffle options while keeping track of the correct one
  const originalCorrectOption = base.options[base.correctIndex];
  const shuffledOptions = [...base.options].sort(() => Math.random() - 0.5);
  const newCorrectIndex = shuffledOptions.indexOf(originalCorrectOption);

  return {
    ...base,
    id: `q-rand-${seed}-${Date.now()}`,
    options: shuffledOptions,
    correctIndex: newCorrectIndex,
  };
}

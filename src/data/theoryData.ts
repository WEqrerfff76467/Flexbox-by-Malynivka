import { TheoryProperty } from '../types/flexbox';

export const THEORY_PROPERTIES: TheoryProperty[] = [
  // CONTAINER PROPERTIES
  {
    id: 'display',
    name: 'display',
    target: 'container',
    summary: 'Вмикає магію Flexbox для контейнера та перетворює всіх його прямих нащадків на flex-елементи.',
    analogy: 'Уявіть звичайну коробку з фруктами. Коли ви кажете display: flex, коробка стає "розумним конвеєром", де всі малинки всередині миттєво шикуються в слухняний рядок і готові до точного позиціювання.',
    detailedExplanation: 'Властивість display визначає контекст форматування. При display: flex контейнер стає блоковим flex-контейнером (займає всю ширину рядка). При display: inline-flex — рядковим flex-контейнером (обгортається навколо свого контенту як текст).',
    cssSyntax: 'display: flex | inline-flex;',
    bemExample: `.catalog__container {
  display: flex;
  gap: 16px;
}`,
    values: [
      {
        value: 'flex',
        description: 'Блоковий flex-контейнер. Займає 100% доступної ширини батьківського елемента.',
        isDefault: true,
        previewConfig: { display: 'flex' },
      },
      {
        value: 'inline-flex',
        description: 'Рядковий flex-контейнер. Його ширина підлаштовується під вміст, займає лише необхідне місце.',
        previewConfig: { display: 'inline-flex' },
      },
    ],
    tips: [
      'Лише прямі діти стають flex-елементами. Внутрішні онуки залишаються зі звичайним потоком, якщо для них окремо не вказано flex.',
      'При ввімкненні flex такі властивості як float, clear та vertical-align перестають діяти на дочірні елементи.',
    ],
  },
  {
    id: 'flex-direction',
    name: 'flex-direction',
    target: 'container',
    summary: 'Встановлює головну вісь (Main Axis) та визначає напрямок розміщення елементів.',
    analogy: 'Це як зміна напрямку руху поїзда: вагони-малинки можуть рухатися зліва направо (row), справа наліво (row-reverse), зверху вниз (column) чи знизу вгору (column-reverse).',
    detailedExplanation: 'У Flexbox завжди є дві перпендикулярні осі: Головна вісь (Main Axis) та Поперечна вісь (Cross Axis). flex-direction керує тим, що саме є головною віссю — горизонталь (row) чи вертикаль (column).',
    cssSyntax: 'flex-direction: row | row-reverse | column | column-reverse;',
    bemExample: `.berry-card__list {
  display: flex;
  flex-direction: column; /* Малинки стають у колонку */
}`,
    values: [
      {
        value: 'row',
        description: 'Головна вісь горизонтальна (зліва направо). Стандартне значення.',
        isDefault: true,
        previewConfig: { flexDirection: 'row' },
      },
      {
        value: 'row-reverse',
        description: 'Головна вісь горизонтальна, але елементи розміщуються у зворотному порядку (справа наліво).',
        previewConfig: { flexDirection: 'row-reverse' },
      },
      {
        value: 'column',
        description: 'Головна вісь вертикальна (зверху вниз). Елементи стають у стовпчик.',
        previewConfig: { flexDirection: 'column' },
      },
      {
        value: 'column-reverse',
        description: 'Головна вісь вертикальна, елементи йдуть знизу вгору.',
        previewConfig: { flexDirection: 'column-reverse' },
      },
    ],
    tips: [
      'Коли ви змінюєте flex-direction на column, justify-content починає керувати вертикаллю, а align-items — горизонталлю!',
      'row-reverse та column-reverse не просто розгортають елементи, вони також переносять початок осі на протилежний бік.',
    ],
  },
  {
    id: 'justify-content',
    name: 'justify-content',
    target: 'container',
    summary: 'Вирівнює елементи вздовж ГОЛОВНОЇ осі (Main Axis) та розподіляє вільний простір між ними.',
    analogy: 'Уявіть розсаджування гостей або ягід у кошику. Ви можете зсунути їх на початок, розставити по краях, згрупувати по центру або рівномірно розподілити проміжки між ними.',
    detailedExplanation: 'Ця властивість працює тоді, коли елементи не займають усю доступну довжину головної осі, тобто коли залишається вільний простір.',
    cssSyntax: 'justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;',
    bemExample: `.navbar__menu {
  display: flex;
  justify-content: space-between; /* Логотип зліва, кнопки справа */
}`,
    values: [
      {
        value: 'flex-start',
        description: 'Елементи притискаються до початку головної осі.',
        isDefault: true,
        previewConfig: { justifyContent: 'flex-start' },
      },
      {
        value: 'center',
        description: 'Елементи центруються вздовж головної осі.',
        previewConfig: { justifyContent: 'center' },
      },
      {
        value: 'flex-end',
        description: 'Елементи притискаються до кінця головної осі.',
        previewConfig: { justifyContent: 'flex-end' },
      },
      {
        value: 'space-between',
        description: 'Перший елемент на початку, останній в кінці, а простір рівномірно поділений між іншими.',
        previewConfig: { justifyContent: 'space-between' },
      },
      {
        value: 'space-around',
        description: 'Елементи мають однаковий простір з обох боків (простір між ними вдвічі більший за простір біля країв).',
        previewConfig: { justifyContent: 'space-around' },
      },
      {
        value: 'space-evenly',
        description: 'Абсолютно однакові проміжки між усіма елементами та краями контейнера.',
        previewConfig: { justifyContent: 'space-evenly' },
      },
    ],
    tips: [
      'space-between ідеально підходить для навігаційних панелей (Navbar): логотип ліворуч, меню по центру або кнопки праворуч.',
      'Пам’ятайте: justify-content працює лише вздовж поточної головної осі!',
    ],
  },
  {
    id: 'align-items',
    name: 'align-items',
    target: 'container',
    summary: 'Вирівнює елементи вздовж ПОПЕРЕЧНОЇ осі (Cross Axis) всередині кожного окремого flex-рядка.',
    analogy: 'Це як вирівнювання книг різної висоти на полиці: можна вирівняти їх по нижньому краю полиці (flex-end), по верхньому (flex-start), по центру (center) чи розтягнути від низу до верху (stretch).',
    detailedExplanation: 'align-items визначає поведінку елементів перпендикулярно до головної осі. Якщо flex-direction: row, align-items вирівнює по вертикалі. При stretch за відсутності жорсткої висоти елементи займають усю висоту контейнера.',
    cssSyntax: 'align-items: stretch | flex-start | flex-end | center | baseline;',
    bemExample: `.user-badge {
  display: flex;
  align-items: center; /* Іконка та ім'я ідеально центровані по вертикалі */
  gap: 12px;
}`,
    values: [
      {
        value: 'stretch',
        description: 'Розтягує елементи на всю довжину поперечної осі (якщо не задано фіксований розмір).',
        isDefault: true,
        previewConfig: { alignItems: 'stretch' },
      },
      {
        value: 'center',
        description: 'Елементи центруються вздовж поперечної осі.',
        previewConfig: { alignItems: 'center' },
      },
      {
        value: 'flex-start',
        description: 'Елементи притискаються до початку поперечної осі.',
        previewConfig: { alignItems: 'flex-start' },
      },
      {
        value: 'flex-end',
        description: 'Елементи притискаються до кінця поперечної осі.',
        previewConfig: { alignItems: 'flex-end' },
      },
      {
        value: 'baseline',
        description: 'Вирівнює елементи по базовій лінії їхнього тексту (корисно для шрифтів різного розміру).',
        previewConfig: { alignItems: 'baseline' },
      },
    ],
    tips: [
      'У поєднанні `justify-content: center` + `align-items: center` ви отримуєте легендарне ідеальне центрування в CSS!',
      'Якщо елемент має явну `height` при row, `stretch` не змінить його висоту, він залишиться свого розміру.',
    ],
  },
  {
    id: 'flex-wrap',
    name: 'flex-wrap',
    target: 'container',
    summary: 'Дозволяє або забороняє перенесення flex-елементів на новий рядок при нестачі місця.',
    analogy: 'Уявіть, що ви пакуєте малинки в один лоток. За замовчуванням (nowrap) вони стискатимуться доти, поки вистачає сил, або випадуть за край. При wrap зайві малинки чемно перейдуть на новий нижній рядок.',
    detailedExplanation: 'За замовчуванням flex-елементи завжди намагаються вміститися в один рядок (nowrap), через що спрацьовує flex-shrink. Задавши wrap, контейнер стає багаторядковим.',
    cssSyntax: 'flex-wrap: nowrap | wrap | wrap-reverse;',
    bemExample: `.products-grid__list {
  display: flex;
  flex-wrap: wrap; /* Картки переносяться на новий рядок на мобільних пристроях */
  gap: 20px;
}`,
    values: [
      {
        value: 'nowrap',
        description: 'Усі елементи розміщуються в один рядок (можуть стискатися або переповнювати контейнер).',
        isDefault: true,
        previewConfig: { flexWrap: 'nowrap' },
      },
      {
        value: 'wrap',
        description: 'Елементи переносяться на новий рядок зверху вниз.',
        previewConfig: { flexWrap: 'wrap' },
      },
      {
        value: 'wrap-reverse',
        description: 'Елементи переносяться на новий рядок знизу вгору.',
        previewConfig: { flexWrap: 'wrap-reverse' },
      },
    ],
    tips: [
      'Для адаптивних сіток (карток товарів, тегів, списків) завжди використовуйте flex-wrap: wrap разом із властивістю gap.',
    ],
  },
  {
    id: 'align-content',
    name: 'align-content',
    target: 'container',
    summary: 'Вирівнює ЦІЛІ РЯДКИ (lines) вздовж поперечної осі, коли є кілька рядків (діє ТІЛЬКИ при flex-wrap: wrap).',
    analogy: 'Якщо align-items вирівнює кожну окрему ягоду всередині її рядка, то align-content вирівнює цілі ряди ягід відносно всього контейнера (як полиці в шафі).',
    detailedExplanation: 'Ця властивість не має жодного ефекту, якщо контейнер однорядковий (nowrap) або якщо висота контейнера точно дорівнює висоті контенту.',
    cssSyntax: 'align-content: stretch | flex-start | flex-end | center | space-between | space-around | space-evenly;',
    bemExample: `.gallery__wrapper {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between; /* Розсуває ряди карток до верхнього та нижнього краю */
  min-height: 400px;
}`,
    values: [
      {
        value: 'normal',
        description: 'Стандартне розміщення рядків відповідно до поведінки вмісту.',
        isDefault: true,
        previewConfig: { alignContent: 'normal' },
      },
      {
        value: 'stretch',
        description: 'Рядки розтягуються, щоб заповнити весь вільний вертикальний простір.',
        previewConfig: { alignContent: 'stretch' },
      },
      {
        value: 'center',
        description: 'Усі рядки групуються в центрі контейнера.',
        previewConfig: { alignContent: 'center' },
      },
      {
        value: 'space-between',
        description: 'Перший рядок вгорі, останній внизу, решта рівномірно розподілені між ними.',
        previewConfig: { alignContent: 'space-between' },
      },
      {
        value: 'flex-start',
        description: 'Усі рядки притискаються до верху контейнера.',
        previewConfig: { alignContent: 'flex-start' },
      },
    ],
    tips: [
      'Головна помилка початківців: намагатися використовувати align-content для одного рядка. Для одного рядка завжди використовуйте align-items!',
    ],
  },
  {
    id: 'gap',
    name: 'gap (row-gap, column-gap)',
    target: 'container',
    summary: 'Встановлює сучасні чисті відступи ТІЛЬКИ МІЖ flex-елементами, не додаючи зайвих відступів по краях.',
    analogy: 'Це як розділювачі між малинами в коробці. Вам не треба додавати порожні стінки зліва чи справа, відстань з’являється суто між сусідніми ягідками.',
    detailedExplanation: 'Раніше для відступів використовували незручні margin-right з :last-child селекторами. Тепер властивість gap робить це елегантно та без багів.',
    cssSyntax: 'gap: 20px; /* або row-gap: 10px; column-gap: 20px; */',
    bemExample: `.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px; /* 8px між рядками, 16px між колонками */
}`,
    values: [
      {
        value: '0px',
        description: 'Без відступів між елементами.',
        previewConfig: { gap: 0 },
      },
      {
        value: '12px',
        description: 'Компактний відступ між сусідніми елементами.',
        previewConfig: { gap: 12 },
      },
      {
        value: '24px',
        description: 'Просторий відступ для карток або секцій.',
        isDefault: true,
        previewConfig: { gap: 24 },
      },
    ],
    tips: [
      'Властивість gap підтримується 98%+ всіма сучасними браузерами, це золотий стандарт сучасної верстки.',
    ],
  },

  // ITEM PROPERTIES
  {
    id: 'align-self',
    name: 'align-self',
    target: 'item',
    summary: 'Дозволяє окремому flex-елементу перевизначити батьківський align-items для себе самого.',
    analogy: 'Усі малинки слухняно стоять по центру рядка, але одна бунтарка вирішила підстрибнути до самого верху (flex-start) чи впасти на дно (flex-end).',
    detailedExplanation: 'Задається безпосередньо на flex-елементі (дочірньому елементі). Приймає ті ж значення, що й align-items, плюс auto (наслідує значення батьківського контейнера).',
    cssSyntax: 'align-self: auto | flex-start | flex-end | center | baseline | stretch;',
    bemExample: `.chat-message--special {
  align-self: flex-end; /* Одне конкретне повідомлення притискається вправо */
}`,
    values: [
      {
        value: 'auto',
        description: 'Наслідує значення align-items свого батьківського контейнера.',
        isDefault: true,
        previewConfig: { alignSelf: 'auto' },
      },
      {
        value: 'flex-start',
        description: 'Елемент самостійно притискається до початку поперечної осі.',
        previewConfig: { alignSelf: 'flex-start' },
      },
      {
        value: 'center',
        description: 'Елемент самостійно центрується на поперечній осі.',
        previewConfig: { alignSelf: 'center' },
      },
      {
        value: 'flex-end',
        description: 'Елемент самостійно притискається до кінця поперечної осі.',
        previewConfig: { alignSelf: 'flex-end' },
      },
      {
        value: 'stretch',
        description: 'Елемент розтягується на всю висоту/ширину поперечної осі.',
        previewConfig: { alignSelf: 'stretch' },
      },
    ],
    tips: [
      'Чудово підходить для кнопок закриття в модалках, аватарів у коментарях або закріплених бейджів.',
    ],
  },
  {
    id: 'flex-grow',
    name: 'flex-grow',
    target: 'item',
    summary: 'Визначає коефіцієнт жадібності елемента: яку частку вільного простору він забере собі.',
    analogy: 'Якщо в коробці є вільне місце, а в малинки flex-grow: 1, вона почне надуватися і займе весь вільний простір. Якщо у другої малинки flex-grow: 2, вона отримає вдвічі більше вільного місця, ніж перша!',
    detailedExplanation: 'Значення за замовчуванням — 0 (елемент не росте). Якщо задано додатне число, елемент претендує на розподіл залишкового вільного місця у контейнері.',
    cssSyntax: 'flex-grow: 0 | 1 | 2 | <number>;',
    bemExample: `.search-bar__input {
  flex-grow: 1; /* Поле пошуку забирає весь вільний простір між іконкою та кнопкою */
}`,
    values: [
      {
        value: '0',
        description: 'Не росте. Займає лише свій початковий розмір.',
        isDefault: true,
        previewConfig: { flexGrow: 0 },
      },
      {
        value: '1',
        description: 'Рівномірно поглинає весь доступний вільний простір.',
        previewConfig: { flexGrow: 1 },
      },
      {
        value: '2',
        description: 'Отримує вдвічі більшу частку вільного простору порівняно з сусідами, що мають flex-grow: 1.',
        previewConfig: { flexGrow: 2 },
      },
    ],
    tips: [
      'flex-grow розподіляє САМЕ ВІЛЬНИЙ ПРОСТІР, а не робить елемент у 2 рази більшим за абсолютним розміром (для цього є flex-basis).',
    ],
  },
  {
    id: 'flex-shrink',
    name: 'flex-shrink',
    target: 'item',
    summary: 'Визначає коефіцієнт стискання елемента, коли в контейнері бракує місця.',
    analogy: 'Коли автобус переповнений, елементи з flex-shrink: 1 чемно стискаються. А елемент з flex-shrink: 0 каже: "Я ні за що не стиснусь!" і зберігає свій повноцінний розмір.',
    detailedExplanation: 'Значення за замовчуванням — 1 (елементи стискаються, щоб не вилазити з контейнера). Якщо встановити 0, елемент гарантовано не стане меншим за свій flex-basis/width.',
    cssSyntax: 'flex-shrink: 1 | 0 | <number>;',
    bemExample: `.notification__icon {
  flex-shrink: 0; /* Іконка ніколи не сплющиться, навіть при довгому тексті сповіщення */
}`,
    values: [
      {
        value: '1',
        description: 'Елемент стискається нарівні з іншими при дефіциті місця.',
        isDefault: true,
        previewConfig: { flexShrink: 1 },
      },
      {
        value: '0',
        description: 'Елемент ЗАБОРОНЯЄ собі стискатися (зберігає свій розмір).',
        previewConfig: { flexShrink: 0 },
      },
    ],
    tips: [
      'flex-shrink: 0 — це рятівник аватарів, іконок та кнопок від несподіваного розплющування в flex-рядках!',
    ],
  },
  {
    id: 'flex-basis',
    name: 'flex-basis',
    target: 'item',
    summary: 'Встановлює базовий розмір flex-елемента ДО того, як буде застосовано розподіл простору через grow чи shrink.',
    analogy: 'Це як початковий розмір свіжозібраної малини перед тим, як ви вирішите її висушити (shrink) чи полити водою (grow).',
    detailedExplanation: 'Вказується в пікселях, відсотках, rem або auto. Якщо flex-direction: row, це початкова ширина. Якщо column — початкова висота.',
    cssSyntax: 'flex-basis: auto | 200px | 30% | 0;',
    bemExample: `.dashboard__sidebar {
  flex-basis: 280px;
  flex-shrink: 0;
}`,
    values: [
      {
        value: 'auto',
        description: 'Розмір береться з width/height або вмісту елемента.',
        isDefault: true,
        previewConfig: { flexBasis: 'auto' },
      },
      {
        value: '0px',
        description: 'Початковий розмір ігнорується, весь простір розраховується суто через flex-grow.',
        previewConfig: { flexBasis: '0px' },
      },
      {
        value: '160px',
        description: 'Базовий фіксований розмір 160 пікселів.',
        previewConfig: { flexBasis: '160px' },
      },
    ],
    tips: [
      'Швидкий запис `flex: 1` насправді розгортається у `flex: 1 1 0%`, що забезпечує ідеально рівні колонки.',
    ],
  },
  {
    id: 'order',
    name: 'order',
    target: 'item',
    summary: 'Змінює візуальний порядок відображення елементів без зміни вихідного HTML коду.',
    analogy: 'Це як номерки на ящиках: ви можете поставити останній ящик на перше місце, просто присвоївши йому order: -1.',
    detailedExplanation: 'За замовчуванням усі елементи мають order: 0. Елементи сортуються від найменшого числа до найбільшого (можна використовувати від’ємні значення типу order: -1).',
    cssSyntax: 'order: 0 | 1 | -1 | <integer>;',
    bemExample: `.article__featured-badge {
  order: -1; /* Візуально показуємо бейдж на самому початку */
}`,
    values: [
      {
        value: '0',
        description: 'Стандартний порядок згідно з HTML-структурою.',
        isDefault: true,
        previewConfig: { order: 0 },
      },
      {
        value: '-1',
        description: 'Переміщує елемент у самий початок контейнера.',
        previewConfig: { order: -1 },
      },
      {
        value: '2',
        description: 'Переміщує елемент ближче до кінця.',
        previewConfig: { order: 2 },
      },
    ],
    tips: [
      'Будьте обережні з доступністю: order змінює лише візуальне положення, але скрінрідери та навігація клавішею Tab слідуватимуть початковому порядку в HTML!',
    ],
  },
];

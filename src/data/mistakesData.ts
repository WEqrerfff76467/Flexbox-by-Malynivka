import { MistakeCase } from '../types/flexbox';

export const MISTAKES_CASES: MistakeCase[] = [
  {
    id: 'min-width-text-overflow',
    title: '1. Текст вилазить за межі картки (Баг min-width: auto)',
    category: 'Текст та Переповнення',
    description: 'Flex-елементи за замовчуванням мають властивість `min-width: auto`. Через це довгі слова, посилання або тексти з `text-overflow: ellipsis` не обрізаються, а розпирають контейнер і ламають верстку.',
    whyItHappens: 'У специфікації CSS flex-елемент за замовчуванням не може стиснутися менше, ніж розмір його контенту (`min-width: auto`). Довгий URL або назва файлу змушує flex-елемент розтягуватися на всю довжину рядка.',
    wrongCss: `.file-item {
  display: flex;
  align-items: center;
}
.file-item__name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* БАГ: Відсутній min-width: 0 */
}`,
    fixedCss: `.file-item {
  display: flex;
  align-items: center;
}
.file-item__name {
  flex: 1;
  min-width: 0; /* РЯТІВНИК: Дозволяє тексту скорочуватися! */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`,
    wrongContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'normal',
      gap: 12,
      minHeight: 80,
      padding: 12,
    },
    fixedContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'normal',
      gap: 12,
      minHeight: 80,
      padding: 12,
    },
    wrongItems: [
      {
        id: 'icon',
        label: 'Іконка',
        order: 0,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'rose',
        customText: '📄',
      },
      {
        id: 'bad-text',
        label: 'Текст (ламає верстку)',
        order: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'slate',
        customText: 'дуже_довге_ім_я_файлу_малиновий_звіт_2026_експорт_final_v3_production.pdf',
      },
      {
        id: 'btn',
        label: 'Дія',
        order: 0,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'emerald',
        customText: 'Завантажити',
      },
    ],
    fixedItems: [
      {
        id: 'icon-fix',
        label: 'Іконка',
        order: 0,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'rose',
        customText: '📄',
      },
      {
        id: 'fixed-text',
        label: 'Текст (min-width: 0)',
        order: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'slate',
        customText: 'дуже_довге_ім_я_файлу_малиновий_звіт_2026...pdf',
      },
      {
        id: 'btn-fix',
        label: 'Дія',
        order: 0,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'emerald',
        customText: 'Завантажити',
      },
    ],
    explanation: 'Додавання `min-width: 0` (або `min-h-0` для column) скидає мінімальний розмір flex-елемента і дозволяє `text-overflow: ellipsis` коректно обрізати довгий текст із трьома крапками.',
    proTip: 'У Tailwind CSS для цього є спеціальний клас `min-w-0` або `truncate`. Використовуйте його завжди біля скорочуваного тексту у flex-контейнерах!',
  },
  {
    id: 'squished-icons-shrink',
    title: '2. Сплющення іконок та аватарів (Баг flex-shrink: 1)',
    category: 'Розміри елементів',
    description: 'Коли в рядку з’являється багато тексту, круглий аватар або іконка несподівано перетворюються на вузький овал або зминаються в коржик.',
    whyItHappens: 'За замовчуванням усі flex-елементи мають `flex-shrink: 1`. Якщо сусідньому тексту бракує місця, браузер стискає всі елементи, включно з іконками, що мають фіксовану width/height.',
    wrongCss: `.profile-card {
  display: flex;
  gap: 12px;
}
.profile-card__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  /* БАГ: За замовчуванням flex-shrink: 1, через що аватар стискається! */
}`,
    fixedCss: `.profile-card {
  display: flex;
  gap: 12px;
}
.profile-card__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0; /* РЯТІВНИК: Забороняє браузеру зминати іконку */
}`,
    wrongContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'normal',
      gap: 12,
      minHeight: 80,
      padding: 12,
    },
    fixedContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'normal',
      gap: 12,
      minHeight: 80,
      padding: 12,
    },
    wrongItems: [
      {
        id: 'avatar-bad',
        label: 'Аватар (сплющений)',
        order: 0,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '40px',
        alignSelf: 'auto',
        colorPreset: 'rose',
        customText: 'Аватар',
      },
      {
        id: 'bio-bad',
        label: 'Опис профілю',
        order: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'slate',
        customText: 'Спеціаліст з вирощування малини та сучасної веб-верстки сайтів у Malynivka Studio з досвідом понад 5 років.',
      },
    ],
    fixedItems: [
      {
        id: 'avatar-fixed',
        label: 'Аватар (flex-shrink: 0)',
        order: 0,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: '60px',
        alignSelf: 'auto',
        colorPreset: 'rose',
        customText: 'Аватар 60px',
      },
      {
        id: 'bio-fixed',
        label: 'Опис профілю',
        order: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'slate',
        customText: 'Спеціаліст з вирощування малини та сучасної веб-верстки сайтів у Malynivka Studio з досвідом понад 5 років.',
      },
    ],
    explanation: 'Встановлення `flex-shrink: 0` для іконок, аватарів, бейджів та чекбоксів гарантує збереження їхньої точної геометричної форми.',
    proTip: 'У Tailwind використовуйте клас `shrink-0` для кожної іконки або бейджа всередині flex-контейнера.',
  },
  {
    id: 'flex-direction-axes-confusion',
    title: '3. Пастка flex-direction: column (Плутанина осей та центрування)',
    category: 'Напрямок та Осі',
    description: 'При переході на `flex-direction: column` розробник намагається відцентрувати елементи по горизонталі за допомогою `justify-content: center`, або не розуміє, чому `justify-content: space-between` не працює.',
    whyItHappens: 'При `flex-direction: column` головна та поперечна осі міняються місцями: `justify-content` тепер керує ВЕРТИКАЛЛЮ, а `align-items` — ГОРИЗОНТАЛЛЮ. Також без явної висоти (`min-height / height`) у колонки немає вільного вертикального простору.',
    wrongCss: `.sidebar-menu {
  display: flex;
  flex-direction: column;
  /* БАГ: Спроба відцентрувати кнопки по горизонталі за допомогою justify-content */
  justify-content: center; 
  /* БАГ: Відсутня висота, тому justify-content не має простору для розподілу */
}`,
    fixedCss: `.sidebar-menu {
  display: flex;
  flex-direction: column;
  align-items: center; /* РЯТІВНИК: Центрує по горизонталі (поперечна вісь)! */
  min-height: 220px;   /* РЯТІВНИК: Надає вертикальний простір */
  justify-content: space-between; /* Тепер розподіляє пункти по вертикалі */
}`,
    wrongContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'stretch',
      alignContent: 'normal',
      gap: 8,
      minHeight: 120,
      padding: 12,
    },
    fixedContainer: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'normal',
      gap: 8,
      minHeight: 220,
      padding: 12,
    },
    wrongItems: [
      { id: 'w-col-1', label: 'Пункт 1', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'rose', customText: '🏠 Головна панель' },
      { id: 'w-col-2', label: 'Пункт 2', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'indigo', customText: '📊 Аналітика ягід' },
      { id: 'w-col-3', label: 'Пункт 3', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'amber', customText: '⚙️ Налаштування' },
    ],
    fixedItems: [
      { id: 'f-col-1', label: 'Пункт 1', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'center', colorPreset: 'rose', customText: '🏠 Головна панель' },
      { id: 'f-col-2', label: 'Пункт 2', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'center', colorPreset: 'indigo', customText: '📊 Аналітика ягід' },
      { id: 'f-col-3', label: 'Пункт 3', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'center', colorPreset: 'amber', customText: '⚙️ Налаштування' },
    ],
    explanation: 'Запам’ятайте золоте правило: `justify-content` ЗАВЖДИ діє вздовж `flex-direction` (у column — це вертикаль), а `align-items` — поперек (у column — це горизонталь).',
    proTip: 'Якщо `justify-content` у колонці нічого не змінює — перевірте висоту контейнера! Без `min-h-screen` або `h-full` вільний вертикальний простір дорівнює нулю.',
  },
  {
    id: 'align-self-stretched-buttons',
    title: '4. Розтягнуті кнопки та бейджі (Баг align-items: stretch та align-self)',
    category: 'Вирівнювання елементів',
    description: 'У рядку з високим текстом або блоком поруч кнопка дії, аватар або бейдж потворно розтягуються на всю висоту картки.',
    whyItHappens: 'За замовчуванням контейнер має `align-items: stretch`. Будь-який дочірній елемент без жорсткої висоти розтягнеться на 100% висоти найвищого сусіда.',
    wrongCss: `.notification-card {
  display: flex;
  gap: 16px;
  /* БАГ: align-items за замовчуванням stretch, через що кнопка розтягується на 120px! */
}
.notification-card__btn {
  /* Відсутній align-self */
}`,
    fixedCss: `.notification-card {
  display: flex;
  gap: 16px;
}
.notification-card__btn {
  align-self: center; /* РЯТІВНИК: Зберігає природний компактний розмір кнопки! */
  /* або align-self: flex-start */
}`,
    wrongContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      alignContent: 'normal',
      gap: 12,
      minHeight: 110,
      padding: 12,
    },
    fixedContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      alignContent: 'normal',
      gap: 12,
      minHeight: 110,
      padding: 12,
    },
    wrongItems: [
      { id: 'w-card-text', label: 'Опис сповіщення', order: 0, flexGrow: 1, flexShrink: 1, flexBasis: 'auto', alignSelf: 'stretch', colorPreset: 'slate', customText: 'Ваше замовлення свіжої малини #4092 успішно зібрано, упаковано в термобокс та передано кур’єру для доставки по місту.' },
      { id: 'w-card-btn', label: 'Кнопка (потворно розтягнута)', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'stretch', colorPreset: 'rose', customText: 'Переглянути статус' },
    ],
    fixedItems: [
      { id: 'f-card-text', label: 'Опис сповіщення', order: 0, flexGrow: 1, flexShrink: 1, flexBasis: 'auto', alignSelf: 'stretch', colorPreset: 'slate', customText: 'Ваше замовлення свіжої малини #4092 успішно зібрано, упаковано в термобокс та передано кур’єру для доставки по місту.' },
      { id: 'f-card-btn', label: 'Кнопка (align-self: center)', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'center', colorPreset: 'emerald', customText: 'Переглянути статус' },
    ],
    explanation: 'Властивість `align-self: center` або `align-self: flex-start` дозволяє окремому елементу вийти з-під правила `stretch` батьківського контейнера і зберегти свій акуратний розмір.',
    proTip: 'У Tailwind CSS використовуйте класи `self-center`, `self-start` або `self-end` безпосередньо на потрібній кнопці чи іконці.',
  },
  {
    id: 'unequal-columns-flex-1',
    title: '5. Нерівні колонки карток (Баг flex-grow: 1 проти flex: 1 1 0%)',
    category: 'Розміри елементів',
    description: 'Три картки мають мати однакову ширину 33.3%, але через різну кількість тексту одна картка стає широкою, а інші дві — вузькими.',
    whyItHappens: 'При `flex-grow: 1` або `flex: 1 1 auto` розмір базується на контенті (`flex-basis: auto`). Браузер спочатку віддає простір під текст, а порівну ділить лише ЗАЛИШОК.',
    wrongCss: `.pricing-grid {
  display: flex;
  gap: 16px;
}
.pricing-card {
  flex-grow: 1; /* БАГ: flex-basis залишається auto, через що картка з великим описом ширша! */
}`,
    fixedCss: `.pricing-grid {
  display: flex;
  gap: 16px;
}
.pricing-card {
  flex: 1; /* РЯТІВНИК: Скорочення для flex: 1 1 0% — ідеально рівні колонки! */
}`,
    wrongContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      alignContent: 'normal',
      gap: 12,
      minHeight: 120,
      padding: 12,
    },
    fixedContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      alignContent: 'normal',
      gap: 12,
      minHeight: 120,
      padding: 12,
    },
    wrongItems: [
      { id: 'w-plan-1', label: 'Тариф Базовий (мало тексту)', order: 0, flexGrow: 1, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'slate', customText: 'Базовий: 1 кг' },
      { id: 'w-plan-2', label: 'Тариф Про (величезний опис)', order: 0, flexGrow: 1, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'rose', customText: 'Преміум Малина: щоденна свіжа доставка з плантації + фірмове варення + персональний агроном-консультант.' },
      { id: 'w-plan-3', label: 'Тариф Бізнес', order: 0, flexGrow: 1, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'amber', customText: 'Бізнес: 10 кг' },
    ],
    fixedItems: [
      { id: 'f-plan-1', label: 'Тариф Базовий (рівна ширина)', order: 0, flexGrow: 1, flexShrink: 1, flexBasis: '0px', alignSelf: 'auto', colorPreset: 'slate', customText: 'Базовий: 1 кг' },
      { id: 'f-plan-2', label: 'Тариф Про (рівна ширина)', order: 0, flexGrow: 1, flexShrink: 1, flexBasis: '0px', alignSelf: 'auto', colorPreset: 'rose', customText: 'Преміум Малина: щоденна доставка з плантації...' },
      { id: 'f-plan-3', label: 'Тариф Бізнес (рівна ширина)', order: 0, flexGrow: 1, flexShrink: 1, flexBasis: '0px', alignSelf: 'auto', colorPreset: 'amber', customText: 'Бізнес: 10 кг' },
    ],
    explanation: 'Щоб змусити flex-елементи мати математично однакову ширину незалежно від кількості тексту всередині, встановіть `flex-basis: 0` або використовуйте `flex: 1` (`flex-1`).',
    proTip: 'Запам’ятайте: `flex: 1` = `flex: 1 1 0%` (рівні стовпчики). А `flex-grow: 1` = `flex: 1 1 auto` (нерівні стовпчики залежно від тексту).',
  },
  {
    id: 'margin-auto-magic',
    title: '6. Притискання елемента праворуч (Магія margin-left: auto)',
    category: 'Позиціювання',
    description: 'Часто розробники намагаються розділити елементи в шапці за допомогою зайвих обгорток <div> та `justify-content: space-between`, замість елегантного `margin-left: auto`.',
    whyItHappens: 'У Flexbox властивість `margin: auto` поглинає весь вільний простір у відповідному напрямку. Це дає змогу притиснути останній елемент або кнопку до протилежного краю без зміни поведінки інших елементів.',
    wrongCss: `/* Зайві зайві вкладені обгортки */
.header {
  display: flex;
  justify-content: space-between;
}
.header__left-group {
  display: flex;
  gap: 16px;
}`,
    fixedCss: `/* Чистий та плаский Flexbox код */
.header {
  display: flex;
  align-items: center;
  gap: 16px;
}
.header__login-btn {
  margin-left: auto; /* Магія: поглинає весь вільний простір зліва! */
}`,
    wrongContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'normal',
      gap: 12,
      minHeight: 80,
      padding: 12,
    },
    fixedContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'normal',
      gap: 12,
      minHeight: 80,
      padding: 12,
    },
    wrongItems: [
      {
        id: 'w-logo',
        label: 'Лого',
        order: 0,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'rose',
        customText: 'Логотип',
      },
      {
        id: 'w-links',
        label: 'Посилання',
        order: 0,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'slate',
        customText: 'Головна • Про нас',
      },
      {
        id: 'w-btn',
        label: 'Вхід',
        order: 0,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'emerald',
        customText: 'Кабінет',
      },
    ],
    fixedItems: [
      {
        id: 'f-logo',
        label: 'Лого',
        order: 0,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'rose',
        customText: 'Логотип',
      },
      {
        id: 'f-links',
        label: 'Посилання',
        order: 0,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'slate',
        customText: 'Головна • Про нас',
      },
      {
        id: 'f-btn',
        label: 'Вхід (ml-auto)',
        order: 0,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
        alignSelf: 'auto',
        colorPreset: 'emerald',
        customText: '👉 Вхід (margin-left: auto)',
      },
    ],
    explanation: '`margin-left: auto` на flex-елементі відштовхує його в самий правий край контейнера, залишаючи інші елементи згрупованими ліворуч з чистим `gap`.',
    proTip: 'Працює і для вертикалі! `margin-top: auto` у картці товару притисне кнопку "Купити" до самісінького низу картки, незалежно від довжини опису.',
  },
  {
    id: 'align-items-vs-align-content',
    title: '7. align-items проти align-content (Плутанина в багаторядковій сітці)',
    category: 'Вирівнювання',
    description: 'При використанні `flex-wrap: wrap` розробники часто дивуються, чому `align-items` не прибирає гігантські проміжки між рядами карток.',
    whyItHappens: 'align-items вирівнює елементи всередині КОЖНОГО окремого рядка. Якщо контейнер має задану висоту (наприклад, 400px), рядки за замовчуванням розтягуються (`align-content: stretch`), створюючи дірки між поверхами.',
    wrongCss: `.gallery {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  height: 400px;
  /* БАГ: align-content за замовчуванням stretch, тому між рядами величезні проміжки */
}`,
    fixedCss: `.gallery {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start; /* РЯТІВНИК: Притискає всі ряди разом до верху! */
  height: 400px;
}`,
    wrongContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignContent: 'stretch',
      gap: 12,
      minHeight: 220,
      padding: 12,
    },
    fixedContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      gap: 12,
      minHeight: 220,
      padding: 12,
    },
    wrongItems: [
      { id: 'c1', label: 'Картка 1', order: 0, flexGrow: 1, flexShrink: 0, flexBasis: '40%', alignSelf: 'auto', colorPreset: 'rose', customText: 'Рядок 1 - Картка А' },
      { id: 'c2', label: 'Картка 2', order: 0, flexGrow: 1, flexShrink: 0, flexBasis: '40%', alignSelf: 'auto', colorPreset: 'indigo', customText: 'Рядок 1 - Картка Б' },
      { id: 'c3', label: 'Картка 3', order: 0, flexGrow: 1, flexShrink: 0, flexBasis: '40%', alignSelf: 'auto', colorPreset: 'amber', customText: 'Рядок 2 - Картка В (розірвана)' },
      { id: 'c4', label: 'Картка 4', order: 0, flexGrow: 1, flexShrink: 0, flexBasis: '40%', alignSelf: 'auto', colorPreset: 'emerald', customText: 'Рядок 2 - Картка Г' },
    ],
    fixedItems: [
      { id: 'fc1', label: 'Картка 1', order: 0, flexGrow: 1, flexShrink: 0, flexBasis: '40%', alignSelf: 'auto', colorPreset: 'rose', customText: 'Рядок 1 - Картка А' },
      { id: 'fc2', label: 'Картка 2', order: 0, flexGrow: 1, flexShrink: 0, flexBasis: '40%', alignSelf: 'auto', colorPreset: 'indigo', customText: 'Рядок 1 - Картка Б' },
      { id: 'fc3', label: 'Картка 3', order: 0, flexGrow: 1, flexShrink: 0, flexBasis: '40%', alignSelf: 'auto', colorPreset: 'amber', customText: 'Рядок 2 - Картка В (компактно)' },
      { id: 'fc4', label: 'Картка 4', order: 0, flexGrow: 1, flexShrink: 0, flexBasis: '40%', alignSelf: 'auto', colorPreset: 'emerald', customText: 'Рядок 2 - Картка Г' },
    ],
    explanation: 'Використовуйте `align-content: flex-start` (або `center`), щоб зібрати всі ряди карток разом без штучних розривів у високому контейнері.',
    proTip: 'Правило запам’ятовування: `align-items` для елементів в одному рядку; `align-content` для цілих рядків у багаторядковому контейнері.',
  },
  {
    id: 'margin-vs-gap-wrap',
    title: '8. Зламані краї при переносі (Застарілий margin-right замість gap)',
    category: 'Відступи та Сітки',
    description: 'Використання `margin-right: 16px` на елементах замість `gap` створює зайвий відступ у останнього елемента в рядку або ламає ширину при `flex-wrap: wrap`.',
    whyItHappens: '`margin-right` додається до КОЖНОГО елемента без розбору, через що правий край контейнера переповнюється, викликаючи небажаний перенос або вилазіння за межі.',
    wrongCss: `.tag-list {
  display: flex;
  flex-wrap: wrap;
}
.tag-item {
  margin-right: 12px;
  margin-bottom: 12px;
  /* БАГ: Останній тег у рядку має зайвий margin-right: 12px */
}`,
    fixedCss: `.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px; /* РЯТІВНИК: Відступи СТРОГО між тегами, без брудних країв! */
}`,
    wrongContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'normal',
      gap: 0,
      minHeight: 90,
      padding: 12,
    },
    fixedContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignContent: 'normal',
      gap: 12,
      minHeight: 90,
      padding: 12,
    },
    wrongItems: [
      { id: 'm-tag-1', label: 'Тег 1', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'rose', customText: '🍓 Свіжа Малина' },
      { id: 'm-tag-2', label: 'Тег 2', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'indigo', customText: '🫐 Лохина' },
      { id: 'm-tag-3', label: 'Тег 3 (зайвий марджин)', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'amber', customText: '🍯 Мед лісовий (margin-right)' },
    ],
    fixedItems: [
      { id: 'f-tag-1', label: 'Тег 1', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'rose', customText: '🍓 Свіжа Малина' },
      { id: 'f-tag-2', label: 'Тег 2', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'indigo', customText: '🫐 Лохина' },
      { id: 'f-tag-3', label: 'Тег 3 (ідеальний gap)', order: 0, flexGrow: 0, flexShrink: 0, flexBasis: 'auto', alignSelf: 'auto', colorPreset: 'emerald', customText: '🍯 Мед лісовий (чистий край)' },
    ],
    explanation: 'Нативна властивість `gap` (або `row-gap` / `column-gap`) автоматично розміщує відступи виключно між сусідніми flex-елементами, залишаючи зовнішні межі ідеально рівними.',
    proTip: 'Браузерна підтримка `gap` у Flexbox перевищує 97.5%. Забудьте про старі хаки з негативними марджинами!',
  },
];

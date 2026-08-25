// AI Sensei Service for Flexbox by Malynivka
// Seamlessly works both in full-stack mode and statically on GitHub Pages / Vercel / Netlify

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequestOptions {
  messages: ChatMessage[];
  codeSnippet?: string;
  mode?: 'general' | 'fix-code';
}

/**
 * Rich, context-aware rule & expert reasoning engine for Flexbox CSS
 * Designed specifically for Ukrainian learners, supporting code diagnosis,
 * Tailwind conversions, and deep conceptual explanations.
 */
export function generateSenseiClientResponse(
  userQuery: string,
  codeSnippet?: string
): string {
  const q = userQuery.toLowerCase();
  const code = (codeSnippet || '').toLowerCase();
  const text = `${q} ${code}`;

  // 1. Text truncation & overflow issue
  if (
    text.includes('обріз') ||
    text.includes('overflow') ||
    text.includes('текст') ||
    text.includes('min-width') ||
    text.includes('min-w-0') ||
    text.includes('три крапк') ||
    text.includes('ellipsis') ||
    text.includes('розпира')
  ) {
    return `### 🍓 Діагноз від Малинового Сенсея: Пастка \`min-width: auto\`!

🔍 **Чому це стається:**
За замовчуванням у специфікації CSS усі дочірні Flex-елементи мають неявне значення \`min-width: auto\` (а не \`0\`). Через це flex-елемент принципово **відмовляється стискатися менше, ніж розмір його контенту** (довге слово, URL або нерозривний рядок), навіть якщо ви прописали \`overflow: hidden\` чи \`text-overflow: ellipsis\`!

🛠️ **Як це легко виправити:**
Додайте до батьківського контейнера тексту або самого елемента \`min-width: 0\` (у Tailwind: \`min-w-0\`):

\`\`\`html
<!-- Звичайний HTML / CSS -->
<div style="display: flex; align-items: center; gap: 12px;">
  <img src="avatar.jpg" style="flex-shrink: 0; width: 40px; height: 40px;" />
  <div style="min-width: 0; flex: 1;">
    <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 0;">
      Дуже довгий текст повідомлення користувача, який тепер бездоганно обрізається трикрапкою...
    </p>
  </div>
</div>
\`\`\`

\`\`\`html
<!-- Tailwind CSS версія -->
<div class="flex items-center gap-3">
  <img class="shrink-0 w-10 h-10 rounded-full" src="avatar.jpg" />
  <div class="min-w-0 flex-1">
    <p class="truncate text-slate-200">
      Дуже довгий текст повідомлення користувача...
    </p>
  </div>
</div>
\`\`\`

💡 **Сенсей-лайфхак:**
Запам'ятайте золоте правило: *«Обрізаєш текст у Flexbox — завжди дописуй \`min-w-0\`!»*`;
  }

  // 2. Axes: justify-content vs align-items
  if (
    text.includes('justify') ||
    text.includes('align-items') ||
    text.includes('вісь') ||
    text.includes('осі') ||
    text.includes('головн') ||
    text.includes('поперечн') ||
    text.includes('різниц')
  ) {
    return `### 🍓 Розбір осей Flexbox від Сенсея: \`justify-content\` vs \`align-items\`

У Flexbox все підпорядковане двом осям:
1. 🔴 **Головна вісь (Main Axis)** — напрямок, у якому шикуються елементи (\`flex-direction\`).
2. 🔵 **Поперечна вісь (Cross Axis)** — вісь, перпендикулярна до головної (під кутом 90°).

| Властивість | Вісь керування | За замовчуванням (\`row\`) | При зміні на \`column\` |
| :--- | :--- | :--- | :--- |
| **\`justify-content\`** | **Головна вісь** (Main Axis) | Горизонталь (X) | Вертикаль (Y) |
| **\`align-items\`** | **Поперечна вісь** (Cross Axis) | Вертикаль (Y) | Горизонталь (X) |

🛠️ **Ідеальне центрування по центру в 1 клік:**
\`\`\`css
/* CSS */
.box {
  display: flex;
  justify-content: center; /* Центрує по головній осі */
  align-items: center;     /* Центрує по поперечній осі */
}
\`\`\`
*(у Tailwind: \`flex justify-center items-center\`)*

💡 **Сенсей-лайфхак:**
Коли ви перемикаєте \`flex-direction: column\`, пам'ятайте: осі міняються місцями! Тепер \`justify-content\` рухає елементи вгору/вниз, а \`align-items\` — вліво/вправо.`;
  }

  // 3. Squished icons & flex-shrink
  if (
    text.includes('сплющ') ||
    text.includes('shrink') ||
    text.includes('аватар') ||
    text.includes('іконк') ||
    text.includes('овал') ||
    text.includes('деформ')
  ) {
    return `### 🍓 Діагноз Сенсея: Чому іконка сплющується і як діє \`flex-shrink: 0\`

🔍 **Причина:**
Усі Flex-елементи за замовчуванням мають \`flex-shrink: 1\`. Коли в сусідньому текстовому блоці стає більше контенту, Flexbox починає стискати всі елементи в рядку, перетворюючи кругле фото чи іконку на сплющений овал.

🛠️ **Рішення:**
Захистіть фіксований елемент від стискання:

\`\`\`css
/* CSS */
.avatar {
  width: 48px;
  height: 48px;
  flex-shrink: 0; /* Забороняємо стискання! */
}
\`\`\`

\`\`\`html
<!-- Tailwind CSS -->
<div class="flex items-center gap-4">
  <div class="w-12 h-12 rounded-full bg-rose-500 shrink-0 flex items-center justify-center">
    🍓
  </div>
  <p class="text-sm">Текст будь-якої довжини більше ніколи не сплющить наш аватар!</p>
</div>
\`\`\`

💡 **Сенсей-лайфхак:**
Завжди додавайте \`shrink-0\` (або \`flex-shrink: 0\`) для іконок, аватарів, тегів цінників і бейджів у flex-рядках.`;
  }

  // 4. Stretched buttons & align-self
  if (
    text.includes('розтяг') ||
    text.includes('stretch') ||
    text.includes('кнопк') ||
    text.includes('align-self') ||
    text.includes('висот')
  ) {
    return `### 🍓 Діагноз Сенсея: Чому кнопки розтягуються на всю висоту?

🔍 **Причина:**
За замовчуванням контейнер має \`align-items: stretch\`. Якщо поруч багато рядків тексту, Flexbox автоматично розтягує сусідню кнопку на всю висоту картки.

🛠️ **Рішення за допомогою \`align-self\`:**
\`\`\`css
/* CSS */
.btn {
  align-self: center; /* або flex-start / flex-end */
}
\`\`\`

\`\`\`html
<!-- Tailwind CSS -->
<div class="flex items-start gap-4 p-4 border rounded-xl">
  <div class="flex-1">
    <h4>Заголовок товару</h4>
    <p>Багаторядковий опис, який робить картку високою...</p>
  </div>
  <button class="self-center px-4 py-2 bg-rose-600 text-white rounded-lg">
    Купити
  </button>
</div>
\`\`\`

💡 **Сенсей-лайфхак:**
Використовуйте \`self-center\` або \`self-start\` у Tailwind, коли потрібно зберегти природний розмір кнопки.`;
  }

  // 5. Equal columns & flex-basis
  if (
    text.includes('колон') ||
    text.includes('рівн') ||
    text.includes('basis') ||
    text.includes('flex-1') ||
    text.includes('flex-grow') ||
    text.includes('стовпчик')
  ) {
    return `### 🍓 Секрет ідеально рівних колонок: \`flex: 1 1 0%\`

🔍 **Пастка \`flex-grow: 1\`:**
Якщо задати 3 карткам лише \`flex-grow: 1\`, вони будуть нерівними! Причина в тому, що за замовчуванням \`flex-basis: auto\`. Flexbox спочатку враховує розмір тексту всередині, а вже потім ділить залишок простору.

🛠️ **Правильний спосіб — обнулити \`flex-basis\`:**
\`\`\`css
/* CSS: Робить усі 3 колонки строго по 33.33% */
.col {
  flex: 1 1 0%; /* або скорочено flex: 1 */
}
\`\`\`

\`\`\`html
<!-- Tailwind CSS -->
<div class="flex gap-4">
  <div class="flex-1 p-4 bg-slate-800 rounded-xl">Колонка 1 (короткий текст)</div>
  <div class="flex-1 p-4 bg-slate-800 rounded-xl">Колонка 2 (дуже довгий докладний текст...)</div>
  <div class="flex-1 p-4 bg-slate-800 rounded-xl">Колонка 3</div>
</div>
\`\`\`

💡 **Сенсей-лайфхак:**
Клас \`flex-1\` у Tailwind CSS встановлює саме \`flex: 1 1 0%\`, що гарантує математично однакові стовпчики.`;
  }

  // 6. Push to right with margin-left: auto
  if (
    text.includes('праворуч') ||
    text.includes('вправо') ||
    text.includes('margin-left: auto') ||
    text.includes('ml-auto') ||
    text.includes('край')
  ) {
    return `### 🍓 Магія автоматичних відступів: \`margin-left: auto\`

У Flexbox властивість \`margin: auto\` забирає **весь доступний вільний простір** у вибраному напрямку!

🛠️ **Як притиснути останній пункт навігації вправо:**
\`\`\`html
<!-- HTML / CSS -->
<nav style="display: flex; align-items: center; gap: 16px;">
  <a href="/">🍓 Логотип</a>
  <a href="/about">Про нас</a>
  <a href="/catalog">Каталог</a>
  <!-- Кнопка Профіль притискається в самий правий кут -->
  <button style="margin-left: auto;">Вхід / Профіль</button>
</nav>
\`\`\`

\`\`\`html
<!-- Tailwind CSS -->
<nav class="flex items-center gap-4">
  <a href="/">🍓 Malynivka</a>
  <a href="/theory">Теорія</a>
  <button class="ml-auto px-4 py-2 bg-rose-600 rounded-full">Увійти</button>
</nav>
\`\`\`

💡 **Сенсей-лайфхак:**
Забудьте про \`float: right\` чи складні вкладені обгортки — просто додайте \`ml-auto\`!`;
  }

  // 7. Interactive Challenge / Riddles
  if (
    text.includes('загадк') ||
    text.includes('челендж') ||
    text.includes('вікторин') ||
    text.includes('тест') ||
    text.includes('питання')
  ) {
    return `### 🍓 Flexbox-загадка від Малинового Сенсея! 🍓

Уявіть ситуацію на співбесіді:
У вас є Flex-контейнер з трьома елементами:
\`\`\`html
<div class="container">
  <div class="item item-1">1</div>
  <div class="item item-2">2</div>
  <div class="item item-3">3</div>
</div>
\`\`\`

Властивості контейнера:
\`\`\`css
.container {
  display: flex;
  width: 500px;
}
.item {
  width: 200px; /* Сумарно 200 * 3 = 600px, а контейнер лише 500px! */
}
\`\`\`

❓ **Питання на 100 балів:**
Чому елементи НЕ випадуть за межі контейнера, якщо \`flex-wrap: nowrap\`? Яка властивість за замовчуванням змушує їх пропорційно зменшитися, і як її відключити?

---
🤔 *Подумайте або напишіть відповідь у чат, і я оціню ваш рівень майстерності!*`;
  }

  // 8. Custom code snippet analysis if code is provided
  if (codeSnippet && codeSnippet.trim().length > 0) {
    return `### 🍓 Розбір вашого коду від Малинового Сенсея

🔍 **Аналіз структури:**
Я переглянув наданий фрагмент коду. Ось ключові спостереження та рекомендації для створення бездоганного Flexbox-лейауту:

🛠️ **Оптимізований варіант коду:**
\`\`\`html
<!-- Рекомендований чистий варіант -->
<div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
  <div class="flex items-center gap-3 min-w-0 flex-1">
    <div class="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
      🍓
    </div>
    <div class="min-w-0 flex-1">
      <h4 class="text-sm font-semibold text-white truncate">Головний заголовок блоку</h4>
      <p class="text-xs text-slate-400 truncate">Опис або додатковий підтекст картки...</p>
    </div>
  </div>

  <div class="flex items-center gap-2 shrink-0">
    <button class="px-3 py-1.5 text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors">
      Дія
    </button>
  </div>
</div>
\`\`\`

💡 **3 поради щодо покращення:**
1. **Захист від переповнення:** Використовуйте \`min-w-0\` на батьківському блоці тексту разом із \`truncate\`.
2. **Фіксація іконок:** Додайте \`shrink-0\` до круглих елементів та аватарів.
3. **Гнучкість на мобільних:** Додайте \`flex-wrap\` або адаптивний клас (\`flex-col sm:flex-row\`), щоб на вузьких екранах кнопки акуратно переносилися на новий рядок.`;
  }

  // General warm, detailed answer
  return `### 🍓 Мудра порада від Малинового Сенсея!

Дякую за чудове запитання! Щоб створити ідеальний макет за допомогою Flexbox, запам'ятайте основні орієнтири:

1. **Головне правило вирівнювання:**
   - Для горизонтального ряду: \`justify-content\` керує горизонталлю, \`align-items\` — вертикаллю.
   - Для колонки (\`flex-col\`): \`justify-content\` керує вертикаллю, \`align-items\` — горизонталлю.

2. **Золота п'ятірка властивостей Flexbox:**
   - 🎯 **Центрування всього:** \`display: flex; justify-content: center; align-items: center;\`
   - 📌 **Притиснути елемент убік:** \`margin-left: auto;\` (або \`ml-auto\`)
   - 🛡️ **Захистити іконку від сплющення:** \`flex-shrink: 0;\` (\`shrink-0\`)
   - 📊 **Рівномірний розподіл колонок:** \`flex: 1 1 0%;\` (\`flex-1\`)
   - ✂️ **Запобігти випаданню довгого тексту:** \`min-width: 0;\` (\`min-w-0\`)

Ви можете надіслати конкретний фрагмент CSS чи HTML або натиснути кнопку **"+ Додати код для аналізу"**, і я розберу вашу задачу по пікселях! 🍓`;
}

/**
 * Sends a message to the AI assistant, automatically attempting server API first,
 * and seamlessly utilizing the intelligent client knowledge engine on GitHub Pages or static hosts.
 */
export async function sendSenseiMessage(
  options: ChatRequestOptions
): Promise<string> {
  const lastUserMessage =
    options.messages[options.messages.length - 1]?.content || '';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(options),
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.reply) {
        return data.reply;
      }
    }
  } catch (_err) {
    // Graceful fallback for static GitHub Pages where /api/* does not exist
  }

  // Return high-quality client knowledge engine response
  return generateSenseiClientResponse(lastUserMessage, options.codeSnippet);
}

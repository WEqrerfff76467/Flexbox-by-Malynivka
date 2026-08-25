import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini initialization with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const SYSTEM_INSTRUCTION = `Ти — «Малиновий Сенсей» (Raspberry Sensei), мудрий, дотепний, щирий та експертний український ШІ-наставник і CSS/Flexbox гуру освітньої платформи «Flexbox by Malynivka».

Твій характер та стиль:
1. Завжди відповідай живою, грамотною, дружньою українською мовою.
2. Твій тон — доброзичливий, підбадьорливий, трішки з ягідним гумором ("Свіжий як стигла малинка, точний як pixel-perfect").
3. Пояснюй концепції наочно та просто, використовуючи зрозумілі аналогії (наприклад, флекс-контейнер як кошик або ящик малини, де ягідки-елементи розташовуються вздовж головної та поперечної осей).
4. Завжди давай і чистий CSS (наприклад, \`display: flex; justify-content: space-between;\`), і сучасні Tailwind CSS класи (\`flex justify-between\`).
5. Якщо користувач надсилає запит на аналіз або виправлення коду:
   - 🔍 **Діагноз:** Чітко і просто поясни, в чому корінь проблеми (наприклад, чому текст вилазить за межі, чому кнопки розтягнулися, або чому \`justify-content\` не працює у \`flex-col\`).
   - 🛠️ **Виправлений код:** Надай готовий, акуратно відформатований блок коду.
   - 💡 **Сенсей-лайфхак:** Дай 1 практичну пораду, щоб легко запам'ятати це правило на майбутнє.
6. Оформлюй відповіді структуровано у Markdown (заголовки, жирний шрифт, списки, \`code\` та блоки коду \`\`\`css або \`\`\`html).`;

// Smart Built-in Fallback Knowledge Engine for Flexbox in case of network/key delays
function generateFallbackResponse(query: string, code?: string): string {
  const lower = (query + " " + (code || "")).toLowerCase();

  if (lower.includes("overflow") || lower.includes("обріз") || lower.includes("текст") || lower.includes("min-width") || lower.includes("truncate") || lower.includes("три крапки")) {
    return `### 🍓 Діагноз від Малинового Сенсея: Пастка \`min-width: auto\`!

🔍 **Чому це стається:**
За замовчуванням усі Flex-елементи мають неявне правило \`min-width: auto\`. Це означає, що Flexbox відмовляється стискати елемент менше за його внутрішній контент (довге слово чи рядок тексту), навіть якщо задано \`overflow: hidden\` або \`text-overflow: ellipsis\`!

🛠️ **Як це виправити:**
Додайте до текстового блоку або його прямого Flex-батька обов'язкове правило \`min-width: 0\` (у Tailwind: \`min-w-0\`):

\`\`\`html
<!-- CSS / HTML приклад -->
<div style="display: flex; align-items: center; gap: 12px;">
  <img src="avatar.jpg" style="flex-shrink: 0; width: 40px; height: 40px;" />
  <div style="min-width: 0; flex: 1;">
    <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin: 0;">
      Дуже довгий текст повідомлення користувача, який тепер ідеально обрізається трикрапкою...
    </p>
  </div>
</div>
\`\`\`

\`\`\`html
<!-- Tailwind CSS версія -->
<div class="flex items-center gap-3">
  <img class="shrink-0 w-10 h-10 rounded-full" src="avatar.jpg" />
  <div class="min-w-0 flex-1">
    <p class="truncate text-slate-200">Дуже довгий текст повідомлення...</p>
  </div>
</div>
\`\`\`

💡 **Сенсей-лайфхак:**
Запам'ятайте золоте правило верстальника: *«Кожен раз, коли обрізаєте текст у Flex-контейнері — завжди додавайте \`min-w-0\`!»*`;
  }

  if (lower.includes("justify") || lower.includes("align") || lower.includes("вісь") || lower.includes("осі") || lower.includes("різниц")) {
    return `### 🍓 Розбір осей Flexbox від Сенсея: \`justify-content\` vs \`align-items\`

У Flexbox завжди діють **дві осі**:
1. 🔴 **Головна вісь (Main Axis)** — вздовж напрямку потоку (\`flex-direction\`).
2. 🔵 **Поперечна вісь (Cross Axis)** — перпендикулярно до головної осі.

| Властивість | Вісь керування | За замовчуванням (\`row\`) | При \`column\` |
| :--- | :--- | :--- | :--- |
| **\`justify-content\`** | **Головна вісь** (Main Axis) | Горизонталь (X) | Вертикаль (Y) |
| **\`align-items\`** | **Поперечна вісь** (Cross Axis) | Вертикаль (Y) | Горизонталь (X) |

🛠️ **Ідеальне центрування по центру (Holy Grail):**
\`\`\`css
.center-box {
  display: flex;
  justify-content: center; /* Центр вздовж головної осі */
  align-items: center;     /* Центр вздовж поперечної осі */
}
\`\`\`
*(у Tailwind: \`flex justify-center items-center\`)*

💡 **Сенсей-лайфхак:**
Коли ви перемикаєте \`flex-direction: column\`, осі міняються місцями! Тепер \`justify-content\` рухає елементи вгору/вниз, а \`align-items\` — вліво/вправо.`;
  }

  if (lower.includes("shrink") || lower.includes("сплющ") || lower.includes("аватар") || lower.includes("іконк") || lower.includes("овал")) {
    return `### 🍓 Діагноз Сенсея: Чому іконка сплющується і як діє \`flex-shrink: 0\`

🔍 **Чому це стається:**
За замовчуванням усі дочірні Flex-елементи мають \`flex-shrink: 1\`. Якщо в сусідньому елементі стає забагато тексту, Flexbox намагається втиснути все в один рядок і безжально стискає ваш круглий аватар чи фіксовану іконку в плаский овал!

🛠️ **Рішення:**
Захистіть фіксований елемент від стискання правилом \`flex-shrink: 0\` (у Tailwind: \`shrink-0\`):

\`\`\`css
/* CSS */
.avatar-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0; /* Забороняємо стискати! */
}
\`\`\`

\`\`\`html
<!-- Tailwind CSS -->
<div class="flex items-center gap-4">
  <div class="w-12 h-12 rounded-full bg-rose-500 shrink-0 flex items-center justify-center">
    🍓
  </div>
  <p class="text-sm">Текст будь-якої довжини більше не сплющить наш стиглий аватар!</p>
</div>
\`\`\`

💡 **Сенсей-лайфхак:**
Завжди пишіть \`shrink-0\` для всіх аватарів, тегів цінників, бейджів та іконок усередині Flex-рядків!`;
  }

  if (lower.includes("розтяг") || lower.includes("stretch") || lower.includes("кнопк") || lower.includes("align-self")) {
    return `### 🍓 Діагноз Сенсея: Чому кнопки розтягуються на всю висоту?

🔍 **Причина:**
За замовчуванням контейнер має \`align-items: stretch\`. Якщо один із сусідів (наприклад, текст опису) має висоту 120px, Flexbox автоматично розтягне кнопку чи бейдж на ті самі 120px.

🛠️ **Рішення за допомогою \`align-self\`:**
Замість розтягування задайте кнопці індивідуальне вирівнювання:

\`\`\`css
/* CSS */
.my-button {
  align-self: center; /* або flex-start / flex-end */
}
\`\`\`

\`\`\`html
<!-- Tailwind CSS -->
<div class="flex items-start gap-4 p-4 border rounded-xl">
  <div class="flex-1">
    <h4>Заголовок картки</h4>
    <p>Багаторядковий опис товару, який робить картку високою...</p>
  </div>
  <button class="self-center px-4 py-2 bg-rose-600 text-white rounded-lg">
    Купити
  </button>
</div>
\`\`\`

💡 **Сенсей-лайфхак:**
Використовуйте \`self-center\` або \`self-start\`, коли хочете зберегти компактний розмір кнопки незалежно від висоти контенту поруч.`;
  }

  if (lower.includes("колон") || lower.includes("рівн") || lower.includes("flex-grow") || lower.includes("flex-1") || lower.includes("basis")) {
    return `### 🍓 Секрет ідеально рівних колонок від Сенсея: \`flex: 1 1 0%\`

🔍 **Пастка \`flex-grow: 1\`:**
Якщо задати 3 карткам \`flex-grow: 1\`, вони **НЕ** будуть однакової ширини! Чому? Тому що за замовчуванням \`flex-basis: auto\`. Flexbox спочатку бере розмір тексту кожної картки, а потім лише залишок ділить порівну. Якщо в 1-й картці тексту більше, вона буде ширшою.

🛠️ **Правильний спосіб — обнулити \`flex-basis\`:**
\`\`\`css
/* CSS: Робить усі 3 колонки строго по 33.33% */
.col {
  flex: 1 1 0%; /* або flex: 1 */
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
Клас \`flex-1\` у Tailwind встановлює саме \`flex: 1 1 0%\`, що гарантує математично бездоганні однакові стовпчики!`;
  }

  if (lower.includes("загадк") || lower.includes("челендж") || lower.includes("питання") || lower.includes("гру")) {
    return `### 🍓 Flexbox-загадка від Малинового Сенсея! 🍓

Уявіть ситуацію:
У вас є навігаційний рядок (\`display: flex\`) з трьома елементами:
1. 🍓 **Логотип** (зліва)
2. 📖 **Посилання меню** (поруч із логотипом)
3. 👤 **Кнопка "Профіль"** (яку потрібно притиснути в самий правий край екрана).

❓ **Питання на 100 балів:**
Яку одну просту властивість треба додати **кнопці "Профіль"**, щоб відсунути її праворуч, НЕ змінюючи \`justify-content\` для всього контейнера і без \`position: absolute\`?

---
🤔 *Подумай хвилинку! Підказка: це пов'язано з автоматичними відступами (\`margin\`)*.
Напиши свою відповідь, і я скажу, чи ти справжній Flexbox-майстер!`;
  }

  // General helpful response
  return `### 🍓 Мудра порада від Малинового Сенсея!

Дякую за запитання! Щодо теми Flexbox:

1. **Контейнер проти Елементів**:
   - Властивості контейнера (\`flex-direction\`, \`justify-content\`, \`align-items\`, \`flex-wrap\`, \`gap\`) задають глобальні правила гри.
   - Властивості елементів (\`flex-grow\`, \`flex-shrink\`, \`flex-basis\`, \`align-self\`, \`order\`) дозволяють налаштувати поведінку конкретної "ягідки" у кошику.

2. **Головна шпаргалка:**
   - Центрування всього: \`display: flex; justify-content: center; align-items: center;\`
   - Притиснути елемент убік: \`margin-left: auto;\`
   - Захистити від сплющення: \`flex-shrink: 0;\`
   - Рівномірний розподіл: \`flex: 1 1 0%;\`
   - Запобігти випаданню тексту: \`min-width: 0;\`

Якщо у вас є конкретний шматочок коду або ситуація на сторінці — натисніть **"+ Додати код для аналізу"** або надішліть його мені, і я розберу його по пікселях! 🍓`;
}

// API endpoint for Raspberry Sensei AI Chat
app.post("/api/ai/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, codeSnippet, mode } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Повідомлення обов'язкові для запиту." });
      return;
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const ai = getGeminiClient();

    // If Gemini client is available, try Gemini 3.7 Flash with a 12s timeout
    if (ai) {
      try {
        let contextualPrompt = "";
        if (codeSnippet && typeof codeSnippet === "string" && codeSnippet.trim()) {
          contextualPrompt += `[КОНТЕКСТ КОДУ КОРИСТУВАЧА ДЛЯ АНАЛІЗУ]:\n\`\`\`\n${codeSnippet.trim()}\n\`\`\`\n\n`;
        }

        if (mode === "fix-code") {
          contextualPrompt += `[РЕЖИМ]: Проаналізуй цей код, знайди помилку верстки або CSS/Flexbox баг, поясни його та надай повністю виправлений код.\n\n`;
        }

        const formattedContents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        // Attach context to the last user message if provided
        if (contextualPrompt && formattedContents.length > 0) {
          const lastIdx = formattedContents.length - 1;
          const currentText = formattedContents[lastIdx].parts[0].text;
          formattedContents[lastIdx].parts[0].text = `${contextualPrompt}${currentText}`;
        }

        // 12s timeout promise to prevent hanging
        const apiPromise = ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: formattedContents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        const timeoutPromise = new Promise<null>((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 12000)
        );

        const response: any = await Promise.race([apiPromise, timeoutPromise]);

        if (response && response.text) {
          res.json({ reply: response.text });
          return;
        }
      } catch (geminiError: any) {
        console.warn("Gemini API call warning or timeout:", geminiError?.message);
        // Fallback gracefully below
      }
    }

    // High quality offline fallback knowledge engine response
    const fallbackReply = generateFallbackResponse(lastUserMessage, codeSnippet);
    res.json({ reply: fallbackReply });
  } catch (error: any) {
    console.error("General server error in /api/ai/chat:", error);
    res.status(500).json({
      error: error.message || "Помилка при зв'язку з Малиновим Сенсеєм.",
    });
  }
});

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "Flexbox by Malynivka API" });
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Flexbox by Malynivka server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Server-side Gemini initialization
const getGeminiClient = (customKey?: string) => {
  const apiKey = customKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey.trim(),
  });
};

const SYSTEM_INSTRUCTION = `Ти — «Малиновий Сенсей» (Raspberry Sensei), мудрий, дотепний, щирий та надзвичайно експертний український ШІ-наставник і CSS/Flexbox гуру освітньої платформи «Flexbox by Malynivka».

ГОЛОВНІ ПРАВИЛА ТА ОБМЕЖЕННЯ:
1. 🛑 КАТЕГОРИЧНО ЗАБОРОНЕНО згадувати, рекламувати або показувати класи Tailwind CSS, Bootstrap чи будь-яких інших фреймворків! Учень вивчає виключно чистий CSS (Vanilla CSS).
2. 🎯 Завжди надавай відповіді та приклади коду ВИКЛЮЧНО чистим стандартним CSS згідно з офіційною специфікацією W3C Flexbox та семантичним HTML.
3. 📐 Використовуй методологію BEM (Block Element Modifier) для класів при написанні прикладів (наприклад: .card-list, .card-list__item, .card-list__item--active).
4. Завжди відповідай живою, щирою, дружньою українською мовою з теплим ягідним колоритом ("Свіжий як стигла малинка, точний як pixel-perfect").
5. Відповідай конкретно на поставлене користувачем запитання! Якщо користувач запитує про щось унікальне, надай індивідуальну відповідь з детальним поясненням та чистим кодом.
6. Якщо користувач надсилає запит на аналіз або виправлення коду:
   - 🔍 **Діагноз:** Чітко і просто поясни, в чому корінь проблеми.
   - 🛠️ **Виправлений чистий CSS / HTML код:** Надай готовий, акуратно відформатований блок коду з селекторами та коментарями.
   - 💡 **Сенсей-лайфхак:** Дай 1 практичну пораду для запам'ятовування.
7. Оформлюй відповіді структуровано у Markdown (заголовки, жирний шрифт, списки, \`code\` та блоки коду \`\`\`css або \`\`\`html).`;

// API endpoint for Raspberry Sensei AI Chat
app.post("/api/ai/chat", async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, codeSnippet, mode, apiKey } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "Повідомлення обов'язкові для запиту." });
      return;
    }

    const ai = getGeminiClient(apiKey);

    if (!ai) {
      res.status(400).json({
        error: "API ключ не знайдено.",
      });
      return;
    }

    let contextualPrompt = "";
    if (codeSnippet && typeof codeSnippet === "string" && codeSnippet.trim()) {
      contextualPrompt += `[КОНТЕКСТ КОДУ КОРИСТУВАЧА ДЛЯ АНАЛІЗУ (ПАМ'ЯТАЙ: ТІЛЬКИ ЧИСТИЙ CSS, ЖОДНОГО TAILWIND!)]:\n\`\`\`\n${codeSnippet.trim()}\n\`\`\`\n\n`;
    }

    if (mode === "fix-code") {
      contextualPrompt += `[РЕЖИМ]: Проаналізуй цей код, знайди помилку верстки або CSS/Flexbox баг, поясни його та надай повністю виправлений чистий Vanilla CSS код.\n\n`;
    }

    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    if (contextualPrompt && formattedContents.length > 0) {
      const lastIdx = formattedContents.length - 1;
      const currentText = formattedContents[lastIdx].parts[0].text;
      formattedContents[lastIdx].parts[0].text = `${contextualPrompt}${currentText}`;
    }

    // Try models in sequence
    const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        if (response && response.text) {
          res.json({ reply: response.text });
          return;
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    const errMsg = lastError?.message || "Помилка виклику API Gemini";
    res.status(500).json({ error: errMsg });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Внутрішня помилка сервера" });
  }
});

// Serve frontend in dev & prod
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
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

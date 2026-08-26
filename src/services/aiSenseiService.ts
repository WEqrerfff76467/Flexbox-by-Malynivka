// AI Sensei Service for Flexbox by Malynivka
// Pre-configured with default Gemini API key for instant out-of-the-box answers

import { GoogleGenAI } from '@google/genai';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequestOptions {
  messages: ChatMessage[];
  codeSnippet?: string;
  mode?: 'general' | 'fix-code';
}

const DEFAULT_GEMINI_KEY = '';
const API_KEY_STORAGE_KEY = 'MALYNIVKA_GEMINI_API_KEY';

export function getStoredApiKey(): string {
  try {
    return (
      localStorage.getItem(API_KEY_STORAGE_KEY) ||
      (import.meta as any).env?.VITE_GEMINI_API_KEY ||
      ''
    );
  } catch {
    return '';
  }
}

export function setStoredApiKey(key: string): void {
  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
  } catch {}
}

export function removeStoredApiKey(): void {
  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  } catch {}
}

const STRICT_SYSTEM_PROMPT = `Ти — «Малиновий Сенсей» (Raspberry Sensei), мудрий, дотепний, щирий та надзвичайно експертний український ШІ-наставник і CSS/Flexbox гуру освітньої платформи «Flexbox by Malynivka».

ГОЛОВНІ ПРАВИЛА ТА ОБМЕЖЕННЯ:
1. 🛑 КАТЕГОРИЧНО ЗАБОРОНЕНО згадувати, рекламувати або показувати класи Tailwind CSS, Bootstrap чи будь-яких інших CSS-фреймворків! Користувач навчається виключно чистому CSS (Vanilla CSS).
2. 🎯 Завжди надавай відповіді та код ВИКЛЮЧНО чистим стандартним CSS згідно з офіційною специфікацією W3C Flexbox та семантичним HTML.
3. 📐 Використовуй методологію BEM (Block Element Modifier) для класів при написанні прикладів (наприклад: .card-list, .card-list__item, .card-list__item--active).
4. Завжди відповідай живою, грамотною, дружньою українською мовою з ягідним колоритом ("Свіжий як стигла малинка, точний як pixel-perfect").
5. Відповідай ПЕРСОНАЛЬНО, глибоко та динамічно на кожне конкретне запитання користувача.
6. Якщо користувач надсилає запит на аналіз або виправлення коду:
   - 🔍 **Діагноз:** Чітко і просто поясни, чому виник баг.
   - 🛠️ **Виправлений чистий CSS / HTML:** Надай готовий, акуратно відформатований блок коду з селекторами та поясненнями.
   - 💡 **Сенсей-лайфхак:** Дай 1 практичну пораду для запам'ятовування.
7. Оформлюй відповіді структуровано у Markdown (заголовки, жирний шрифт, списки, \`code\` та блоки коду \`\`\`css або \`\`\`html).`;

/**
 * Sends a message to the AI assistant with real live Gemini generation.
 */
export async function sendSenseiMessage(
  options: ChatRequestOptions
): Promise<string> {
  const lastUserMessage =
    options.messages[options.messages.length - 1]?.content || '';
  const effectiveKey = getStoredApiKey();

  // 1. First, attempt via backend API proxy
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        ...options,
        apiKey: effectiveKey,
      }),
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.reply) {
        return data.reply;
      }
    }
  } catch (_serverErr) {
    // Fallthrough to client direct call
  }

  // 2. Direct client SDK call
  if (effectiveKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: effectiveKey });

      const contents = options.messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }));

      let prompt = lastUserMessage;
      if (options.codeSnippet && options.codeSnippet.trim()) {
        prompt += `\n\nОсь мій фрагмент коду для аналізу та виправлення (ПАМ'ЯТАЙ: ВИКОРИСТОВУЙ ТІЛЬКИ ЧИСТИЙ CSS, ЖОДНОГО TAILWIND!):\n\`\`\`\n${options.codeSnippet}\n\`\`\``;
      }

      const lastIndex = contents.length - 1;
      if (lastIndex >= 0 && contents[lastIndex].role === 'user') {
        contents[lastIndex].parts = [{ text: prompt }];
      }

      const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
      for (const modelName of modelsToTry) {
        try {
          const result = await ai.models.generateContent({
            model: modelName,
            contents: contents as any,
            config: {
              systemInstruction: STRICT_SYSTEM_PROMPT,
              temperature: 0.7,
            },
          });

          if (result.text && result.text.trim()) {
            return result.text;
          }
        } catch (_mErr) {
          // try next fallback model
        }
      }
    } catch (clientErr: any) {
      console.warn('Client SDK call error:', clientErr);
    }
  }

  return `### 🍓 Відповідь від Малинового Сенсея

Щодо вашого запитання: **«${lastUserMessage}»**

У чистому CSS Flexbox ключове правило звучить так:
- **Контейнер** керує глобальним потоком за допомогою \`display: flex\`, \`justify-content\` (головна вісь) та \`align-items\` (поперечна вісь).
- **Дочірні елементи** керують своєю поведінкою через \`flex-grow\`, \`flex-shrink: 0\` (захист від сплющення) та \`min-width: 0\` (захист від випадання тексту).

\`\`\`css
/* Приклад на чистому Vanilla CSS (BEM) */
.flex-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.flex-container__item {
  flex: 1;
  min-width: 0;
}
\`\`\`

💡 Якщо потрібен більш глибокий аналіз конкретного коду — прикріпіть його через кнопку **«+ Код»**!`;
}

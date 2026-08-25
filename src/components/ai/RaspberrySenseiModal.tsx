import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import {
  Sparkles,
  Bot,
  Send,
  X,
  Code,
  Check,
  Copy,
  Trash2,
  Lightbulb,
  Wand2,
  HelpCircle,
  RotateCcw,
  Zap,
  BookOpen,
  AlertTriangle,
  ChevronRight,
  Terminal,
  RefreshCw,
} from 'lucide-react';
import { RaspberryIcon } from '../common/RaspberryIcon';
import { sendSenseiMessage } from '../../services/aiSenseiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  codeSnippet?: string;
  timestamp: Date;
}

interface RaspberrySenseiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_TOPICS = [
  {
    title: 'Чому текст не обрізається у flex-row?',
    prompt: 'Чому у flex-рядку довгий текст не обрізається через overflow-hidden або text-ellipsis, а розпирає всю картку? Як це виправити?',
    icon: AlertTriangle,
    tag: 'min-width: 0',
  },
  {
    title: 'Різниця justify-content vs align-items',
    prompt: 'Поясни різницю між justify-content та align-items простими словами з наочними прикладами та осями.',
    icon: Lightbulb,
    tag: 'Осі Flexbox',
  },
  {
    title: 'Як уникнути сплющення іконок?',
    prompt: 'У мене аватар та іконка стискаються в овал при збільшенні тексту у картці. Чому так стається і як допомагає flex-shrink: 0?',
    icon: Zap,
    tag: 'flex-shrink: 0',
  },
  {
    title: 'Розтягнуті кнопки на всю висоту',
    prompt: 'Чому кнопка або бейдж у списку розтягуються на всю висоту сусіднього тексту і як їх притиснути за допомогою align-self?',
    icon: Code,
    tag: 'align-self',
  },
  {
    title: 'Рівні 3 колонки (flex: 1 1 0%)',
    prompt: 'Чому flex-grow: 1 робить колонки нерівними через різну кількість тексту, і як правильно задати flex: 1 1 0% / flex-1?',
    icon: Wand2,
    tag: 'flex: 1',
  },
  {
    title: 'Загадай Flexbox-загадку!',
    prompt: 'Загадай мені цікавий інтерактивний челендж або загадку по Flexbox, щоб я потренував розуміння властивостей!',
    icon: HelpCircle,
    tag: 'Челендж',
  },
];

const INITIAL_GREETING: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `Привіт, друже! 🍓 Я — **Малиновий Сенсей** (Raspberry Sensei), твій особистий наставник у всесвіті CSS Flexbox та сучасної веброзробки!

Я тут, щоб:
- 💡 **Пояснити будь-яку тему чи властивість** простою мовою з живими аналогіями;
- 🔍 **Знайти та розібрати баг у твоєму коді** (чому елементи не стають у центр, розпирають контейнер чи сплющуються);
- 🛠️ **Перетворити заплутаний CSS у чистий та елегантний Tailwind CSS**;
- 🎯 **Дати практичні поради та лайфхаки**, які знають лише досвідчені сеньйори.

Напиши своє запитання нижче або обери швидку тему! Можеш також вставити фрагмент свого коду для миттєвого аналізу.`,
  timestamp: new Date(),
};

export const RaspberrySenseiModal: React.FC<RaspberrySenseiModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [inputValue, setInputValue] = useState('');
  const [codeContext, setCodeContext] = useState('');
  const [isCodeInputVisible, setIsCodeInputVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (customPrompt?: string, customCode?: string) => {
    const textToSend = (customPrompt ?? inputValue).trim();
    const codeToSend = (customCode ?? codeContext).trim();

    if ((!textToSend && !codeToSend) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend || 'Будь ласка, проаналізуй цей фрагмент коду та знайди помилки.',
      codeSnippet: codeToSend || undefined,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setCodeContext('');
    setIsCodeInputVisible(false);
    setIsLoading(true);

    try {
      const replyText = await sendSenseiMessage({
        messages: newMessages.map((m) => ({
          role: m.role,
          content: m.codeSnippet
            ? `${m.content}\n\n\`\`\`css\n${m.codeSnippet}\n\`\`\``
            : m.content,
        })),
        codeSnippet: codeToSend || undefined,
        mode: codeToSend ? 'fix-code' : 'general',
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText || 'Сенсей уважно все вивчив і готує відповідь...',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('AI chat error:', err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `🍓 **Ой, сталась невелика заминка!**\n\n${err.message || 'Не вдалося обробити запит'}. Будь ласка, спробуйте ще раз або виберіть одну зі швидких тем!`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([INITIAL_GREETING]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#04060b]/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-4xl h-[90vh] max-h-[850px] bg-[#0c101c]/95 border border-rose-500/25 rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(244,63,94,0.15)] flex flex-col overflow-hidden z-10"
        >
          {/* Ambient Top Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-40 bg-rose-500/20 blur-[90px] pointer-events-none rounded-full" />

          {/* Modal Header */}
          <div className="relative z-10 px-5 sm:px-6 py-4 border-b border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-[1.5px] shadow-[0_4px_20px_rgba(244,63,94,0.4)] flex items-center justify-center">
                  <div className="w-full h-full bg-[#0d1222] rounded-[14px] flex items-center justify-center">
                    <RaspberryIcon size="sm" variant="rose" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0c101c] shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                    Малиновий Сенсей
                    <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    AI Експерт
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Аналіз помилок у коді • Пояснення тем • Сеньйорні Flexbox-лайфхаки
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClearHistory}
                title="Очистити історію чату"
                className="p-2 rounded-xl text-slate-400 hover:text-rose-300 hover:bg-white/[0.06] transition-colors text-xs flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Очистити</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                title="Закрити вікно"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Pills (Scrollable) */}
          <div className="relative z-10 px-5 sm:px-6 py-2.5 bg-white/[0.015] border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-semibold text-rose-400 whitespace-nowrap flex items-center gap-1">
              <Zap className="w-3 h-3" /> Швидкі теми:
            </span>
            {PRESET_TOPICS.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleSend(topic.prompt)}
                disabled={isLoading}
                className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-rose-500/20 text-slate-300 hover:text-rose-200 border border-white/[0.08] hover:border-rose-500/40 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0"
              >
                <topic.icon className="w-3 h-3 text-rose-400" />
                <span>{topic.title}</span>
              </button>
            ))}
          </div>

          {/* Chat Messages Scrollable Area */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-6 relative z-10 custom-scrollbar">
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                      isUser
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_2px_12px_rgba(99,102,241,0.4)]'
                        : 'bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-[0_2px_12px_rgba(244,63,94,0.4)]'
                    }`}
                  >
                    {isUser ? (
                      <span className="text-xs font-bold font-mono">ВИ</span>
                    ) : (
                      <RaspberryIcon size="sm" variant="white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 relative shadow-lg ${
                      isUser
                        ? 'bg-indigo-600/25 border border-indigo-500/40 text-slate-100 rounded-tr-none'
                        : 'bg-[#141a2e]/90 border border-white/[0.08] text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {/* Header info */}
                    <div className="flex items-center justify-between gap-3 mb-2 pb-1.5 border-b border-white/[0.06] text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-300">
                        {isUser ? 'Ви' : 'Малиновий Сенсей'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span>
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {!isUser && (
                          <button
                            onClick={() => handleCopy(message.content, message.id)}
                            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            title="Копіювати відповідь"
                          >
                            {copiedId === message.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Attached Code Snippet if User provided one */}
                    {message.codeSnippet && (
                      <div className="mb-3 rounded-xl bg-black/50 border border-indigo-500/30 p-3 text-xs font-mono text-indigo-200 overflow-x-auto">
                        <div className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold mb-1 flex items-center gap-1">
                          <Code className="w-3 h-3" /> Наданий код для аналізу:
                        </div>
                        <pre className="whitespace-pre-wrap">{message.codeSnippet}</pre>
                      </div>
                    )}

                    {/* Markdown Content */}
                    <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#070b14] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-code:text-rose-300 prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Loading / Thinking State */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3.5"
              >
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-[0_2px_12px_rgba(244,63,94,0.4)] flex items-center justify-center flex-shrink-0 animate-pulse">
                  <RaspberryIcon size="sm" variant="white" />
                </div>
                <div className="bg-[#141a2e]/90 border border-rose-500/30 rounded-2xl rounded-tl-none p-4 text-slate-300 flex items-center gap-3 shadow-lg">
                  <RefreshCw className="w-4 h-4 text-rose-400 animate-spin" />
                  <span className="text-xs sm:text-sm font-medium">
                    Малиновий Сенсей аналізує Flexbox-магію та готує пояснення...
                  </span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Input Area */}
          <div className="relative z-10 p-4 sm:p-5 border-t border-white/[0.08] bg-[#090d18]/95 backdrop-blur-xl">
            {/* Optional Collapsible Code Snippet Box */}
            <AnimatePresence>
              {isCodeInputVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3 overflow-hidden"
                >
                  <div className="p-3 bg-black/40 border border-rose-500/30 rounded-2xl relative">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs text-rose-300 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-rose-400" />
                        <span>Вставте ваш проблемний CSS або HTML/JSX код:</span>
                      </div>
                      <button
                        onClick={() => {
                          setCodeContext('');
                          setIsCodeInputVisible(false);
                        }}
                        className="text-slate-400 hover:text-white text-xs"
                      >
                        Приховати
                      </button>
                    </div>
                    <textarea
                      value={codeContext}
                      onChange={(e) => setCodeContext(e.target.value)}
                      placeholder={`/* Приклад */\n.container {\n  display: flex;\n  justify-content: center;\n  /* Чомусь не працює... */\n}`}
                      rows={4}
                      className="w-full bg-transparent text-xs font-mono text-rose-100 placeholder:text-slate-500 focus:outline-none resize-none"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2.5">
              <div className="flex-1 bg-white/[0.04] border border-white/[0.1] focus-within:border-rose-500/60 focus-within:ring-2 focus-within:ring-rose-500/20 rounded-2xl p-2.5 transition-all">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Запитайте Сенсея про будь-яку проблему, властивість чи помилку... (Enter для надсилання)"
                  rows={2}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none resize-none custom-scrollbar"
                />

                <div className="flex items-center justify-between pt-1 border-t border-white/[0.04] mt-1 text-[11px] text-slate-400">
                  <button
                    type="button"
                    onClick={() => setIsCodeInputVisible(!isCodeInputVisible)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      isCodeInputVisible
                        ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40'
                        : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Code className="w-3.5 h-3.5 text-rose-400" />
                    <span>{isCodeInputVisible ? 'Код додано' : '+ Додати код для аналізу'}</span>
                  </button>

                  <span className="hidden sm:inline text-slate-500">
                    Shift + Enter — новий рядок
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleSend()}
                disabled={(!inputValue.trim() && !codeContext.trim()) || isLoading}
                className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(244,63,94,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Надіслати</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MISTAKES_CASES } from '../../data/mistakesData';
import { RaspberryIcon } from '../common/RaspberryIcon';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Lightbulb, 
  Code2, 
  Wrench, 
  FileText, 
  Columns, 
  ToggleLeft, 
  ArrowDown, 
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const MistakesPage: React.FC = () => {
  const [activeMistakeId, setActiveMistakeId] = useState<string>(MISTAKES_CASES[0].id);
  // State for interactive "Broken" vs "Fixed" toggle for each mistake
  const [isFixedMap, setIsFixedMap] = useState<Record<string, boolean>>({
    'min-width-text-overflow': false,
    'squished-icons-shrink': false,
    'flex-direction-axes-confusion': false,
    'align-self-stretched-buttons': false,
    'unequal-columns-flex-1': false,
    'margin-auto-magic': false,
    'align-items-vs-align-content': false,
    'margin-vs-gap-wrap': false,
  });

  // View mode: 'interactive' (Live single view with toggle button) vs 'sideBySide' (Compare broken & fixed together)
  const [viewMode, setViewMode] = useState<'interactive' | 'sideBySide'>('interactive');

  const activeMistake = MISTAKES_CASES.find((m) => m.id === activeMistakeId) || MISTAKES_CASES[0];
  const isCurrentlyFixed = !!isFixedMap[activeMistake.id];

  const toggleFix = (id: string) => {
    setIsFixedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const fixedCount = Object.values(isFixedMap).filter(Boolean).length;

  // =========================================================================
  // DEDICATED REALISTIC BUG DEMO RENDERERS
  // =========================================================================

  // 1. Text Overflow & min-width: 0 Bug Demo
  const renderTextOverflowDemo = (isFixed: boolean) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">Картка файлу (обмежена ширина .card max-w-lg):</span>
        <span
          className={`font-mono text-[11px] px-2 py-0.5 rounded-full font-bold border ${
            isFixed
              ? 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40'
              : 'text-rose-300 bg-rose-950/60 border-rose-500/40'
          }`}
        >
          {isFixed ? '✅ min-width: 0 (Текст обрізано ...)' : '❌ min-width: auto (Контейнер розперло)'}
        </span>
      </div>

      <div className="max-w-xl mx-auto bg-[#070a12] border-2 border-dashed border-slate-700/80 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="text-[10px] text-slate-400 font-mono mb-2 flex items-center justify-between">
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">.file-card (обмежена ширина 480px)</span>
          <span className="text-slate-500">Межі контейнера ───┤</span>
        </div>

        <div
          className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border transition-all"
          style={{
            borderColor: isFixed ? 'rgba(16, 185, 129, 0.5)' : 'rgba(225, 29, 72, 0.6)',
            boxShadow: isFixed ? '0 0 15px rgba(16, 185, 129, 0.15)' : '0 0 15px rgba(225, 29, 72, 0.15)',
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
            <FileText className="w-5 h-5" />
          </div>

          <div
            className="flex-1"
            style={{
              minWidth: isFixed ? 0 : 'auto',
              overflow: isFixed ? 'hidden' : 'visible',
              textOverflow: isFixed ? 'ellipsis' : 'clip',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              className="text-xs sm:text-sm font-semibold text-slate-100 font-mono tracking-tight"
              style={{
                overflow: isFixed ? 'hidden' : 'visible',
                textOverflow: isFixed ? 'ellipsis' : 'clip',
                whiteSpace: 'nowrap',
              }}
              title="malynivka_annual_financial_analytics_report_q4_2026_final_export_production_ready.pdf"
            >
              malynivka_annual_financial_analytics_report_q4_2026_final_export_production_ready.pdf
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">4.8 MB • PDF Звіт Малинівки</div>
          </div>

          <button
            className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all shadow-md ${
              isFixed
                ? 'bg-emerald-500 text-white shadow-emerald-500/25 hover:bg-emerald-600'
                : 'bg-rose-500 text-white shadow-rose-500/25 animate-pulse'
            }`}
          >
            Завантажити
          </button>
        </div>

        {!isFixed ? (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Чому це баг: </span>
              <span>
                Через дефолтне <code>min-width: auto</code> flex-елемент відмовляється зменшуватися нижче довжини нерозривного рядка, через що <code>text-overflow: ellipsis</code> не спрацьовує і кнопка виштовхується вправо!
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Як вирішено: </span>
              <span>
                Додавання <code>min-width: 0</code> (або класу <code>min-w-0 / truncate</code>) дозволило flex-елементу коректно стиснутися за шириною картки та обрізати довгу назву трьома крапками.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 2. Squished Icons & flex-shrink: 0 Bug Demo
  const renderAvatarSquishDemo = (isFixed: boolean) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">Картка автора з аватаром (розмір аватара 48×48px):</span>
        <span
          className={`font-mono text-[11px] px-2 py-0.5 rounded-full font-bold border ${
            isFixed
              ? 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40'
              : 'text-rose-300 bg-rose-950/60 border-rose-500/40'
          }`}
        >
          {isFixed ? '✅ flex-shrink: 0 (Ідеальне коло 48px)' : '❌ flex-shrink: 1 (Сплющено до 22px)'}
        </span>
      </div>

      <div className="max-w-xl mx-auto bg-[#070a12] border-2 border-dashed border-slate-700/80 rounded-2xl p-4 sm:p-5">
        <div className="text-[10px] text-slate-400 font-mono mb-2 flex items-center justify-between">
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">.author-profile-card</span>
          <span className="text-slate-500">Автоматичне стискання</span>
        </div>

        <div
          className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-900 border transition-all"
          style={{
            borderColor: isFixed ? 'rgba(16, 185, 129, 0.5)' : 'rgba(225, 29, 72, 0.6)',
            boxShadow: isFixed ? '0 0 15px rgba(16, 185, 129, 0.15)' : '0 0 15px rgba(225, 29, 72, 0.15)',
          }}
        >
          <div
            style={{
              width: isFixed ? '48px' : '22px',
              height: '48px',
              minWidth: isFixed ? '48px' : 'auto',
              flexShrink: isFixed ? 0 : 1,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className={`rounded-full bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center shadow-lg relative overflow-hidden shrink-0 ${
              !isFixed ? 'ring-2 ring-rose-500 animate-pulse' : 'ring-2 ring-emerald-400/60'
            }`}
          >
            <RaspberryIcon variant="white" size={isFixed ? 26 : 14} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-white">Остап Малиновський</h4>
              <span className="text-[10px] text-rose-400 font-mono bg-rose-950/60 px-1.5 py-0.2 rounded border border-rose-500/20">
                Lead Dev
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
              Провідний frontend-інженер у Malynivka Studio. Створює адаптивні інтерфейси, складні анімації та надійні дизайн-системи на Flexbox понад 6 років.
            </p>
          </div>
        </div>

        {!isFixed ? (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Чому це баг: </span>
              <span>
                За замовчуванням усі flex-елементи мають <code>flex-shrink: 1</code>. Коли поруч багато тексту, браузер стискає круглий аватар із 48px до 22px, перетворюючи його на плаский овал!
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Як вирішено: </span>
              <span>
                Встановлення <code>flex-shrink: 0</code> (у Tailwind: <code>shrink-0</code>) суворо забороняє браузеру зминати іконку/аватар незалежно від довжини тексту поруч.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 3. flex-direction: column & Inverted Axes Bug Demo
  const renderFlexDirectionAxesDemo = (isFixed: boolean) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">Бічне меню (flex-direction: column):</span>
        <span
          className={`font-mono text-[11px] px-2 py-0.5 rounded-full font-bold border ${
            isFixed
              ? 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40'
              : 'text-rose-300 bg-rose-950/60 border-rose-500/40'
          }`}
        >
          {isFixed ? '✅ align-items: center + min-height' : '❌ justify-content: center без висоти'}
        </span>
      </div>

      <div className="max-w-xl mx-auto bg-[#070a12] border-2 border-dashed border-slate-700/80 rounded-2xl p-4 sm:p-5">
        <div className="text-[10px] text-slate-400 font-mono mb-2 flex items-center justify-between">
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">.sidebar-menu (flex-direction: column)</span>
          <span className="text-amber-400 font-mono">Головна вісь: ↓ Вертикаль | Поперечна: → Горизонталь</span>
        </div>

        {/* Sidebar Container */}
        <div
          className="rounded-xl bg-slate-900 border p-4 transition-all flex flex-col"
          style={{
            minHeight: isFixed ? '220px' : '100px',
            alignItems: isFixed ? 'center' : 'stretch',
            justifyContent: isFixed ? 'space-between' : 'center',
            borderColor: isFixed ? 'rgba(16, 185, 129, 0.5)' : 'rgba(225, 29, 72, 0.6)',
            boxShadow: isFixed ? '0 0 15px rgba(16, 185, 129, 0.15)' : '0 0 15px rgba(225, 29, 72, 0.15)',
          }}
        >
          {[
            { id: '1', label: '🏠 Головна панель', desc: 'Огляд ферми' },
            { id: '2', label: '📊 Аналітика ягід', desc: 'Статистика врожаю' },
            { id: '3', label: '⚙️ Налаштування', desc: 'Конфігурація теплиць' },
          ].map((item) => (
            <div
              key={item.id}
              style={{
                width: isFixed ? '280px' : '100%',
                transition: 'all 0.3s ease',
              }}
              className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                isFixed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-[10px] text-slate-400 font-mono">{item.desc}</span>
            </div>
          ))}
        </div>

        {!isFixed ? (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Чому це баг: </span>
              <span>
                При <code>flex-direction: column</code> поперечна вісь стає горизонтальною. Спроба центрувати елементи по горизонталі через <code>justify-content</code> не працює, бо за горизонталь тепер відповідає <code>align-items</code>! Також без заданої висоти елементи злиплися вгорі.
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Як вирішено: </span>
              <span>
                Використано <code>align-items: center</code> (поперечна горизонтальна вісь) та додано <code>min-height: 220px</code> з <code>justify-content: space-between</code> для гармонійного вертикального розподілу.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 4. Stretched Buttons & align-self Bug Demo
  const renderAlignSelfStretchedDemo = (isFixed: boolean) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">Картка сповіщення (батьківський align-items: stretch):</span>
        <span
          className={`font-mono text-[11px] px-2 py-0.5 rounded-full font-bold border ${
            isFixed
              ? 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40'
              : 'text-rose-300 bg-rose-950/60 border-rose-500/40'
          }`}
        >
          {isFixed ? '✅ align-self: center (Компактна кнопка)' : '❌ align-items: stretch (Кнопку розтягнуто на 100px)'}
        </span>
      </div>

      <div className="max-w-xl mx-auto bg-[#070a12] border-2 border-dashed border-slate-700/80 rounded-2xl p-4 sm:p-5">
        <div className="text-[10px] text-slate-400 font-mono mb-2 flex items-center justify-between">
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">.notification-banner</span>
          <span className="text-slate-500">Поперечна вісь: stretch</span>
        </div>

        <div
          className="flex items-stretch justify-between gap-4 p-4 rounded-xl bg-slate-900 border transition-all"
          style={{
            borderColor: isFixed ? 'rgba(16, 185, 129, 0.5)' : 'rgba(225, 29, 72, 0.6)',
            boxShadow: isFixed ? '0 0 15px rgba(16, 185, 129, 0.15)' : '0 0 15px rgba(225, 29, 72, 0.15)',
          }}
        >
          {/* Multi-line notification text */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Замовлення #4092 відправлено</span>
              <span className="text-[9px] bg-rose-500/20 text-rose-300 px-2 py-0.2 rounded font-mono">Термобокс</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              Ваше замовлення свіжої малини сорту «Полка» упаковано в спеціальний термобокс з льодом та передано кур’єру для експрес-доставки. Орієнтовний час прибуття: сьогодні до 18:00.
            </p>
          </div>

          {/* Action Button: Stretched vs align-self: center */}
          <div
            style={{
              alignSelf: isFixed ? 'center' : 'stretch',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className="flex items-center justify-center shrink-0"
          >
            <button
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 ${
                isFixed
                  ? 'bg-emerald-500 text-white shadow-emerald-500/25 h-10 ring-2 ring-emerald-400/40'
                  : 'bg-rose-500 text-white shadow-rose-500/25 w-32 h-full'
              }`}
            >
              <span>Статус ТТН</span>
              {isFixed && <span className="text-[9px] font-mono bg-emerald-700/80 px-1 py-0.2 rounded">self-center</span>}
            </button>
          </div>
        </div>

        {!isFixed ? (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Чому це баг: </span>
              <span>
                Батьківський контейнер має дефолтне <code>align-items: stretch</code>. Оскільки лівий блок із текстом високий, кнопка праворуч потворно розтягується на всю висоту картки!
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Як вирішено: </span>
              <span>
                Властивість <code>align-self: center</code> (у Tailwind: <code>self-center</code>) виводить кнопку з-під дії stretch і зберігає її природні компактні пропорції.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 5. Unequal Columns & flex: 1 Bug Demo
  const renderUnequalColumnsDemo = (isFixed: boolean) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">Сітка з 3 колонок тарифів:</span>
        <span
          className={`font-mono text-[11px] px-2 py-0.5 rounded-full font-bold border ${
            isFixed
              ? 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40'
              : 'text-rose-300 bg-rose-950/60 border-rose-500/40'
          }`}
        >
          {isFixed ? '✅ flex: 1 1 0% (Ідеально рівні 33.3%)' : '❌ flex-grow: 1 (Нерівні через різний текст)'}
        </span>
      </div>

      <div className="w-full bg-[#070a12] border-2 border-dashed border-slate-700/80 rounded-2xl p-4 sm:p-5">
        <div className="text-[10px] text-slate-400 font-mono mb-2 flex items-center justify-between">
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">.pricing-grid</span>
          <span className="text-slate-500">{isFixed ? 'flex: 1 (flex-basis: 0)' : 'flex-grow: 1 (flex-basis: auto)'}</span>
        </div>

        <div
          className="flex gap-3 p-3 rounded-xl bg-slate-900 border transition-all"
          style={{
            borderColor: isFixed ? 'rgba(16, 185, 129, 0.5)' : 'rgba(225, 29, 72, 0.6)',
            boxShadow: isFixed ? '0 0 15px rgba(16, 185, 129, 0.15)' : '0 0 15px rgba(225, 29, 72, 0.15)',
          }}
        >
          {/* Plan 1 */}
          <div
            style={{
              flex: isFixed ? '1 1 0%' : '1 1 auto',
              minWidth: isFixed ? 0 : 'auto',
              transition: 'all 0.3s ease',
            }}
            className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-bold text-slate-200">Тариф Базовий</div>
              <div className="text-[11px] text-slate-400 mt-1">1 кг ягід на тиждень.</div>
            </div>
            <div className="mt-2 text-xs font-mono text-rose-400 font-bold">190 ₴</div>
          </div>

          {/* Plan 2: Long Text that blows up width */}
          <div
            style={{
              flex: isFixed ? '1 1 0%' : '1 1 auto',
              minWidth: isFixed ? 0 : 'auto',
              transition: 'all 0.3s ease',
            }}
            className={`p-3 rounded-xl border flex flex-col justify-between ${
              isFixed
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}
          >
            <div>
              <div className="text-xs font-bold text-white flex items-center justify-between">
                <span>Тариф Профі</span>
                <span className="text-[9px] bg-rose-500 text-white px-1.5 py-0.2 rounded font-mono">ХІТ</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                Преміум Малина з плантації + фірмове варення + персональний агроном і доставка.
              </div>
            </div>
            <div className="mt-2 text-xs font-mono text-emerald-400 font-bold">490 ₴</div>
          </div>

          {/* Plan 3 */}
          <div
            style={{
              flex: isFixed ? '1 1 0%' : '1 1 auto',
              minWidth: isFixed ? 0 : 'auto',
              transition: 'all 0.3s ease',
            }}
            className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-bold text-slate-200">Тариф Бізнес</div>
              <div className="text-[11px] text-slate-400 mt-1">10 кг оптом для кафе.</div>
            </div>
            <div className="mt-2 text-xs font-mono text-amber-400 font-bold">1200 ₴</div>
          </div>
        </div>

        {!isFixed ? (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Чому це баг: </span>
              <span>
                При використанні <code>flex-grow: 1</code> базовий розмір залишається <code>flex-basis: auto</code>. Браузер спочатку виділяє місце під контент, тому картка з довгим текстом розростається на 60% рядка, деформуючи інші колонки!
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Як вирішено: </span>
              <span>
                Властивість <code>flex: 1</code> (еквівалент <code>flex: 1 1 0%</code>) встановлює <code>flex-basis: 0</code>. Завдяки цьому всі 3 колонки гарантовано займають точно по 33.3% ширини контейнера.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 6. Margin-left: auto Magic Bug Demo
  const renderMarginAutoDemo = (isFixed: boolean) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">Шапка сайту (Логотип, меню та кнопка кабінету):</span>
        <span
          className={`font-mono text-[11px] px-2 py-0.5 rounded-full font-bold border ${
            isFixed
              ? 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40'
              : 'text-rose-300 bg-rose-950/60 border-rose-500/40'
          }`}
        >
          {isFixed ? '✅ margin-left: auto (Кнопка притиснута праворуч)' : '❌ Без margin: auto (Злипання або зайві обгортки)'}
        </span>
      </div>

      <div className="w-full bg-[#070a12] border-2 border-dashed border-slate-700/80 rounded-2xl p-4 sm:p-5">
        <div className="text-[10px] text-slate-400 font-mono mb-2 flex items-center justify-between">
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">.header-navbar</span>
          <span className="text-slate-500">Повна ширина навігації ───┤</span>
        </div>

        <div
          className="flex items-center gap-3 sm:gap-4 p-3.5 rounded-xl bg-slate-900 border transition-all"
          style={{
            borderColor: isFixed ? 'rgba(16, 185, 129, 0.5)' : 'rgba(225, 29, 72, 0.6)',
            boxShadow: isFixed ? '0 0 15px rgba(16, 185, 129, 0.15)' : '0 0 15px rgba(225, 29, 72, 0.15)',
          }}
        >
          <div className="flex items-center gap-2 font-extrabold text-white text-xs sm:text-sm shrink-0">
            <RaspberryIcon variant="rose" size={22} />
            <span>Malynivka</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-medium">Головна</span>
            <span className="px-2.5 py-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 hidden sm:inline">Каталог</span>
            <span className="px-2.5 py-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 hidden md:inline">Документація</span>
          </div>

          <button
            style={{
              marginLeft: isFixed ? 'auto' : '0px',
              transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              isFixed
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/50'
                : 'bg-slate-800 text-slate-200 border border-slate-700'
            }`}
          >
            <span>👉 Особистий Кабінет</span>
            {isFixed && <span className="text-[10px] font-mono bg-emerald-700/80 px-1 py-0.2 rounded">ml-auto</span>}
          </button>
        </div>

        {!isFixed ? (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Чому це баг: </span>
              <span>
                Кнопка кабінету прилипла до пунктів меню зліва. Спроба використати <code>justify-content: space-between</code> розірве логотип від пунктів меню та знищить цілісність навігації.
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Як вирішено: </span>
              <span>
                <code>margin-left: auto</code> (у Tailwind: <code>ml-auto</code>) поглинає весь вільний простір зліва від кнопки, притискаючи її до правого краю без створення зайвих вкладених <code>&lt;div&gt;</code>!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 7. Align Items vs Align Content Bug Demo
  const renderAlignContentDemo = (isFixed: boolean) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">Багаторядкова галерея карток (висота 240px, flex-wrap: wrap):</span>
        <span
          className={`font-mono text-[11px] px-2 py-0.5 rounded-full font-bold border ${
            isFixed
              ? 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40'
              : 'text-rose-300 bg-rose-950/60 border-rose-500/40'
          }`}
        >
          {isFixed ? '✅ align-content: flex-start (Ряди щільно разом)' : '❌ align-content: stretch (Гігантська порожнеча)'}
        </span>
      </div>

      <div className="w-full bg-[#070a12] border-2 border-dashed border-slate-700/80 rounded-2xl p-4 sm:p-5">
        <div className="text-[10px] text-slate-400 font-mono mb-2 flex items-center justify-between">
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">.card-gallery (висота 240px)</span>
          <span className="text-slate-500">Багаторядковий трек</span>
        </div>

        <div
          className="rounded-xl bg-slate-900 border p-3 transition-all flex flex-wrap"
          style={{
            height: '240px',
            alignItems: 'flex-start',
            alignContent: isFixed ? 'flex-start' : 'stretch',
            gap: '12px',
            borderColor: isFixed ? 'rgba(16, 185, 129, 0.5)' : 'rgba(225, 29, 72, 0.6)',
            boxShadow: isFixed ? '0 0 15px rgba(16, 185, 129, 0.15)' : '0 0 15px rgba(225, 29, 72, 0.15)',
          }}
        >
          {[
            { id: '1', title: 'Картка #1 (Рядок 1)', color: 'bg-rose-500/15 border-rose-500/30 text-rose-200' },
            { id: '2', title: 'Картка #2 (Рядок 1)', color: 'bg-blue-500/15 border-blue-500/30 text-blue-200' },
            { id: '3', title: 'Картка #3 (Рядок 2)', color: 'bg-amber-500/15 border-amber-500/30 text-amber-200' },
            { id: '4', title: 'Картка #4 (Рядок 2)', color: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200' },
          ].map((card) => (
            <div
              key={card.id}
              style={{ width: 'calc(50% - 6px)' }}
              className={`p-3 rounded-xl border flex items-center justify-between font-mono text-xs font-semibold ${card.color}`}
            >
              <span>{card.title}</span>
              <RaspberryIcon variant="rose" size={16} />
            </div>
          ))}
        </div>

        {!isFixed ? (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Чому це баг: </span>
              <span>
                За замовчуванням <code>align-content: stretch</code> розтягує всі ряди по вертикалі, залишаючи величезний розрив між першим і другим поверхом карток. Властивість <code>align-items</code> тут не допоможе!
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Як вирішено: </span>
              <span>
                <code>align-content: flex-start</code> притиснув усі ряди догори з охайним <code>gap: 12px</code>, а весь вільний простір контейнера залишився внизу.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 8. Margin vs Gap on Flex Wrap Bug Demo
  const renderMarginVsGapDemo = (isFixed: boolean) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-300">Список тегів категорій (flex-wrap: wrap):</span>
        <span
          className={`font-mono text-[11px] px-2 py-0.5 rounded-full font-bold border ${
            isFixed
              ? 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40'
              : 'text-rose-300 bg-rose-950/60 border-rose-500/40'
          }`}
        >
          {isFixed ? '✅ gap: 12px (Ідеальні межі без вилазіння)' : '❌ margin-right: 12px (Зайвий правий хвіст)'}
        </span>
      </div>

      <div className="max-w-xl mx-auto bg-[#070a12] border-2 border-dashed border-slate-700/80 rounded-2xl p-4 sm:p-5">
        <div className="text-[10px] text-slate-400 font-mono mb-2 flex items-center justify-between">
          <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">.tag-cloud</span>
          <span className="text-slate-500">{isFixed ? 'gap: 12px' : 'margin-right: 14px'}</span>
        </div>

        <div
          className="rounded-xl bg-slate-900 border p-4 transition-all flex flex-wrap relative"
          style={{
            gap: isFixed ? '12px' : '0px',
            borderColor: isFixed ? 'rgba(16, 185, 129, 0.5)' : 'rgba(225, 29, 72, 0.6)',
            boxShadow: isFixed ? '0 0 15px rgba(16, 185, 129, 0.15)' : '0 0 15px rgba(225, 29, 72, 0.15)',
          }}
        >
          {[
            { id: '1', name: '🍓 Свіжа Малина', color: 'bg-rose-500/15 border-rose-500/30 text-rose-300' },
            { id: '2', name: '🫐 Лохина Карпатська', color: 'bg-blue-500/15 border-blue-500/30 text-blue-300' },
            { id: '3', name: '🍯 Мед лісовий', color: 'bg-amber-500/15 border-amber-500/30 text-amber-300' },
            { id: '4', name: '🌿 М’ята органічна', color: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' },
            { id: '5', name: '📦 Еко-упаковка', color: 'bg-purple-500/15 border-purple-500/30 text-purple-300' },
          ].map((tag) => (
            <div
              key={tag.id}
              style={{
                marginRight: isFixed ? 0 : '14px',
                marginBottom: isFixed ? 0 : '12px',
                transition: 'all 0.3s ease',
              }}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 ${tag.color}`}
            >
              <Tag className="w-3 h-3 opacity-70" />
              <span>{tag.name}</span>
              {!isFixed && <span className="text-[9px] opacity-60 font-mono">+mr</span>}
            </div>
          ))}
        </div>

        {!isFixed ? (
          <div className="mt-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Чому це баг: </span>
              <span>
                Використання <code>margin-right</code> додає зайві пікселі до кожного тега, включно з останнім у рядку. Через це правий край контейнера стає нерівним або теги передчасно переносяться на новий рядок!
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Як вирішено: </span>
              <span>
                Сучасна властивість <code>gap: 12px</code> (у Tailwind: <code>gap-3</code>) створює проміжки виключно МІЖ сусідніми тегами, залишаючи межі контейнера чистими.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Helper to render the active scenario by ID
  const renderActiveScenario = (isFixed: boolean) => {
    switch (activeMistake.id) {
      case 'min-width-text-overflow':
        return renderTextOverflowDemo(isFixed);
      case 'squished-icons-shrink':
        return renderAvatarSquishDemo(isFixed);
      case 'flex-direction-axes-confusion':
        return renderFlexDirectionAxesDemo(isFixed);
      case 'align-self-stretched-buttons':
        return renderAlignSelfStretchedDemo(isFixed);
      case 'unequal-columns-flex-1':
        return renderUnequalColumnsDemo(isFixed);
      case 'margin-auto-magic':
        return renderMarginAutoDemo(isFixed);
      case 'align-items-vs-align-content':
        return renderAlignContentDemo(isFixed);
      case 'margin-vs-gap-wrap':
        return renderMarginVsGapDemo(isFixed);
      default:
        return renderTextOverflowDemo(isFixed);
    }
  };

  return (
    <div className="max-w-[1700px] w-full mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-5 space-y-4 sm:space-y-5 animate-fadeIn pb-20 lg:pb-10">
      {/* Sleek Compact Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 glass-panel p-4 sm:p-5 rounded-3xl">
        <div className="flex items-center gap-3.5">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-400 shrink-0 backdrop-blur-md">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-extrabold text-white flex items-center gap-2">
              <span>Типові Помилки та Flexbox Лайфхаки</span>
              <span className="text-[10px] bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-mono backdrop-blur-md">
                {fixedCount}/{MISTAKES_CASES.length} виправлено
              </span>
            </h1>
            <p className="text-[11px] text-slate-300/80 hidden sm:block">
              Розбір найпопулярніших багів верстальників: flex-direction, align-self, shrink, min-width, margin: auto та ін.
            </p>
          </div>
        </div>

        {/* Master Actions & View Mode Toggle with Sliding Capsule */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle View Mode: Single Interactive vs Side-by-Side */}
          <div className="flex items-center gap-1 bg-black/30 p-1 rounded-full border border-white/[0.08] backdrop-blur-xl">
            {[
              { id: 'interactive' as const, label: 'Інтерактив', icon: ToggleLeft },
              { id: 'sideBySide' as const, label: 'Пліч-о-пліч', icon: Columns },
            ].map(({ id, label, icon: VIcon }) => {
              const isActive = viewMode === id;
              return (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className={`relative flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mistakes-viewmode-pill"
                      className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_2px_8px_rgba(244,63,94,0.4)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <VIcon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              const allFixed = fixedCount === MISTAKES_CASES.length;
              const next: Record<string, boolean> = {};
              MISTAKES_CASES.forEach((c) => {
                next[c.id] = !allFixed;
              });
              setIsFixedMap(next);
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] backdrop-blur-md transition-all active:scale-95"
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>{fixedCount === MISTAKES_CASES.length ? 'Зламати всі знову' : 'Полагодити всі'}</span>
          </button>
        </div>
      </div>

      {/* Horizontal Quick Scenario Pill Selector (Instant 1-Tap Switching with Sliding Indicator) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth">
        {MISTAKES_CASES.map((mistake) => {
          const isSelected = mistake.id === activeMistakeId;
          const isFixed = isFixedMap[mistake.id];

          return (
            <button
              key={mistake.id}
              id={`quick-mistake-${mistake.id}`}
              onClick={() => setActiveMistakeId(mistake.id)}
              className={`relative px-3.5 py-2 rounded-full border text-xs shrink-0 transition-colors flex items-center gap-2 backdrop-blur-md active:scale-95 ${
                isSelected
                  ? 'border-rose-500 text-rose-300'
                  : 'bg-white/[0.03] text-slate-300 border-white/[0.08] hover:border-white/20'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="mistakes-scenario-pill"
                  className="absolute inset-0 bg-rose-500/15 rounded-full shadow-[0_2px_12px_rgba(244,63,94,0.3)]"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span
                className={`w-2 h-2 rounded-full relative z-10 ${
                  isFixed ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-rose-500'
                }`}
              />
              <span className={`font-bold font-mono relative z-10 ${isSelected ? 'text-rose-300' : 'text-slate-200'}`}>
                {mistake.title.split(':')[0]}
              </span>
              <span
                className={`text-[9px] px-2 py-0.5 rounded-full font-semibold relative z-10 ${
                  isFixed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {isFixed ? '✓ Полагоджено' : '✕ Зламано'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Scenario Card */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 space-y-4 sm:space-y-5 relative overflow-hidden">
        {/* Header & Toggle Fix Master Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                {activeMistake.category}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                isCurrentlyFixed ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
              }`}>
                {isCurrentlyFixed ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                <span>{isCurrentlyFixed ? 'Стан: Виправлено' : 'Стан: Помилка активна'}</span>
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-extrabold text-white">
              {activeMistake.title}
            </h2>
            <p className="text-xs text-slate-300/90 mt-1 max-w-3xl leading-relaxed">
              {activeMistake.description}
            </p>
          </div>

          {/* Master Interactive Toggle Button */}
          <button
            id="btn-toggle-fix"
            onClick={() => toggleFix(activeMistake.id)}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-lg active:scale-95 shrink-0 ${
              isCurrentlyFixed
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_2px_12px_rgba(16,185,129,0.35)]'
                : 'bg-rose-500 hover:bg-rose-600 text-white shadow-[0_2px_12px_rgba(244,63,94,0.35)]'
            }`}
          >
            {isCurrentlyFixed ? (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Полагоджено! (Клікніть, щоб зламати)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Застосувати фікс ✨</span>
              </>
            )}
          </button>
        </div>

        {/* Live Visual Stage: Single View vs Side-by-Side */}
        {viewMode === 'interactive' ? (
          <div className="space-y-3">
            {renderActiveScenario(isCurrentlyFixed)}
          </div>
        ) : (
          /* Side-by-Side Dual View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Broken View */}
            <div className="p-3 sm:p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                <XCircle className="w-4 h-4" />
                <span>Зламаний стан (Без фіксу):</span>
              </div>
              {renderActiveScenario(false)}
            </div>

            {/* Fixed View */}
            <div className="p-3 sm:p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Виправлений стан (З фіксом):</span>
              </div>
              {renderActiveScenario(true)}
            </div>
          </div>
        )}

        {/* Side-by-Side Explanation & Pro Tip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Why it happens */}
          <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-1">
            <div className="flex items-center gap-1.5 text-rose-300 font-bold text-xs">
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Чому це ламається:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeMistake.whyItHappens}
            </p>
          </div>

          {/* Pro Solution */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Як правильно виправити:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeMistake.explanation}
            </p>
            {activeMistake.proTip && (
              <div className="mt-2 text-[11px] text-amber-300/90 font-semibold flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{activeMistake.proTip}</span>
              </div>
            )}
          </div>
        </div>

        {/* Code Diff Box: Broken vs Fixed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Порівняння коду (CSS Diff):</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Broken snippet */}
            <div className="p-3 rounded-2xl bg-[#06080e] border border-rose-500/30 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-rose-400">
                <span>❌ Помилковий CSS:</span>
              </div>
              <pre className="text-xs font-mono text-rose-200 overflow-x-auto p-2.5 rounded bg-black/40">
                <code>{activeMistake.wrongCss}</code>
              </pre>
            </div>

            {/* Fixed snippet */}
            <div className="p-3 rounded-2xl bg-[#06080e] border border-emerald-500/30 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400">
                <span>✅ Виправлений CSS:</span>
              </div>
              <pre className="text-xs font-mono text-emerald-200 overflow-x-auto p-2.5 rounded bg-black/40">
                <code>{activeMistake.fixedCss}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

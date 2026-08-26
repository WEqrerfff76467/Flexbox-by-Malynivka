import React, { useState } from 'react';
import { Check, Copy, Code2, Sparkles } from 'lucide-react';
import { FlexContainerStyle, FlexItemData } from '../../types/flexbox';

interface CodeViewerProps {
  containerStyle: FlexContainerStyle;
  items?: FlexItemData[];
  customTitle?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  containerStyle,
  items = [],
  customTitle = 'Згенерований CSS / BEM Код',
}) => {
  const [activeTab, setActiveTab] = useState<'css' | 'html'>('css');
  const [copied, setCopied] = useState(false);

  // Generate Vanilla CSS with BEM
  const generateBemCss = () => {
    let css = `/* Блок контейнера (BEM: .malyna-layout) */\n.malyna-layout {\n`;
    css += `  display: ${containerStyle.display};\n`;
    if (containerStyle.flexDirection !== 'row') {
      css += `  flex-direction: ${containerStyle.flexDirection};\n`;
    }
    if (containerStyle.flexWrap !== 'nowrap') {
      css += `  flex-wrap: ${containerStyle.flexWrap};\n`;
    }
    if (containerStyle.justifyContent !== 'flex-start') {
      css += `  justify-content: ${containerStyle.justifyContent};\n`;
    }
    if (containerStyle.alignItems !== 'stretch') {
      css += `  align-items: ${containerStyle.alignItems};\n`;
    }
    if (containerStyle.alignContent !== 'normal') {
      css += `  align-content: ${containerStyle.alignContent};\n`;
    }
    if (containerStyle.gap > 0) {
      css += `  gap: ${containerStyle.gap}px;\n`;
    }
    css += `}\n\n`;

    // Item styles
    const customizedItems = items.filter(
      (it) =>
        it.alignSelf !== 'auto' ||
        it.flexGrow !== 0 ||
        it.flexShrink !== 1 ||
        it.order !== 0 ||
        (it.flexBasis && it.flexBasis !== 'auto')
    );

    if (customizedItems.length > 0) {
      css += `/* Модифікатори окремих елементів (BEM: .malyna-layout__item) */\n`;
      customizedItems.forEach((it, idx) => {
        css += `.malyna-layout__item--custom-${idx + 1} {\n`;
        if (it.order !== 0) css += `  order: ${it.order};\n`;
        if (it.flexGrow !== 0) css += `  flex-grow: ${it.flexGrow};\n`;
        if (it.flexShrink !== 1) css += `  flex-shrink: ${it.flexShrink};\n`;
        if (it.flexBasis && it.flexBasis !== 'auto') css += `  flex-basis: ${it.flexBasis};\n`;
        if (it.alignSelf !== 'auto') css += `  align-self: ${it.alignSelf};\n`;
        css += `}\n`;
      });
    }

    return css;
  };

  // Generate Full HTML + CSS
  const generateFullHtml = () => {
    return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Flexbox by Malynivka</title>
  <style>
${generateBemCss()}
    .malyna-layout__item {
      padding: 16px 24px;
      background: #1e293b;
      color: #fff;
      border: 1px solid #e11d48;
      border-radius: 12px;
      font-family: sans-serif;
    }
  </style>
</head>
<body>
  <div class="malyna-layout">
${items
  .map(
    (it, idx) =>
      `    <div class="malyna-layout__item ${
        it.alignSelf !== 'auto' || it.flexGrow !== 0 || it.order !== 0
          ? `malyna-layout__item--custom-${idx + 1}`
          : ''
      }">${it.label}</div>`
  )
  .join('\n')}
  </div>
</body>
</html>`;
  };

  const getActiveCode = () => {
    if (activeTab === 'css') return generateBemCss();
    return generateFullHtml();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getActiveCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/[0.08]">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 sm:px-5 py-3.5 bg-white/[0.03] border-b border-white/[0.08] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-rose-400" />
          <span className="text-sm font-bold text-slate-100">{customTitle}</span>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-full border border-white/[0.08] backdrop-blur-xl">
          <button
            id="btn-tab-css"
            onClick={() => setActiveTab('css')}
            className={`px-3.5 py-1 text-xs rounded-full font-semibold transition-all ${
              activeTab === 'css'
                ? 'bg-rose-500 text-white shadow-[0_2px_10px_rgba(244,63,94,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CSS (BEM)
          </button>
          <button
            id="btn-tab-html"
            onClick={() => setActiveTab('html')}
            className={`px-3.5 py-1 text-xs rounded-full font-semibold transition-all ${
              activeTab === 'html'
                ? 'bg-rose-500 text-white shadow-[0_2px_10px_rgba(244,63,94,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            HTML + CSS
          </button>
        </div>

        {/* Copy Button */}
        <button
          id="btn-copy-code"
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all active:scale-95 ${
            copied
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'bg-rose-500/15 text-rose-300 hover:bg-rose-500 hover:text-white border border-rose-500/30'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Скопійовано!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Копіювати</span>
            </>
          )}
        </button>
      </div>

      {/* Code Block */}
      <div className="p-4 sm:p-5 bg-[#05070d]/90 overflow-x-auto">
        <pre className="text-xs sm:text-sm font-mono text-rose-200/90 leading-relaxed">
          <code>{getActiveCode()}</code>
        </pre>
      </div>

      {/* BEM Footer Note */}
      {activeTab === 'css' && (
        <div className="px-4 sm:px-5 py-2.5 bg-white/[0.02] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 backdrop-blur-md">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-rose-400" />
            Використано стандарт іменування <strong>BEM (Block Element Modifier)</strong>
          </span>
          <span className="text-slate-500 font-mono">.block__element--modifier</span>
        </div>
      )}
    </div>
  );
};

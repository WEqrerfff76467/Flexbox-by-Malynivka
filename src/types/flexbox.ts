import type { CSSProperties } from 'react';

export type TabType = 'theory' | 'editor' | 'mistakes' | 'games';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type JustifyContent = 
  | 'flex-start' 
  | 'flex-end' 
  | 'center' 
  | 'space-between' 
  | 'space-around' 
  | 'space-evenly';

export type AlignItems = 
  | 'stretch' 
  | 'flex-start' 
  | 'flex-end' 
  | 'center' 
  | 'baseline';

export type AlignContent = 
  | 'normal'
  | 'stretch' 
  | 'flex-start' 
  | 'flex-end' 
  | 'center' 
  | 'space-between' 
  | 'space-around' 
  | 'space-evenly';

export type AlignSelf = 
  | 'auto' 
  | 'flex-start' 
  | 'flex-end' 
  | 'center' 
  | 'baseline' 
  | 'stretch';

export interface FlexContainerStyle {
  display: 'flex' | 'inline-flex';
  flexDirection: FlexDirection;
  flexWrap: FlexWrap;
  justifyContent: JustifyContent;
  alignItems: AlignItems;
  alignContent: AlignContent;
  gap: number; // in px or rem
  rowGap?: number;
  columnGap?: number;
  minHeight?: number; // for playground
  padding?: number;
}

export interface FlexItemData {
  id: string;
  label: string;
  order: number;
  flexGrow: number;
  flexShrink: number;
  flexBasis: string; // e.g. 'auto', '100px', '20%'
  alignSelf: AlignSelf;
  width?: string;
  height?: string;
  colorPreset?: string;
  customText?: string;
  icon?: string;
}

export interface PresetLayout {
  id: string;
  title: string;
  description: string;
  category: 'common' | 'ui' | 'advanced';
  container: FlexContainerStyle;
  items: FlexItemData[];
}

export interface TheoryProperty {
  id: string;
  name: string;
  target: 'container' | 'item';
  summary: string;
  analogy: string;
  detailedExplanation: string;
  cssSyntax: string;
  bemExample: string;
  values: {
    value: string;
    description: string;
    isDefault?: boolean;
    previewConfig?: Partial<FlexContainerStyle> | Partial<FlexItemData>;
  }[];
  tips: string[];
}

export interface MistakeCase {
  id: string;
  title: string;
  category: string;
  description: string;
  whyItHappens: string;
  wrongCss: string;
  fixedCss: string;
  wrongContainer: FlexContainerStyle;
  fixedContainer: FlexContainerStyle;
  wrongItems: FlexItemData[];
  fixedItems: FlexItemData[];
  explanation: string;
  proTip: string;
}

export interface GameLevel {
  id: number;
  title: string;
  instruction: string;
  story: string;
  hint: string;
  targetBaskets: {
    id: string;
    color: string;
    positionStyles: CSSProperties; // expected CSS
    label: string;
  }[];
  initialContainerStyle: Partial<FlexContainerStyle>;
  requiredProperties: (keyof FlexContainerStyle | 'alignSelf' | 'order' | 'flexGrow')[];
  solution: Partial<FlexContainerStyle> & { items?: Record<string, Partial<FlexItemData>> };
  items: {
    id: string;
    label: string;
    type: 'raspberry' | 'blackberry' | 'goldberry';
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  diagramConfig?: {
    container: Partial<FlexContainerStyle>;
    items: Partial<FlexItemData>[];
  };
  options: string[];
  correctIndex: number;
  explanation: string;
  analogyTip?: string;
}

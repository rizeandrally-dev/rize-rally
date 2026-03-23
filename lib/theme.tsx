import { createContext, ReactNode, useContext, useState } from 'react';

export const themes = {
  fire: {
    name: 'Fire',
    emoji: '🔥',
    bg: '#0d0000',
    card: '#1a0500',
    cardBorder: '#7f1d1d',
    gradient: ['#7f1d1d', '#dc2626', '#ea580c'] as [string, string, string],
    accent: '#f97316',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.6)',
    spark: '#fbbf24',
    bar: ['#dc2626', '#f97316'] as [string, string],
  },
  ocean: {
    name: 'Ocean',
    emoji: '🌊',
    bg: '#f0f9ff',
    card: '#ffffff',
    cardBorder: '#bae6fd',
    gradient: ['#0369a1', '#0ea5e9', '#38bdf8'] as [string, string, string],
    accent: '#0ea5e9',
    text: '#0c4a6e',
    textMuted: 'rgba(12,74,110,0.6)',
    spark: '#0369a1',
    bar: ['#0369a1', '#38bdf8'] as [string, string],
  },
  nature: {
    name: 'Nature',
    emoji: '🌿',
    bg: '#f5f0e8',
    card: '#ffffff',
    cardBorder: '#bbf7d0',
    gradient: ['#14532d', '#16a34a', '#86efac'] as [string, string, string],
    accent: '#16a34a',
    text: '#14532d',
    textMuted: 'rgba(20,83,45,0.6)',
    spark: '#15803d',
    bar: ['#15803d', '#86efac'] as [string, string],
  },
  neon: {
    name: 'Neon',
    emoji: '⚡',
    bg: '#000000',
    card: '#0a0a0a',
    cardBorder: '#7c3aed',
    gradient: ['#1a0533', '#4c1d95', '#1d4ed8'] as [string, string, string],
    accent: '#a855f7',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.5)',
    spark: '#e879f9',
    bar: ['#7c3aed', '#2563eb'] as [string, string],
  },
  crystal: {
    name: 'Crystal',
    emoji: '💎',
    bg: '#f8faff',
    card: 'rgba(255,255,255,0.8)',
    cardBorder: '#bfdbfe',
    gradient: ['#dbeafe', '#bfdbfe', '#e0f2fe'] as [string, string, string],
    accent: '#3b82f6',
    text: '#1e3a5f',
    textMuted: 'rgba(30,58,95,0.5)',
    spark: '#2563eb',
    bar: ['#3b82f6', '#7dd3fc'] as [string, string],
  },
  sunset: {
    name: 'Sunset',
    emoji: '🌅',
    bg: '#1a0010',
    card: '#2d0a1e',
    cardBorder: '#9d174d',
    gradient: ['#7c2d12', '#be185d', '#7c3aed'] as [string, string, string],
    accent: '#f43f5e',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.6)',
    spark: '#fb923c',
    bar: ['#f97316', '#ec4899'] as [string, string],
  },
  gold: {
    name: 'Gold',
    emoji: '👑',
    bg: '#0a0800',
    card: '#1a1400',
    cardBorder: '#92400e',
    gradient: ['#1a1400', '#78350f', '#b45309'] as [string, string, string],
    accent: '#fbbf24',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.6)',
    spark: '#fde68a',
    bar: ['#d97706', '#fde68a'] as [string, string],
  },
  galaxy: {
    name: 'Galaxy',
    emoji: '🌌',
    bg: '#00001a',
    card: '#0a0a2e',
    cardBorder: '#312e81',
    gradient: ['#000033', '#1e1b4b', '#4c1d95'] as [string, string, string],
    accent: '#818cf8',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.5)',
    spark: '#c7d2fe',
    bar: ['#4338ca', '#818cf8'] as [string, string],
  },
  pastel: {
    name: 'Pastel Soft',
    emoji: '🌸',
    bg: '#fdf2f8',
    card: '#ffffff',
    cardBorder: '#fbcfe8',
    gradient: ['#fce7f3', '#e9d5ff', '#dbeafe'] as [string, string, string],
    accent: '#ec4899',
    text: '#4a1d4e',
    textMuted: 'rgba(74,29,78,0.5)',
    spark: '#9333ea',
    bar: ['#e879f9', '#818cf8'] as [string, string],
  },
  corporate: {
    name: 'Corporate',
    emoji: '💼',
    bg: '#f8fafc',
    card: '#ffffff',
    cardBorder: '#e2e8f0',
    gradient: ['#1e3a5f', '#1e40af', '#2563eb'] as [string, string, string],
    accent: '#1d4ed8',
    text: '#0f172a',
    textMuted: 'rgba(15,23,42,0.5)',
    spark: '#1d4ed8',
    bar: ['#1d4ed8', '#60a5fa'] as [string, string],
  },
};

export type ThemeKey = keyof typeof themes;
export type Theme = typeof themes.fire;

interface ThemeContextType {
  theme: Theme;
  themeKey: ThemeKey;
  setTheme: (key: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.fire,
  themeKey: 'fire',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeKey, setThemeKey] = useState<ThemeKey>('fire');

  function setTheme(key: ThemeKey) {
    setThemeKey(key);
  }

  return (
    <ThemeContext.Provider value={{ theme: themes[themeKey], themeKey, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
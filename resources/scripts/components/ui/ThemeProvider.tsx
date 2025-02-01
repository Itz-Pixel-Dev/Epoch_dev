import React, { createContext, useContext, useEffect, useState } from 'react';
import { themeConfig, Theme } from './theme';

interface ThemeContextType {
	theme: Theme;
	isDark: boolean;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [isDark, setIsDark] = useState(() => {
		const stored = localStorage.getItem('theme');
		return stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}, [isDark]);

	const theme = isDark ? themeConfig.dark : themeConfig.light;
	const toggleTheme = () => setIsDark(!isDark);

	return (
		<ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useTheme must be used within ThemeProvider');
	return context;
};
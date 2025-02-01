import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { Switch } from './Switch';

export const ThemeToggle = () => {
	const { isDark, toggleTheme } = useTheme();

	return (
		<div className="flex items-center gap-2">
			<motion.span
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				className="text-yellow-500"
			>
				☀️
			</motion.span>
			<Switch
				checked={isDark}
				onCheckedChange={toggleTheme}
				aria-label="Toggle theme"
			/>
			<motion.span
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				className="text-blue-500"
			>
				🌙
			</motion.span>
		</div>
	);
};
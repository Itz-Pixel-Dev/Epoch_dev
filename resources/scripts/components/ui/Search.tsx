import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, Command } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface SearchProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	onClear?: () => void;
}

export const Search = ({ value, onChange, placeholder = 'Search...', onClear }: SearchProps) => {
	const { isDark } = useTheme();
	const [isFocused, setIsFocused] = React.useState(false);

	return (
		<motion.div
			initial={false}
			animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
			className={`
				relative flex items-center w-full max-w-md rounded-lg border
				${isFocused ? 'border-primary shadow-sm' : 'border-border'}
				${isDark ? 'bg-background/50' : 'bg-background'}
				backdrop-blur-sm transition-all
			`}
		>
			<div className="flex items-center px-3 py-2">
				<SearchIcon className="h-4 w-4 text-foreground/40" />
			</div>
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholder={placeholder}
				className="
					flex-1 bg-transparent px-2 py-2 text-sm text-foreground
					placeholder:text-foreground/40 focus:outline-none
				"
			/>
			<AnimatePresence>
				{value && (
					<motion.button
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						onClick={onClear}
						className="p-2 hover:text-foreground text-foreground/40 transition-colors"
					>
						<X className="h-4 w-4" />
					</motion.button>
				)}
			</AnimatePresence>
			<div className="hidden sm:flex items-center gap-2 pr-3 text-xs text-foreground/40 border-l border-border pl-3">
				<Command className="h-3 w-3" />
				<span>K</span>
			</div>
		</motion.div>
	);
};
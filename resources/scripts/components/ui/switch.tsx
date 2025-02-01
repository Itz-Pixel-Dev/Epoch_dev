import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { cn } from "./utils"

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	size?: 'sm' | 'md' | 'lg';
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
	({ className, checked, onCheckedChange, size = 'md', ...props }, ref) => {
		const { theme } = useTheme();

		const sizes = {
			sm: { container: 'w-8 h-4', thumb: 'w-3 h-3' },
			md: { container: 'w-11 h-6', thumb: 'w-5 h-5' },
			lg: { container: 'w-14 h-7', thumb: 'w-6 h-6' },
		};

		return (
			<button
				ref={ref}
				role="switch"
				aria-checked={checked}
				className={cn(
					'relative inline-flex items-center rounded-full transition-colors',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
					checked ? 'bg-primary' : 'bg-muted',
					sizes[size].container,
					className
				)}
				onClick={() => onCheckedChange?.(!checked)}
				{...props}
			>
				<motion.span
					className={cn(
						'inline-block rounded-full bg-white',
						sizes[size].thumb
					)}
					animate={{
						x: checked ? '100%' : '0%',
						translateX: checked ? '-100%' : '0%',
					}}
					transition={{ type: 'spring', stiffness: 500, damping: 30 }}
				/>
			</button>
		);
	}
);

Switch.displayName = 'Switch';

export { Switch };
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { cn } from './utils';
import { X } from 'lucide-react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'info' | 'success' | 'warning' | 'error';
	title?: string;
	show?: boolean;
	onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	({ className, variant = 'info', title, show = true, onClose, children, ...props }, ref) => {
		const { isDark } = useTheme();

		const variants = {
			info: 'bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800',
			success: 'bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-800',
			warning: 'bg-yellow-50 dark:bg-yellow-900/50 border-yellow-200 dark:border-yellow-800',
			error: 'bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800',
		};

		const textColors = {
			info: 'text-blue-800 dark:text-blue-200',
			success: 'text-green-800 dark:text-green-200',
			warning: 'text-yellow-800 dark:text-yellow-200',
			error: 'text-red-800 dark:text-red-200',
		};

		return (
			<AnimatePresence>
				{show && (
					<motion.div
						ref={ref}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className={cn(
							'rounded-lg border p-4',
							variants[variant],
							className
						)}
						{...props}
					>
						<div className="flex justify-between items-start">
							<div className="flex-1">
								{title && (
									<h3 className={cn('text-sm font-medium mb-1', textColors[variant])}>
										{title}
									</h3>
								)}
								<div className={cn('text-sm', textColors[variant])}>{children}</div>
							</div>
							{onClose && (
								<button
									onClick={onClose}
									className={cn(
										'ml-4 inline-flex shrink-0 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
										textColors[variant],
										`hover:bg-${variant}-100 dark:hover:bg-${variant}-800`
									)}
								>
									<span className="sr-only">Close</span>
									<X className="h-4 w-4" />
								</button>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		);
	}
);

Alert.displayName = 'Alert';

export { Alert };


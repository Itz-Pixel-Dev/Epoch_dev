import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import classNames from 'classnames';

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: 'info' | 'success' | 'warning' | 'error';
	icon?: React.ReactNode;
	onClose?: () => void;
	show?: boolean;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
	({ className, variant = 'info', icon, onClose, show = true, children, ...props }, ref) => {
		const { isDark } = useTheme();

		const variants = {
			info: 'bg-blue-50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200',
			success: 'bg-green-50 dark:bg-green-900/50 text-green-800 dark:text-green-200',
			warning: 'bg-yellow-50 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200',
			error: 'bg-red-50 dark:bg-red-900/50 text-red-800 dark:text-red-200',
		};

		return (
			<AnimatePresence>
				{show && (
					<motion.div
						ref={ref}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className={classNames(
							'rounded-lg p-4 flex items-center justify-between',
							variants[variant],
							className
						)}
						{...props}
					>
						<div className="flex items-center gap-3">
							{icon && <span className="flex-shrink-0">{icon}</span>}
							<div>{children}</div>
						</div>
						{onClose && (
							<button
								onClick={onClose}
								className="p-1 hover:opacity-80 transition-opacity"
								aria-label="Close banner"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		);
	}
);

Banner.displayName = 'Banner';

export { Banner };
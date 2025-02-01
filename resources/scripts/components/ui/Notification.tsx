import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface NotificationProps {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	title: string;
	message: string;
	onClose: (id: string) => void;
}

const icons = {
	success: <CheckCircle className="w-5 h-5 text-green-500" />,
	error: <XCircle className="w-5 h-5 text-red-500" />,
	warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
	info: <Info className="w-5 h-5 text-blue-500" />,
};

const backgrounds = {
	success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
	error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
	warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
	info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
};

export const Notification = ({ id, type, title, message, onClose }: NotificationProps) => {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: -20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 20, scale: 0.95 }}
			className={`w-96 border rounded-lg shadow-lg backdrop-blur-sm ${backgrounds[type]}`}
		>
			<div className="p-4">
				<div className="flex items-start">
					<div className="flex-shrink-0">
						{icons[type]}
					</div>
					<div className="ml-3 w-0 flex-1">
						<p className="text-sm font-medium text-foreground">
							{title}
						</p>
						<p className="mt-1 text-sm text-foreground/70">
							{message}
						</p>
					</div>
					<div className="ml-4 flex-shrink-0 flex">
						<button
							onClick={() => onClose(id)}
							className="rounded-md inline-flex text-foreground/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
						>
							<span className="sr-only">Close</span>
							<X className="h-5 w-5" />
						</button>
					</div>
				</div>
			</div>

			{/* Progress bar */}
			<motion.div
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ duration: 5 }}
				onAnimationComplete={() => onClose(id)}
				className="h-1 origin-left bg-foreground/10 rounded-b-lg"
			/>
		</motion.div>
	);
};

export const NotificationContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="fixed top-4 right-4 z-50 space-y-4">
			<AnimatePresence mode="popLayout">
				{children}
			</AnimatePresence>
		</div>
	);
};
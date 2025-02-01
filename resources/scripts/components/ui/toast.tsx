import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	message: string;
	onClose: (id: string) => void;
}

const icons = {
	success: <CheckCircle className="w-4 h-4 text-green-500" />,
	error: <XCircle className="w-4 h-4 text-red-500" />,
	warning: <AlertCircle className="w-4 h-4 text-yellow-500" />,
	info: <Info className="w-4 h-4 text-blue-500" />,
};

const variants = {
	initial: { opacity: 0, y: 50, scale: 0.3 },
	animate: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

export const Toast = ({ id, type, message, onClose }: ToastProps) => {
	React.useEffect(() => {
		const timer = setTimeout(() => onClose(id), 4000);
		return () => clearTimeout(timer);
	}, [id, onClose]);

	return (
		<motion.div
			layout
			variants={variants}
			initial="initial"
			animate="animate"
			exit="exit"
			className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-background/95 shadow-lg ring-1 ring-black/5 backdrop-blur"
		>
			<div className="p-4">
				<div className="flex items-center">
					<div className="flex-shrink-0">
						{icons[type]}
					</div>
					<div className="ml-3 flex-1">
						<p className="text-sm text-foreground">
							{message}
						</p>
					</div>
					<div className="ml-4 flex flex-shrink-0">
						<button
							onClick={() => onClose(id)}
							className="inline-flex rounded-md text-foreground/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
						>
							<span className="sr-only">Close</span>
							<XCircle className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
			<motion.div
				initial={{ scaleX: 1 }}
				animate={{ scaleX: 0 }}
				transition={{ duration: 4, ease: "linear" }}
				className="h-1 w-full origin-left bg-primary/20"
			/>
		</motion.div>
	);
};

export const ToastContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="fixed bottom-0 right-0 z-50 p-4 sm:p-6">
			<div className="flex flex-col items-end space-y-2">
				<AnimatePresence mode="popLayout">
					{children}
				</AnimatePresence>
			</div>
		</div>
	);
};

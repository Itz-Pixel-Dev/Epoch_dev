import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
	children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
	const location = useLocation();

	const pageVariants = {
		initial: {
			opacity: 0,
			y: 20,
			scale: 0.98,
		},
		enter: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.4,
				ease: [0.61, 1, 0.88, 1],
			},
		},
		exit: {
			opacity: 0,
			y: -20,
			scale: 0.98,
			transition: {
				duration: 0.3,
				ease: [0.61, 1, 0.88, 1],
			},
		},
	};

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={location.pathname}
				initial="initial"
				animate="enter"
				exit="exit"
				variants={pageVariants}
				className="w-full"
			>
				{/* Page content gradient */}
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
				
				{/* Actual content */}
				<div className="relative z-10">
					{children}
				</div>

				{/* Animated decoration elements */}
				<div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
				<div className="absolute -top-20 -left-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
			</motion.div>
		</AnimatePresence>
	);
};
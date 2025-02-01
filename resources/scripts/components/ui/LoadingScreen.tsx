import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export const LoadingScreen = () => {
	const { theme } = useTheme();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
		>
			<div className="relative">
				{/* Animated circles */}
				{[...Array(3)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute rounded-full border-2 border-primary"
						style={{
							width: `${100 + i * 30}px`,
							height: `${100 + i * 30}px`,
							left: `-${(i * 15) + 15}px`,
							top: `-${(i * 15) + 15}px`,
						}}
						animate={{
							scale: [1, 1.2, 1],
							rotate: [0, 180, 360],
							opacity: [0.3, 0.5, 0.3],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							delay: i * 0.2,
							ease: "linear",
						}}
					/>
				))}

				{/* Center logo/icon */}
				<motion.div
					className="relative w-16 h-16 flex items-center justify-center bg-background rounded-lg shadow-lg"
					animate={{
						scale: [1, 1.1, 1],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<svg
						className="w-8 h-8 text-primary"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
						/>
					</svg>
				</motion.div>
			</div>

			{/* Loading text */}
			<motion.p
				className="absolute bottom-20 text-lg font-medium text-foreground/80"
				animate={{
					opacity: [0.5, 1, 0.5],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			>
				Loading...
			</motion.p>
		</motion.div>
	);
};
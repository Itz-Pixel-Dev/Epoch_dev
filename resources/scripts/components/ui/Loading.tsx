import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

interface LoadingProps {
	size?: 'sm' | 'md' | 'lg';
	center?: boolean;
}

export const Loading = ({ size = 'md', center = false }: LoadingProps) => {
	const { theme } = useTheme();

	const sizes = {
		sm: 'w-4 h-4',
		md: 'w-8 h-8',
		lg: 'w-12 h-12',
	};

	const container = {
		animate: {
			rotate: 360,
			transition: {
				duration: 1.5,
				repeat: Infinity,
				ease: 'linear',
			},
		},
	};

	const dot = {
		initial: { scale: 0 },
		animate: {
			scale: [0, 1, 0],
			transition: {
				duration: 1,
				repeat: Infinity,
			},
		},
	};

	return (
		<div className={center ? 'flex items-center justify-center w-full h-full' : undefined}>
			<motion.div
				variants={container}
				animate="animate"
				className={`relative ${sizes[size]}`}
			>
				{[0, 120, 240].map((degree) => (
					<motion.div
						key={degree}
						variants={dot}
						initial="initial"
						animate="animate"
						style={{
							position: 'absolute',
							width: '25%',
							height: '25%',
							borderRadius: '50%',
							backgroundColor: theme.primary,
							transform: `rotate(${degree}deg) translate(150%)`,
						}}
						transition={{ delay: degree / 360 }}
					/>
				))}
			</motion.div>
		</div>
	);
};
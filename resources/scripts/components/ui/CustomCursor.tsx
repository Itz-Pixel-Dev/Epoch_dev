import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);
	const dotX = useMotionValue(-100);
	const dotY = useMotionValue(-100);
	const [isPointer, setIsPointer] = useState(false);

	const springConfig = { damping: 25, stiffness: 700 };
	const cursorXSpring = useSpring(cursorX, springConfig);
	const cursorYSpring = useSpring(cursorY, springConfig);
	const dotXSpring = useSpring(dotX, springConfig);
	const dotYSpring = useSpring(dotY, springConfig);

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			cursorX.set(e.clientX - 10);
			cursorY.set(e.clientY - 10);
			dotX.set(e.clientX - 2);
			dotY.set(e.clientY - 2);
		};

		const checkPointer = () => {
			const hoveredElement = document.elementFromPoint(
				cursorX.get() + 10,
				cursorY.get() + 10
			);
			if (hoveredElement) {
				const style = window.getComputedStyle(hoveredElement);
				setIsPointer(
					style.cursor === 'pointer' ||
					hoveredElement.tagName.toLowerCase() === 'button' ||
					hoveredElement.tagName.toLowerCase() === 'a'
				);
			}
		};

		window.addEventListener('mousemove', moveCursor);
		window.addEventListener('mousemove', checkPointer);

		return () => {
			window.removeEventListener('mousemove', moveCursor);
			window.removeEventListener('mousemove', checkPointer);
		};
	}, [cursorX, cursorY, dotX, dotY]);

	return (
		<>
			<motion.div
				className="custom-cursor"
				style={{
					x: cursorXSpring,
					y: cursorYSpring,
				}}
				animate={{
					scale: isPointer ? 1.5 : 1,
					opacity: isPointer ? 0.5 : 0.2,
				}}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 30
				}}
			/>
			<motion.div
				className="custom-cursor-dot"
				style={{
					x: dotXSpring,
					y: dotYSpring,
					opacity: isPointer ? 0 : 1,
				}}
				transition={{
					opacity: {
						duration: 0.2
					}
				}}
			/>
		</>
	);
};
import * as React from "react"
import { cn } from "./utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	/**
	 * The width of the skeleton
	 * @default "100%"
	 */
	width?: string | number;
	/**
	 * The height of the skeleton
	 * @default "1rem"
	 */
	height?: string | number;
	/**
	 * Whether to show the animation
	 * @default true
	 */
	animate?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
	({ className, width = "100%", height = "1rem", animate = true, ...props }, ref) => {
		const style = {
			width: typeof width === 'number' ? `${width}px` : width,
			height: typeof height === 'number' ? `${height}px` : height,
		}

		return (
			<div
				ref={ref}
				className={cn(
					"rounded-md bg-muted",
					animate && "animate-pulse",
					className
				)}
				style={style}
				{...props}
				role="status"
				aria-label="Loading..."
				aria-live="polite"
			/>
		)
	}
)

Skeleton.displayName = "Skeleton"

export { Skeleton }
export type { SkeletonProps }
import * as React from "react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"
import { cn } from "./utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Card variant */
	variant?: 'default' | 'hover';
	/** Padding size */
	padding?: 'none' | 'sm' | 'md' | 'lg';
	/** Whether to show glass effect */
	glass?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
	({ className, variant = 'default', padding = 'md', glass, ...props }, ref) => {
		const { theme } = useTheme();

		return (
			<motion.div
				ref={ref}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				whileHover={variant === 'hover' ? { scale: 1.02 } : undefined}
				className={cn(
					"rounded-lg border bg-card text-card-foreground shadow-sm transition-colors",
					variant === 'hover' && "hover:border-primary cursor-pointer",
					padding === 'sm' && "p-3",
					padding === 'md' && "p-5", 
					padding === 'lg' && "p-7",
					glass && "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
					className
				)}
				{...props}
			/>
		)
	}
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-6", className)}
		{...props}
	/>
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement> & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }
>(({ className, as: Comp = 'h3', ...props }, ref) => (
	<Comp
		ref={ref}
		className={cn(
			"text-2xl font-semibold leading-none tracking-tight",
			className
		)}
		{...props}
	/>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		{...props}
	/>
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
export type { CardProps }
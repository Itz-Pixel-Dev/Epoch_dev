import * as React from "react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"
import { cn } from "@/components/ui/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
	{
		variants: {
			variant: {
				primary: "bg-primary text-white hover:opacity-90",
				secondary: "bg-secondary text-white hover:opacity-90",
				outline: "border-2 border-border text-foreground hover:bg-muted",
				ghost: "text-foreground hover:bg-muted",
			},
			size: {
				sm: "px-3 py-1.5 text-sm",
				md: "px-4 py-2 text-base",
				lg: "px-6 py-3 text-lg",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
		const { theme } = useTheme()

		return (
			<motion.button
				ref={ref}
				whileTap={{ scale: 0.98 }}
				whileHover={{ scale: 1.02 }}
				className={cn(
					buttonVariants({ variant, size, className }),
					isLoading && "opacity-70 cursor-not-allowed"
				)}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading && (
					<svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
					</svg>
				)}
				{children}
			</motion.button>
		)
	}
)

Button.displayName = "Button"

export { Button, buttonVariants }


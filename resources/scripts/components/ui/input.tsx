import * as React from "react"
import { motion } from "framer-motion"
import { useTheme } from "./ThemeProvider"
import { Loader2 } from "lucide-react"
import { cn } from "./utils"

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	error?: string | boolean
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	loading?: boolean
	containerClassName?: string
	size?: "sm" | "md" | "lg"
	label?: string
	helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ 
		className, 
		type = 'text', 
		error, 
		leftIcon, 
		rightIcon, 
		loading, 
		containerClassName, 
		disabled, 
		required, 
		id, 
		size = "md", 
		label,
		helperText,
		"aria-describedby": ariaDescribedby, 
		...props 
	}, ref) => {
		const { theme } = useTheme();
		const errorId = `${id}-error`;
		const descriptionId = error ? errorId : ariaDescribedby;

		return (
			<div className={cn("space-y-1", containerClassName)}>
				{label && (
					<label 
						htmlFor={id} 
						className="block text-sm font-medium text-foreground"
					>
						{label}
					</label>
				)}
				<div className="relative">
					{leftIcon && (
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
							{leftIcon}
						</div>
					)}
					<motion.div
						initial={false}
						animate={{ scale: error ? [1, 1.02, 1] : 1 }}
						transition={{ duration: 0.2 }}
					>
						<input
							type={type}
							className={cn(
								"flex w-full rounded-md border border-input bg-background ring-offset-background transition-all duration-200",
								"file:border-0 file:bg-transparent file:text-sm file:font-medium",
								"placeholder:text-muted-foreground",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
								"disabled:cursor-not-allowed disabled:opacity-50",
								"hover:border-primary",
								error && "border-red-500 focus-visible:ring-red-500 hover:border-red-500",
								leftIcon && "pl-10",
								rightIcon && "pr-10",
								size === "sm" && "h-8 px-2 text-xs",
								size === "md" && "h-10 px-3 text-sm",
								size === "lg" && "h-12 px-4 text-base",
								className
							)}
							ref={ref}
							disabled={loading || disabled}
							aria-invalid={error ? true : undefined}
							aria-describedby={descriptionId}
							required={required}
							id={id}
							{...props}
						/>
					</motion.div>
					{rightIcon && (
						<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
							{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : rightIcon}
						</div>
					)}
				</div>
				{(error || helperText) && (
					<p
						className={cn(
							"text-sm",
							error ? "text-red-500" : "text-muted-foreground",
							error && typeof error === 'string' && "mt-1"
						)}
						id={errorId}
						role={error ? "alert" : "status"}
					>
						{typeof error === 'string' ? error : helperText}
					</p>
				)}
			</div>
		)
	}
)


Input.displayName = "Input"

export { Input }

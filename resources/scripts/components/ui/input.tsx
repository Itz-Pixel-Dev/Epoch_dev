import * as React from "react"
import { cn } from "./utils"
import { type InputProps } from "./types"

const sizeClasses = {
	sm: "h-8 px-3 text-sm",
	md: "h-10 px-4 text-base",
	lg: "h-12 px-6 text-lg",
} as const

const Input = React.forwardRef<HTMLInputElement, InputProps & React.InputHTMLAttributes<HTMLInputElement>>(
	({
		className,
		error,
		leftIcon,
		rightIcon,
		loading,
		containerClassName,
		disabled,
		required,
		id,
		"aria-describedby": ariaDescribedby,
		type = "text",
		size = "md",
		...props
	}, ref) => {
		const errorId = error && typeof error === 'string' ? `${id}-error` : undefined
		const descriptionId = ariaDescribedby || errorId

		return (
			<div className={cn("relative", containerClassName)}>
				{leftIcon && (
					<div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
						{leftIcon}
					</div>
				)}
				<input
					type={type}
					className={cn(
						"flex w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						sizeClasses[size],
						error && "border-red-500 focus-visible:ring-red-500",
						leftIcon && "pl-10",
						rightIcon && "pr-10",
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
				{rightIcon && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
						{rightIcon}
					</div>
				)}
				{error && typeof error === 'string' && (
					<p
						className="mt-1 text-sm text-red-500"
						id={errorId}
						role="alert"
					>
						{error}
					</p>
				)}
			</div>
		)
	}
)
Input.displayName = "Input"

export { Input }

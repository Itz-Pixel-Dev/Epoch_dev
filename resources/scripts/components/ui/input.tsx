import * as React from "react"
import { cn } from "./utils"
import { Loader2 } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string | boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	loading?: boolean;
	containerClassName?: string;
	size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
	sm: "h-8 px-3 text-sm",
	md: "h-10 px-4 text-base",
	lg: "h-12 px-6 text-lg"
} as const;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
	className,
	error,
	leftIcon,
	rightIcon,
	loading,
	containerClassName,
	disabled,
	required,
	id,
	size = 'md',
	type = 'text',
	"aria-describedby": ariaDescribedby,
	...props
}, ref) => {
	const errorId = `${id}-error`;
	const descriptionId = error ? errorId : ariaDescribedby;

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
					{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : rightIcon}
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
});

Input.displayName = "Input"

export { Input }

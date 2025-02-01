import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/components/ui/utils"
import { AlertCircle, CheckCircle2, Info, XCircle, X } from "lucide-react"

const alertVariants = cva(
	"relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
	{
		variants: {
			variant: {
				default: "bg-background text-foreground",
				destructive:
					"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
				success:
					"border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600",
				warning:
					"border-yellow-500/50 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-600",
				info: "border-blue-500/50 text-blue-600 dark:border-blue-500 [&>svg]:text-blue-600",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

const iconMap = {
	default: Info,
	destructive: XCircle,
	success: CheckCircle2,
	warning: AlertCircle,
	info: Info,
} as const

interface AlertProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof alertVariants> {
	showIcon?: boolean
	dismissible?: boolean
	onDismiss?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	({ className, variant = "default", showIcon = true, dismissible, onDismiss, children, ...props }, ref) => {
		const Icon = iconMap[variant || "default"]

		return (
			<div
				ref={ref}
				role="alert"
				className={cn(alertVariants({ variant }), className)}
				{...props}
			>
				{showIcon && <Icon className="h-4 w-4" />}
				<div>{children}</div>
				{dismissible && (
					<button
						onClick={onDismiss}
						className="absolute right-2 top-2 rounded-md p-1 hover:bg-accent/50"
					>
						<X className="h-4 w-4" />
						<span className="sr-only">Dismiss</span>
					</button>
				)}
			</div>
		)
	}
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h5
		ref={ref}
		className={cn("mb-1 font-medium leading-none tracking-tight", className)}
		{...props}
	/>
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-sm [&_p]:leading-relaxed", className)}
		{...props}
	/>
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

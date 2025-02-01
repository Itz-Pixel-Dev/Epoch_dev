import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"

const alertVariants = cva(
	"relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
	{
		variants: {
			variant: {
				default: "bg-background text-foreground",
				destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
				success: "border-success/50 text-success dark:border-success [&>svg]:text-success",
				warning: "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
				info: "border-info/50 text-info dark:border-info [&>svg]:text-info",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

type AlertVariants = VariantProps<typeof alertVariants>

const iconMap = {
	default: Info,
	destructive: XCircle,
	success: CheckCircle,
	warning: AlertTriangle,
	info: Info,
}

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, AlertVariants {
	/** Whether to show the icon */
	showIcon?: boolean;
	/** Whether the alert is dismissible */
	dismissible?: boolean;
	/** Callback when the alert is dismissed */
	onDismiss?: () => void;
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
				<div className="flex justify-between gap-4">
					<div>{children}</div>
					{dismissible && (
						<button
							onClick={onDismiss}
							className="inline-flex h-4 w-4 items-center justify-center rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
							aria-label="Dismiss alert"
						>
							<XCircle className="h-4 w-4" />
						</button>
					)}
				</div>
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
export type { AlertProps }
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva } from "class-variance-authority"
import { X, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { cn } from "./utils"
import { type ToastProps } from "./types"

const toastVariants = cva(
	"group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
	{
		variants: {
			variant: {
				default: "border bg-background",
				destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
				success: "border-green-500 bg-green-500 text-white",
				warning: "border-yellow-500 bg-yellow-500 text-white",
				info: "border-blue-500 bg-blue-500 text-white",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

const iconMap = {
	default: Info,
	destructive: AlertTriangle,
	success: CheckCircle,
	warning: AlertTriangle,
	info: Info,
}

const Toast = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Root>,
	ToastProps
>(({ className, variant, showIcon = true, children, ...props }, ref) => {
	const Icon = iconMap[variant || "default"]
	return (
		<ToastPrimitives.Root
			ref={ref}
			className={cn(toastVariants({ variant }), className)}
			{...props}
		>
			<div className="flex gap-3">
				{showIcon && <Icon className="h-5 w-5" />}
				{children}
			</div>
			<ToastPrimitives.Close className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100">
				<X className="h-4 w-4" />
				<span className="sr-only">Close</span>
			</ToastPrimitives.Close>
		</ToastPrimitives.Root>
	)
})
Toast.displayName = "Toast"

export { Toast, toastVariants }

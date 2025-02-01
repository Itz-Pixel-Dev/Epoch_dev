import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cn } from "./utils"
import { Toast } from "./toast"
import { useToast } from "./use-toast"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Viewport>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Viewport
		ref={ref}
		className={cn(
			"fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
			className
		)}
		{...props}
	/>
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

function Toaster() {
	const { toasts } = useToast()

	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, action, variant, showIcon = true, ...props }) => (
				<Toast key={id} variant={variant} showIcon={showIcon} {...props}>
					<div className="grid gap-1">
						{title && <div className="text-sm font-semibold">{title}</div>}
						{description && <div className="text-sm opacity-90">{description}</div>}
					</div>
					{action}
				</Toast>
			))}
			<ToastViewport />
		</ToastProvider>
	)
}

export { Toaster }

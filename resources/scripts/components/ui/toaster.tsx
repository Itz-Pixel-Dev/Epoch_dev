import { useToast } from "./use-toast"
import {
	Toast,
	ToastTitle,
	ToastDescription,
	ToastProvider,
	ToastViewport,
	ToastAction,
} from "./toast"

export function Toaster() {
	const { toasts } = useToast()

	return (
		<ToastProvider>
			{toasts.map(({ id, title, description, action, variant, showIcon = true, ...props }) => (
				<Toast key={id} variant={variant} showIcon={showIcon} {...props}>
					<div className="grid gap-1">
						{title && <ToastTitle>{title}</ToastTitle>}
						{description && (
							<ToastDescription>{description}</ToastDescription>
						)}
					</div>
					{action}
				</Toast>
			))}
			<ToastViewport />
		</ToastProvider>
	)
}

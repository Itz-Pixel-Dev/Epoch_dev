'use client'

import * as React from 'react'
import { Toast, ToastContainer } from './Toast'

interface Toast {
	id: string
	variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
	title?: string
	description?: string
}

interface ToastContextValue {
	toasts: Toast[]
	addToast: (toast: Omit<Toast, 'id'>) => void
	removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = React.useState<Toast[]>([])

	const addToast = React.useCallback(
		(toast: Omit<Toast, 'id'>) => {
			const id = Math.random().toString(36).slice(2)
			setToasts((prev) => [...prev, { ...toast, id }])

			// Auto remove after 5 seconds
			setTimeout(() => {
				setToasts((prev) => prev.filter((t) => t.id !== id))
			}, 5000)
		},
		[]
	)

	const removeToast = React.useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id))
	}, [])

	return (
		<ToastContext.Provider value={{ toasts, addToast, removeToast }}>
			{children}
			<ToastContainer>
				{toasts.map((toast) => (
					<Toast
						key={toast.id}
						variant={toast.variant}
						title={toast.title}
						description={toast.description}
						onClose={() => removeToast(toast.id)}
					/>
				))}
			</ToastContainer>
		</ToastContext.Provider>
	)
}

export function useToast() {
	const context = React.useContext(ToastContext)
	if (!context) throw new Error('useToast must be used within ToastProvider')
	return context
}
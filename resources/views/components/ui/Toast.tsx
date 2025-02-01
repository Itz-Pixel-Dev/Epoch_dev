'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react'

interface ToastProps {
	variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
	title?: string
	description?: string
	onClose?: () => void
}

const variants = {
	default: {
		containerClass: 'bg-background text-foreground',
		icon: null
	},
	success: {
		containerClass: 'bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100',
		icon: CheckCircle2
	},
	error: {
		containerClass: 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100',
		icon: XCircle
	},
	warning: {
		containerClass: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100',
		icon: AlertCircle
	},
	info: {
		containerClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100',
		icon: Info
	}
}

export function Toast({
	variant = 'default',
	title,
	description,
	onClose
}: ToastProps) {
	const { containerClass, icon: Icon } = variants[variant]

	return (
		<div
			className={cn(
				'pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 shadow-lg transition-all',
				containerClass
			)}
		>
			<div className="flex items-start gap-3">
				{Icon && <Icon className="h-5 w-5" />}
				<div className="flex flex-col gap-1">
					{title && <p className="text-sm font-medium">{title}</p>}
					{description && <p className="text-sm opacity-90">{description}</p>}
				</div>
			</div>
			{onClose && (
				<button
					onClick={onClose}
					className="rounded-md p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100"
				>
					<XCircle className="h-4 w-4" />
				</button>
			)}
		</div>
	)
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className="fixed bottom-0 right-0 z-50 m-4 flex max-h-screen w-full flex-col-reverse gap-2 sm:max-w-[420px]">
			{children}
		</div>
	)
}
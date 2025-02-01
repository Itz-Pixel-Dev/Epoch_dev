'use client'

import * as React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	icon?: React.ReactNode
}

export function Input({ 
	label, 
	error, 
	icon,
	className = '',
	...props 
}: InputProps) {
	return (
		<div className="space-y-2">
			{label && (
				<label className="text-sm font-medium text-foreground">
					{label}
				</label>
			)}
			
			<div className="relative">
				{icon && (
					<div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
						{icon}
					</div>
				)}
				
				<input
					className={`
						w-full rounded-xl border border-input bg-background px-4 py-2
						text-sm transition-colors placeholder:text-muted-foreground
						focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
						disabled:opacity-50
						${icon ? 'pl-10' : ''}
						${error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}
						${className}
					`}
					{...props}
				/>
			</div>

			{error && (
				<p className="text-sm text-destructive animate-fade-in">
					{error}
				</p>
			)}
		</div>
	)
}
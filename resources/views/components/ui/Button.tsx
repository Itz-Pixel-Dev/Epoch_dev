'use client'

import * as React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'primary' | 'secondary' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	isLoading?: boolean
	children: React.ReactNode
}

export function Button({
	variant = 'default',
	size = 'md',
	isLoading = false,
	className = '',
	children,
	...props
}: ButtonProps) {
	const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none'
	
	const variants = {
		default: 'bg-primary text-primary-foreground hover:opacity-90',
		secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
		ghost: 'hover:bg-primary/10 text-foreground',
		primary: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:scale-[1.02]'
	}

	const sizes = {
		sm: 'h-8 px-3 text-sm',
		md: 'h-10 px-4',
		lg: 'h-12 px-6 text-lg'
	}

	return (
		<button
			className={`
				${baseStyles}
				${variants[variant]}
				${sizes[size]}
				${isLoading ? 'opacity-50 pointer-events-none' : ''}
				${className}
			`}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? (
				<div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
			) : null}
			{children}
		</button>
	)
}

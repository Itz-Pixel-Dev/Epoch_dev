'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

interface CardProps {
	children: React.ReactNode
	className?: string
	hover?: boolean
}

export function Card({ children, className = '', hover = true }: CardProps) {
	return (
		<div
			className={cn(
				'backdrop-blur-md bg-background/30',
				'border border-border/40 shadow-lg',
				'rounded-xl p-4',
				hover && 'hover:shadow-xl hover:scale-[1.02] transition-all duration-300',
				className
			)}
		>
			{children}
		</div>
	)
}

interface CardHeaderProps {
	title: string
	description?: string
	icon?: React.ReactNode
}

export function CardHeader({ title, description, icon }: CardHeaderProps) {
	return (
		<div className="flex items-start gap-4 mb-4">
			{icon && (
				<div className="p-2 rounded-lg bg-primary/10">
					{icon}
				</div>
			)}
			<div>
				<h3 className="text-lg font-semibold">{title}</h3>
				{description && (
					<p className="text-sm text-muted-foreground">{description}</p>
				)}
			</div>
		</div>
	)
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={className}>
			{children}
		</div>
	)
}

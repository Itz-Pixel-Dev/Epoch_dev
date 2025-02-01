'use client'

import { useState } from 'react'
import { useTheme } from '../../theme/ThemeProvider'
import { cn } from '../../lib/utils'

const menuItems = [
	{ name: 'Dashboard', href: '/dashboard', icon: '📊' },
	{ name: 'Servers', href: '/servers', icon: '🖥️' },
	{ name: 'Settings', href: '/settings', icon: '⚙️' },
	{ name: 'Users', href: '/users', icon: '👥' },
]

export function NavigationMenu() {
	const [activeItem, setActiveItem] = useState('Dashboard')
	const { theme } = useTheme()

	return (
		<nav className="flex items-center gap-2">
			{menuItems.map((item) => (
				<a
					key={item.name}
					href={item.href}
					onClick={() => setActiveItem(item.name)}
					className={cn(
						'relative px-4 py-2 rounded-xl transition-all duration-300',
						'hover:bg-primary/10 hover:scale-105',
						'group flex items-center gap-2',
						activeItem === item.name ? 'text-primary' : 'text-muted-foreground'
					)}
				>
					<span className="text-xl group-hover:scale-110 transition-transform">
						{item.icon}
					</span>
					<span className="font-medium">{item.name}</span>
					
					{/* Active indicator */}
					{activeItem === item.name && (
						<span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
					)}
				</a>
			))}
		</nav>
	)
}

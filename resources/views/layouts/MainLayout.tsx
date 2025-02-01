'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider } from '../theme/ThemeProvider'
import { NavigationMenu } from '../components/ui/NavigationMenu'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import { PageTransition } from '../components/ui/PageTransition'

interface MainLayoutProps {
	children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 1000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<ThemeProvider defaultTheme="system">
			{isLoading ? (
				<LoadingScreen />
			) : (
				<div className="min-h-screen bg-gradient-to-br from-background to-secondary">
					<div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />
					
					<nav className="fixed top-0 w-full z-50">
						<div className="backdrop-blur-md bg-background/30 mx-4 my-4 rounded-2xl border border-border/40 shadow-lg">
							<div className="container mx-auto px-4 py-3 flex items-center justify-between">
								<NavigationMenu />
								<ThemeToggle />
							</div>
						</div>
					</nav>

					<main className="pt-24 pb-8 px-4">
						<div className="container mx-auto">
							<PageTransition>
								<div className="backdrop-blur-md bg-background/30 rounded-2xl p-6 border border-border/40 shadow-lg animate-fade-in">
									{children}
								</div>
							</PageTransition>
						</div>
					</main>
				</div>
			)}
		</ThemeProvider>
	)
}

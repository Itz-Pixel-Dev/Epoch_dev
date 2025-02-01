'use client'

import { useTheme } from '../../theme/ThemeProvider'

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="relative p-2 rounded-xl hover:bg-primary/10 transition-colors group"
			aria-label="Toggle theme"
		>
			{/* Sun icon */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className={`w-5 h-5 transition-all duration-300 ${
					theme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
				}`}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
			>
				<circle cx="12" cy="12" r="5" />
				<line x1="12" y1="1" x2="12" y2="3" />
				<line x1="12" y1="21" x2="12" y2="23" />
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
				<line x1="1" y1="12" x2="3" y2="12" />
				<line x1="21" y1="12" x2="23" y2="12" />
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
			</svg>

			{/* Moon icon */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className={`w-5 h-5 absolute top-2 left-2 transition-all duration-300 ${
					theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
				}`}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
			>
				<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
			</svg>

			<span className="sr-only">Toggle theme</span>
		</button>
	)

}
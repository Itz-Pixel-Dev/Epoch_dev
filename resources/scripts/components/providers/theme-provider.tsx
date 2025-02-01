import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			{...props}
		>
			{children}
		</NextThemesProvider>
	)
}

export function useTheme() {
	const { theme, setTheme } = React.useContext(NextThemesProvider)
	return {
		theme,
		setTheme,
		toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
	}
}
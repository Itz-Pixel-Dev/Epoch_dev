import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { ThemeConfig, ColorScheme, loadThemeConfig, saveThemeConfig, defaultThemeConfig } from "@/lib/theme-config"

interface ThemeProviderProps {
	children: React.ReactNode
}

interface ThemeProviderState {
	config: ThemeConfig
	setMode: (mode: ThemeConfig['mode']) => void
	setColors: (scheme: 'light' | 'dark', colors: ColorScheme) => void
	activeColors: ColorScheme
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const [config, setConfig] = useState<ThemeConfig>(loadThemeConfig)
	
	const setMode = (mode: ThemeConfig['mode']) => {
		const newConfig = { ...config, mode }
		setConfig(newConfig)
		saveThemeConfig(newConfig)
	}

	const setColors = (scheme: 'light' | 'dark', colors: ColorScheme) => {
		const newConfig = {
			...config,
			colors: {
				...config.colors,
				[scheme]: colors
			}
		}
		setConfig(newConfig)
		saveThemeConfig(newConfig)
	}

	const getActiveColors = (): ColorScheme => {
		if (config.mode === 'system') {
			return window.matchMedia('(prefers-color-scheme: dark)').matches
				? config.colors.dark
				: config.colors.light
		}
		return config.colors[config.mode]
	}

	useEffect(() => {
		const root = window.document.documentElement
		const colors = getActiveColors()
		
		root.classList.remove('light', 'dark')
		root.classList.add(config.mode === 'system' 
			? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
			: config.mode
		)

		Object.entries(colors).forEach(([key, value]) => {
			root.style.setProperty(`--color-${key}`, value)
		})
	}, [config])

	return (
		<ThemeProviderContext.Provider
			{...props}
			value={{
				config,
				setMode,
				setColors,
				activeColors: getActiveColors()
			}}
		>
			{children}
		</ThemeProviderContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext)
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return context
}
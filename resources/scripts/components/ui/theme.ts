export const themeConfig = {
	light: {
		background: '#ffffff',
		foreground: '#11111',
		primary: '#2563eb',
		secondary: '#4f46e5',
		accent: '#0ea5e9',
		muted: '#f3f4f6',
		border: '#e5e7eb',
		text: {
			primary: '#111827',
			secondary: '#4b5563',
		},
	},
	dark: {
		background: '#0f172a',
		foreground: '#1e293b',
		primary: '#3b82f6',
		secondary: '#6366f1', 
		accent: '#0ea5e9',
		muted: '#1e293b',
		border: '#334155',
		text: {
			primary: '#f8fafc',
			secondary: '#94a3b8',
		},
	},
}

export type Theme = typeof themeConfig.light
import React from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ColorScheme } from "@/lib/theme-config";

const ColorPicker = ({ color, onChange, label }: { color: string; onChange: (value: string) => void; label: string }) => (
	<div className="flex items-center gap-4 mb-4">
		<Label className="w-24">{label}</Label>
		<input
			type="color"
			value={color}
			onChange={(e) => onChange(e.target.value)}
			className="h-8 w-16 rounded cursor-pointer"
		/>
		<input
			type="text"
			value={color}
			onChange={(e) => onChange(e.target.value)}
			className="px-2 py-1 border rounded w-32"
		/>
	</div>
);

export function ThemeSettings() {
	const { config, setMode, setColors, activeColors } = useTheme();
	const [selectedScheme, setSelectedScheme] = React.useState<'light' | 'dark'>('light');

	const handleColorChange = (key: keyof ColorScheme, value: string) => {
		setColors(selectedScheme, {
			...config.colors[selectedScheme],
			[key]: value,
		});
	};

	return (
		<div className="space-y-6">
			<Card className="p-6">
				<h2 className="text-2xl font-bold mb-4">Theme Settings</h2>
				
				<div className="mb-6">
					<Label>Theme Mode</Label>
					<div className="flex gap-2 mt-2">
						{(['light', 'dark', 'system'] as const).map((mode) => (
							<Button
								key={mode}
								variant={config.mode === mode ? "default" : "outline"}
								onClick={() => setMode(mode)}
								className="capitalize"
							>
								{mode}
							</Button>
						))}
					</div>
				</div>

				<div className="mb-6">
					<Label>Edit Colors For</Label>
					<div className="flex gap-2 mt-2">
						{(['light', 'dark'] as const).map((scheme) => (
							<Button
								key={scheme}
								variant={selectedScheme === scheme ? "default" : "outline"}
								onClick={() => setSelectedScheme(scheme)}
								className="capitalize"
							>
								{scheme}
							</Button>
						))}
					</div>
				</div>

				<div className="space-y-4">
					<ColorPicker
						label="Primary"
						color={config.colors[selectedScheme].primary}
						onChange={(value) => handleColorChange('primary', value)}
					/>
					<ColorPicker
						label="Secondary"
						color={config.colors[selectedScheme].secondary}
						onChange={(value) => handleColorChange('secondary', value)}
					/>
					<ColorPicker
						label="Accent"
						color={config.colors[selectedScheme].accent}
						onChange={(value) => handleColorChange('accent', value)}
					/>
					<ColorPicker
						label="Background"
						color={config.colors[selectedScheme].background}
						onChange={(value) => handleColorChange('background', value)}
					/>
					<ColorPicker
						label="Foreground"
						color={config.colors[selectedScheme].foreground}
						onChange={(value) => handleColorChange('foreground', value)}
					/>
				</div>
			</Card>
		</div>
	);
}
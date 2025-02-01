import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Switch } from '@/components/ui/Switch';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { useTheme } from '@/components/ui/ThemeProvider';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';

export const SettingsView = () => {
	const { isDark, toggleTheme } = useTheme();
	const user = useStoreState((state: ApplicationStore) => state.user.data);
	const [showSaved, setShowSaved] = React.useState(false);

	const handleSave = () => {
		setShowSaved(true);
		setTimeout(() => setShowSaved(false), 3000);
	};

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<h1 className="text-3xl font-bold text-foreground">Settings</h1>
				<p className="mt-1 text-foreground/60">
					Manage your account settings and preferences.
				</p>
			</motion.div>

			{showSaved && (
				<Alert variant="success" show={true}>
					Settings saved successfully!
				</Alert>
			)}

			<Card padding="lg">
				<h2 className="text-xl font-semibold mb-6">Theme Preferences</h2>
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-base font-medium">Dark Mode</h3>
							<p className="text-sm text-foreground/60">
								Toggle between light and dark theme
							</p>
						</div>
						<Switch checked={isDark} onCheckedChange={toggleTheme} />
					</div>
				</div>
			</Card>

			<Card padding="lg">
				<h2 className="text-xl font-semibold mb-6">Account Settings</h2>
				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium mb-2">Username</label>
						<Input value={user?.username} disabled />
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Email</label>
						<Input value={user?.email} disabled />
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Language</label>
						<select className="w-full rounded-md border border-border bg-background px-4 py-2">
							<option value="en">English</option>
							<option value="es">Spanish</option>
							<option value="fr">French</option>
						</select>
					</div>
					<div className="pt-4">
						<Button variant="primary" onClick={handleSave}>
							Save Changes
						</Button>
					</div>
				</div>
			</Card>

			<Card padding="lg" className="border-red-200 dark:border-red-800">
				<h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-6">
					Danger Zone
				</h2>
				<div className="space-y-4">
					<p className="text-sm text-foreground/60">
						Once you delete your account, there is no going back. Please be certain.
					</p>
					<Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
						Delete Account
					</Button>
				</div>
			</Card>
		</div>
	);
};
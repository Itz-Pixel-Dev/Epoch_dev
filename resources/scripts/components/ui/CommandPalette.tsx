import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Command, Settings, Server, Database, Activity, Users, LogOut } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface CommandItem {
	id: string;
	icon: React.ReactNode;
	title: string;
	description?: string;
	shortcut?: string[];
	action: () => void;
}

export const CommandPalette = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [search, setSearch] = React.useState('');
	const inputRef = React.useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const { isDark } = useTheme();

	const commands: CommandItem[] = [
		{
			id: 'dashboard',
			icon: <Command className="h-4 w-4" />,
			title: 'Go to Dashboard',
			description: 'Return to the main dashboard',
			shortcut: ['G', 'H'],
			action: () => navigate('/'),
		},
		{
			id: 'servers',
			icon: <Server className="h-4 w-4" />,
			title: 'Servers',
			description: 'Manage your servers',
			shortcut: ['G', 'S'],
			action: () => navigate('/servers'),
		},
		{
			id: 'databases',
			icon: <Database className="h-4 w-4" />,
			title: 'Databases',
			description: 'Manage databases',
			action: () => navigate('/databases'),
		},
		{
			id: 'activity',
			icon: <Activity className="h-4 w-4" />,
			title: 'Activity Log',
			description: 'View recent activity',
			action: () => navigate('/activity'),
		},
		{
			id: 'settings',
			icon: <Settings className="h-4 w-4" />,
			title: 'Settings',
			description: 'Manage your account settings',
			action: () => navigate('/settings'),
		},
		{
			id: 'logout',
			icon: <LogOut className="h-4 w-4" />,
			title: 'Logout',
			description: 'Sign out of your account',
			action: () => console.log('logout'),
		},
	];

	const filteredCommands = commands.filter(
		command =>
			command.title.toLowerCase().includes(search.toLowerCase()) ||
			command.description?.toLowerCase().includes(search.toLowerCase())
	);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsOpen(open => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
						onClick={() => setIsOpen(false)}
					/>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						className="fixed inset-x-0 top-[20%] max-w-2xl mx-auto z-50 p-4"
					>
						<div className={`
							overflow-hidden rounded-lg shadow-2xl
							${isDark ? 'bg-background/90' : 'bg-background'}
							border border-border backdrop-blur
						`}>
							<div className="flex items-center border-b border-border p-4">
								<Search className="h-4 w-4 text-foreground/40" />
								<input
									ref={inputRef}
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									placeholder="Search commands..."
									className="flex-1 bg-transparent px-4 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
									autoFocus
								/>
								<kbd className="hidden sm:flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-foreground/40">
									<span className="text-xs">⌘</span>K
								</kbd>
							</div>
							<div className="max-h-[60vh] overflow-y-auto">
								{filteredCommands.map((command) => (
									<motion.button
										key={command.id}
										onClick={() => {
											command.action();
											setIsOpen(false);
										}}
										className="flex items-center gap-4 w-full p-4 text-left hover:bg-foreground/5 transition-colors"
										whileHover={{ x: 4 }}
									>
										<div className="flex-shrink-0 text-primary">{command.icon}</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-foreground">{command.title}</p>
											{command.description && (
												<p className="text-xs text-foreground/60">{command.description}</p>
											)}
										</div>
										{command.shortcut && (
											<div className="flex items-center gap-1">
												{command.shortcut.map((key, i) => (
													<React.Fragment key={i}>
														<kbd className="rounded bg-muted px-2 py-1 text-xs">
															{key}
														</kbd>
														{i < command.shortcut!.length - 1 && <span>+</span>}
													</React.Fragment>
												))}
											</div>
										)}
									</motion.button>
								))}
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};
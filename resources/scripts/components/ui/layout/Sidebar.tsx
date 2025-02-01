import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils';
import { 
	LayoutDashboard, 
	Server, 
	Database, 
	Settings, 
	Users, 
	Activity,
	Terminal,
	HardDrive
} from 'lucide-react';

const menuItems = [
	{ icon: LayoutDashboard, label: 'Dashboard', path: '/' },
	{ icon: Server, label: 'Servers', path: '/servers' },
	{ icon: Database, label: 'Databases', path: '/databases' },
	{ icon: Terminal, label: 'Console', path: '/console' },
	{ icon: HardDrive, label: 'Backups', path: '/backups' },
	{ icon: Activity, label: 'Activity', path: '/activity' },
	{ icon: Users, label: 'Users', path: '/users' },
	{ icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
	const location = useLocation();

	return (
		<motion.aside
			initial={{ x: -20, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			className="w-64 border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-[calc(100vh-4rem)] sticky top-16"
		>
			<nav className="p-4 space-y-2">
				{menuItems.map((item) => {
					const Icon = item.icon;
					const isActive = location.pathname === item.path;

					return (
						<Link
							key={item.path}
							to={item.path}
							className={cn(
								'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
								isActive 
									? 'bg-primary text-primary-foreground' 
									: 'text-foreground/60 hover:text-foreground hover:bg-muted'
							)}
						>
							<Icon className="h-5 w-5" />
							{item.label}
						</Link>
					);
				})}
			</nav>

			<div className="absolute bottom-0 p-4 w-full border-t border-border">
				<div className="flex items-center gap-3 px-3 py-2">
					<div className="w-2 h-2 rounded-full bg-green-500" />
					<span className="text-sm text-foreground/60">System Status: Online</span>
				</div>
			</div>
		</motion.aside>
	);
};
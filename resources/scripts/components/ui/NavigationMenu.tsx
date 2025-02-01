import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
	LayoutDashboard, 
	Server, 
	Database, 
	Settings, 
	Users, 
	Activity,
	ChevronRight
} from 'lucide-react';

const menuItems = [
	{ icon: LayoutDashboard, label: 'Dashboard', path: '/' },
	{ icon: Server, label: 'Servers', path: '/servers' },
	{ icon: Database, label: 'Databases', path: '/databases' },
	{ icon: Activity, label: 'Activity', path: '/activity' },
	{ icon: Users, label: 'Users', path: '/users' },
	{ icon: Settings, label: 'Settings', path: '/settings' },
];

export const NavigationMenu = () => {
	const location = useLocation();

	return (
		<nav className="space-y-1 p-4">
			{menuItems.map((item) => {
				const Icon = item.icon;
				const isActive = location.pathname === item.path;

				return (
					<Link
						key={item.path}
						to={item.path}
						className="relative block"
					>
						<motion.div
							className={`
								flex items-center px-4 py-3 rounded-lg text-sm font-medium
								transition-colors relative
								${isActive 
									? 'text-primary bg-primary/10' 
									: 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
								}
							`}
							whileHover={{ x: 4 }}
							whileTap={{ scale: 0.98 }}
						>
							<Icon className="h-5 w-5 mr-3" />
							<span>{item.label}</span>
							{isActive && (
								<motion.div
									className="absolute right-4"
									initial={{ opacity: 0, x: -10 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.2 }}
								>
									<ChevronRight className="h-4 w-4" />
								</motion.div>
							)}
							{isActive && (
								<motion.div
									layoutId="active-nav"
									className="absolute inset-0 rounded-lg border border-primary/20"
									transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
								/>
							)}
						</motion.div>
					</Link>
				);
			})}
		</nav>
	);
};
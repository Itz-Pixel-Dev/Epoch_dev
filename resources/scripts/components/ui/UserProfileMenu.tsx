import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import { 
	User, 
	Settings, 
	Bell, 
	LogOut, 
	Moon, 
	Sun,
	ChevronDown 
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const UserProfileMenu = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const { isDark, toggleTheme } = useTheme();
	const user = useStoreState((state: ApplicationStore) => state.user.data);

	const menuVariants = {
		hidden: { opacity: 0, y: -10, scale: 0.95 },
		visible: { 
			opacity: 1, 
			y: 0, 
			scale: 1,
			transition: {
				type: "spring",
				duration: 0.2,
				staggerChildren: 0.05
			}
		},
		exit: { 
			opacity: 0, 
			y: -10, 
			scale: 0.95,
			transition: { duration: 0.2 }
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, x: -10 },
		visible: { opacity: 1, x: 0 },
	};

	return (
		<div className="relative">
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-foreground/5 transition-colors"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
					<span className="text-sm font-medium text-primary">
						{user?.username?.charAt(0).toUpperCase()}
					</span>
				</div>
				<div className="text-left">
					<p className="text-sm font-medium text-foreground">{user?.username}</p>
					<p className="text-xs text-foreground/60">{user?.email}</p>
				</div>
				<ChevronDown className="h-4 w-4 text-foreground/60" />
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<>
						<motion.div
							className="fixed inset-0 z-30"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsOpen(false)}
						/>
						<motion.div
							variants={menuVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							className="absolute right-0 mt-2 w-64 rounded-lg border border-border bg-background/80 backdrop-blur-sm shadow-lg z-40"
						>
							<div className="p-3 border-b border-border">
								<motion.div variants={itemVariants} className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
										<User className="h-5 w-5 text-primary" />
									</div>
									<div>
										<p className="text-sm font-medium text-foreground">{user?.username}</p>
										<p className="text-xs text-foreground/60">{user?.email}</p>
									</div>
								</motion.div>
							</div>

							<div className="p-2">
								<motion.button
									variants={itemVariants}
									onClick={toggleTheme}
									className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
								>
									{isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
									{isDark ? 'Dark Mode' : 'Light Mode'}
								</motion.button>
								<motion.button
									variants={itemVariants}
									className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
								>
									<Bell className="h-4 w-4" />
									Notifications
								</motion.button>
								<motion.button
									variants={itemVariants}
									className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
								>
									<Settings className="h-4 w-4" />
									Settings
								</motion.button>
								<motion.button
									variants={itemVariants}
									className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-500 hover:bg-red-500/5 transition-colors"
								>
									<LogOut className="h-4 w-4" />
									Logout
								</motion.button>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};
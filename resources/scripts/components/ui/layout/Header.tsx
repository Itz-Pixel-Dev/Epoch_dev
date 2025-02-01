import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import { ThemeToggle } from '../ThemeToggle';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuLink,
} from '@radix-ui/react-navigation-menu';
import { 
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Avatar } from '@radix-ui/react-avatar';
import { Bell, Settings, LogOut, Server } from 'lucide-react';

export const Header = () => {
	const user = useStoreState((state: ApplicationStore) => state.user.data);

	return (
		<motion.header
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
		>
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-8">
						<Link to="/" className="flex items-center gap-2">
							<Server className="h-6 w-6 text-primary" />
							<span className="text-xl font-bold">Panel</span>
						</Link>
						<NavigationMenu>
							<NavigationMenuList className="flex gap-6">
								<NavigationMenuItem>
									<NavigationMenuLink asChild>
										<Link to="/" className="text-foreground/60 hover:text-foreground transition-colors">
											Dashboard
										</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
								{user?.rootAdmin && (
									<NavigationMenuItem>
										<NavigationMenuLink asChild>
											<Link to="/admin" className="text-foreground/60 hover:text-foreground transition-colors">
												Admin
											</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>
								)}
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					<div className="flex items-center gap-4">
						<ThemeToggle />
						<button className="relative text-foreground/60 hover:text-foreground transition-colors">
							<Bell className="h-5 w-5" />
							<span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-white flex items-center justify-center">
								3
							</span>
						</button>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-2">
								<Avatar className="h-8 w-8 rounded-full bg-muted">
									<span className="font-medium text-sm">{user?.username?.charAt(0).toUpperCase()}</span>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56 bg-background border border-border p-2 rounded-lg shadow-lg">
								<DropdownMenuItem className="flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-muted rounded-md">
									<Settings className="h-4 w-4" />
									Settings
								</DropdownMenuItem>
								<DropdownMenuItem className="flex items-center gap-2 p-2 text-sm cursor-pointer hover:bg-muted rounded-md text-red-500">
									<LogOut className="h-4 w-4" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</motion.header>
	);
};
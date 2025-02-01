import React, { useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '../ui/navigation-menu';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { User, Settings, LogOut, Menu, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../providers/theme-provider';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="min-h-screen bg-background">
			<header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center justify-between">
					<div className="flex items-center gap-4">
						<Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
							<Menu className="h-5 w-5" />
						</Button>
						<div className="hidden md:block">
							<NavigationMenu>
								<NavigationMenuList className="space-x-2">
									<NavigationMenuItem>
										<NavigationMenuLink className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors" href="/dashboard">
											Dashboard
										</NavigationMenuLink>
									</NavigationMenuItem>
									<NavigationMenuItem>
										<NavigationMenuLink className="hover:bg-muted px-4 py-2 rounded-md transition-colors" href="/servers">
											Servers
											<Badge className="ml-2 bg-primary/20 text-primary hover:bg-primary/30">4</Badge>
										</NavigationMenuLink>
									</NavigationMenuItem>
									<NavigationMenuItem>
										<NavigationMenuLink className="hover:bg-muted px-4 py-2 rounded-md transition-colors" href="/databases">
											Databases
										</NavigationMenuLink>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<Button variant="ghost" size="icon" className="relative" onClick={() => {}}>
							<Bell className="h-5 w-5" />
							<span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
								3
							</span>
						</Button>
						<Button variant="ghost" size="icon" onClick={toggleTheme}>
							{theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-full">
									<User className="h-5 w-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<div className="flex items-center justify-start gap-2 p-2">
									<div className="rounded-full bg-primary/10 p-1">
										<User className="h-8 w-8 text-primary" />
									</div>
									<div className="space-y-1">
										<p className="text-sm font-medium">Admin User</p>
										<p className="text-xs text-muted-foreground">admin@example.com</p>
									</div>
								</div>
								<Separator />
								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" />
									Settings
								</DropdownMenuItem>
								<DropdownMenuItem className="text-red-600">
									<LogOut className="mr-2 h-4 w-4" />
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>

			{/* Mobile Menu */}
			<div className={`md:hidden fixed inset-0 z-30 bg-background/80 backdrop-blur-sm transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
				<ScrollArea className="h-full w-[300px] bg-background border-r">
					<div className="p-6 space-y-4">
						<NavigationMenu orientation="vertical">
							<NavigationMenuList className="flex-col space-y-2">
								<NavigationMenuItem>
									<NavigationMenuLink className="flex items-center px-4 py-2 hover:bg-muted rounded-md" href="/dashboard">
										Dashboard
									</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink className="flex items-center px-4 py-2 hover:bg-muted rounded-md" href="/servers">
										Servers
										<Badge className="ml-2">4</Badge>
									</NavigationMenuLink>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuLink className="flex items-center px-4 py-2 hover:bg-muted rounded-md" href="/databases">
										Databases
									</NavigationMenuLink>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
				</ScrollArea>
			</div>

			<main className="container py-6">
				{children}
			</main>
		</div>
	);
}
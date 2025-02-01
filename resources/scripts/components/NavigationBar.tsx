import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Settings, LogOut, Moon, Sun, User } from 'lucide-react';
import { useStoreState } from 'easy-peasy';
import type { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import { useTheme } from '@/components/providers/theme-provider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import http from '@/api/http';
import { useToast } from '@/components/ui/use-toast';


export default () => {
    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();

    const onTriggerLogout = async () => {
        try {
            setIsLoggingOut(true);
            await http.post('/auth/logout');
            window.location.href = '/';
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to log out. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
            <div className="container mx-auto flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">{name}</span>
                    </Link>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavLink 
                                    to="/" 
                                    exact
                                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                >
                                    Dashboard
                                </NavLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex items-center gap-4">
                    <SearchContainer />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                                    {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Toggle theme</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    {rootAdmin && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" asChild>
                                        <a href="/admin" rel="noreferrer">
                                            <Settings className="h-5 w-5" />
                                        </a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Admin Panel</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/01.png" alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuItem asChild>
                                <Link to="/account">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Account Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={onTriggerLogout} disabled={isLoggingOut}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>{isLoggingOut ? 'Signing out...' : 'Sign out'}</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

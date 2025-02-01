import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';

export const NavigationBar = () => {
	const username = useStoreState((state: ApplicationStore) => state.user.data?.username);
	const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data?.rootAdmin);

	return (
		<motion.nav 
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			className="bg-background border-b border-border"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link to="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
							Panel
						</Link>
						<div className="hidden md:flex items-center space-x-8 ml-10">
							<Link to="/" className="text-foreground hover:text-primary transition-colors">
								Dashboard
							</Link>
							{rootAdmin && (
								<Link to="/admin" className="text-foreground hover:text-primary transition-colors">
									Admin
								</Link>
							)}
						</div>
					</div>
					<div className="flex items-center space-x-6">
						<ThemeToggle />
						<span className="text-foreground">{username}</span>
					</div>
				</div>
			</div>
		</motion.nav>
	);
};
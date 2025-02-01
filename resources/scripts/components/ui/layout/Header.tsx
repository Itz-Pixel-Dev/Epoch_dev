import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Server } from 'lucide-react';
import { NavigationMenu } from '../NavigationMenu';
import { UserProfileMenu } from '../UserProfileMenu';

export const Header = () => {
	return (
		<motion.header
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-sm"
		>
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-8">
						<Link 
							to="/"
							className="flex items-center gap-2 transition-colors hover:text-primary"
						>
							<motion.div
								whileHover={{ rotate: 20 }}
								transition={{ type: "spring", stiffness: 400, damping: 10 }}
							>
								<Server className="h-6 w-6 text-primary" />
							</motion.div>
							<span className="text-xl font-bold">Panel</span>
						</Link>
						<NavigationMenu />
					</div>

					<div className="flex items-center gap-4">
						<UserProfileMenu />
					</div>
				</div>
			</div>
		</motion.header>
	);

};
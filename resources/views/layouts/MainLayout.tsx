import React from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { NavigationBar } from '@/components/ui/NavigationBar';

interface MainLayoutProps {
	children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<ThemeProvider>
			<div className="min-h-screen bg-background">
				<NavigationBar />
				<motion.main
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="container mx-auto px-4 py-8"
				>
					{children}
				</motion.main>
				<footer className="border-t border-border py-6 mt-auto">
					<div className="container mx-auto px-4 text-center text-foreground/60">
						© {new Date().getFullYear()} Panel. All rights reserved.
					</div>
				</footer>
			</div>
		</ThemeProvider>
	);
};
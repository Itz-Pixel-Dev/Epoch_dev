import React from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { Header } from '@/components/ui/layout/Header';
import { Sidebar } from '@/components/ui/layout/Sidebar';
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface MainLayoutProps {
	children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<ThemeProvider>
			<div className="min-h-screen bg-background">
				<Header />
				<div className="flex">
					<Sidebar />
					<ScrollArea className="flex-1">
						<motion.main
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="container mx-auto px-6 py-8"
						>
							{children}
						</motion.main>
						<footer className="border-t border-border py-6">
							<div className="container mx-auto px-6 text-center text-foreground/60">
								<p>© {new Date().getFullYear()} Panel. All rights reserved.</p>
								<p className="mt-1 text-sm">Version 1.0.0</p>
							</div>
						</footer>
					</ScrollArea>
				</div>
			</div>
		</ThemeProvider>
	);
};
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Server } from '@/api/server/getServer';
import { useTheme } from './ThemeProvider';

interface ServerCardProps {
	server: Server;
}

export const ServerCard = ({ server }: ServerCardProps) => {
	const { isDark } = useTheme();

	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className={`
				rounded-lg border border-border p-4 
				${isDark ? 'bg-foreground hover:bg-foreground/80' : 'bg-white hover:bg-gray-50'}
				transition-colors duration-150 ease-in-out
			`}
		>
			<Link to={`/server/${server.id}`} className="block">
				<h3 className="text-lg font-semibold text-foreground mb-2">
					{server.name}
				</h3>
				<div className="space-y-2">
					<p className="text-sm text-foreground/70">
						{server.description || 'No description provided'}
					</p>
					<div className="flex items-center gap-4">
						<span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
							{server.node}
						</span>
						<span className={`text-xs px-2 py-1 rounded-full ${
							server.isInstalling ? 'bg-yellow-500/10 text-yellow-500' :
							server.isTransferring ? 'bg-blue-500/10 text-blue-500' :
							'bg-green-500/10 text-green-500'
						}`}>
							{server.status}
						</span>
					</div>
				</div>
			</Link>
		</motion.div>
	);
};
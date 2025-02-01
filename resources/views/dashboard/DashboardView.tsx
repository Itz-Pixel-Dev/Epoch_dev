import React from 'react';
import { motion } from 'framer-motion';
import { ServerCard } from '@/components/ui/ServerCard';
import { Loading } from '@/components/ui/Loading';
import { Alert } from '@/components/ui/Alert';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import useSWR from 'swr';
import getServers from '@/api/getServers';

export const DashboardView = () => {
	const { data: servers, error } = useSWR('/api/client/servers', getServers);
	const username = useStoreState((state: ApplicationStore) => state.user.data?.username);

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	if (!servers && !error) {
		return <Loading center size="lg" />;
	}

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<h1 className="text-4xl font-bold text-foreground">
					Welcome back, {username}!
				</h1>
				<p className="mt-2 text-foreground/60">
					Manage your servers and resources from one place.
				</p>
			</motion.div>

			{error && (
				<Alert 
					variant="error" 
					title="Error"
					show={true}
				>
					Failed to load servers. Please try again later.
				</Alert>
			)}

			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
			>
				{servers?.map((server) => (
					<ServerCard key={server.uuid} server={server} />
				))}
			</motion.div>

			{servers?.length === 0 && (
				<div className="text-center py-12">
					<h3 className="text-xl font-medium text-foreground">No servers found</h3>
					<p className="mt-2 text-foreground/60">
						You don't have any servers yet. Contact an administrator to get started.
					</p>
				</div>
			)}
		</div>
	);
};
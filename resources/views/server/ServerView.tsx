import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Loading } from '@/components/ui/Loading';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import useSWR from 'swr';
import getServer from '@/api/server/getServer';
import getServerResourceUsage from '@/api/server/getServerResourceUsage';

interface RouteParams {
	id: string;
}

export const ServerView = () => {
	const { id } = useParams<RouteParams>();
	const { data: server, error } = useSWR(`/api/client/servers/${id}`, () => getServer(id));
	const { data: usage } = useSWR(
		`/api/client/servers/${id}/resources`,
		() => getServerResourceUsage(id),
		{ refreshInterval: 5000 }
	);

	if (!server && !error) {
		return <Loading center size="lg" />;
	}

	if (error) {
		return (
			<Alert variant="error" title="Error" show={true}>
				Failed to load server details. Please try again later.
			</Alert>
		);
	}

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex justify-between items-center"
			>
				<div>
					<h1 className="text-3xl font-bold text-foreground">{server?.name}</h1>
					<p className="mt-1 text-foreground/60">{server?.description}</p>
				</div>
				<Button variant="primary">
					{server?.status === 'running' ? 'Stop Server' : 'Start Server'}
				</Button>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card padding="md">
					<h3 className="text-lg font-medium mb-2">CPU Usage</h3>
					<div className="text-2xl font-bold text-primary">
						{usage?.cpu.current}%
					</div>
					<div className="mt-1 text-sm text-foreground/60">
						of {usage?.cpu.limit}% allocated
					</div>
				</Card>

				<Card padding="md">
					<h3 className="text-lg font-medium mb-2">Memory Usage</h3>
					<div className="text-2xl font-bold text-primary">
						{Math.round(usage?.memory.current / 1024 / 1024)}MB
					</div>
					<div className="mt-1 text-sm text-foreground/60">
						of {Math.round(usage?.memory.limit / 1024 / 1024)}MB allocated
					</div>
				</Card>

				<Card padding="md">
					<h3 className="text-lg font-medium mb-2">Disk Usage</h3>
					<div className="text-2xl font-bold text-primary">
						{Math.round(usage?.disk.current / 1024 / 1024)}MB
					</div>
					<div className="mt-1 text-sm text-foreground/60">
						of {Math.round(usage?.disk.limit / 1024 / 1024)}MB allocated
					</div>
				</Card>
			</div>

			<Card padding="lg">
				<h3 className="text-xl font-medium mb-4">Server Information</h3>
				<div className="space-y-4">
					<div>
						<label className="text-sm font-medium text-foreground/70">Node</label>
						<p className="mt-1">{server?.node}</p>
					</div>
					<div>
						<label className="text-sm font-medium text-foreground/70">IP Address</label>
						<p className="mt-1">{server?.allocations[0]?.ip}:{server?.allocations[0]?.port}</p>
					</div>
				</div>
			</Card>
		</div>
	);
};
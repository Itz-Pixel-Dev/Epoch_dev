import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Loading } from '@/components/ui/Loading';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';

export const AdminView = () => {
	const [searchTerm, setSearchTerm] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const username = useStoreState((state: ApplicationStore) => state.user.data?.username);

	const stats = [
		{ label: 'Total Users', value: '1,234' },
		{ label: 'Active Servers', value: '567' },
		{ label: 'Total Resources', value: '89TB' },
		{ label: 'System Load', value: '45%' },
	];

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
			>
				<div>
					<h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
					<p className="mt-1 text-foreground/60">
						Welcome back, {username}. Here's what's happening in your system.
					</p>
				</div>
				<div className="flex gap-4">
					<Input
						placeholder="Search..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<Button variant="primary">
						Add New Server
					</Button>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<Card padding="md" className="text-center">
							<h3 className="text-lg font-medium text-foreground/70">{stat.label}</h3>
							<p className="mt-2 text-3xl font-bold text-primary">{stat.value}</p>
						</Card>
					</motion.div>
				))}
			</div>

			<Card padding="lg">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-semibold">Recent Activity</h2>
					<Button variant="outline">View All</Button>
				</div>
				{isLoading ? (
					<Loading center size="md" />
				) : (
					<div className="space-y-4">
						<Alert variant="info" show={true}>
							No recent activity to display.
						</Alert>
					</div>
				)}
			</Card>
		</div>
	);
};
'use client'

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/ui/PageTransition';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import { Loading } from '@/components/ui/Loading';
import { Alert } from '@/components/ui/Alert';

interface StatsCardProps {
	title: string
	value: string | number
	icon: React.ReactNode
	trend?: { value: number; label: 'up' | 'down' }
}

function StatsCard({ title, value, icon, trend }: StatsCardProps) {
	return (
		<Card hover>
			<CardContent className="flex items-center gap-4 p-6">
				<div className="p-3 rounded-xl bg-primary/10">{icon}</div>
				<div>
					<p className="text-sm text-muted-foreground">{title}</p>
					<h3 className="text-2xl font-bold">{value}</h3>
					{trend && (
						<p className={`text-sm ${trend.label === 'up' ? 'text-green-500' : 'text-red-500'}`}>
							{trend.label === 'up' ? '↑' : '↓'} {trend.value}%
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export function AdminView() {
	const [isLoading] = React.useState(false);
	const username = useStoreState((state: ApplicationStore) => state.user.data?.username);

	return (
		<PageTransition>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold">Admin Dashboard</h1>
						<p className="text-muted-foreground">Welcome back, {username}</p>
					</div>
					<Button variant="primary" size="lg">
						Add New Server
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<StatsCard
						title="Total Servers"
						value="128"
						icon="🖥️"
						trend={{ value: 12, label: 'up' }}
					/>
					<StatsCard
						title="Active Users"
						value="1,234"
						icon="👥"
						trend={{ value: 8, label: 'up' }}
					/>
					<StatsCard
						title="CPU Usage"
						value="78%"
						icon="⚡"
						trend={{ value: 3, label: 'down' }}
					/>
					<StatsCard
						title="Memory Usage"
						value="64%"
						icon="📊"
						trend={{ value: 5, label: 'up' }}
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card>
						<CardHeader title="Recent Activity" description="Latest server events and updates" />
						<CardContent>
							{isLoading ? (
								<Loading center size="md" />
							) : (
								<Alert variant="info" show={true}>
									No recent activity to display.
								</Alert>
							)}
						</CardContent>
					</Card>
					<Card>
						<CardHeader title="System Health" description="Server performance metrics" />
						<CardContent>
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<span className="text-sm text-muted-foreground">CPU Load</span>
									<span className="text-sm font-medium">45%</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-muted-foreground">Memory Usage</span>
									<span className="text-sm font-medium">2.3GB / 8GB</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-sm text-muted-foreground">Network I/O</span>
									<span className="text-sm font-medium">1.2MB/s</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</PageTransition>
	);
}
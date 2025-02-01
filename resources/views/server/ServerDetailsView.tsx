import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Loading } from '@/components/ui/Loading';
import { 
	Play, 
	Stop, 
	RefreshCw,
	Terminal,
	HardDrive,
	Database,
	Settings,
	Activity
} from 'lucide-react';
import useSWR from 'swr';
import getServer from '@/api/server/getServer';
import getServerResourceUsage from '@/api/server/getServerResourceUsage';

const tabs = [
	{ icon: Terminal, label: 'Console' },
	{ icon: HardDrive, label: 'Files' },
	{ icon: Database, label: 'Databases' },
	{ icon: Activity, label: 'Activity' },
	{ icon: Settings, label: 'Settings' },
];

export const ServerDetailsView = () => {
	const { id } = useParams<{ id: string }>();
	const [activeTab, setActiveTab] = React.useState('Console');
	
	const { data: server, error } = useSWR(
		`/api/client/servers/${id}`, 
		() => getServer(id)
	);
	
	const { data: usage } = useSWR(
		`/api/client/servers/${id}/resources`,
		() => getServerResourceUsage(id),
		{ refreshInterval: 5000 }
	);

	if (!server && !error) {
		return <Loading center size="lg" />;
	}

	return (
		<div className="space-y-6">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
			>
				<div>
					<h1 className="text-3xl font-bold text-foreground">{server?.name}</h1>
					<p className="mt-1 text-foreground/60">{server?.description}</p>
				</div>
				<div className="flex items-center gap-3">
					<Button variant="outline" className="gap-2">
						<RefreshCw className="h-4 w-4" />
						Restart
					</Button>
					<Button variant="primary" className="gap-2">
						{server?.status === 'running' ? (
							<>
								<Stop className="h-4 w-4" />
								Stop Server
							</>
						) : (
							<>
								<Play className="h-4 w-4" />
								Start Server
							</>
						)}
					</Button>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card padding="lg">
					<h3 className="text-lg font-medium mb-4">CPU Usage</h3>
					<div className="space-y-2">
						<div className="flex justify-between">
							<span>Current</span>
							<span className="font-medium">{usage?.cpu.current}%</span>
						</div>
						<div className="w-full bg-muted rounded-full h-2">
							<div 
								className="bg-primary rounded-full h-2 transition-all"
								style={{ width: `${usage?.cpu.current}%` }}
							/>
						</div>
					</div>
				</Card>

				<Card padding="lg">
					<h3 className="text-lg font-medium mb-4">Memory Usage</h3>
					<div className="space-y-2">
						<div className="flex justify-between">
							<span>Current</span>
							<span className="font-medium">
								{Math.round(usage?.memory.current / 1024 / 1024)}MB
							</span>
						</div>
						<div className="w-full bg-muted rounded-full h-2">
							<div 
								className="bg-primary rounded-full h-2 transition-all"
								style={{ 
									width: `${(usage?.memory.current / usage?.memory.limit) * 100}%` 
								}}
							/>
						</div>
					</div>
				</Card>

				<Card padding="lg">
					<h3 className="text-lg font-medium mb-4">Disk Usage</h3>
					<div className="space-y-2">
						<div className="flex justify-between">
							<span>Current</span>
							<span className="font-medium">
								{Math.round(usage?.disk.current / 1024 / 1024)}MB
							</span>
						</div>
						<div className="w-full bg-muted rounded-full h-2">
							<div 
								className="bg-primary rounded-full h-2 transition-all"
								style={{ 
									width: `${(usage?.disk.current / usage?.disk.limit) * 100}%` 
								}}
							/>
						</div>
					</div>
				</Card>
			</div>

			<Card padding="lg">
				<div className="flex border-b border-border">
					{tabs.map(({ icon: Icon, label }) => (
						<button
							key={label}
							onClick={() => setActiveTab(label)}
							className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
								activeTab === label
									? 'border-primary text-primary'
									: 'border-transparent text-foreground/60 hover:text-foreground'
							}`}
						>
							<Icon className="h-4 w-4" />
							{label}
						</button>
					))}
				</div>
				<div className="p-4">
					{/* Tab content would go here */}
					<div className="h-96 flex items-center justify-center text-foreground/60">
						{activeTab} content
					</div>
				</div>
			</Card>
		</div>
	);
};
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Loading } from '@/components/ui/Loading';
import { 
	Activity,
	AlertCircle,
	CheckCircle,
	XCircle,
	RefreshCw,
	Clock,
	Filter
} from 'lucide-react';

interface LogEntry {
	id: string;
	type: 'info' | 'success' | 'warning' | 'error';
	message: string;
	timestamp: string;
	user: string;
}

const mockLogs: LogEntry[] = [
	{
		id: '1',
		type: 'success',
		message: 'Server started successfully',
		timestamp: '2023-08-10T10:30:00',
		user: 'admin',
	},
	{
		id: '2',
		type: 'warning',
		message: 'High memory usage detected',
		timestamp: '2023-08-10T10:25:00',
		user: 'system',
	},
	{
		id: '3',
		type: 'error',
		message: 'Failed to load plugin: WorldEdit',
		timestamp: '2023-08-10T10:20:00',
		user: 'system',
	},
	{
		id: '4',
		type: 'info',
		message: 'Backup process started',
		timestamp: '2023-08-10T10:15:00',
		user: 'admin',
	},
];

const getIcon = (type: LogEntry['type']) => {
	switch (type) {
		case 'success':
			return <CheckCircle className="h-4 w-4 text-green-500" />;
		case 'warning':
			return <AlertCircle className="h-4 w-4 text-yellow-500" />;
		case 'error':
			return <XCircle className="h-4 w-4 text-red-500" />;
		default:
			return <Activity className="h-4 w-4 text-blue-500" />;
	}
};

export const ActivityLogView = () => {
	return (
		<Card padding="lg" className="h-[600px] flex flex-col">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-2">
					<Activity className="h-5 w-5 text-primary" />
					<h2 className="text-lg font-semibold">Activity Log</h2>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" className="gap-2">
						<Filter className="h-4 w-4" />
						Filter
					</Button>
					<Button variant="outline" size="sm" className="gap-2">
						<RefreshCw className="h-4 w-4" />
						Refresh
					</Button>
				</div>
			</div>

			<div className="flex-1 overflow-auto space-y-4">
				{mockLogs.map((log) => (
					<motion.div
						key={log.id}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
					>
						{getIcon(log.type)}
						<div className="flex-1 min-w-0">
							<p className="text-sm text-foreground">{log.message}</p>
							<div className="flex items-center gap-2 mt-1 text-xs text-foreground/60">
								<div className="flex items-center gap-1">
									<Clock className="h-3 w-3" />
									{new Date(log.timestamp).toLocaleString()}
								</div>
								<span>•</span>
								<span>{log.user}</span>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			<div className="mt-4 pt-4 border-t border-border">
				<Button variant="outline" className="w-full text-sm">
					Load More
				</Button>
			</div>
		</Card>
	);
};
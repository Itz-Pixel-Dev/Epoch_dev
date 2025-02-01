import React from 'react';
import type { Server } from '@/api/server/getServer';
import { Power, Terminal, HardDrive, Cpu, Memory } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { cn } from '../ui/utils';

interface ServerCardProps {
	server: Server;
	onConsoleClick: () => void;
	onManageClick: () => void;
}

const getStatusColor = (status: string | null): string => {
	switch (status?.toLowerCase()) {
		case 'running':
			return 'text-green-500';
		case 'offline':
			return 'text-red-500';
		case 'starting':
		case 'stopping':
			return 'text-yellow-500';
		default:
			return 'text-gray-500';
	}
};

export default function ServerCard({ server, onConsoleClick, onManageClick }: ServerCardProps) {

	return (
		<Card className="hover-card-animation glass-effect">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<CardTitle className="text-xl font-bold bg-clip-text text-transparent animated-gradient">
							{server.name}
						</CardTitle>
						<CardDescription className="flex items-center text-sm">
							<HardDrive className="h-4 w-4 mr-2 text-muted-foreground" />
							{server.node}
						</CardDescription>
					</div>
					<div className={cn("flex items-center float-animation", getStatusColor(server.status))}>
						<Power className="h-5 w-5 mr-2" />
						<span className="capitalize font-medium">{server.status}</span>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<div className="flex items-center text-sm text-muted-foreground">
							<Memory className="h-4 w-4 mr-2" />
							Memory Usage
						</div>
						<Progress value={65} className="h-2" />
						<p className="text-xs text-right">
							{server.limits.memory}MB
						</p>
					</div>
					<div className="space-y-2">
						<div className="flex items-center text-sm text-muted-foreground">
							<Cpu className="h-4 w-4 mr-2" />
							CPU Usage
						</div>
						<Progress value={45} className="h-2" />
						<p className="text-xs text-right">
							{server.limits.cpu}%
						</p>
					</div>
				</div>
				<div className="space-y-2">
					<div className="flex items-center text-sm text-muted-foreground">
						<HardDrive className="h-4 w-4 mr-2" />
						Disk Usage
					</div>
					<Progress value={30} className="h-2" />
					<p className="text-xs text-right">
						{server.limits.disk}MB
					</p>
				</div>
			</CardContent>
			<CardFooter className="flex justify-end space-x-2">
				<Button 
					variant="outline"
					onClick={onConsoleClick}
					className="button-glow"
				>
					<Terminal className="h-4 w-4 mr-2" />
					Console
				</Button>
				<Button 
					onClick={onManageClick}
					className="button-glow"
				>
					Manage
				</Button>
			</CardFooter>
		</Card>
	);
}
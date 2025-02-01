import React from 'react';
import type { Server } from '@/api/server/getServer';
import ServerCard from './ServerCard';
import ServerConsole from './ServerConsole';
import ServerStats from './ServerStats';
import ServerFileManager from './ServerFileManager';
import ServerDatabases from './ServerDatabases';
import ServerSchedules from './ServerSchedules';
import { Terminal, HardDrive, Database, Clock } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

interface ServerOverviewProps {
	server: Server;
	stats: {
		cpuUsage: number[];
		memoryUsage: number[];
		diskUsage: number[];
		timestamps: string[];
	};
	onConsoleCommand: (command: string) => void;
	onServerAction: (action: 'start' | 'stop' | 'restart' | 'kill') => void;
}

export default function ServerOverview({
	server,
	stats,
	onConsoleCommand,
	onServerAction,
}: ServerOverviewProps) {
	return (
		<div className="space-y-6">
			<ServerCard
				server={server}
				onConsoleClick={() => {}} // Handle console click
				onManageClick={() => {}} // Handle manage click
			/>
			
			<ServerStats
				cpuUsage={stats.cpuUsage}
				memoryUsage={stats.memoryUsage}
				diskUsage={stats.diskUsage}
				timestamps={stats.timestamps}
			/>

			<Tabs defaultValue="console" className="w-full">
				<TabsList>
					<TabsTrigger value="console" className="flex items-center">
						<Terminal className="h-4 w-4 mr-2" />
						Console
					</TabsTrigger>
					<TabsTrigger value="files" className="flex items-center">
						<HardDrive className="h-4 w-4 mr-2" />
						Files
					</TabsTrigger>
					<TabsTrigger value="databases" className="flex items-center">
						<Database className="h-4 w-4 mr-2" />
						Databases
					</TabsTrigger>
					<TabsTrigger value="schedules" className="flex items-center">
						<Clock className="h-4 w-4 mr-2" />
						Schedules
					</TabsTrigger>
				</TabsList>

				<TabsContent value="console" className="mt-6">
					<ServerConsole
						serverId={server.id}
						onStart={() => onServerAction('start')}
						onStop={() => onServerAction('stop')}
						onRestart={() => onServerAction('restart')}
						onKill={() => onServerAction('kill')}
					/>
				</TabsContent>

				<TabsContent value="files" className="mt-6">
					<ServerFileManager
						currentPath="/"
						files={[]} // Add file data
						onNavigate={() => {}} // Handle navigation
						onUpload={() => {}} // Handle upload
						onDelete={() => {}} // Handle delete
						onDownload={() => {}} // Handle download
						onRefresh={() => {}} // Handle refresh
					/>
				</TabsContent>

				<TabsContent value="databases" className="mt-6">
					<ServerDatabases
						databases={[]} // Add database data
						onCreateDatabase={() => {}} // Handle create
						onDeleteDatabase={() => {}} // Handle delete
						onRotatePassword={() => {}} // Handle password rotation
					/>
				</TabsContent>

				<TabsContent value="schedules" className="mt-6">
					<ServerSchedules
						schedules={[]} // Add schedule data
						onCreateSchedule={() => {}} // Handle create
						onDeleteSchedule={() => {}} // Handle delete
						onToggleSchedule={() => {}} // Handle toggle
						onEditSchedule={() => {}} // Handle edit
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
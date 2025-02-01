import React, { useState } from 'react';
import type { Schedule } from '@/api/server/schedules/getServerSchedules';
import { Clock, Play, Pause, Edit2, Trash2, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface ServerSchedulesProps {
	schedules: Schedule[];
	onCreateSchedule: (schedule: Schedule) => Promise<void>;
	onDeleteSchedule: (id: string) => Promise<void>;
	onToggleSchedule: (id: string) => Promise<void>;
	onEditSchedule: (schedule: Schedule) => Promise<void>;
}

interface ScheduleFormData {
	name: string;
	cron: {
		minute: string;
		hour: string;
		dayOfMonth: string;
		month: string;
		dayOfWeek: string;
	};
}

export default function ServerSchedules({
	schedules,
	onCreateSchedule,
	onDeleteSchedule,
	onToggleSchedule,
	onEditSchedule,
}: ServerSchedulesProps) {
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [editSchedule, setEditSchedule] = useState<Schedule | null>(null);

	const handleCreate = async (data: ScheduleFormData) => {
		await onCreateSchedule(data as Schedule);
		setCreateDialogOpen(false);
	};

	const handleEdit = async (data: ScheduleFormData) => {
		if (editSchedule) {
			await onEditSchedule({ ...editSchedule, ...data });
			setEditSchedule(null);
		}
	};

	const ScheduleForm = ({ schedule, onSubmit }: { schedule?: Schedule; onSubmit: (data: ScheduleFormData) => void }) => (
		<div className="space-y-4">
			<div className="space-y-2">
				<label className="text-sm font-medium">Name</label>
				<Input
					defaultValue={schedule?.name}
					onChange={(e) => onSubmit({ ...schedule, name: e.target.value })}
				/>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<label className="text-sm font-medium">Minute</label>
					<Input
						defaultValue={schedule?.cron.minute}
						placeholder="*/5"
						onChange={(e) => onSubmit({ 
							...schedule, 
							cron: { ...schedule?.cron, minute: e.target.value }
						})}
					/>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium">Hour</label>
					<Input
						defaultValue={schedule?.cron.hour}
						placeholder="*"
						onChange={(e) => onSubmit({ 
							...schedule, 
							cron: { ...schedule?.cron, hour: e.target.value }
						})}
					/>
				</div>
			</div>
		</div>
	);

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center space-x-2">
						<Clock className="h-5 w-5" />
						<span>Schedules</span>
					</CardTitle>
					<Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
						<DialogTrigger asChild>
							<Button>
								<Plus className="h-4 w-4 mr-2" />
								New Schedule
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create New Schedule</DialogTitle>
							</DialogHeader>
							<ScheduleForm onSubmit={handleCreate} />
						</DialogContent>
					</Dialog>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{schedules.map((schedule) => (
						<Card key={schedule.id}>
							<CardContent className="p-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium">{schedule.name}</h3>
										<p className="text-sm text-muted-foreground">
											{`${schedule.cron.minute} ${schedule.cron.hour} ${schedule.cron.dayOfMonth} ${schedule.cron.month} ${schedule.cron.dayOfWeek}`}
										</p>
									</div>
									<div className="flex items-center space-x-2">
										<Button
											variant="outline"
											size="icon"
											onClick={() => onToggleSchedule(schedule.id.toString())}
										>
											{schedule.isProcessing ? (
												<Pause className="h-4 w-4" />
											) : (
												<Play className="h-4 w-4" />
											)}
										</Button>
										<Button
											variant="outline"
											size="icon"
											onClick={() => setEditSchedule(schedule)}
										>
											<Edit2 className="h-4 w-4" />
										</Button>
										<Button
											variant="outline"
											size="icon"
											onClick={() => onDeleteSchedule(schedule.id.toString())}
										>
											<Trash2 className="h-4 w-4 text-red-500" />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
					{schedules.length === 0 && (
						<div className="text-center py-8 text-muted-foreground">
							No schedules found. Create one to get started.
						</div>
					)}
				</div>
			</CardContent>

			{editSchedule && (
				<Dialog open={!!editSchedule} onOpenChange={() => setEditSchedule(null)}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit Schedule</DialogTitle>
						</DialogHeader>
						<ScheduleForm schedule={editSchedule} onSubmit={handleEdit} />
					</DialogContent>
				</Dialog>
			)}
		</Card>
	);
}
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
} from 'chart.js';
import { Activity, Memory, Cpu, HardDrive } from 'lucide-react';
import { Progress } from '../ui/progress';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

interface ServerStatsProps {
	cpuUsage: number[];
	memoryUsage: number[];
	diskUsage: number[];
	timestamps: string[];
}

export default function ServerStats({ cpuUsage, memoryUsage, diskUsage, timestamps }: ServerStatsProps) {
	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'index' as const,
			intersect: false,
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				padding: 12,
				titleFont: {
					size: 13,
					weight: 'bold',
				},
				bodyFont: {
					size: 12,
				},
				borderColor: 'rgba(255, 255, 255, 0.1)',
				borderWidth: 1,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					font: {
						size: 11,
					},
					color: 'rgba(255, 255, 255, 0.5)',
				},
			},
			y: {
				beginAtZero: true,
				max: 100,
				grid: {
					color: 'rgba(255, 255, 255, 0.1)',
				},
				ticks: {
					font: {
						size: 11,
					},
					color: 'rgba(255, 255, 255, 0.5)',
				},
			},
		},
		animations: {
			tension: {
				duration: 1000,
				easing: 'linear',
			},
		},
	};

	const createChartData = (data: number[], label: string, color: string) => ({
		labels: timestamps,
		datasets: [
			{
				label,
				data,
				borderColor: color,
				backgroundColor: `${color}20`,
				fill: true,
				tension: 0.4,
				borderWidth: 2,
				pointRadius: 0,
				pointHoverRadius: 4,
				pointHoverBackgroundColor: color,
				pointHoverBorderColor: 'white',
				pointHoverBorderWidth: 2,
			},
		],
	});

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<Card className="hover-card-animation glass-effect">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium flex items-center space-x-2">
						<Cpu className="h-4 w-4 text-blue-500" />
						<span>CPU Usage</span>
					</CardTitle>
					<span className="text-2xl font-bold text-blue-500">
						{cpuUsage[cpuUsage.length - 1]}%
					</span>
				</CardHeader>
				<CardContent>
					<div className="h-[200px]">
						<Line 
							data={createChartData(cpuUsage, 'CPU', '#3b82f6')} 
							options={chartOptions} 
						/>
					</div>
				</CardContent>
			</Card>

			<Card className="hover-card-animation glass-effect">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium flex items-center space-x-2">
						<Memory className="h-4 w-4 text-green-500" />
						<span>Memory Usage</span>
					</CardTitle>
					<span className="text-2xl font-bold text-green-500">
						{memoryUsage[memoryUsage.length - 1]}%
					</span>
				</CardHeader>
				<CardContent>
					<div className="h-[200px]">
						<Line 
							data={createChartData(memoryUsage, 'Memory', '#22c55e')} 
							options={chartOptions} 
						/>
					</div>
				</CardContent>
			</Card>

			<Card className="hover-card-animation glass-effect">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium flex items-center space-x-2">
						<HardDrive className="h-4 w-4 text-purple-500" />
						<span>Disk Usage</span>
					</CardTitle>
					<span className="text-2xl font-bold text-purple-500">
						{diskUsage[diskUsage.length - 1]}%
					</span>
				</CardHeader>
				<CardContent>
					<div className="h-[200px]">
						<Line 
							data={createChartData(diskUsage, 'Disk', '#a855f7')} 
							options={chartOptions} 
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
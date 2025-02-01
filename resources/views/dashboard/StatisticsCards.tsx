import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
	Cpu, 
	Memory, 
	HardDrive, 
	Network 
} from 'lucide-react';

interface StatItem {
	label: string;
	value: string;
	icon: React.ElementType;
	change: string;
	trend: 'up' | 'down';
}

const stats: StatItem[] = [
	{
		label: 'CPU Usage',
		value: '45%',
		icon: Cpu,
		change: '+2.5%',
		trend: 'up',
	},
	{
		label: 'Memory Usage',
		value: '6.2GB',
		icon: Memory,
		change: '-0.8%',
		trend: 'down',
	},
	{
		label: 'Storage Used',
		value: '258GB',
		icon: HardDrive,
		change: '+1.2%',
		trend: 'up',
	},
	{
		label: 'Network I/O',
		value: '1.4GB/s',
		icon: Network,
		change: '+0.5%',
		trend: 'up',
	},
];

export const StatisticsCards = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{stats.map((stat, index) => {
				const Icon = stat.icon;
				return (
					<motion.div
						key={stat.label}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.1 }}
					>
						<Card padding="lg" className="relative overflow-hidden">
							<div className="absolute right-0 top-0 h-24 w-24 transform translate-x-8 -translate-y-8">
								<div className="absolute inset-0 opacity-10">
									<Icon className="w-full h-full text-primary" />
								</div>
							</div>
							<div className="relative">
								<div className="flex items-center gap-2">
									<Icon className="h-5 w-5 text-primary" />
									<h3 className="text-sm font-medium text-foreground/70">{stat.label}</h3>
								</div>
								<div className="mt-4 flex items-baseline justify-between">
									<p className="text-2xl font-semibold text-foreground">{stat.value}</p>
									<span className={`text-sm font-medium ${
										stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
									}`}>
										{stat.change}
									</span>
								</div>
							</div>
						</Card>
					</motion.div>
				);
			})}
		</div>
	);
};
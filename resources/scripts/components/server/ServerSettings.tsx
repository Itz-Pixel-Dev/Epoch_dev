import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { Settings, Save, Server, HardDrive } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ServerSettingsProps {
	server: {
		name: string;
		memory: number;
		disk: number;
		cpu: number;
		startupCommand: string;
		dockerImage: string;
	};
	onSave: (values: any) => void;
}

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Server name is required'),
	memory: Yup.number().min(1, 'Memory must be at least 1MB').required('Memory limit is required'),
	disk: Yup.number().min(1, 'Disk must be at least 1MB').required('Disk limit is required'),
	cpu: Yup.number().min(1, 'CPU limit must be at least 1%').max(100, 'CPU limit cannot exceed 100%').required('CPU limit is required'),
	startupCommand: Yup.string().required('Startup command is required'),
	dockerImage: Yup.string().required('Docker image is required'),
});

export default function ServerSettings({ server, onSave }: ServerSettingsProps) {
	const formik = useFormik({
		initialValues: server,
		validationSchema,
		onSubmit: onSave,
	});

	return (
		<form onSubmit={formik.handleSubmit} className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<Settings className="h-5 w-5 mr-2" />
						General Settings
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Server Name</Label>
						<Input
							id="name"
							{...formik.getFieldProps('name')}
							error={formik.touched.name && formik.errors.name}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<Server className="h-5 w-5 mr-2" />
						Resource Limits
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="memory">Memory (MB)</Label>
							<Input
								id="memory"
								type="number"
								{...formik.getFieldProps('memory')}
								error={formik.touched.memory && formik.errors.memory}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="disk">Disk Space (MB)</Label>
							<Input
								id="disk"
								type="number"
								{...formik.getFieldProps('disk')}
								error={formik.touched.disk && formik.errors.disk}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="cpu">CPU Limit (%)</Label>
							<Input
								id="cpu"
								type="number"
								{...formik.getFieldProps('cpu')}
								error={formik.touched.cpu && formik.errors.cpu}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<HardDrive className="h-5 w-5 mr-2" />
						Startup Configuration
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="startupCommand">Startup Command</Label>
						<Input
							id="startupCommand"
							{...formik.getFieldProps('startupCommand')}
							error={formik.touched.startupCommand && formik.errors.startupCommand}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="dockerImage">Docker Image</Label>
						<Input
							id="dockerImage"
							{...formik.getFieldProps('dockerImage')}
							error={formik.touched.dockerImage && formik.errors.dockerImage}
						/>
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-end">
				<Button type="submit" className="w-full md:w-auto">
					<Save className="h-4 w-4 mr-2" />
					Save Changes
				</Button>
			</div>
		</form>
	);
}
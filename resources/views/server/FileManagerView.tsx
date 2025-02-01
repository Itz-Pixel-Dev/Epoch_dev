import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Loading } from '@/components/ui/Loading';
import {
	File,
	Folder,
	Upload,
	Download,
	Trash2,
	Plus,
	Search,
	RefreshCw,
	MoreVertical,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

interface FileItem {
	name: string;
	type: 'file' | 'folder';
	size: number;
	modifiedAt: string;
}

const mockFiles: FileItem[] = [
	{ name: 'server.properties', type: 'file', size: 1024, modifiedAt: '2023-08-10' },
	{ name: 'plugins', type: 'folder', size: 0, modifiedAt: '2023-08-09' },
	{ name: 'logs', type: 'folder', size: 0, modifiedAt: '2023-08-08' },
	{ name: 'config.yml', type: 'file', size: 2048, modifiedAt: '2023-08-07' },
];

export const FileManagerView = () => {
	const [searchTerm, setSearchTerm] = React.useState('');
	const [currentPath, setCurrentPath] = React.useState('/');
	const [selectedFiles, setSelectedFiles] = React.useState<string[]>([]);

	const filteredFiles = mockFiles.filter(file =>
		file.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<Card padding="none" className="h-[600px] flex flex-col">
			<div className="p-4 border-b border-border">
				<div className="flex items-center justify-between gap-4 mb-4">
					<div className="flex-1">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
							<Input
								placeholder="Search files..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" className="gap-2">
							<Upload className="h-4 w-4" />
							Upload
						</Button>
						<Button variant="primary" className="gap-2">
							<Plus className="h-4 w-4" />
							New Folder
						</Button>
					</div>
				</div>
				<div className="flex items-center gap-2 text-sm text-foreground/60">
					<span>Current path:</span>
					<code className="bg-muted px-2 py-1 rounded">{currentPath}</code>
				</div>
			</div>

			<div className="flex-1 overflow-auto">
				<table className="w-full">
					<thead className="bg-muted/50 sticky top-0">
						<tr>
							<th className="text-left p-3 text-sm font-medium text-foreground/70">Name</th>
							<th className="text-left p-3 text-sm font-medium text-foreground/70">Size</th>
							<th className="text-left p-3 text-sm font-medium text-foreground/70">Modified</th>
							<th className="text-right p-3 text-sm font-medium text-foreground/70">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredFiles.map((file) => (
							<motion.tr
								key={file.name}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="border-b border-border hover:bg-muted/50 transition-colors"
							>
								<td className="p-3">
									<div className="flex items-center gap-2">
										{file.type === 'folder' ? (
											<Folder className="h-4 w-4 text-blue-500" />
										) : (
											<File className="h-4 w-4 text-foreground/60" />
										)}
										{file.name}
									</div>
								</td>
								<td className="p-3 text-sm text-foreground/60">
									{file.type === 'folder' ? '--' : `${file.size} bytes`}
								</td>
								<td className="p-3 text-sm text-foreground/60">{file.modifiedAt}</td>
								<td className="p-3 text-right">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="sm">
												<MoreVertical className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-48">
											<DropdownMenuItem className="flex items-center gap-2">
												<Download className="h-4 w-4" />
												Download
											</DropdownMenuItem>
											<DropdownMenuItem className="flex items-center gap-2 text-red-500">
												<Trash2 className="h-4 w-4" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</Card>
	);
};
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { FileText, Folder, Upload, Download, Trash2, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface FileItem {
	name: string;
	size: number;
	isDirectory: boolean;
	modifiedAt: string;
}

interface ServerFileManagerProps {
	currentPath: string;
	files: FileItem[];
	onNavigate: (path: string) => void;
	onUpload: (files: FileList) => void;
	onDelete: (path: string) => void;
	onDownload: (path: string) => void;
	onRefresh: () => void;
}

export default function ServerFileManager({
	currentPath,
	files,
	onNavigate,
	onUpload,
	onDelete,
	onDownload,
	onRefresh,
}: ServerFileManagerProps) {
	const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

	const formatFileSize = (bytes: number) => {
		const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) return '0 B';
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			onUpload(e.target.files);
			setUploadDialogOpen(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center space-x-2">
						<Folder className="h-5 w-5" />
						<span>File Manager</span>
					</CardTitle>
					<div className="flex items-center space-x-2">
						<Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
							<DialogTrigger asChild>
								<Button variant="outline">
									<Upload className="h-4 w-4 mr-2" />
									Upload
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Upload Files</DialogTitle>
								</DialogHeader>
								<Input
									type="file"
									multiple
									onChange={handleFileUpload}
									className="mt-4"
								/>
							</DialogContent>
						</Dialog>
						<Button variant="outline" onClick={onRefresh}>
							<RefreshCw className="h-4 w-4" />
						</Button>
					</div>
				</div>
				<div className="text-sm text-muted-foreground">
					Current path: {currentPath || '/'}
				</div>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border">
					<div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
						<div className="col-span-6">Name</div>
						<div className="col-span-2">Size</div>
						<div className="col-span-2">Modified</div>
						<div className="col-span-2">Actions</div>
					</div>
					<div className="divide-y">
						{currentPath !== '/' && (
							<div
								className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 cursor-pointer"
								onClick={() => onNavigate(currentPath.split('/').slice(0, -1).join('/'))}
							>
								<div className="col-span-6 flex items-center">
									<Folder className="h-4 w-4 mr-2" />
									..
								</div>
							</div>
						)}
						{files.map((file) => (
							<div
								key={file.name}
								className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50"
							>
								<div
									className="col-span-6 flex items-center cursor-pointer"
									onClick={() => file.isDirectory && onNavigate(`${currentPath}/${file.name}`)}
								>
									{file.isDirectory ? (
										<Folder className="h-4 w-4 mr-2" />
									) : (
										<FileText className="h-4 w-4 mr-2" />
									)}
									{file.name}
								</div>
								<div className="col-span-2">{formatFileSize(file.size)}</div>
								<div className="col-span-2">
									{new Date(file.modifiedAt).toLocaleDateString()}
								</div>
								<div className="col-span-2 flex items-center space-x-2">
									{!file.isDirectory && (
										<Button
											variant="ghost"
											size="icon"
											onClick={() => onDownload(`${currentPath}/${file.name}`)}
										>
											<Download className="h-4 w-4" />
										</Button>
									)}
									<Button
										variant="ghost"
										size="icon"
										onClick={() => onDelete(`${currentPath}/${file.name}`)}
									>
										<Trash2 className="h-4 w-4 text-red-500" />
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
import React, { useState } from 'react';
import type { ServerDatabase } from '@/api/server/databases/getServerDatabases';
import { Database, Plus, Key, Trash2, Copy, Eye, EyeOff } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { useToast } from '../ui/use-toast';

interface ServerDatabasesProps {
	databases: ServerDatabase[];
	onCreateDatabase: (name: string) => Promise<void>;
	onDeleteDatabase: (id: string) => Promise<void>;
	onRotatePassword: (id: string) => Promise<void>;
}

export default function ServerDatabases({
	databases,
	onCreateDatabase,
	onDeleteDatabase,
	onRotatePassword,
}: ServerDatabasesProps) {
	const [newDatabaseName, setNewDatabaseName] = useState('');
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

	const handleCreate = () => {
		onCreateDatabase(newDatabaseName);
		setNewDatabaseName('');
		setCreateDialogOpen(false);
	};

	const togglePasswordVisibility = (id: string) => {
		setShowPasswords(prev => ({
			...prev,
			[id]: !prev[id]
		}));
	};

	const { toast } = useToast();

	const copyToClipboard = (text: string, type: string) => {
		navigator.clipboard.writeText(text);
		toast({
			title: "Copied to clipboard",
			description: `${type} has been copied to your clipboard.`,
			duration: 2000,
		});
	};

	return (
		<Card className="glass-effect">
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center space-x-2">
						<Database className="h-5 w-5 text-primary" />
						<span>Databases</span>
					</CardTitle>
					<Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
						<DialogTrigger asChild>
							<Button className="button-glow">
								<Plus className="h-4 w-4 mr-2" />
								New Database
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create New Database</DialogTitle>
							</DialogHeader>
							<div className="space-y-4 mt-4">
								<Input
									placeholder="Database Name"
									value={newDatabaseName}
									onChange={(e) => setNewDatabaseName(e.target.value)}
								/>
								<Button onClick={handleCreate} className="w-full">
									Create Database
								</Button>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<TooltipProvider>
						{databases.map((db) => (
							<Card key={db.id} className="hover-card-animation glass-effect">
							<CardContent className="p-4">
								<div className="flex flex-col space-y-4">
									<div className="flex items-center justify-between">
										<h3 className="font-medium text-lg">{db.name}</h3>
										<div className="flex items-center space-x-2">
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														variant="outline"
														size="icon"
														onClick={() => onRotatePassword(db.id)}
														className="button-glow"
													>
														<Key className="h-4 w-4" />
													</Button>
												</TooltipTrigger>
												<TooltipContent>Rotate Password</TooltipContent>
											</Tooltip>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														variant="outline"
														size="icon"
														onClick={() => onDeleteDatabase(db.id)}
														className="hover:bg-red-500/10"
													>
														<Trash2 className="h-4 w-4 text-red-500" />
													</Button>
												</TooltipTrigger>
												<TooltipContent>Delete Database</TooltipContent>
											</Tooltip>
										</div>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<label className="text-sm font-medium">Connection String</label>
											<div className="flex items-center space-x-2">
												<Input
													value={db.connectionString}
													readOnly
													className="font-mono text-sm"
												/>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															variant="outline"
															size="icon"
															onClick={() => copyToClipboard(db.connectionString, 'Connection string')}
															className="button-glow"
														>
															<Copy className="h-4 w-4" />
														</Button>
													</TooltipTrigger>
													<TooltipContent>Copy Connection String</TooltipContent>
												</Tooltip>
											</div>
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium">Password</label>
											<div className="flex items-center space-x-2">
												<Input
													type={showPasswords[db.id] ? 'text' : 'password'}
													value={db.password || ''}
													readOnly
													className="font-mono text-sm"
												/>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															variant="outline"
															size="icon"
															onClick={() => togglePasswordVisibility(db.id)}
															className="button-glow"
														>
															{showPasswords[db.id] ? (
																<EyeOff className="h-4 w-4" />
															) : (
																<Eye className="h-4 w-4" />
															)}
														</Button>
													</TooltipTrigger>
													<TooltipContent>Toggle Password Visibility</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															variant="outline"
															size="icon"
															onClick={() => copyToClipboard(db.password || '', 'Password')}
															className="button-glow"
														>
															<Copy className="h-4 w-4" />
														</Button>
													</TooltipTrigger>
													<TooltipContent>Copy Password</TooltipContent>
												</Tooltip>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</TooltipProvider>
				{databases.length === 0 && (
					<div className="text-center py-12 text-muted-foreground">
						<Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
						<p className="text-lg font-medium">No databases found</p>
						<p className="text-sm">Create one to get started</p>
					</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
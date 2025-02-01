import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Send, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'xterm/css/xterm.css';

export const ConsoleView = () => {
	const terminalRef = useRef<HTMLDivElement>(null);
	const [command, setCommand] = React.useState('');
	const [searchVisible, setSearchVisible] = React.useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		if (!terminalRef.current) return;

		const terminal = new Terminal({
			theme: {
				background: '#1a1b1e',
				foreground: '#ffffff',
				cursor: '#ffffff',
				selection: 'rgba(255, 255, 255, 0.3)',
				black: '#000000',
				red: '#ff4d4d',
				green: '#4caf50',
				yellow: '#ffeb3b',
				blue: '#2196f3',
				magenta: '#e91e63',
				cyan: '#00bcd4',
				white: '#ffffff',
			},
			fontFamily: 'JetBrains Mono, monospace',
			fontSize: 14,
			cursorBlink: true,
			cursorStyle: 'bar',
		});

		const fitAddon = new FitAddon();
		const searchAddon = new SearchAddon();
		const webLinksAddon = new WebLinksAddon();

		terminal.loadAddon(fitAddon);
		terminal.loadAddon(searchAddon);
		terminal.loadAddon(webLinksAddon);

		terminal.open(terminalRef.current);
		fitAddon.fit();

		const resizeObserver = new ResizeObserver(() => {
			fitAddon.fit();
		});

		resizeObserver.observe(terminalRef.current);

		// Handle search functionality
		const handleSearch = () => {
			if (searchTerm) {
				searchAddon.findNext(searchTerm);
			}
		};

		return () => {
			terminal.dispose();
			resizeObserver.disconnect();
		};
	}, [searchTerm]);

	const handleSendCommand = () => {
		if (!command.trim()) return;
		// Handle command sending logic here
		setCommand('');
	};

	return (
		<Card variant="glass" padding="none" className="h-[600px] flex flex-col">
			<motion.div 
				className="flex items-center justify-between p-3 border-b border-border"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<h3 className="text-lg font-semibold">Console</h3>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setSearchVisible(!searchVisible)}
					className="gap-2"
				>
					<Search className="h-4 w-4" />
					Search
				</Button>
			</motion.div>

			<AnimatePresence>
				{searchVisible && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className="border-b border-border overflow-hidden"
					>
						<div className="p-3 flex gap-2">
							<Input
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search console..."
								className="text-sm"
							/>
							<Button variant="ghost" size="icon" onClick={() => setSearchVisible(false)}>
								<X className="h-4 w-4" />
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<div ref={terminalRef} className="flex-1 p-2" />

			<motion.div 
				className="p-3 border-t border-border"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className="flex gap-2">
					<Input
						value={command}
						onChange={(e) => setCommand(e.target.value)}
						placeholder="Enter command..."
						onKeyPress={(e) => e.key === 'Enter' && handleSendCommand()}
						className="text-sm"
					/>
					<Button variant="primary" onClick={handleSendCommand}>
						<Send className="h-4 w-4" />
					</Button>
				</div>
			</motion.div>
		</Card>
	);
};
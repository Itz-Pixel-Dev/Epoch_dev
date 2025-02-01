import { useEffect, useRef } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Play, Square, RefreshCw, Power, Search, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface ServerConsoleProps {
	onStart: () => void;
	onStop: () => void;
	onRestart: () => void;
	onKill: () => void;
}


export default function ServerConsole({ onStart, onStop, onRestart, onKill }: ServerConsoleProps) {
	const terminalRef = useRef<HTMLDivElement>(null);
	const terminal = useRef<XTerminal | null>(null);
	const searchAddonRef = useRef<SearchAddon | null>(null);

	useEffect(() => {
		if (!terminalRef.current || terminal.current) return;

		terminal.current = new XTerminal({
			fontSize: 14,
			fontFamily: '"JetBrains Mono", Menlo, Monaco, "Courier New", monospace',
			theme: {
				background: '#1a1b1e',
				foreground: '#ffffff',
				cursor: '#ffffff',
				selection: 'rgba(255, 255, 255, 0.3)',
				black: '#1d1f21',
				blue: '#61afef',
				cyan: '#56b6c2',
				green: '#98c379',
				magenta: '#c678dd',
				red: '#e06c75',
				white: '#abb2bf',
				yellow: '#e5c07b',
			},
			cursorBlink: true,
			scrollback: 10000,
			allowTransparency: true,
		});

		const fitAddon = new FitAddon();
		const searchAddon = new SearchAddon();
		const webLinksAddon = new WebLinksAddon();

		searchAddonRef.current = searchAddon;

		terminal.current.loadAddon(fitAddon);
		terminal.current.loadAddon(searchAddon);
		terminal.current.loadAddon(webLinksAddon);

		terminal.current.open(terminalRef.current);
		fitAddon.fit();

		const resizeHandler = () => fitAddon.fit();
		window.addEventListener('resize', resizeHandler);

		return () => {
			window.removeEventListener('resize', resizeHandler);
			terminal.current?.dispose();
		};
	}, []);

	return (
		<div className="space-y-4">
			<TooltipProvider>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button onClick={onStart} variant="outline" className="text-green-500 button-glow">
									<Play className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Start Server</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button onClick={onStop} variant="outline" className="text-yellow-500 button-glow">
									<Square className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Stop Server</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button onClick={onRestart} variant="outline" className="text-blue-500 button-glow">
									<RefreshCw className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Restart Server</TooltipContent>
						</Tooltip>
					</div>
					<div className="flex items-center space-x-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" className="button-glow"
									onClick={() => searchAddonRef.current?.findNext('error')}>
									<Search className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Search Logs</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" className="button-glow">
									<Download className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Download Logs</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="destructive" onClick={onKill} className="button-glow">
									<Power className="h-4 w-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Kill Server</TooltipContent>
						</Tooltip>
					</div>
				</div>
			</TooltipProvider>
			<Card className="glass-effect">
				<CardContent className="p-0">
					<div 
						ref={terminalRef} 
						className="h-[600px] rounded-lg bg-[#1a1b1e]/95 p-2 backdrop-blur-sm"
					/>
				</CardContent>
			</Card>
		</div>
	);
}
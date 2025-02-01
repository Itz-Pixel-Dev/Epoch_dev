'use client'

export function LoadingScreen() {
	return (
		<div className="fixed inset-0 bg-gradient-to-br from-background to-secondary flex items-center justify-center">
			<div className="relative">
				{/* Animated rings */}
				<div className="absolute inset-0 animate-ping rounded-full bg-primary/20 duration-1000" />
				<div className="absolute inset-0 animate-pulse rounded-full bg-primary/10 duration-700" />
				
				{/* Logo or text */}
				<div className="relative z-10 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 animate-pulse">
					HCE
				</div>
			</div>
			
			{/* Loading text */}
			<div className="absolute bottom-10 text-muted-foreground animate-pulse">
				Loading your experience...
			</div>
		</div>
	)
}


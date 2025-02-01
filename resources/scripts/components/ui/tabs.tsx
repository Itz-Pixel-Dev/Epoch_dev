import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "./utils"

const Tabs = TabsPrimitive.Root

interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
	children: React.ReactNode;
}

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	TabsListProps
>(({ className, children, ...props }, ref) => {
	// Validate children to ensure they are TabsTrigger components
	React.Children.forEach(children, (child) => {
		if (!React.isValidElement(child) || child.type !== TabsTrigger) {
			console.warn('TabsList children should be TabsTrigger components');
		}
	});

	return (
		<TabsPrimitive.List
			ref={ref}
			className={cn(
				"inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
				className
			)}
			{...props}
		>
			{children}
		</TabsPrimitive.List>
	);
})
TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
	children: React.ReactNode;
	disabled?: boolean;
}

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	TabsTriggerProps
>(({ className, children, disabled, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
			disabled && "opacity-50 cursor-not-allowed",
			className
		)}
		disabled={disabled}
		{...props}
	>
		{children}
	</TabsPrimitive.Trigger>
))
TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
	children: React.ReactNode;
	forceMount?: boolean;
}

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	TabsContentProps
>(({ className, children, forceMount, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=inactive]:fade-out data-[state=active]:fade-in",
			className
		)}
		forceMount={forceMount}
		{...props}
	>
		{children}
	</TabsPrimitive.Content>
))
TabsContent.displayName = "TabsContent"

export type { TabsListProps, TabsTriggerProps, TabsContentProps }
export { Tabs, TabsList, TabsTrigger, TabsContent }
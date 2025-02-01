import React, { useState } from 'react';
import { Search } from 'lucide-react';
import useEventListener from '@/plugins/useEventListener';
import SearchModal from '@/components/dashboard/search/SearchModal';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CommandDialog } from '@/components/ui/command';

export default () => {
    const [visible, setVisible] = useState(false);

    useEventListener('keydown', (e: KeyboardEvent) => {
        if (['input', 'textarea'].indexOf(((e.target as HTMLElement).tagName || 'input').toLowerCase()) < 0) {
            if (!visible && ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
                e.preventDefault();
                setVisible(true);
            }
        }
    });

    return (
        <>
            <CommandDialog open={visible} onOpenChange={setVisible}>
                <SearchModal visible={visible} onDismissed={() => setVisible(false)} />
            </CommandDialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setVisible(true)}
                            className="relative h-9 w-9"
                        >
                            <Search className="h-4 w-4" />
                            <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Search (⌘K)</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
};

import React from 'react';
import { motion } from 'framer-motion';
import { StatisticsCards } from './StatisticsCards';
import { ServerCard } from '@/components/ui/ServerCard';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Loading } from '@/components/ui/Loading';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import { Search, Plus } from 'lucide-react';
import useSWR from 'swr';
import getServers from '@/api/getServers';

export const DashboardView = () => {
	const [searchTerm, setSearchTerm] = React.useState('');
	const { data: servers, error } = useSWR('/api/client/servers', getServers);
	const username = useStoreState((state: ApplicationStore) => state.user.data?.username);

	const filteredServers = servers?.filter(server => 
		server.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="space-y-8">

			  <motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			  >
				<h1 className="text-4xl font-bold text-foreground">
				  Welcome back, {username}!
				</h1>
				<p className="mt-2 text-foreground/60">
				  Here's what's happening with your servers today.
				</p>
			  </motion.div>

			  <StatisticsCards />

			  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div className="relative flex-1 max-w-md">
				  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/40" />
				  <Input
					placeholder="Search servers..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="pl-10"
				  />
				</div>
				<Button variant="primary" className="flex items-center gap-2">
				  <Plus className="h-4 w-4" />
				  New Server
				</Button>
			  </div>

			  {error && (
				<Alert variant="error" title="Error" show={true}>
				  Failed to load servers. Please try again later.
				</Alert>
			  )}

			  {!servers && !error ? (
				<Loading center size="lg" />
			  ) : (
				<motion.div
				  initial="hidden"
				  animate="show"
				  variants={{
					hidden: { opacity: 0 },
					show: {
					  opacity: 1,
					  transition: {
						staggerChildren: 0.1
					  }
					}
				  }}
				  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
				  {filteredServers?.map((server) => (
					<ServerCard key={server.uuid} server={server} />
				  ))}
				</motion.div>
			  )}

			  {filteredServers?.length === 0 && (
				<div className="text-center py-12">
				  <h3 className="text-xl font-medium text-foreground">No servers found</h3>
				  <p className="mt-2 text-foreground/60">
					{searchTerm ? 'Try adjusting your search term.' : 'You don\'t have any servers yet.'}
				  </p>
				</div>
			  )}
			</div>
		  );
		};
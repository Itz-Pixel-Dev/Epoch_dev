import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = () => {
	const location = useLocation();
	const paths = location.pathname.split('/').filter(Boolean);

	const variants = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0 },
	};

	const getDisplayName = (path: string) => {
		return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
	};

	return (
		<motion.nav
			initial="hidden"
			animate="visible"
			className="flex items-center space-x-2 text-sm text-foreground/60"
		>
			<motion.div variants={variants} className="flex items-center">
				<Link
					to="/"
					className="flex items-center hover:text-primary transition-colors"
				>
					<Home className="h-4 w-4" />
				</Link>
			</motion.div>

			{paths.map((path, index) => (
				<React.Fragment key={path}>
					<motion.div
						variants={variants}
						className="flex items-center text-foreground/40"
					>
						<ChevronRight className="h-4 w-4" />
					</motion.div>
					<motion.div variants={variants}>
						<Link
							to={`/${paths.slice(0, index + 1).join('/')}`}
							className={`hover:text-primary transition-colors ${
								index === paths.length - 1 ? 'text-foreground font-medium' : ''
							}`}
						>
							{getDisplayName(path)}
						</Link>
					</motion.div>
				</React.Fragment>
			))}
		</motion.nav>
	);
};
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.jpg' {
	const content: string;
	export default content;
}

declare module '*.png' {
	const content: string;
	export default content;
}

declare module '*.svg' {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}

declare module '*.css' {
	const content: { [className: string]: string };
	export default content;
}

declare module '@radix-ui/*';
declare module 'class-variance-authority';
declare module 'lucide-react';
declare module 'clsx';
declare module 'tailwind-merge';
declare module 'cmdk';
declare module 'twin.macro';
declare module 'react-day-picker';
declare module 'xterm';
declare module 'xterm-addon-*';

interface Window {
	SiteConfiguration?: any;
	PterodactylUser?: {
		uuid: string;
		username: string;
		email: string;
		root_admin: boolean;
		use_totp: boolean;
		language: string;
		updated_at: string;
		created_at: string;
	};
}

declare namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: any;
	}
}

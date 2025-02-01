import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "./utils"
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
	src?: string;
	alt?: string;
	fallback?: string;
	size?: number;
}

const generateFallbackAvatar = (seed: string) => {
	const avatar = createAvatar(identicon, {
		seed,
		backgroundColor: ['#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#587291'],
		size: 40,
	});
	return avatar.toDataUriSync();
};

const Avatar = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Root>,
	AvatarProps
>(({ className, src, alt, fallback, size = 40, ...props }, ref) => {
	const [imgSrc, setImgSrc] = React.useState<string | undefined>(src);
	const fallbackSrc = React.useMemo(() => 
		generateFallbackAvatar(fallback || alt || 'user'),
		[fallback, alt]
	);

	return (
		<AvatarPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex shrink-0 overflow-hidden rounded-full",
				`h-[${size}px] w-[${size}px]`,
				className
			)}
			{...props}
		>
			<AvatarPrimitive.Image
				src={imgSrc}
				alt={alt}
				onError={() => setImgSrc(undefined)}
				className="aspect-square h-full w-full"
			/>
			<AvatarPrimitive.Fallback
				className="flex h-full w-full items-center justify-center bg-muted"
				style={{ backgroundImage: `url(${fallbackSrc})` }}
			/>
		</AvatarPrimitive.Root>
	)
})
Avatar.displayName = "Avatar"

export { Avatar }
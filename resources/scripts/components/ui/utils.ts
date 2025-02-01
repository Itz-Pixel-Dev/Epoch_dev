import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: (string | undefined | null | boolean | ClassValue)[]) {
	return twMerge(clsx(inputs))
}

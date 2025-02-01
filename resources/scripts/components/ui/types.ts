import { type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, type ReactNode } from "react";

export interface BaseProps extends HTMLAttributes<HTMLElement> {
	className?: string;
	children?: ReactNode;
}

export interface BadgeProps extends BaseProps {
	variant?: "default" | "secondary" | "destructive" | "outline";
	size?: "default" | "sm" | "lg";
}

export interface ToastProps extends BaseProps {
	variant?: "default" | "destructive" | "success" | "warning" | "info";
	showIcon?: boolean;
	title?: string;
	description?: string;
	action?: ReactNode;
	duration?: number;
}

export interface CommandDialogProps extends BaseProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export interface InputProps extends BaseProps {
	error?: string | boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	loading?: boolean;
	containerClassName?: string;
	disabled?: boolean;
	required?: boolean;
	id?: string;
	"aria-describedby"?: string;
}
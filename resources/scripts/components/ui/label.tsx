import { type ComponentProps, forwardRef } from "react"
import { cva, type VariantProps as CVAVariantProps } from "class-variance-authority"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "./utils"

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

type LabelVariants = CVAVariantProps<typeof labelVariants>

interface LabelProps extends ComponentProps<typeof LabelPrimitive.Root>, LabelVariants {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ className, ...props }, ref) => (
		<LabelPrimitive.Root
			ref={ref}
			className={cn(labelVariants(), className)}
			{...props}
		/>
	)
)

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
export type { LabelProps }
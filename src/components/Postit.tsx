"use client";
import type { ReactNode } from "react";

type PostitColor = "warning" | "danger" | "info" | "success";
type PostitRotation = "none" | "left" | "right";

const colorStyles: Record<PostitColor, string> = {
	warning: "bg-yellow-200 text-yellow-950 border-yellow-300",
	danger: "bg-rose-200 text-rose-950 border-rose-300",
	info: "bg-sky-200 text-sky-950 border-sky-300",
	success: "bg-lime-200 text-lime-950 border-lime-300",
};

const rotationStyles: Record<PostitRotation, string> = {
	none: "rotate-0",
	left: "-rotate-1",
	right: "rotate-1",
};

type PostitProps = {
	children: ReactNode;
	title?: ReactNode;
	color?: PostitColor;
	rotation?: PostitRotation;
	className?: string;
};

export default function Postit({
	children,
	title,
	color = "warning",
	rotation = "left",
	className = "",
}: PostitProps) {
	const baseClasses = [
		"relative",
		"w-full",
		"max-w-sm",
		"rounded-sm",
		"border",
		"p-4",
		"sm:p-5",
		"shadow-[6px_8px_0_0_rgba(0,0,0,0.18)]",
		"transition-transform",
		"duration-200",
		"hover:rotate-0",
		"hover:scale-[1.01]",
		"handwritten",
        "text-4xl",
        "aspect-square", 
        "flex",
        "items-center", 
        "justify-center",
        "text-center",
		colorStyles[color],
		rotationStyles[rotation],
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<article className={baseClasses}>
			{/* Tape strip for a pinned note feel. */}
			<span
				aria-hidden="true"
				className="absolute left-1/2 top-0 h-3 w-20 -translate-x-1/2 -translate-y-1/2 rotate-1 rounded-sm bg-white/70 shadow"
			/>
			{title ? <h3 className="mb-2 text-lg font-semibold">{title}</h3> : null}
			<div>{children}</div>
		</article>
	);
}

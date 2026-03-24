"use client";
import Link from "next/link";
import IconForConcept from "@/components/IconForConcept";
import type { Concept } from "@/components/IconForConcept";

export default function LinkButton({ href, children, className, iconConcept }: { href: string, children: React.ReactNode, className?: string, iconConcept?: Concept }) {
    return (
        <Link href={href} className={` ${className}`}>
            {iconConcept && <IconForConcept concept={iconConcept} />}
            {children}
        </Link>
    );
}
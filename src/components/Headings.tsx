"use client";
import { JSX, ReactNode } from "react";

export function Heading1({ children, className, title }: { children: ReactNode; className?: string, title?: string }) {
    const headingClassName = [
        "text-4xl",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Heading tag="h1" className={headingClassName} title={title}>
            {children}
        </Heading>
    );
}

export function Heading2({ children, className, title }: { children: ReactNode; className?: string, title?: string }) {
    const headingClassName = [
        "text-xl",
        "text-modok",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Heading tag="h2" className={headingClassName} title={title}>
            {children}
        </Heading>
    );
}

export function Heading({ children, tag, className, title }: { children: ReactNode; tag: keyof JSX.IntrinsicElements; className?: string, title?: string }) {
    const headingClassName = [
        "sticker",
        "handwritten",
        "mb-2", 
        "max-w-full", 
        "px-8",
        "py-4",
        "w-max",
        "flex",
        "items-center",
        "gap-2",
        className,
    ]
        .filter(Boolean)
        .join(" ");
    const Tag = tag;

    return (
        <Tag className={headingClassName}
            title={title}>
            {children}
        </Tag>
    );
}
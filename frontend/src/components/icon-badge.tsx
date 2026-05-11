import type {LucideIcon} from "lucide-react";
import {motion} from "framer-motion";

export type IconTone = "primary" | "secondary" | "accent" | "muted";
export type IconSize = "sm" | "md" | "lg";

const toneStyles: Record<IconTone, string> = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/30 text-accent-foreground",
    muted: "bg-muted text-foreground",
};

const sizeStyles: Record<IconSize, { box: string; icon: number }> = {
    sm: {box: "h-10 w-10 rounded-xl", icon: 20},
    md: {box: "h-14 w-14 rounded-2xl", icon: 26},
    lg: {box: "h-20 w-20 rounded-2xl", icon: 36},
};

export function IconBadge({
                              icon: Icon,
                              tone = "primary",
                              size = "md",
                              hover = true,
                              className = "",
                          }: {
    icon: LucideIcon;
    tone?: IconTone;
    size?: IconSize;
    hover?: boolean;
    className?: string;
}) {
    const s = sizeStyles[size];
    const Comp = hover ? motion.span : "span";
    const hoverProps = hover
        ? {
            whileHover: {y: -2, scale: 1.04},
            transition: {type: "spring" as const, stiffness: 300, damping: 20},
        }
        : {};
    return (
        <Comp
            {...hoverProps}
            className={`inline-grid place-items-center ${s.box} ${toneStyles[tone]} ${className}`}
        >
            <Icon size={s.icon} strokeWidth={2} aria-hidden/>
        </Comp>
    );
}

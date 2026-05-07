import { motion } from "framer-motion";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "raised" | "primary";
};

export function Card({ className = "", variant = "default", ...rest }: CardProps) {
  const styles = {
    default: "border-foreground/10 bg-card",
    raised: "border-foreground/10 bg-card shadow-[6px_6px_0_0_oklch(0.30_0.10_280)]",
    primary: "border-primary bg-primary/5",
  }[variant];
  return (
    <div
      {...rest}
      className={`rounded-2xl border-2 p-6 transition ${styles} ${className}`}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 max-w-2xl">
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</span>
      )}
      <h1 className="text-display mt-2 text-3xl leading-tight md:text-4xl">{title}</h1>
      {description && <p className="mt-2 text-muted-foreground">{description}</p>}
    </div>
  );
}

export function Pill({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "primary" | "secondary" | "accent" }) {
  const styles = {
    muted: "border-foreground/15 bg-background text-foreground",
    primary: "border-primary/30 bg-primary/10 text-primary",
    secondary: "border-secondary/30 bg-secondary/10 text-secondary",
    accent: "border-accent/40 bg-accent/30 text-accent-foreground",
  }[tone];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles}`}>
      {children}
    </span>
  );
}

export function Progress({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
          <span>{label}</span>
          <span className="font-semibold text-primary">{value}%</span>
        </div>
      )}
      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function Stat({ n, label, accent }: { n: string; label: string; accent?: boolean }) {
  return (
    <div>
      <div className={`text-display text-2xl font-semibold ${accent ? "text-primary" : ""}`}>{n}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

export function PrimaryButton({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[4px_4px_0_0_oklch(0.30_0.10_280)] transition hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_oklch(0.30_0.10_280)] disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0 ${className}`}
    />
  );
}

export function GhostButton({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-foreground/10 bg-card px-5 py-2.5 text-sm font-semibold transition hover:border-foreground/30 hover:bg-muted ${className}`}
    />
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="grid place-items-center rounded-2xl border-2 border-dashed border-foreground/15 bg-card/50 p-10 text-center">
      {icon && <div className="mb-3 text-4xl">{icon}</div>}
      <p className="text-display text-xl">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-muted ${className}`} />;
}

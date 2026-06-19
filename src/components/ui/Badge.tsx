import { cn } from "@/lib/cn";

type BadgeTone = "neutral" | "primary" | "success";

const tones: Record<BadgeTone, string> = {
  neutral:
    "border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--foreground)]",
  primary:
    "border-[color:var(--border)] bg-[color:var(--primary)] text-[color:var(--primary-foreground)]",
  success: "border-[color:var(--border)] bg-emerald-200 text-emerald-950",
};

export function Badge({
  className,
  tone = "neutral",
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none border-2 px-3 py-1 text-xs font-semibold tracking-normal transition-all duration-150 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:var(--shadow)] active:translate-x-[1px] active:translate-y-[1px]",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

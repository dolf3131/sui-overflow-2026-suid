import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-none border-2 border-[color:var(--border)] bg-[color:var(--surface)] [box-shadow:var(--shadow)] transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:var(--shadow-lg)] hover:rotate-1 hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:var(--shadow-sm)] active:rotate-0 active:scale-100 group",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("px-6 pt-6", className)}>{children}</div>;
}

export function CardContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}


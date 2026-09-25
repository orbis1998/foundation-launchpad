import type { ReactNode } from "react";

export function SectionTitle({
  kicker,
  children,
  light = false,
}: {
  kicker: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`mb-4 text-sm font-semibold ${light ? "text-primary-foreground/60" : "text-primary"}`}
      >
        {kicker}
      </p>
      <h2
        className={`text-balance font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl ${light ? "text-primary-foreground" : "text-foreground"}`}
      >
        {children}
      </h2>
    </div>
  );
}

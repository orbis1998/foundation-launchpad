import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { event, offer } from "@/lib/site-copy";

export function MobileReservationBar() {
  return (
    <aside
      aria-label="Réservation rapide"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_40px_oklch(0.2_0.02_150/0.1)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-primary">{offer.price}</p>
          <p className="truncate text-xs text-muted-foreground">
            {event.dates} {event.month} {event.year}
          </p>
        </div>
        <Link
          to="/inscription"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform active:translate-y-px"
        >
          {event.reserve} <ArrowRight className="size-4" />
        </Link>
      </div>
    </aside>
  );
}

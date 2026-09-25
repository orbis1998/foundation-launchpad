import { Link } from "@tanstack/react-router";

import { event, nav, orgName } from "@/lib/site-copy";

export function SiteFooter() {
  return (
    <footer className="bg-foreground px-4 py-12 text-background sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl tracking-[-0.02em]">{orgName}</p>
          <p className="mt-2 text-sm text-background/55">{event.brand}</p>
        </div>
        <nav aria-label="Pied de page" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link to="/" className="text-background/70 hover:text-background">
            {nav.home}
          </Link>
          <Link to="/evenements" className="text-background/70 hover:text-background">
            {nav.events}
          </Link>
          <Link to="/fondation" className="text-background/70 hover:text-background">
            {nav.foundation}
          </Link>
          <Link to="/inscription" className="text-background/70 hover:text-background">
            {nav.register}
          </Link>
        </nav>
      </div>
    </footer>
  );
}

import { Link } from "@tanstack/react-router";

import { event, foundationHome, foundationPage, nav, orgName } from "@/lib/site-copy";

const columns = [
  {
    title: nav.home,
    links: [{ to: "/", label: nav.home }],
  },
  {
    title: nav.foundation,
    links: [{ to: "/fondation", label: nav.foundation }],
  },
  {
    title: nav.events,
    links: [
      { to: "/evenements", label: event.brand },
      { to: "/inscription", label: nav.register },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-background/15 bg-foreground px-4 py-16 text-background sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 border-b border-background/15 pb-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold">
              {foundationPage.name}
            </p>
            <p className="mt-4 font-display text-3xl tracking-[-0.03em] sm:text-4xl">{orgName}</p>
            <p className="mt-5 max-w-sm font-serif text-lg leading-8 text-background/65">
              {foundationHome.communities}
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-background/45">
                {column.title}
              </p>
              <ul className="mt-5 space-y-3">
                {column.links.map((item) => (
                  <li key={item.to + item.label}>
                    <Link
                      to={item.to}
                      className="font-serif text-lg text-background/75 transition-colors hover:text-background"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 pt-8 text-xs text-background/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {orgName}</p>
          <p className="uppercase tracking-[0.16em]">{event.brand}</p>
        </div>
      </div>
    </footer>
  );
}

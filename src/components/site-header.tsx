import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { nav, orgName } from "@/lib/site-copy";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: nav.home },
  { to: "/evenements", label: nav.events },
  { to: "/fondation", label: nav.foundation },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "z-50 w-full",
        isHome
          ? "absolute inset-x-0 top-0 text-primary-foreground"
          : "sticky top-0 border-b border-border bg-background/95 text-foreground backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-8 lg:px-12">
        <Link
          to="/"
          aria-label={`${orgName}, ${nav.home}`}
          className="font-display text-lg tracking-[-0.02em] sm:text-xl"
          onClick={() => setOpen(false)}
        >
          {orgName}
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 md:flex">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "text-sm font-medium transition-colors",
                isHome
                  ? "text-primary-foreground/75 hover:text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground",
                pathname === item.to && (isHome ? "text-primary-foreground" : "text-foreground"),
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/inscription"
            className={cn(
              "inline-flex h-11 items-center px-5 text-sm font-semibold transition-transform active:translate-y-px",
              isHome ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground",
            )}
          >
            {nav.register}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className={cn(
            "border-t px-4 py-5 md:hidden",
            isHome
              ? "border-primary-foreground/20 bg-noir text-primary-foreground"
              : "border-border bg-background text-foreground",
          )}
        >
          <nav aria-label="Navigation mobile" className="flex flex-col gap-4">
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-base font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/inscription"
              className={cn(
                "inline-flex h-12 items-center justify-center text-sm font-semibold",
                isHome
                  ? "bg-primary-foreground text-primary"
                  : "bg-primary text-primary-foreground",
              )}
              onClick={() => setOpen(false)}
            >
              {nav.register}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

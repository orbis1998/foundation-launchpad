import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { event } from "@/lib/site-copy";
import { cn } from "@/lib/utils";

export function ReserveLink({
  label = event.reserve,
  dark = false,
  className,
}: {
  label?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Button
      asChild
      size="editorial"
      className={cn(
        dark
          ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          : "bg-primary text-primary-foreground hover:bg-primary/90",
        className,
      )}
    >
      <Link to="/inscription">
        {label}
        <ArrowRight aria-hidden="true" />
      </Link>
    </Button>
  );
}

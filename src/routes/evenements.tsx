import { createFileRoute } from "@tanstack/react-router";

import heroImage from "@/assets/IMG_6257.PNG";
import { ReserveLink } from "@/components/reserve-link";
import { event, pageMeta } from "@/lib/site-copy";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: pageMeta.eventsTitle },
      { name: "description", content: pageMeta.eventsDescription },
      { property: "og:title", content: pageMeta.eventsTitle },
      { property: "og:description", content: pageMeta.eventsDescription },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <main id="contenu" className="bg-background">
      <section className="px-4 pb-20 pt-12 sm:px-8 lg:px-12 lg:pb-28 lg:pt-16">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-sm font-semibold text-primary">Nos Evenements</p>
          <article className="mt-8 overflow-hidden bg-foreground text-primary-foreground lg:grid lg:grid-cols-[1.1fr_0.9fr]">
            <img
              src={heroImage}
              alt="ENTREPRENARIA"
              className="aspect-[16/10] w-full object-cover object-[center_44%] lg:aspect-auto lg:h-full"
            />
            <div className="flex flex-col justify-between p-7 sm:p-10">
              <div>
                <p className="text-sm text-primary-foreground/65">{event.kicker}</p>
                <p className="mt-3 font-display text-sm uppercase tracking-[0.2em] text-gold">
                  {event.brand}
                </p>
                <h1 className="mt-4 font-display text-3xl leading-tight sm:text-5xl">
                  {event.headline}
                </h1>
                <p className="mt-6 text-sm leading-7 text-primary-foreground/70">
                  {event.dates} {event.month} {event.year} · {event.hours} · {event.duration}
                </p>
              </div>
              <div className="mt-10">
                <ReserveLink dark />
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

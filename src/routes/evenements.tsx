import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";

import heroImage from "../assets/IMG_6257.PNG";
import { ReserveLink } from "@/components/reserve-link";
import { SectionTitle } from "@/components/section-title";
import { event, pageMeta, program } from "@/lib/site-copy";

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
      <section className="relative min-h-[88dvh] overflow-hidden bg-foreground text-primary-foreground">
        <img
          src={heroImage}
          alt="ENTREPRENARIA"
          className="absolute inset-0 size-full object-cover object-[52%_center] sm:object-[center_44%]"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[88dvh] max-w-[1400px] flex-col justify-end px-4 pb-8 pt-28 sm:px-8 lg:px-12 lg:pb-12">
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary-foreground/75">
            {event.kicker}
          </p>
          <p className="mb-3 font-display text-sm uppercase tracking-[0.22em] text-gold sm:text-base">
            {event.brand}
          </p>
          <h1 className="max-w-4xl text-balance font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.94] tracking-[-0.04em]">
            {event.headline}
          </h1>
          <p className="mt-6 font-display text-2xl text-primary-foreground/85 sm:text-3xl">
            {event.duration}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <ReserveLink dark />
            <a
              href="#programme"
              className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-primary-foreground underline decoration-primary-foreground/45 underline-offset-8 transition-colors hover:text-primary-foreground/70"
            >
              {event.seeProgram} <ArrowDown className="size-4" />
            </a>
          </div>
          <dl className="mt-12 grid grid-cols-2 border-t border-primary-foreground/25 sm:grid-cols-3">
            {[
              ["Dates", `${event.dates} ${event.month}`],
              ["Année", event.year],
              ["Horaires", event.hours],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-r border-primary-foreground/25 px-3 py-4 last:border-r-0 sm:px-6 sm:py-5 sm:first:pl-0"
              >
                <dt className="text-[0.65rem] text-primary-foreground/55">{label}</dt>
                <dd className="mt-1 text-xs font-semibold sm:text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-surface px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="max-w-2xl text-balance font-display text-3xl leading-[1.1] tracking-[-0.02em] sm:text-5xl">
            {event.discoverHow}
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {event.outcomes.map((item, index) => (
              <article key={item} className="bg-background p-6 sm:p-8">
                <span className="font-display text-sm text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-6 font-display text-2xl leading-snug">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <h2 className="text-balance font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl">
            {event.audienceTitleLead} {event.audienceTitleMid}
            <span className="mt-2 block text-primary">{event.audienceTitleEnd}</span>
          </h2>
          <ul className="grid gap-4">
            {event.audience.map((item) => (
              <li
                key={item}
                className="border-l border-primary pl-5 font-serif text-lg leading-8 text-ink-soft"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-secondary px-4 py-20 text-secondary-foreground sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">{event.dayPreviewKicker}</p>
            <h2 className="mt-4 font-display text-4xl tracking-[-0.02em] sm:text-6xl">
              {event.dayPreviewTitle}
            </h2>
            <p className="mt-6 max-w-xl font-serif text-lg leading-8 text-ink-soft">
              {event.dayPreviewBody}
            </p>
          </div>
          <p className="font-display text-3xl sm:text-4xl">{event.hours}</p>
        </div>
      </section>

      <section
        id="programme"
        className="scroll-mt-24 bg-background px-4 py-20 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionTitle kicker={`${event.programKicker} ${event.programSubtitle}`}>
            {event.programTitle}
          </SectionTitle>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {program.map((entry, index) => {
              const highlighted = index === 0 || index === 3;
              return (
                <article
                  key={entry.chapter}
                  className={`p-6 sm:p-8 ${highlighted ? "bg-primary text-primary-foreground" : "bg-surface text-foreground"}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p
                      className={`text-sm font-semibold ${highlighted ? "text-primary-foreground/65" : "text-primary"}`}
                    >
                      {entry.chapter} · {entry.day}
                    </p>
                    <span className="font-display text-4xl opacity-15">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 max-w-md font-display text-2xl leading-tight sm:text-3xl">
                    {entry.title}
                  </h3>
                    <p
                    className={`mt-7 font-serif text-base leading-8 ${highlighted ? "text-primary-foreground/75" : "text-ink-soft"}`}
                  >
                    {entry.body}
                  </p>
                </article>
              );
            })}
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-7 text-ink-soft">{event.programNote}</p>
        </div>
      </section>

      <section className="bg-foreground px-4 py-20 text-background sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <p className="max-w-4xl text-balance font-display text-3xl leading-[1.15] sm:text-5xl">
            {event.accompaniment}
          </p>
          <div className="mt-10">
            <ReserveLink dark />
          </div>
        </div>
      </section>
    </main>
  );
}

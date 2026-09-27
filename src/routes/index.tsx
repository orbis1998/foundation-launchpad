import { createFileRoute, Link } from "@tanstack/react-router";

import distributionImage from "../assets/IMG_3088.JPG.jpeg";
import trainerImage from "../assets/IMG_6253.PNG";
import heroImage from "../assets/IMG_6257.PNG";
import shelfImage from "../assets/IMG_7428.JPG.jpeg";
import { SectionTitle } from "@/components/section-title";
import {
  experience,
  foundationHome,
  foundationPage,
  pageMeta,
  partners,
  sisters,
} from "@/lib/site-copy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageMeta.homeTitle },
      { name: "description", content: pageMeta.homeDescription },
      { property: "og:title", content: pageMeta.homeTitle },
      { property: "og:description", content: pageMeta.homeDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function Hero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-foreground text-primary-foreground">
      <img
        src={heroImage}
        alt="Fondation The Sisters"
        className="absolute inset-0 size-full object-cover object-[52%_center] sm:object-[center_44%]"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-4 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-16">
        <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-primary-foreground/75">
          {foundationPage.name}
        </p>
        <h1 className="max-w-4xl text-balance font-display text-[clamp(2.7rem,7.4vw,6.4rem)] leading-[0.94] tracking-[-0.045em]">
          {foundationPage.headline}
        </h1>
        <p className="mt-6 max-w-xl font-serif text-xl leading-8 text-primary-foreground/80 sm:text-2xl">
          {foundationHome.communities}
        </p>
        <Link
          to="/fondation"
          className="mt-8 inline-flex h-12 w-fit items-center bg-primary-foreground px-6 text-sm font-semibold text-primary"
        >
          {foundationHome.discover}
        </Link>
      </div>
    </section>
  );
}

function FoundationTeasers() {
  return (
    <section className="bg-surface px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <p className="max-w-3xl font-display text-3xl leading-snug sm:text-5xl">
          {foundationHome.communities}
        </p>
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <article className="bg-background p-7 sm:p-10">
            <p className="text-sm font-semibold text-primary">{foundationHome.missionLabel}</p>
            <p className="drop-cap mt-5 font-serif text-lg leading-8 text-ink-soft">
              {foundationHome.mission}
            </p>
          </article>
          <article className="bg-background p-7 sm:p-10">
            <p className="text-sm font-semibold text-primary">{foundationHome.actionLabel}</p>
            <p className="mt-5 font-serif text-lg leading-8 text-ink-soft">{foundationHome.action}</p>
          </article>
        </div>
        <Link
          to="/fondation"
          className="mt-10 inline-flex min-h-12 items-center text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-8"
        >
          {foundationHome.discover}
        </Link>
      </div>
    </section>
  );
}

function Sisters() {
  return (
    <section className="bg-background px-4 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.82fr_1fr] lg:items-center lg:gap-24">
        <div className="relative pb-8">
          <img
            src={trainerImage}
            alt="Les Sisters, formatrices et entrepreneures"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-[center_35%]"
          />
          <div className="absolute bottom-0 right-0 bg-primary px-6 py-5 text-primary-foreground sm:right-[-1.5rem]">
            <strong className="block font-display text-2xl">{sisters.names}</strong>
          </div>
        </div>
        <div>
          <SectionTitle kicker={sisters.whoLead}>{sisters.whoEnd}</SectionTitle>
          <div className="mt-10 space-y-5 font-serif text-lg leading-8 text-ink-soft">
            <p className="font-display text-2xl leading-snug text-foreground">{sisters.intro}</p>
            <p>{sisters.remote}</p>
            <p>{sisters.vision}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 grid max-w-[1400px] gap-4 lg:grid-cols-2">
        <article className="bg-surface p-7 sm:p-10">
          <p className="text-sm font-semibold text-primary">
            {sisters.about} {sisters.axelleName}
          </p>
          <p className="mt-5 font-serif text-base leading-8 text-ink-soft">{sisters.axelleBody}</p>
          <p className="mt-4 font-serif text-base leading-8 text-ink-soft">{sisters.axelleShare}</p>
          <p className="mt-6 border-l border-gold pl-5 font-serif text-xl italic leading-snug">
            {sisters.axelleQuote}
          </p>
        </article>
        <article className="bg-surface p-7 sm:p-10">
          <p className="text-sm font-semibold text-primary">
            {sisters.about} {sisters.allexeName}
          </p>
          <p className="mt-5 font-serif text-base leading-8 text-ink-soft">{sisters.allexeBody}</p>
          <p className="mt-4 font-serif text-base leading-8 text-ink-soft">{sisters.allexeShare}</p>
          <p className="mt-6 border-l border-gold pl-5 font-serif text-xl italic leading-snug">
            {sisters.allexeQuote}
          </p>
        </article>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="bg-foreground px-4 py-20 text-background sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
          {experience.label}
        </p>
        <p className="mt-6 max-w-4xl text-balance font-serif text-3xl leading-[1.25] sm:text-4xl">
          {experience.body}
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-12">
          <img
            src={distributionImage}
            alt="Présentoir des produits Les Sisters en supermarché"
            loading="lazy"
            className="aspect-[16/10] size-full object-cover object-center md:col-span-8"
          />
          <img
            src={shelfImage}
            alt="Produits Les Sisters présentés en rayon"
            loading="lazy"
            className="aspect-square size-full object-cover object-center md:col-span-4"
          />
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section className="bg-background px-4 py-20 sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1400px] border-t border-border pt-12">
        <p className="text-sm font-semibold text-primary">
          {partners.lead} {partners.title}
        </p>
        <p className="mt-4 font-display text-3xl sm:text-5xl">{partners.line}</p>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main id="contenu">
      <Hero />
      <FoundationTeasers />
      <Sisters />
      <Experience />
      <Partners />
    </main>
  );
}

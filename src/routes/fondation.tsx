import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import trainerImage from "@/assets/IMG_6253.PNG";
import { Button } from "@/components/ui/button";
import { foundationPage, orgName, pageMeta, whatsappNumber } from "@/lib/site-copy";

export const Route = createFileRoute("/fondation")({
  head: () => ({
    meta: [
      { title: pageMeta.foundationTitle },
      { name: "description", content: pageMeta.foundationDescription },
      { property: "og:title", content: pageMeta.foundationTitle },
      { property: "og:description", content: pageMeta.foundationDescription },
    ],
  }),
  component: FoundationPage,
});

function FoundationPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const nextErrors: Record<string, string> = {};
    if (!name || name.length > 80) nextErrors["name"] = "Indiquez un nom valide.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
      nextErrors["email"] = "Indiquez une adresse email valide.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const message = `Bonjour ${orgName}, je souhaite être informé(e) de votre prochain événement.\n\nNom : ${name}\nEmail : ${email}`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main id="contenu" className="bg-background">
      <section className="px-4 pb-16 pt-12 sm:px-8 lg:px-12 lg:pb-20 lg:pt-16">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-primary">{foundationPage.name}</p>
            <h1 className="mt-5 text-balance font-display text-5xl leading-[0.95] tracking-[-0.03em] sm:text-7xl">
              {foundationPage.headline}
            </h1>
          </div>
          <img
            src={trainerImage}
            alt="Fondation the sisters"
            className="aspect-[4/3] w-full object-cover object-[center_30%]"
          />
        </div>
      </section>

      <section className="bg-surface px-4 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-4 lg:grid-cols-3">
          {foundationPage.pillars.map((pillar) => (
            <article key={pillar.label} className="bg-background p-7 sm:p-9">
              <p className="text-sm font-semibold text-primary">
                {pillar.lead ? `${pillar.lead} ${pillar.label}` : pillar.label}
              </p>
              <p className="mt-6 text-base leading-8 text-ink-soft">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1400px] bg-foreground px-7 py-12 text-primary-foreground sm:px-12 sm:py-16">
          <p className="text-sm font-semibold text-gold">{foundationPage.trustQuestion}</p>
          <p className="mt-6 max-w-3xl font-display text-3xl leading-snug sm:text-5xl">
            {foundationPage.trustAnswer}
          </p>
        </div>
      </section>

      <section className="bg-secondary px-4 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">{foundationPage.waitlistLead}</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-6xl">
              {foundationPage.waitlistHighlight}
            </h2>
            <p className="mt-4 font-display text-2xl sm:text-3xl">{foundationPage.waitlistEnd}</p>
          </div>
          <form onSubmit={submit} noValidate className="bg-background p-6 sm:p-10">
            <label className="block">
              <span className="text-sm font-semibold">Nom</span>
              <input
                name="name"
                autoComplete="name"
                maxLength={80}
                aria-invalid={Boolean(errors["name"])}
                aria-describedby={errors["name"] ? "name-error" : undefined}
                className="mt-2 h-13 w-full border border-input bg-background px-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              {errors["name"] && (
                <span id="name-error" role="alert" className="mt-2 block text-xs text-destructive">
                  {errors["name"]}
                </span>
              )}
            </label>
            <label className="mt-6 block">
              <span className="text-sm font-semibold">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                maxLength={254}
                aria-invalid={Boolean(errors["email"])}
                aria-describedby={errors["email"] ? "email-error" : undefined}
                className="mt-2 h-13 w-full border border-input bg-background px-4 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              {errors["email"] && (
                <span id="email-error" role="alert" className="mt-2 block text-xs text-destructive">
                  {errors["email"]}
                </span>
              )}
            </label>
            <Button
              type="submit"
              size="editorial"
              className="mt-8 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {foundationPage.waitlistCta}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";

import { MobileReservationBar } from "@/components/mobile-reservation-bar";
import { Button } from "@/components/ui/button";
import { event, offer, orgName, pageMeta, whatsappNumber } from "@/lib/site-copy";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: pageMeta.registerTitle },
      { name: "description", content: pageMeta.registerDescription },
      { property: "og:title", content: pageMeta.registerTitle },
      { property: "og:description", content: pageMeta.registerDescription },
    ],
  }),
  component: RegisterPage,
});

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  const autoComplete =
    type === "email" ? "email" : name === "firstName" ? "given-name" : "family-name";
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={type === "email" ? "email" : "text"}
        maxLength={type === "email" ? 254 : 80}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-2 h-13 w-full border border-input bg-background px-4 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
      {error && (
        <span id={`${name}-error`} role="alert" className="mt-2 block text-xs text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}

function RegisterPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const form = new FormData(formEvent.currentTarget);
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const nextErrors: Record<string, string> = {};
    if (!firstName || firstName.length > 80) nextErrors["firstName"] = "Indiquez un nom valide.";
    if (!lastName || lastName.length > 80) nextErrors["lastName"] = "Indiquez un post-nom valide.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
      nextErrors["email"] = "Indiquez une adresse email valide.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const message = `Bonjour ${orgName}, je souhaite réserver ma place à ${event.brand} du ${event.dates} ${event.month} ${event.year}. J’ai bien noté que la participation est de ${offer.price}.\n\nNom : ${firstName}\nPost-nom : ${lastName}\nEmail : ${email}`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0">
      <main id="contenu" className="bg-background">
        <section className="px-4 pb-10 pt-12 sm:px-8 lg:px-12 lg:pt-16">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-sm font-semibold text-primary">{event.brand}</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.03em] sm:text-7xl">
              <span className="block">{offer.receive}</span>
              <span className="block">{offer.whatYou}</span>
              <span className="block text-primary">{offer.withSignup}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-ink-soft">{offer.syllabus}</p>
            <p className="mt-8 font-display text-6xl text-primary sm:text-7xl">{offer.price}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              {event.dates} {event.month} {event.year} · {event.hours}
            </p>
          </div>
        </section>

        <section className="bg-primary px-4 py-16 text-primary-foreground sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
            <div>
              <p className="text-sm font-semibold text-primary-foreground/65">{event.kicker}</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
                {event.headline}
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-primary-foreground/70">
                {event.duration}. {event.accompaniment}
              </p>
            </div>
            <form
              onSubmit={submit}
              noValidate
              className="bg-background p-6 text-foreground sm:p-10"
            >
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Nom" name="firstName" error={errors["firstName"]} />
                <Field label="Post-nom" name="lastName" error={errors["lastName"]} />
                <div className="sm:col-span-2">
                  <Field label="Boîte email" name="email" type="email" error={errors["email"]} />
                </div>
              </div>
              <Button
                type="submit"
                size="editorial"
                className="mt-8 w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <MessageCircle /> {event.reserve}
              </Button>
              <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
                Vous serez redirigé(e) vers WhatsApp pour finaliser votre réservation.
              </p>
            </form>
          </div>
        </section>
      </main>
      <MobileReservationBar />
    </div>
  );
}

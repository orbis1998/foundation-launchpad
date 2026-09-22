import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  CircleDollarSign,
  MapPin,
  MessageCircle,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/IMG_6257.PNG";
import trainerImage from "@/assets/IMG_6253.PNG";
import shelfImage from "@/assets/IMG_7428.JPG.jpeg";
import distributionImage from "@/assets/IMG_3088.JPG.jpeg";
import {
  experienceItems,
  learningGoals,
  program,
  supermarkets,
  cities,
  whatsappNumber,
} from "@/lib/bootcamp-data";

const placeAddress =
  "Silikin Village, Concession COTEX, N° 63, Avenue Colonel Mondjiba, Commune de la Gombe, Kinshasa, République Démocratique du Congo";
const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(placeAddress)}&output=embed`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Business Start & Sales Bootcamp | Fondation The Sisters" },
      {
        name: "description",
        content:
          "2e édition du Business Start & Sales Bootcamp, du 19 au 24 octobre à Silikin Village, Kinshasa.",
      },
      { property: "og:title", content: "Business Start & Sales Bootcamp | 2e édition" },
      {
        property: "og:description",
        content:
          "Six jours pour lancer, structurer et développer un business qui vend, du 19 au 24 octobre à Kinshasa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function ReserveButton({
  label = "Je réserve ma place",
  dark = false,
}: {
  label?: string;
  dark?: boolean;
}) {
  return (
    <Button
      asChild
      size="editorial"
      className={
        dark
          ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
      }
    >
      <a href="#reservation">
        {label}
        <ArrowRight aria-hidden="true" />
      </a>
    </Button>
  );
}

function SectionTitle({
  kicker,
  children,
  light = false,
}: {
  kicker: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`mb-4 text-sm font-semibold ${light ? "text-primary-foreground/60" : "text-primary"}`}
      >
        {kicker}
      </p>
      <h2
        className={`text-balance font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl ${light ? "text-primary-foreground" : "text-foreground"}`}
      >
        {children}
      </h2>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-[100dvh] overflow-hidden bg-foreground text-primary-foreground"
    >
      <img
        src={heroImage}
        alt="La formatrice devant une vue nocturne de la ville"
        className="absolute inset-0 size-full object-cover object-[52%_center] sm:object-[center_44%]"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col px-4 sm:px-8 lg:px-12">
        <nav
          aria-label="Navigation principale"
          className="flex h-20 items-center justify-between border-b border-primary-foreground/25"
        >
          <a
            href="#accueil"
            aria-label="Fondation The Sisters, accueil"
            className="font-display text-lg tracking-[-0.02em] sm:text-xl"
          >
            Fondation The Sisters
          </a>
          <div className="hidden items-center gap-7 md:flex">
            <a
              href="#programme"
              className="text-sm font-medium text-primary-foreground/75 transition-colors hover:text-primary-foreground"
            >
              Programme
            </a>
            <a
              href="#formatrice"
              className="text-sm font-medium text-primary-foreground/75 transition-colors hover:text-primary-foreground"
            >
              La formatrice
            </a>
            <a
              href="#reservation"
              className="inline-flex h-11 items-center bg-primary-foreground px-5 text-sm font-semibold text-primary transition-transform active:translate-y-px"
            >
              Réserver
            </a>
          </div>
          <a
            href="#reservation"
            className="text-sm font-semibold text-primary-foreground md:hidden"
          >
            Réserver
          </a>
        </nav>
        <div className="flex flex-1 flex-col justify-end pb-6 pt-16 sm:pb-8 lg:pb-10">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-medium text-primary-foreground/75">
              Business Start & Sales Bootcamp
            </p>
            <h1 className="text-balance font-display text-[clamp(3.15rem,8.5vw,7.4rem)] leading-[0.92] tracking-[-0.045em]">
              Apprenez à bâtir un business qui vend.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/75 sm:text-lg">
              6 jours pour lancer, structurer et développer votre activité avec une méthode issue du
              terrain.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ReserveButton label="Réserver ma place" dark />
              <a
                href="#programme"
                className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold text-primary-foreground underline decoration-primary-foreground/45 underline-offset-8 transition-colors hover:text-primary-foreground/70"
              >
                Voir le programme <ArrowDown className="size-4" />
              </a>
            </div>
          </div>
          <dl className="mt-12 grid grid-cols-2 border-t border-primary-foreground/25 sm:grid-cols-4">
            {[
              ["Dates", "19-24 octobre"],
              ["Horaires", "9h-11h"],
              ["Lieu", "Silikin Village"],
              ["Participation", "200 $"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-r border-primary-foreground/25 px-3 py-4 odd:pl-0 even:border-r-0 sm:px-6 sm:py-5 sm:odd:pl-6 sm:even:border-r sm:first:pl-0 sm:last:border-0 sm:last:pr-0"
              >
                <dt className="text-[0.65rem] text-primary-foreground/55">{label}</dt>
                <dd className="mt-1 text-xs font-semibold sm:text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stakes() {
  return (
    <section className="bg-surface px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
        <p className="text-balance font-display text-4xl leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          Vous avez un business, mais les ventes ne suivent pas&nbsp;?
        </p>
        <div className="self-end">
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Ou vous souhaitez vous lancer sans savoir par où commencer. Cette formation transforme
            ces questions en décisions concrètes.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ["01", "Clarifier", "Une méthode adaptée à votre marché."],
              ["02", "Vendre", "Des outils concrets pour attirer et convertir."],
              ["03", "Avancer", "Un plan d’action construit sur le terrain."],
            ].map(([number, title, copy]) => (
              <article key={title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="font-display text-sm text-primary">{number}</span>
                <div>
                  <h3 className="font-display text-xl">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="formatrice" className="bg-background px-4 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.82fr_1fr] lg:items-center lg:gap-24">
        <div className="relative pb-8">
          <img
            src={trainerImage}
            alt="La formatrice présentant un paquet de bouillie protéinée Mass Gainer"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-[center_35%]"
          />
          <div className="absolute bottom-0 right-0 bg-primary px-6 py-5 text-primary-foreground sm:right-[-1.5rem]">
            <strong className="block font-display text-3xl">6 ans</strong>
            <span className="mt-1 block text-xs">d’expérience terrain</span>
          </div>
        </div>
        <div>
          <SectionTitle kicker="La formatrice">
            Une connaissance construite sur le terrain.
          </SectionTitle>
          <div className="mt-10 space-y-5 text-base leading-8 text-ink-soft">
            <p className="font-display text-2xl leading-snug text-foreground">
              Entreprendre depuis 6 ans aux côtés de ma sœur m’a appris une chose : un business ne
              se construit pas en un jour, et rien n’est jamais aussi facile qu’il n’y paraît.
            </p>
            <p>
              J’ai connu des réussites, des échecs, des périodes de doute, des pertes et des
              obstacles. Ce parcours m’a permis de développer une véritable connaissance du marché
              congolais et de son consommateur.
            </p>
            <p>
              Avec ma sœur, nous avons construit plusieurs activités dans les produits
              nutritionnels, la mode et la vente de vêtements. Nos bouillies protéinées sont
              aujourd’hui distribuées dans plusieurs pays africains et disponibles dans de nombreux
              grands supermarchés.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {experienceItems.slice(0, 3).map((item) => (
              <p key={item} className="text-sm font-semibold text-primary">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="bg-foreground px-4 py-20 text-background sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle kicker="Distribution" light>
          Une expérience visible en rayon.
        </SectionTitle>
        <div className="mt-12 grid gap-4 md:grid-cols-12">
          <img
            src={distributionImage}
            alt="Présentoir complet des produits Mass Gainer en supermarché"
            loading="lazy"
            className="aspect-[16/10] size-full object-cover object-center md:col-span-8"
          />
          <img
            src={shelfImage}
            alt="Produits Mass Gainer présentés en rayon chez Swiss Mart"
            loading="lazy"
            className="aspect-square size-full object-cover object-center md:col-span-4"
          />
        </div>
        <div className="mt-12 grid gap-8 border-t border-background/20 pt-8 md:grid-cols-2">
          <div>
            <p className="text-sm text-background/55">Disponibles chez</p>
            <p className="mt-3 text-lg leading-8">{supermarkets.join(", ")}</p>
          </div>
          <div>
            <p className="text-sm text-background/55">Présence mentionnée à</p>
            <p className="mt-3 text-lg leading-8">{cities.join(", ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Learning() {
  return (
    <section className="bg-secondary px-4 py-20 text-secondary-foreground sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
        <div>
          <p className="text-sm font-semibold text-primary">Ce que vous allez apprendre</p>
          <h2 className="mt-4 text-balance font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl">
            Pas seulement créer un business. Apprendre à le faire fonctionner.
          </h2>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {learningGoals.map((goal, index) => (
            <li
              key={goal}
              className="flex min-h-32 flex-col justify-between bg-background p-5 sm:p-6"
            >
              <span className="font-display text-sm text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-8 text-sm font-medium leading-6">{goal}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Program() {
  return (
    <section
      id="programme"
      className="scroll-mt-8 bg-background px-4 py-20 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionTitle kicker="Programme de la formation">
          Un plan d’action, jour après jour.
        </SectionTitle>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {program.map((entry, index) => {
            const highlighted = index === 0 || index === 3;
            return (
              <article
                key={entry.day}
                className={`p-6 sm:p-8 ${highlighted ? "bg-primary text-primary-foreground" : "bg-surface text-foreground"}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p
                    className={`text-sm font-semibold ${highlighted ? "text-primary-foreground/65" : "text-primary"}`}
                  >
                    Jour {index + 1}
                  </p>
                  <span className="font-display text-4xl opacity-15">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 max-w-md font-display text-2xl leading-tight sm:text-3xl">
                  {entry.title}
                </h3>
                <ul
                  className={`mt-7 grid gap-3 text-sm leading-6 ${highlighted ? "text-primary-foreground/75" : "text-ink-soft"}`}
                >
                  {entry.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="bg-surface px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] overflow-hidden bg-background lg:grid-cols-[0.7fr_1.3fr]">
        <div className="flex flex-col justify-between p-7 sm:p-12">
          <div>
            <p className="text-sm font-semibold text-primary">Lieu de la formation</p>
            <h2 className="mt-4 font-display text-4xl tracking-[-0.02em] sm:text-5xl">
              Silikin Village
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-ink-soft">
              Concession COTEX, N° 63, Avenue Colonel Mondjiba, Commune de la Gombe, Kinshasa,
              République Démocratique du Congo.
            </p>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeAddress)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-primary"
          >
            Ouvrir dans Google Maps <ArrowRight className="size-4" />
          </a>
        </div>
        <iframe
          src={mapUrl}
          title="Carte de Silikin Village"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="min-h-[28rem] w-full border-0 grayscale-[0.65]"
        />
      </div>
    </section>
  );
}

function Reservation() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
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
    const message = `Bonjour Fondation The Sisters, je souhaite réserver ma place au Business Start & Sales Bootcamp du 19 au 24 octobre. J’ai bien noté que la participation est de 200 $.\n\nNom : ${firstName}\nPost-nom : ${lastName}\nEmail : ${email}`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }
  return (
    <section
      id="reservation"
      className="scroll-mt-6 bg-primary px-4 py-20 text-primary-foreground sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-24">
        <div>
          <SectionTitle kicker="Réservation" light>
            Votre place commence ici.
          </SectionTitle>
          <p className="mt-7 max-w-lg text-base leading-8 text-primary-foreground/70">
            Remplissez vos informations. Votre demande sera préparée et envoyée directement sur
            WhatsApp.
          </p>
          <div className="mt-10 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-1">
            <p className="flex gap-3">
              <CalendarDays className="size-5 text-accent" /> 19 au 24 octobre, de 9h à 11h
            </p>
            <p className="flex gap-3">
              <MapPin className="size-5 text-accent" /> Silikin Village, Gombe
            </p>
            <p className="flex gap-3">
              <CircleDollarSign className="size-5 text-accent" /> Participation : 200 $
            </p>
          </div>
        </div>
        <form onSubmit={submit} noValidate className="bg-background p-6 text-foreground sm:p-10">
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
            <MessageCircle /> Réserver sur WhatsApp
          </Button>
          <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
            Vous serez redirigé(e) vers WhatsApp pour finaliser votre réservation.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | undefined;
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

function Faq() {
  const entries = [
    [
      "Quand aura lieu la formation ?",
      "La 2e édition se déroule du 19 au 24 octobre, de 9h à 11h.",
    ],
    [
      "Où se déroule la formation ?",
      "À Silikin Village, Concession COTEX, N° 63, Avenue Colonel Mondjiba, Commune de la Gombe, Kinshasa.",
    ],
    [
      "À qui s’adresse cette formation ?",
      "Aux personnes qui veulent lancer leur business, mieux comprendre le marché ou développer leurs ventes.",
    ],
    ["Quel est le prix de la formation ?", "La participation au bootcamp est de 200 $."],
    [
      "Comment réserver ma place ?",
      "Remplissez le formulaire de réservation. Votre demande complète sera ensuite envoyée sur WhatsApp.",
    ],
  ];
  return (
    <section className="bg-background px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.62fr_1fr] lg:gap-24">
        <SectionTitle kicker="Questions fréquentes">Avant de réserver.</SectionTitle>
        <Accordion type="single" collapsible className="border-t border-border">
          {entries.map(([q, a], i) => (
            <AccordionItem key={q} value={`faq-${i}`}>
              <AccordionTrigger className="py-6 text-left font-display text-lg hover:no-underline sm:text-xl">
                {q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-7 text-ink-soft">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-[calc(4.75rem+env(safe-area-inset-bottom))] text-foreground md:pb-0">
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <main id="contenu">
        <Hero />
        <Stakes />
        <About />
        <Proof />
        <Learning />
        <Program />
        <Location />
        <Reservation />
        <Faq />
      </main>
      <footer className="bg-foreground px-4 py-12 text-background sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl tracking-[-0.02em]">Fondation The Sisters</p>
            <p className="mt-2 text-sm text-background/55">Business Start & Sales Bootcamp</p>
          </div>
          <a
            href="#accueil"
            className="text-sm font-semibold text-background/70 hover:text-background"
          >
            Retour en haut
          </a>
        </div>
      </footer>
      <MobileReservationBar />
    </div>
  );
}

function MobileReservationBar() {
  return (
    <aside
      aria-label="Réservation rapide"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_40px_oklch(0.2_0.02_150/0.1)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-primary">200 $</p>
          <p className="truncate text-xs text-muted-foreground">19-24 octobre à Kinshasa</p>
        </div>
        <a
          href="#reservation"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform active:translate-y-px"
        >
          Réserver <ArrowRight className="size-4" />
        </a>
      </div>
    </aside>
  );
}

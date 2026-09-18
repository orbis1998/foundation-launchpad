import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Store,
  Target,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/formatrice-rooftop.png.asset.json";
import portraitAsset from "@/assets/formatrice-produit.png.asset.json";
import shelfOneAsset from "@/assets/produits-rayon-1.jpeg.asset.json";
import shelfTwoAsset from "@/assets/produits-rayon-2.jpeg.asset.json";
import { experienceItems, learningGoals, program, supermarkets, cities, whatsappNumber } from "@/lib/bootcamp-data";

const placeAddress = "Silikin Village, Concession COTEX, N° 63, Avenue Colonel Mondjiba, Commune de la Gombe, Kinshasa, République Démocratique du Congo";
const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(placeAddress)}&output=embed`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Business Start & Sales Bootcamp — Fondation The Sisters" },
      { name: "description", content: "2e édition du Business Start & Sales Bootcamp, du 19 au 24 octobre à Silikin Village, Kinshasa." },
      { property: "og:title", content: "Business Start & Sales Bootcamp — 2e édition" },
      { property: "og:description", content: "Six jours pour lancer, structurer et développer un business qui vend, du 19 au 24 octobre à Kinshasa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function ReserveButton({ label = "Je réserve ma place", dark = false }: { label?: string; dark?: boolean }) {
  return (
    <Button asChild size="editorial" className={dark ? "bg-foreground text-background hover:bg-gold" : "bg-gold text-noir hover:bg-ivory"}>
      <a href="#reservation">{label}<ArrowRight aria-hidden="true" /></a>
    </Button>
  );
}

function SectionTitle({ kicker, children, light = false }: { kicker: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className="max-w-4xl">
      <p className={`mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-gold" : "text-primary"}`}>
        <span className="h-px w-8 bg-current" />{kicker}
      </p>
      <h2 className={`font-display text-4xl font-semibold leading-[0.98] sm:text-5xl lg:text-7xl ${light ? "text-primary-foreground" : "text-foreground"}`}>{children}</h2>
    </div>
  );
}

function Hero() {
  return (
    <section id="accueil" className="relative min-h-[100svh] overflow-hidden bg-noir text-primary-foreground">
      <img src={heroAsset.url} alt="La formatrice devant une vue nocturne de la ville" className="absolute inset-0 size-full object-cover object-[53%_center]" />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="flex items-center justify-between border-b border-primary-foreground/20 pb-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">Fondation The Sisters présente</p>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">Kinshasa · 2e édition</p>
        </div>
        <div className="my-auto max-w-5xl py-16">
          <p className="mb-7 inline-flex items-center gap-3 border border-gold/40 bg-noir/40 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold backdrop-blur-md">
            <span className="size-1.5 bg-gold" /> Du 19 au 24 octobre · 9h à 11h
          </p>
          <h1 className="max-w-5xl font-display text-5xl font-semibold uppercase leading-[0.9] sm:text-7xl lg:text-8xl xl:text-[6.6rem]">
            Business Start <span className="text-gold">& Sales</span> Bootcamp
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-7 text-primary-foreground/75 sm:text-xl">6 jours pour apprendre à lancer, structurer et développer un business qui vend.</p>
          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <ReserveButton />
            <a href="#programme" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/75 transition-colors hover:text-gold">Découvrir le programme <ArrowDown className="size-4" /></a>
          </div>
        </div>
        <dl className="grid border-t border-primary-foreground/20 sm:grid-cols-3">
          {[
            [CalendarDays, "Dates", "19 — 24 octobre"],
            [Clock3, "Horaires", "9h — 11h"],
            [MapPin, "Lieu", "Silikin Village, Gombe"],
          ].map(([Icon, label, value]) => {
            const InfoIcon = Icon as typeof CalendarDays;
            return <div key={String(label)} className="flex items-center gap-4 border-b border-primary-foreground/20 py-5 sm:border-b-0 sm:border-r sm:px-6 first:pl-0 last:border-r-0"><InfoIcon className="size-5 text-gold" /><div><dt className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-primary-foreground/55">{String(label)}</dt><dd className="mt-1 text-sm font-semibold">{String(value)}</dd></div></div>;
          })}
        </dl>
      </div>
    </section>
  );
}

function Stakes() {
  return (
    <section className="bg-ivory px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="max-w-5xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-6xl">Tu as un business, mais tu n’arrives pas à faire des ventes ? <span className="text-primary">Ou tu veux te lancer, mais tu ne sais pas par où commencer ?</span></p>
        <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
          {[
            [Target, "Une méthode claire", "Lancer ou relancer son activité avec une stratégie adaptée au marché."],
            [ShoppingBag, "Des ventes concrètes", "Attirer des clients, présenter son offre et convertir sur WhatsApp."],
            [Store, "Une expérience terrain", "Des enseignements issus de six années d’entrepreneuriat réel."],
          ].map(([Icon, title, copy]) => {
            const CardIcon = Icon as typeof Target;
            return <article key={String(title)} className="bg-background p-8 lg:p-10"><CardIcon className="size-8 text-gold" /><h3 className="mt-10 font-display text-2xl font-semibold">{String(title)}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{String(copy)}</p></article>;
          })}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-24">
        <div className="relative">
          <img src={portraitAsset.url} alt="La formatrice présentant l’un de ses produits" className="aspect-[4/5] w-full object-cover" />
          <div className="absolute -bottom-7 right-0 bg-gold px-7 py-6 text-noir sm:right-[-2rem]"><strong className="block font-display text-4xl">6 ans</strong><span className="text-[0.65rem] font-bold uppercase tracking-[0.14em]">d’expérience terrain</span></div>
        </div>
        <div>
          <SectionTitle kicker="À propos de la formatrice">Une connaissance née du terrain.</SectionTitle>
          <div className="mt-10 space-y-5 text-base leading-8 text-ink-soft">
            <p className="font-display text-2xl font-semibold leading-snug text-foreground">Entreprendre depuis 6 ans aux côtés de ma sœur m’a appris une chose : un business ne se construit pas en un jour, et rien n’est jamais aussi facile qu’il n’y paraît.</p>
            <p>J’ai connu des réussites, des échecs, des périodes de doute, des pertes et des obstacles. Ce parcours m’a permis de développer une véritable connaissance du marché congolais et de son consommateur.</p>
            <p>Avec ma sœur, nous avons construit plusieurs activités dans les produits nutritionnels, la mode et la vente de vêtements. Nos bouillies protéinées sont aujourd’hui distribuées dans plusieurs pays africains et disponibles dans de nombreux grands supermarchés.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-7 sm:grid-cols-3">{experienceItems.slice(0,3).map((item) => <p key={item} className="text-xs font-bold uppercase leading-5 tracking-[0.1em]">{item}</p>)}</div>
        </div>
      </div>
    </section>
  );
}

function Proof() {
  return (
    <section className="bg-noir px-5 py-20 text-primary-foreground sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionTitle kicker="Preuves / Distribution" light>Du terrain aux rayons des grandes surfaces.</SectionTitle>
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <img src={shelfTwoAsset.url} alt="Produits protéinés présentés en rayon" className="h-full min-h-80 w-full object-cover" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <img src={shelfOneAsset.url} alt="Produits disponibles dans un supermarché" className="aspect-[4/3] size-full object-cover" />
            <div className="grid grid-cols-2 gap-8 border border-primary-foreground/15 p-7">
              <div><p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-gold">Supermarchés</p><p className="mt-3 text-sm leading-7">{supermarkets.join(" · ")}</p></div>
              <div><p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-gold">Villes</p><p className="mt-3 text-sm leading-7">{cities.join(" · ")}</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Learning() {
  return (
    <section className="bg-gold px-5 py-20 text-noir sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em]">Ce que vous allez maîtriser</p><h2 className="mt-5 font-display text-4xl font-semibold leading-none sm:text-6xl">Pas seulement créer un business. Le faire fonctionner.</h2></div>
        <ol className="grid gap-x-8 sm:grid-cols-2">{learningGoals.map((goal, index) => <li key={goal} className="flex gap-4 border-t border-noir/25 py-5"><span className="font-display text-xl">0{index + 1}</span><span className="text-sm leading-6">{goal}</span></li>)}</ol>
      </div>
    </section>
  );
}

function Program() {
  return (
    <section id="programme" className="scroll-mt-8 bg-ivory px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionTitle kicker="Programme · 6 jours">Un plan d’action, jour après jour.</SectionTitle>
        <div className="mt-14 border-t border-border">
          {program.map((entry, index) => <article key={entry.day} className="grid gap-5 border-b border-border py-9 lg:grid-cols-[7rem_0.8fr_1.2fr] lg:gap-12 lg:py-12"><p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">{entry.day}</p><h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl"><span className="mr-3 text-gold">0{index + 1}</span>{entry.title}</h3><ul className="grid gap-3 text-sm leading-6 text-ink-soft sm:grid-cols-2 lg:grid-cols-1">{entry.items.map((item) => <li key={item} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-primary" />{item}</li>)}</ul></article>)}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl overflow-hidden border border-border lg:grid-cols-[0.75fr_1.25fr]">
        <div className="flex flex-col justify-between p-8 sm:p-12">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Lieu de la formation</p><h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">Silikin Village</h2><p className="mt-7 max-w-md text-sm leading-7 text-ink-soft">Concession COTEX, N° 63, Avenue Colonel Mondjiba, Commune de la Gombe, Kinshasa, République Démocratique du Congo.</p></div>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeAddress)}`} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-primary">Ouvrir dans Google Maps <ArrowRight className="size-4" /></a>
        </div>
        <iframe src={mapUrl} title="Carte de Silikin Village" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="min-h-96 w-full border-0 grayscale-[0.3]" />
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) nextErrors["email"] = "Indiquez une adresse email valide.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const message = `Bonjour Fondation The Sisters, je souhaite réserver ma place pour la 2e édition du Business Start & Sales Bootcamp, du 19 au 24 octobre.\n\nNom : ${firstName}\nPost-nom : ${lastName}\nEmail : ${email}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }
  return (
    <section id="reservation" className="scroll-mt-6 bg-noir px-5 py-20 text-primary-foreground sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-24">
        <div><SectionTitle kicker="Réservation" light>Votre place commence ici.</SectionTitle><p className="mt-8 max-w-lg text-base leading-8 text-primary-foreground/65">Remplissez vos informations. Votre demande sera préparée et envoyée directement sur WhatsApp.</p><div className="mt-10 space-y-4 border-t border-primary-foreground/15 pt-8 text-sm"><p className="flex gap-3"><CalendarDays className="size-5 text-gold" /> 19 au 24 octobre · 9h à 11h</p><p className="flex gap-3"><MapPin className="size-5 text-gold" /> Silikin Village, Gombe</p></div></div>
        <form onSubmit={submit} noValidate className="border border-primary-foreground/15 bg-primary-foreground/[0.04] p-7 sm:p-10">
          <div className="grid gap-7 sm:grid-cols-2">
            <Field label="Nom" name="firstName" error={errors["firstName"]} />
            <Field label="Post-nom" name="lastName" error={errors["lastName"]} />
            <div className="sm:col-span-2"><Field label="Boîte email" name="email" type="email" error={errors["email"]} /></div>
          </div>
          <Button type="submit" size="editorial" className="mt-8 w-full bg-gold text-noir hover:bg-ivory"><MessageCircle /> Je réserve ma place</Button>
          <p className="mt-4 text-center text-xs leading-5 text-primary-foreground/45">Vous serez redirigé(e) vers WhatsApp pour finaliser votre réservation.</p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string | undefined }) {
  return <label className="block"><span className="text-xs font-bold uppercase tracking-[0.12em] text-gold">{label}</span><input name={name} type={type} maxLength={type === "email" ? 254 : 80} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} className="mt-3 h-13 w-full border border-primary-foreground/20 bg-transparent px-4 text-sm text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/30 focus:border-gold" />{error && <span id={`${name}-error`} className="mt-2 block text-xs text-destructive">{error}</span>}</label>;
}

function Faq() {
  const entries = [
    ["Quand aura lieu la formation ?", "La 2e édition se déroule du 19 au 24 octobre, de 9h à 11h."],
    ["Où se déroule la formation ?", "À Silikin Village, Concession COTEX, N° 63, Avenue Colonel Mondjiba, Commune de la Gombe, Kinshasa."],
    ["À qui s’adresse cette formation ?", "Aux personnes qui veulent lancer leur business, mieux comprendre le marché ou développer leurs ventes."],
    ["Comment réserver ma place ?", "Remplissez le formulaire de réservation. Votre demande complète sera ensuite envoyée sur WhatsApp."],
  ];
  return <section className="bg-ivory px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.6fr_1fr] lg:gap-24"><SectionTitle kicker="Questions fréquentes">Les informations essentielles.</SectionTitle><Accordion type="single" collapsible className="border-t border-border">{entries.map(([q,a],i)=><AccordionItem key={q} value={`faq-${i}`}><AccordionTrigger className="py-6 text-left font-display text-xl font-semibold hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-6 text-sm leading-7 text-ink-soft">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>;
}

function HomePage() {
  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground"><main><Hero /><Stakes /><About /><Proof /><Learning /><Program /><Location /><Reservation /><Faq /></main><footer className="bg-noir px-5 py-10 text-primary-foreground sm:px-8 lg:px-12"><div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-primary-foreground/15 pt-8 sm:flex-row sm:items-end sm:justify-between"><p className="font-display text-xl font-semibold uppercase">Fondation The Sisters</p><p className="text-[0.62rem] uppercase tracking-[0.15em] text-primary-foreground/50">Business Start & Sales Bootcamp · 2e édition</p></div></footer></div>;
}
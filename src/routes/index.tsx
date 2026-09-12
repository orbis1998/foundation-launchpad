import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, MapPin, Menu, MessageCircle } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  cities,
  experienceItems,
  learningGoals,
  program,
  supermarkets,
  whatsappHref,
} from "@/lib/bootcamp-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Business Start & Sales Bootcamp — Foundation des Sisters" },
      {
        name: "description",
        content: "6 jours de formation pratique à Kinshasa pour lancer, structurer et développer un business qui vend.",
      },
      { property: "og:title", content: "Business Start & Sales Bootcamp — Foundation des Sisters" },
      {
        property: "og:description",
        content: "6 jours pour apprendre à lancer, structurer et développer un business qui vend.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const navigation = [
  ["À propos", "#a-propos"],
  ["Formation", "#formation"],
  ["Programme", "#programme"],
  ["FAQ", "#faq"],
] as const;

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
        <span className="h-px w-8 bg-primary" />
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-semibold leading-[0.98] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
    </div>
  );
}

function WhatsAppButton({ inverse = false, label = "S’inscrire sur WhatsApp" }: { inverse?: boolean; label?: string }) {
  return (
    <Button asChild variant={inverse ? "inverse" : "editorial"} size="editorial">
      <a href={whatsappHref} target="_blank" rel="noreferrer">
        <MessageCircle aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#accueil" className="font-display text-xl font-bold leading-none text-foreground sm:text-2xl">
          Foundation <span className="text-primary">des Sisters</span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {navigation.map(([label, href]) => (
            <a key={href} href={href} className="text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:text-primary">
              {label}
            </a>
          ))}
          <Button asChild variant="editorial" size="default">
            <a href={whatsappHref} target="_blank" rel="noreferrer">S’inscrire</a>
          </Button>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent className="border-border bg-background px-7 pt-16 lg:hidden">
            <SheetTitle className="font-display text-2xl">Foundation des Sisters</SheetTitle>
            <nav className="mt-10 flex flex-col" aria-label="Navigation mobile">
              {navigation.map(([label, href]) => (
                <SheetClose asChild key={href}>
                  <a href={href} className="border-t border-border py-5 text-sm font-bold uppercase tracking-[0.12em]">{label}</a>
                </SheetClose>
              ))}
              <div className="mt-7"><WhatsAppButton label="S’inscrire" /></div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Hero() {
  const facts = [
    ["Lieu", "Kinshasa"],
    ["Date", "[DATE À VENIR]"],
    ["Durée", "6 jours de formation pratique"],
    ["Participation", "[PRIX À VENIR]"],
    ["Places", "Places limitées"],
  ];
  return (
    <section id="accueil" className="relative overflow-hidden bg-surface-strong text-primary-foreground">
      <div className="pattern-weave absolute inset-y-0 right-0 w-[38%] opacity-20" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_0.65fr] lg:px-12 lg:py-20">
        <div className="flex flex-col justify-between gap-14">
          <div>
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-gold">Business Start & Sales Bootcamp</p>
            <h1 className="text-balance max-w-4xl font-display text-[2.7rem] font-semibold leading-[0.94] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              TU AS UN BUSINESS, MAIS TU N’ARRIVES PAS À FAIRE DES VENTES ?
              <span className="mt-6 block text-gold">OU TU VEUX TE LANCER, MAIS TU NE SAIS PAS PAR OÙ COMMENCER ?</span>
            </h1>
          </div>
          <div>
            <p className="max-w-2xl font-display text-2xl leading-tight sm:text-3xl">6 jours pour apprendre à lancer, structurer et développer un business qui vend.</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <WhatsAppButton inverse />
              <a href="#formation" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground/80 hover:text-primary-foreground">
                Découvrir la formation <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <aside className="self-end border-t border-primary-foreground/30 lg:border-l lg:border-t-0 lg:pl-10">
          <dl className="divide-y divide-primary-foreground/20">
            {facts.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[7rem_1fr] gap-4 py-4">
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-gold">{label}</dt>
                <dd className="text-sm font-semibold">{value}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[7rem_1fr] gap-4 py-4">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-gold">Inscriptions</dt>
              <dd><a className="font-semibold underline underline-offset-4" href={whatsappHref}>+12093465943</a></dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="a-propos" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1fr] lg:gap-24">
        <div>
          <SectionHeading eyebrow="À propos de moi" title="Une connaissance née du terrain." />
          <div className="mt-12 hidden aspect-[4/5] items-end border border-border bg-surface p-6 lg:flex">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Photo à venir</p>
          </div>
        </div>
        <div className="space-y-6 text-base leading-8 text-ink-soft sm:text-lg">
          <p className="font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl">Entreprendre depuis 6 ans aux côtés de ma sœur m’a appris une chose : un business ne se construit pas en un jour, et rien n’est jamais aussi facile qu’il n’y paraît.</p>
          <p>Pendant ces 6 années, j’ai connu des réussites, des échecs, des périodes de doute, des pertes, des obstacles et des moments où il fallait simplement continuer malgré tout.</p>
          <p>Et aujourd’hui encore, je continue d’apprendre et de relever de nouveaux défis. Mais tout ce parcours m’a permis de développer une véritable connaissance du marché congolais et une capacité à m’adapter à sa réalité.</p>
          <p>Avec ma sœur, nous avons construit et développé plusieurs activités dans différents secteurs.</p>
          <p>Nous sommes notamment présentes dans le domaine des produits nutritionnels, avec nos bouillies protéinées, aujourd’hui distribuées dans plusieurs pays africains et disponibles dans de nombreux grands supermarchés, dont 24 supermarchés à Kinshasa.</p>
          <p>Nous évoluons également dans le secteur de la mode et de la vente de vêtements, avec une clientèle qui achète régulièrement.</p>
          <p>Au fil des années, j’ai surtout appris à comprendre le consommateur congolais : ses besoins, son pouvoir d’achat, ses habitudes, ce qui attire son attention et surtout ce qui le pousse réellement à acheter.</p>
          <p>Mon approche est particulièrement tournée vers le grand public, les personnes qui travaillent chaque jour, qui ont des revenus réguliers et qui consomment au quotidien.</p>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <p className="mb-10 text-xs font-bold uppercase tracking-[0.18em] text-primary">Expérience / Terrain</p>
        <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5">
          {experienceItems.map((item, index) => (
            <div key={item} className="min-h-40 border-b border-r border-border p-6 lg:min-h-52">
              <span className="font-display text-3xl text-secondary">0{index + 1}</span>
              <p className="mt-10 font-display text-xl font-semibold leading-tight">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="formation" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Pourquoi cette formation ?" title="Partager ce que j’ai réellement appris." />
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-6 text-lg leading-8 text-ink-soft">
            <p className="font-display text-3xl font-semibold leading-tight text-foreground">Cette formation est née de mes propres expériences.</p>
            <p>Je ne viens pas vous promettre une recette magique pour devenir riche rapidement. Je viens partager ce que j’ai réellement appris en entreprenant pendant 6 ans.</p>
            <div className="border-l-2 border-secondary pl-6 font-semibold text-foreground">
              <p>Les stratégies qui ont fonctionné pour moi.</p>
              <p>Les erreurs que j’aurais aimé éviter.</p>
              <p>Les réalités du marché que l’on ne vous apprend pas toujours.</p>
              <p>Les méthodes que j’utilise pour vendre.</p>
              <p>Et surtout, comment apprendre à comprendre son client avant de vouloir lui vendre.</p>
            </div>
          </div>
          <div className="space-y-6 text-lg leading-8 text-ink-soft">
            <p>Je souhaite vous transmettre des connaissances nées du terrain, de l’expérience et de situations réelles.</p>
            <p>Et parce que je continue moi-même à entreprendre, cette formation sera également un espace d’échange : je viens partager mes connaissances, mais aussi continuer à apprendre avec vous.</p>
            <p>Si vous avez déjà une activité mais que vous avez du mal à vendre, si vous souhaitez lancer votre business mais ne savez pas par où commencer, ou si vous voulez simplement apprendre à mieux comprendre le marché et développer vos ventes…</p>
            <p className="font-display text-4xl font-semibold text-primary">Cette formation est pour vous.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Learning() {
  return (
    <section className="bg-primary px-5 py-20 text-primary-foreground sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-gold">Pour qui ? / Ce que la formation permet d’apprendre</p>
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
          <h2 className="font-display text-4xl font-semibold leading-none sm:text-6xl">Pas seulement apprendre à créer un business.<br /><span className="text-gold">Apprendre à le faire fonctionner.</span></h2>
          <ol className="grid gap-x-8 sm:grid-cols-2">
            {learningGoals.map((goal, index) => (
              <li key={goal} className="flex gap-4 border-t border-primary-foreground/25 py-5">
                <span className="font-display text-xl text-gold">0{index + 1}</span>
                <span className="text-sm leading-6">{goal}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function MediaSection() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Médias / Expertise" title="L’expertise, le terrain et l’univers de la formation." />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-12">
          <div className="col-span-2 flex aspect-[4/5] items-end border border-border bg-surface p-5 sm:aspect-[16/10] lg:col-span-7"><span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Photo / vidéo à venir</span></div>
          <div className="col-span-1 flex aspect-[3/4] items-end border border-border bg-muted p-5 lg:col-span-5 lg:aspect-auto"><span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Média à venir</span></div>
          <div className="col-span-1 flex aspect-square items-end border border-border bg-muted p-5 lg:col-span-4"><span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Média à venir</span></div>
          <div className="col-span-1 flex aspect-square items-end border border-border bg-surface p-5 lg:col-span-4"><span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Média à venir</span></div>
          <div className="col-span-2 flex aspect-[2/1] items-end border border-border bg-muted p-5 lg:col-span-4 lg:aspect-square"><span className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Média à venir</span></div>
        </div>
      </div>
    </section>
  );
}

function Program() {
  return (
    <section id="programme" className="scroll-mt-20 border-y border-border bg-surface px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Programme — 6 jours" title="Six journées de formation pratique." />
        <div className="mt-14 divide-y divide-border border-t border-border">
          {program.map((entry, index) => (
            <article key={entry.day} className="grid gap-6 py-10 sm:grid-cols-[7rem_1fr] lg:grid-cols-[8rem_0.75fr_1fr] lg:gap-12 lg:py-14">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{entry.day}</p>
              <h3 className="font-display text-3xl font-semibold leading-tight lg:text-4xl"><span className="mr-3 text-secondary">0{index + 1}</span>{entry.title}</h3>
              <ul className="space-y-3 text-sm leading-6 text-ink-soft sm:col-start-2 lg:col-start-auto">
                {entry.items.map((item) => <li key={item} className="flex gap-3"><span className="mt-2.5 size-1.5 shrink-0 bg-secondary" aria-hidden="true" />{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Distribution() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Expérience / Distribution" title="Une présence dans plusieurs villes et supermarchés." />
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div><p className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-primary">Supermarchés mentionnés</p><ul className="divide-y divide-border border-t border-border">{supermarkets.map((item) => <li className="py-4 font-display text-2xl" key={item}>{item}</li>)}</ul></div>
          <div><p className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-primary">Villes mentionnées</p><ul className="divide-y divide-border border-t border-border">{cities.map((item) => <li className="flex items-center gap-3 py-4 font-display text-2xl" key={item}><MapPin className="size-4 text-secondary" aria-hidden="true" />{item}</li>)}</ul></div>
        </div>
      </div>
    </section>
  );
}

function Trainer() {
  return (
    <section className="bg-surface-strong px-5 py-20 text-primary-foreground sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="aspect-[4/5] border border-primary-foreground/30 bg-primary-foreground/5 p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground/65">Photo à venir</p></div>
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-gold">Profil de la formatrice</p>
          <h2 className="font-display text-5xl font-semibold leading-none sm:text-6xl">Profil personnel à venir.</h2>
          <div className="mt-10 h-px w-full bg-primary-foreground/25" />
        </div>
      </div>
    </section>
  );
}

function Enrollment() {
  return (
    <section id="inscription" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-7xl border-y border-border py-14 lg:grid lg:grid-cols-[1fr_0.7fr] lg:gap-20 lg:py-20">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-primary">Offre / Inscription</p>
          <h2 className="font-display text-5xl font-semibold leading-[0.95] sm:text-6xl">Une formation basée sur l’expérience réelle du terrain.</h2>
        </div>
        <div className="mt-10 lg:mt-0">
          <dl className="grid grid-cols-2 gap-x-5 gap-y-7 text-sm">
            <div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Lieu</dt><dd className="mt-2 font-bold">Kinshasa</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Date</dt><dd className="mt-2 font-bold">Date à venir</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Durée</dt><dd className="mt-2 font-bold">6 jours</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Participation</dt><dd className="mt-2 font-bold">À venir</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Places</dt><dd className="mt-2 font-bold">Places limitées</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Contact</dt><dd className="mt-2 font-bold">+12093465943</dd></div>
          </dl>
          <div className="mt-9"><WhatsAppButton /></div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const faqs = [
    ["Où se déroule la formation ?", "La formation se déroule à Kinshasa."],
    ["Combien de temps dure la formation ?", "La formation pratique dure 6 jours."],
    ["À qui s’adresse cette formation ?", "Elle s’adresse aux personnes qui ont déjà une activité mais ont du mal à vendre, à celles qui souhaitent lancer leur business mais ne savent pas par où commencer, et à celles qui veulent mieux comprendre le marché et développer leurs ventes."],
    ["Comment s’inscrire ?", "Les inscriptions se font via WhatsApp au +12093465943."],
    ["Quand la formation aura-t-elle lieu et quel sera le prix ?", "La date et le prix seront communiqués prochainement."],
  ];
  return (
    <section id="faq" className="scroll-mt-20 bg-surface px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.65fr_1fr] lg:gap-24">
        <SectionHeading eyebrow="FAQ" title="Informations pratiques." />
        <Accordion type="single" collapsible className="border-t border-border">
          {faqs.map(([question, answer], index) => (
            <AccordionItem value={`item-${index}`} key={question}>
              <AccordionTrigger className="py-6 text-left font-display text-xl font-semibold hover:no-underline">{question}</AccordionTrigger>
              <AccordionContent className="max-w-2xl pb-6 text-base leading-7 text-ink-soft">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-secondary px-5 py-20 text-secondary-foreground sm:px-8 sm:py-28 lg:px-12">
      <div className="pattern-weave absolute inset-0 opacity-15" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em]">Business Start & Sales Bootcamp</p>
        <h2 className="text-balance mt-6 font-display text-5xl font-semibold leading-[0.95] sm:text-7xl">6 jours pour apprendre à lancer, structurer et développer un business qui vend.</h2>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-3 border-b-2 border-secondary-foreground pb-2 text-lg font-bold">+12093465943 <ArrowRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-surface-strong px-5 py-10 text-primary-foreground sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-primary-foreground/20 pt-8 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-display text-2xl font-semibold">Foundation des Sisters</p>
        <a href="#accueil" className="text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/70 hover:text-primary-foreground">Retour en haut</a>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Why />
        <Learning />
        <MediaSection />
        <Program />
        <Distribution />
        <Trainer />
        <Enrollment />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
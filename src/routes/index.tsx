import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MapPin, Clock, Phone, Instagram, Facebook, Menu, X } from "lucide-react";

import heroImg from "@/assets/hero-omakase.jpg";
import chefImg from "@/assets/chef.jpg";
import ambienceImg from "@/assets/ambience.jpg";
import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Totoro Sushi — A Verdadeira Essência do Omakase" },
      {
        name: "description",
        content:
          "Experiência premium de sushi e omakase em ambiente sofisticado. Ingredientes nobres, tradição japonesa e hospitalidade Omotenashi. Reserve sua mesa no Totoro Sushi.",
      },
      { property: "og:title", content: "Totoro Sushi — Omakase Premium" },
      {
        property: "og:description",
        content:
          "Ingredientes nobres, tradição japonesa e hospitalidade Omotenashi. Reserve sua mesa.",
      },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preload",
        as: "image",
        href: heroImg,
        fetchpriority: "high",
      } as never,
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

const WHATSAPP_URL =
  "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20uma%20mesa%20no%20Totoro%20Sushi";

const dishes = [
  {
    name: "Otoro Bluefin",
    desc: "Ventresca de atum bluefin selvagem, com uma pincelada delicada de shoyu envelhecido e raspas de yuzu.",
    img: dish4,
  },
  {
    name: "Toro com Trufa Negra",
    desc: "Cortes selecionados de toro sobre pedra fria, finalizados com lâminas de trufa negra italiana.",
    img: dish2,
  },
  {
    name: "Uni Dourado",
    desc: "Ouriço-do-mar de Hokkaido servido com gema de codorna e delicadas folhas de ouro comestível.",
    img: dish3,
  },
  {
    name: "Wagyu A5 Nigiri",
    desc: "Wagyu A5 japonês selado em chama, sobre arroz temperado com vinagre de arroz vermelho.",
    img: dish1,
  },
];

const testimonials = [
  {
    quote:
      "Uma experiência que redefine o conceito de omakase em São Paulo. Cada peça é uma pequena obra de arte.",
    author: "Marina Okamoto",
    role: "Crítica Gastronômica, Revista Prazeres da Mesa",
  },
  {
    quote:
      "O Totoro entrega aquilo que poucos conseguem: silêncio, precisão e ingredientes verdadeiramente excepcionais.",
    author: "Ricardo Almeida",
    role: "Editor-chefe, GQ Brasil",
  },
  {
    quote:
      "O balcão do Totoro é meu ritual mensal. A hospitalidade é tão memorável quanto a cozinha.",
    author: "Camila Nakamura",
    role: "Cliente há 5 anos",
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("fade-up");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#conceito", label: "Conceito" },
    { href: "#menu", label: "Menu" },
    { href: "#experiencia", label: "Experiência" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/50 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 md:grid-cols-3">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <span className="font-serif text-xl tracking-widest text-foreground md:text-2xl">
            TOTORO
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.4em] text-gold md:inline">
            Sushi
          </span>
        </a>
        <nav className="hidden justify-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden border border-gold/60 px-5 py-2.5 text-[11px] uppercase tracking-[0.25em] text-gold transition-all hover:bg-gold hover:text-primary-foreground md:inline-block"
          >
            Reservar
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-foreground md:hidden"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50">
          <nav className="flex flex-col px-6 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.25em] text-muted-foreground hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 border border-gold/60 py-3 text-center text-xs uppercase tracking-[0.25em] text-gold"
            >
              Reservar uma mesa
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.08)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "scale(1.08)" }}
      >
        <img
          src={heroImg}
          alt="Prato assinatura de omakase do Totoro Sushi"
          width={1920}
          height={1280}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <div className="fade-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
            Omakase · São Paulo
          </p>
          <div className="mx-auto my-6 h-px w-24 bg-gold/50" />
        </div>
        <h1
          className="fade-up font-serif text-5xl leading-[1.05] text-balance text-foreground md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.25s" }}
        >
          A verdadeira
          <br />
          <em className="font-normal italic text-gold">essência</em> do Omakase
        </h1>
        <p
          className="fade-up mt-8 max-w-xl text-base font-light leading-relaxed text-muted-foreground md:text-lg"
          style={{ animationDelay: "0.45s" }}
        >
          Uma experiência íntima ao balcão do sushiman, guiada pelos ingredientes
          mais nobres do dia e pela quietude da tradição japonesa.
        </p>
        <div
          className="fade-up mt-12 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden bg-gold px-10 py-4 text-[11px] uppercase tracking-[0.35em] text-primary-foreground transition-all hover:bg-gold-soft"
          >
            Reservar uma mesa
          </a>
          <a
            href="#menu"
            className="px-6 py-4 text-[11px] uppercase tracking-[0.35em] text-foreground/80 transition-colors hover:text-gold"
          >
            Conhecer o menu ↓
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70">
        <span className="mr-3 inline-block h-px w-8 align-middle bg-muted-foreground/50" />
        Rolar
      </div>
    </section>
  );
}

function Concept() {
  return (
    <section id="conceito" className="relative bg-charcoal py-32 md:py-44">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-24">
        <div data-reveal className="opacity-0">
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
            O Conceito
          </p>
          <div className="my-6 h-px w-16 bg-gold/60" />
          <h2 className="font-serif text-4xl leading-[1.1] text-balance text-foreground md:text-5xl lg:text-6xl">
            Um espírito silencioso guia cada corte.
          </h2>
          <div className="mt-8 space-y-5 text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            <p>
              O nome Totoro nasce da reverência a um ícone da cultura japonesa —
              uma figura ligada à floresta, à paciência e ao invisível. Do mesmo
              modo, nossa cozinha se recolhe do ruído para escutar o ingrediente.
            </p>
            <p>
              Trabalhamos com peixes selecionados diariamente de portos do Japão
              e do Mediterrâneo, arroz envelhecido por meses e o vinegar akazu
              tradicional. Cada gesto é conduzido pelo princípio do{" "}
              <em className="text-gold-soft not-italic">Omotenashi</em>, a
              hospitalidade que antecipa sem interromper.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="font-serif text-sm italic text-gold-soft">
              Chef Hiroshi Tanaka
            </span>
          </div>
        </div>

        <div data-reveal className="relative opacity-0">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={chefImg}
              alt="Chef preparando cortes de peixe fresco"
              width={1400}
              height={1600}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border border-gold/40 md:block" />
          <div className="absolute -top-6 -right-6 hidden h-24 w-24 border border-gold/40 md:block" />
        </div>
      </div>
    </section>
  );
}

function MenuHighlights() {
  return (
    <section id="menu" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal className="mx-auto max-w-2xl text-center opacity-0">
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
            Destaques da temporada
          </p>
          <div className="mx-auto my-6 h-px w-16 bg-gold/60" />
          <h2 className="font-serif text-4xl leading-[1.1] text-balance text-foreground md:text-5xl lg:text-6xl">
            Ingredientes que dispensam apresentação.
          </h2>
          <p className="mt-6 text-base font-light text-muted-foreground md:text-lg">
            Quatro criações que resumem a filosofia do chef — do corte à
            temperatura, cada peça é servida no seu tempo exato.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((d, i) => (
            <article
              key={d.name}
              data-reveal
              className="group opacity-0"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                <img
                  src={d.img}
                  alt={d.name}
                  width={900}
                  height={1100}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute left-4 top-4 font-serif text-xs italic text-gold">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-6">
                <h3 className="font-serif text-2xl text-foreground">{d.name}</h3>
                <div className="my-3 h-px w-10 bg-gold/60" />
                <p className="text-sm font-light leading-relaxed text-muted-foreground">
                  {d.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experiencia" className="relative overflow-hidden">
      <div className="relative min-h-[560px] md:min-h-[720px]">
        <img
          src={ambienceImg}
          alt="Salão do Totoro Sushi"
          width={1920}
          height={1200}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-6 md:min-h-[720px]">
          <div data-reveal className="max-w-xl opacity-0">
            <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
              A Experiência
            </p>
            <div className="my-6 h-px w-16 bg-gold/60" />
            <h2 className="font-serif text-4xl leading-[1.1] text-balance text-foreground md:text-5xl lg:text-6xl">
              Um salão pensado para o silêncio.
            </h2>
            <p className="mt-8 text-base font-light leading-relaxed text-muted-foreground md:text-lg">
              Doze lugares ao balcão de madeira hinoki, iluminação âmbar,
              cerâmica artesanal e uma carta de sakês envelhecidos. Cada detalhe
              é composto para que o cliente sinta apenas o essencial.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="border border-gold px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
              >
                Conheça nosso espaço
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-gold"
              >
                Eventos privados →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="depoimentos" className="bg-charcoal py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal className="mx-auto max-w-2xl text-center opacity-0">
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">
            Palavras
          </p>
          <div className="mx-auto my-6 h-px w-16 bg-gold/60" />
          <h2 className="font-serif text-4xl leading-[1.1] text-balance text-foreground md:text-5xl">
            O que dizem sobre a mesa.
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {testimonials.map((t, i) => (
            <figure
              key={t.author}
              data-reveal
              className="relative flex flex-col border-t border-gold/30 pt-8 opacity-0"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <span className="absolute -top-4 left-0 bg-charcoal px-3 font-serif text-4xl italic text-gold">
                “
              </span>
              <blockquote className="font-serif text-lg italic leading-relaxed text-foreground md:text-xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 text-sm">
                <div className="font-medium tracking-wide text-foreground">
                  {t.author}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contato" className="relative bg-background pt-24 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal className="mx-auto max-w-2xl text-center opacity-0">
          <p className="text-[11px] uppercase tracking-[0.5em] text-gold">Visite-nos</p>
          <div className="mx-auto my-6 h-px w-16 bg-gold/60" />
          <h2 className="font-serif text-4xl leading-[1.1] text-balance text-foreground md:text-5xl">
            Reserve sua noite no Totoro.
          </h2>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block bg-gold px-12 py-4 text-[11px] uppercase tracking-[0.35em] text-primary-foreground transition-all hover:bg-gold-soft"
          >
            Reservar pelo WhatsApp
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-border pt-16 md:grid-cols-4">
          <div>
            <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <h3 className="mt-3 font-serif text-lg text-foreground">Endereço</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Rua dos Pinheiros, 1428
              <br />
              Jardins, São Paulo — SP
              <br />
              01452-002
            </p>
          </div>
          <div>
            <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <h3 className="mt-3 font-serif text-lg text-foreground">Horários</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Terça a Sábado
              <br />
              19h às 23h
              <br />
              Apenas com reserva
            </p>
          </div>
          <div>
            <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <h3 className="mt-3 font-serif text-lg text-foreground">Contato</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              +55 (11) 99999-9999
              <br />
              reservas@totorosushi.com.br
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground transition-colors hover:text-gold"
              >
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-muted-foreground transition-colors hover:text-gold"
              >
                <Facebook className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
          <div className="overflow-hidden border border-border">
            <iframe
              title="Mapa Totoro Sushi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.2077!2d-46.6844!3d-23.5644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57!2sJardins!5e0!3m2!1sen!2sbr!4v1700000000000"
              className="h-full min-h-[180px] w-full grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Totoro Sushi</span>
          <span className="font-serif text-sm italic text-gold-soft normal-case tracking-normal">
            Omotenashi · おもてなし
          </span>
          <a href="#" className="hover:text-gold">
            Política de reservas
          </a>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar no WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/50 transition-transform hover:scale-110"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.05 2.05C6.5 2.05 2 6.55 2 12.1c0 1.786.464 3.53 1.35 5.075L2 22.05l5.05-1.325a10.03 10.03 0 004.99 1.325h.005c5.55 0 10.05-4.5 10.05-10.05C22.1 6.55 17.6 2.05 12.05 2.05zm0 18.34h-.004a8.29 8.29 0 01-4.226-1.157l-.303-.18-3 .787.8-2.925-.197-.31A8.28 8.28 0 013.77 12.1c0-4.57 3.71-8.28 8.28-8.28 2.21 0 4.29.86 5.85 2.42a8.24 8.24 0 012.43 5.86c0 4.57-3.71 8.29-8.28 8.29z" />
      </svg>
      <span className="absolute right-16 whitespace-nowrap bg-background/90 px-3 py-1.5 text-xs uppercase tracking-widest text-foreground opacity-0 transition-opacity group-hover:opacity-100">
        Fale conosco
      </span>
    </a>
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Concept />
        <MenuHighlights />
        <Experience />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

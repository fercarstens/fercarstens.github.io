import { useEffect, useState } from "react"
import { ArrowUpRight, Cloud, Download, Mail, MapPin, Monitor, Moon, Server, ShieldCheck, Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { GitHub, LinkedIn, Telegram } from "@/components/marcas"
import { areas, datosIA, formacion, perfil, proyectos, stack, type Area, type Proyecto } from "@/data"
import { cn } from "@/lib/utils"

const enlaces = [
  ["#sistemas", "Sistemas"],
  ["#proyectos", "Proyectos"],
  ["#datos", "Datos e IA"],
  ["#formacion", "Formación"],
  ["#contacto", "Contacto"],
] as const

function useTema() {
  const [oscuro, setOscuro] = useState(() => document.documentElement.classList.contains("dark"))
  useEffect(() => {
    document.documentElement.classList.toggle("dark", oscuro)
    try { localStorage.setItem("tema", oscuro ? "dark" : "light") } catch {}
  }, [oscuro])
  return [oscuro, () => setOscuro((v) => !v)] as const
}

export default function App() {
  const [oscuro, cambiarTema] = useTema()

  return (
    <div className="relative min-h-svh overflow-x-clip">
      <Nav oscuro={oscuro} cambiarTema={cambiarTema} />
      <main>
        <Hero oscuro={oscuro} />
        <Sistemas />
        <Proyectos />
        <DatosIA />
        <Stack />
        <Formacion />
        <Contacto />
      </main>
      <footer className="mx-auto max-w-5xl px-4 pb-10 pt-6 font-mono text-xs text-muted-foreground sm:px-6">
        <div className="flex flex-wrap justify-between gap-2 border-t pt-6">
          <span>© {new Date().getFullYear()} Fernando Carstens</span>
          <span>Hecho a mano en Sevilla · React + Tailwind</span>
        </div>
      </footer>
    </div>
  )
}

/* ---------- Navegación ---------- */

function Nav({ oscuro, cambiarTema }: { oscuro: boolean; cambiarTema: () => void }) {
  return (
    <header className="no-print sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#" className="font-serif text-2xl italic leading-none text-foreground" aria-label="Inicio">
          fc<span className="text-accent">.</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Secciones">
          {enlaces.map(([href, texto]) => (
            <a key={href} href={href} className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {texto}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button
            onClick={() => window.print()}
            className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Guardar este CV como PDF"
          >
            <Download className="size-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>
          <button
            onClick={cambiarTema}
            className="inline-grid size-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={oscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          >
            {oscuro ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}

/* ---------- Portada ---------- */

function Hero({ oscuro }: { oscuro: boolean }) {
  return (
    <section className="relative isolate">
      {/* El único gran momento visual de la página */}
      <div className="no-print absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]">
        <FlickeringGrid
          key={oscuro ? "o" : "c"}
          color={oscuro ? "#6fd8d4" : "#0e7c80"}
          maxOpacity={oscuro ? 0.22 : 0.16}
          flickerChance={0.12}
          squareSize={3}
          gridGap={7}
        />
      </div>

      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 md:grid-cols-[1fr_auto] md:pb-24 md:pt-24">
        <div>
          <BlurFade delay={0.05}>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <MapPin className="size-3" /> {perfil.lugar}
            </p>
          </BlurFade>
          <BlurFade delay={0.12}>
            <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-balance sm:text-7xl">
              Fernando
              <br />
              Carstens
            </h1>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="mt-4 text-xl font-medium sm:text-2xl">
              {perfil.cargo}
              <span className="font-serif text-2xl font-normal italic text-accent sm:text-3xl"> &amp; desarrollador por gusto</span>
            </p>
          </BlurFade>
          <BlurFade delay={0.28}>
            <p className="mt-5 max-w-xl text-pretty text-muted-foreground sm:text-lg">{perfil.resumen}</p>
          </BlurFade>
          <BlurFade delay={0.36}>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${perfil.email}`}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-[transform,opacity] hover:opacity-90 active:scale-[0.97]"
              >
                <Mail className="size-4" /> Escríbeme
              </a>
              <Social href={perfil.linkedin} etiqueta="LinkedIn"><LinkedIn className="size-4" /></Social>
              <Social href={perfil.github} etiqueta="GitHub"><GitHub className="size-4" /></Social>
              <Social href={perfil.telegram} etiqueta="Telegram"><Telegram className="size-4" /></Social>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} className="mx-auto w-56 sm:w-64 md:w-72">
          <figure className="relative">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-accent-soft blur-2xl" />
            <img
              src="/fer.webp"
              alt="Fernando Carstens"
              width={720}
              height={900}
              className="aspect-[4/5] w-full rounded-xl border object-cover object-top shadow-2xl shadow-black/20"
            />
            <figcaption className="absolute -bottom-3 left-4 rounded-md border bg-card px-2.5 py-1 font-mono text-[11px] text-muted-foreground shadow-sm">
              <span className="text-accent">$</span> whoami → fer
            </figcaption>
          </figure>
        </BlurFade>
      </div>
    </section>
  )
}

function Social({ href, etiqueta, children }: { href: string; etiqueta: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={etiqueta}
      title={etiqueta}
      className="inline-grid size-10 place-items-center rounded-md border bg-card/60 text-muted-foreground backdrop-blur transition-[color,transform] hover:text-foreground active:scale-[0.95]"
    >
      {children}
    </a>
  )
}

/* ---------- Bloques comunes ---------- */

function Seccion({ id, num, titulo, intro, children }: { id: string; num: string; titulo: React.ReactNode; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20">
      <BlurFade inView>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{num}</p>
        <h2 className="mt-2 font-serif text-4xl tracking-tight text-balance sm:text-5xl">{titulo}</h2>
        {intro && <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">{intro}</p>}
      </BlurFade>
      <div className="mt-10">{children}</div>
    </section>
  )
}

/* ---------- 01 Sistemas ---------- */

const iconos: Record<Area["icono"], React.ElementType> = { nube: Cloud, servidor: Server, escudo: ShieldCheck, equipo: Monitor }

function Sistemas() {
  return (
    <Seccion
      id="sistemas"
      num="01 · Hoy"
      titulo={<>Administrador de <em className="text-accent">Sistemas</em></>}
      intro="Mi trabajo actual: que la gente pueda trabajar sin pensar en la tecnología, y que nadie de fuera entre donde no debe."
    >
      <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
        {areas.map((a, i) => {
          const Icono = iconos[a.icono]
          return (
            <BlurFade key={a.titulo} inView delay={i * 0.06} className="bg-card">
              <article className="flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-md bg-accent-soft text-accent">
                    <Icono className="size-[18px]" />
                  </span>
                  <h3 className="font-medium">{a.titulo}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.texto}</p>
                <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                  {a.items.map((t) => (
                    <Badge key={t} variant="outline" className="font-mono text-[11px] font-normal">{t}</Badge>
                  ))}
                </div>
              </article>
            </BlurFade>
          )
        })}
      </div>
    </Seccion>
  )
}

/* ---------- 02 Proyectos ---------- */

const colorEstado: Record<Proyecto["estado"], string> = {
  "En producción": "bg-emerald-500",
  "Uso interno": "bg-sky-500",
  "En desarrollo": "bg-amber-500",
  Prototipo: "bg-amber-500",
  "Código abierto": "bg-violet-500",
}

function Proyectos() {
  return (
    <Seccion
      id="proyectos"
      num="02 · Por gusto"
      titulo={<>Lo que construyo <em className="text-accent">fuera de hora</em></>}
      intro="Desarrollar es mi hobby. Todo esto lo uso de verdad, casi todo vive en mi propia VPS y lo mantengo yo."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {proyectos.map((p, i) => (
          <BlurFade key={p.nombre} inView delay={(i % 3) * 0.06} className={cn(p.ancho && "md:col-span-2")}>
            <TarjetaProyecto p={p} />
          </BlurFade>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Y fuera del código: edición de video y gráficos animados para <span className="text-foreground">Rose Level Marketing</span> e{" "}
        <span className="text-foreground">IEB Sevilla</span>.
      </p>
    </Seccion>
  )
}

function TarjetaProyecto({ p }: { p: Proyecto }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border bg-card p-6 transition-colors hover:border-accent/40">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-medium">{p.nombre}</h3>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          <span className={cn("size-1.5 rounded-full", colorEstado[p.estado])} />
          {p.estado}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>

      {p.apps && (
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {p.apps.map((a) => (
            <li key={a.nombre} className="rounded-lg border bg-background/50 p-3">
              <p className="flex items-center gap-1 text-sm font-medium">
                {a.url ? (
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent">
                    {a.nombre} <ArrowUpRight className="size-3.5" />
                  </a>
                ) : (
                  a.nombre
                )}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{a.texto}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {p.stack.map((t) => (
          <span key={t} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">{t}</span>
        ))}
      </div>
    </article>
  )
}

/* ---------- 03 Datos e IA ---------- */

function DatosIA() {
  return (
    <Seccion
      id="datos"
      num="03 · Máster"
      titulo={<>Datos e <em className="text-accent">IA</em></>}
      intro="Proyectos del máster de Big Data: modelos de verdad con datos de verdad."
    >
      <ul className="divide-y rounded-xl border bg-card">
        {datosIA.map((d) => (
          <li key={d.nombre} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            {d.url ? (
              <a href={d.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium hover:text-accent">
                {d.nombre} <ArrowUpRight className="size-3.5" />
              </a>
            ) : (
              <span className="font-medium">{d.nombre}</span>
            )}
            <span className="text-sm text-muted-foreground sm:text-right">{d.texto}</span>
          </li>
        ))}
      </ul>
    </Seccion>
  )
}

/* ---------- 04 Stack ---------- */

function Stack() {
  return (
    <Seccion id="stack" num="04 · Herramientas" titulo={<>Con qué <em className="text-accent">trabajo</em></>}>
      <dl className="grid gap-8 sm:grid-cols-2">
        {stack.map((g) => (
          <div key={g.grupo}>
            <dt className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{g.grupo}</dt>
            <dd className="flex flex-wrap gap-2">
              {g.items.map((t) => (
                <Badge key={t} variant="secondary" className="h-7 px-2.5 text-[13px] font-normal">{t}</Badge>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Seccion>
  )
}

/* ---------- 05 Formación ---------- */

function Formacion() {
  return (
    <Seccion id="formacion" num="05 · Formación" titulo={<>Lo que <em className="text-accent">estudié</em></>}>
      <ol className="relative space-y-8 border-l pl-6">
        {formacion.map((f) => (
          <li key={f.titulo} className="relative">
            <span className="absolute -left-[29px] top-1.5 size-2.5 rounded-full border-2 border-background bg-accent" />
            <p className="font-mono text-xs text-muted-foreground">{f.fecha}</p>
            <h3 className="mt-1 text-lg font-medium">{f.titulo}</h3>
            <p className="text-sm text-accent">{f.lugar}</p>
            <p className="mt-1 text-sm text-muted-foreground">{f.texto}</p>
          </li>
        ))}
      </ol>
    </Seccion>
  )
}

/* ---------- 06 Contacto ---------- */

function Contacto() {
  const filas = [
    { icono: <Mail className="size-4" />, texto: perfil.email, href: `mailto:${perfil.email}` },
    { icono: <LinkedIn className="size-4" />, texto: "linkedin.com/in/fercarstens", href: perfil.linkedin },
    { icono: <GitHub className="size-4" />, texto: "github.com/fercarstens", href: perfil.github },
    { icono: <Telegram className="size-4" />, texto: "@FerC1414", href: perfil.telegram },
  ]
  return (
    <section id="contacto" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24">
      <BlurFade inView>
        <div className="rounded-2xl border bg-card p-8 sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">06 · Contacto</p>
          <h2 className="mt-2 font-serif text-5xl tracking-tight sm:text-6xl">
            ¿<em className="text-accent">Hablamos</em>?
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">Sistemas, seguridad o una idea que quieras convertir en app. Contesto rápido.</p>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {filas.map((f) => (
              <li key={f.href}>
                <a
                  href={f.href}
                  target={f.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border bg-background/50 px-4 py-3 text-sm transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <span className="text-muted-foreground">{f.icono}</span>
                  <span className="truncate">{f.texto}</span>
                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </BlurFade>
    </section>
  )
}

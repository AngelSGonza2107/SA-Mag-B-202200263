import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  summary: string;
  content?: string[];
  aiTool: string;
  featured?: boolean;
};

type Meta = {
  servedBy: string;
  hostname: string;
  timestamp: string;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("es-GT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));

const getSlug = () => {
  const match = window.location.pathname.match(/^\/noticias\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
};

function AiBadge({ tool }: { tool: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-400/8 px-3 py-1.5 text-[11px] font-bold tracking-[0.08em] text-violet-200 uppercase">
      <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa]" />
      Contenido generado con {tool}
    </span>
  );
}

function Header({ instance, onHome }: { instance?: Meta; onHome: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#090a0f]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <button
          type="button"
          onClick={onHome}
          className="group flex items-center gap-3"
          aria-label="Ir al inicio"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-[#b9ff2c] text-sm font-black text-[#090a0f] transition-transform group-hover:-rotate-6">
            SG
          </span>
          <span className="text-left text-lg font-black tracking-[-0.04em] text-white">
            SA<span className="text-[#b9ff2c]">GAMING</span>
          </span>
        </button>

        <div className="hidden items-center gap-7 text-xs font-bold tracking-[0.12em] text-zinc-400 uppercase md:flex">
          <button
            type="button"
            onClick={onHome}
            className="transition-colors hover:text-white"
          >
            Noticias
          </button>
          <a href="/#categorias" className="transition-colors hover:text-white">
            Categorías
          </a>
          <a href="/#nginx-lab" className="transition-colors hover:text-white">
            NGINX Lab
          </a>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/8 px-3 py-2 text-[10px] font-bold tracking-[0.08em] text-emerald-300 uppercase sm:text-xs">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          <span className="hidden sm:inline">Responde:</span>{" "}
          {instance?.servedBy ?? "conectando"}
        </div>
      </div>
    </header>
  );
}

function ArticleLink({
  article,
  onOpen,
  className = "",
}: {
  article: Article;
  onOpen: (slug: string) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(article.slug)}
      className={`group block w-full text-left ${className}`}
    >
      <span className="mb-4 block overflow-hidden rounded-2xl bg-zinc-900">
        <img
          src={article.image}
          alt={`Imagen relacionada con ${article.title}`}
          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          loading="lazy"
        />
      </span>
      <span className="mb-3 flex items-center gap-3 text-[11px] font-bold tracking-[0.12em] uppercase">
        <span className="text-[#b9ff2c]">{article.category}</span>
        <span className="size-1 rounded-full bg-zinc-700" />
        <time className="text-zinc-500" dateTime={article.date}>
          {formatDate(article.date)}
        </time>
      </span>
      <span className="block text-xl leading-tight font-bold tracking-[-0.025em] text-zinc-100 transition-colors group-hover:text-[#b9ff2c] lg:text-2xl">
        {article.title}
      </span>
      <span className="mt-3 block line-clamp-3 text-sm leading-6 text-zinc-400">
        {article.summary}
      </span>
      <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-zinc-300">
        Leer noticia{" "}
        <span className="text-[#b9ff2c] transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </button>
  );
}

function BalanceLab() {
  const [results, setResults] = useState<Meta[]>([]);
  const [testing, setTesting] = useState(false);

  const testBalance = async () => {
    setTesting(true);
    setResults([]);
    const responses: Meta[] = [];

    for (let index = 0; index < 6; index += 1) {
      const response = await fetch(
        `/api/instance?request=${index}&t=${Date.now()}`,
        { cache: "no-store" },
      );
      responses.push(await response.json());
      setResults([...responses]);
    }

    setTesting(false);
  };

  return (
    <section
      id="nginx-lab"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101219] p-6 sm:p-9"
    >
      <div className="absolute -top-20 -right-20 size-64 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <div className="mb-3 text-xs font-black tracking-[0.18em] text-violet-300 uppercase">
            Demostración técnica
          </div>
          <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">
            NGINX en acción
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
            NGINX recibe todas las solicitudes y las distribuye con{" "}
            <strong className="text-zinc-200">Round Robin</strong>: una petición
            para cada backend, de forma alternada.
          </p>
          <button
            type="button"
            onClick={testBalance}
            disabled={testing}
            className="mt-6 rounded-xl bg-[#b9ff2c] px-5 py-3 text-sm font-black text-[#090a0f] transition hover:bg-[#c9ff5d] disabled:cursor-wait disabled:opacity-60"
          >
            {testing ? "Enviando solicitudes…" : "Probar 6 solicitudes"}
          </button>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#08090d] p-4 font-mono text-xs sm:p-5">
          <div className="mb-4 flex items-center justify-between border-b border-white/8 pb-3 text-zinc-500">
            <span>RESULTADOS DEL BALANCEADOR</span>
            <span>{results.length}/6</span>
          </div>
          <div className="grid min-h-44 content-start gap-2">
            {results.length === 0 ? (
              <div className="grid min-h-36 place-items-center text-center text-zinc-600">
                Ejecuta la prueba para ver qué instancia responde.
              </div>
            ) : (
              results.map((result, index) => (
                <div
                  key={`${result.timestamp}-${index}`}
                  className="flex items-center justify-between rounded-lg border border-white/6 bg-white/[0.025] px-3 py-2.5"
                >
                  <span className="text-zinc-500">
                    solicitud_{String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={
                      result.servedBy === "backend-1"
                        ? "text-cyan-300"
                        : "text-fuchsia-300"
                    }
                  >
                    ← {result.servedBy}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({
  articles,
  onOpen,
}: {
  articles: Article[];
  onOpen: (slug: string) => void;
}) {
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const rest = articles.filter((article) => article.slug !== featured?.slug);
  const categories = useMemo(
    () => [...new Set(articles.map((article) => article.category))],
    [articles],
  );

  if (!featured) return null;

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 pt-12 pb-14 lg:px-8 lg:pt-18">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-3 text-xs font-black tracking-[0.18em] text-[#b9ff2c] uppercase">
              <span className="h-px w-8 bg-[#b9ff2c]" /> Actualidad gamer
            </div>
            <h1 className="max-w-3xl text-4xl leading-[0.95] font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              Noticias para jugar{" "}
              <span className="text-zinc-600">informado.</span>
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-6 text-zinc-500 lg:pb-1">
            Un portal académico sobre videojuegos, tecnología y cultura digital.
            Textos e imágenes asistidos por inteligencia artificial.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpen(featured.slug)}
          className="group relative block w-full overflow-hidden rounded-3xl bg-zinc-900 text-left"
        >
          <img
            src={featured.image}
            alt={`Imagen relacionada con ${featured.title}`}
            className="h-[520px] w-full object-cover transition duration-700 group-hover:scale-[1.02] sm:h-[570px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
            <div className="mb-4 flex flex-wrap items-center gap-3 text-[11px] font-bold tracking-[0.12em] uppercase">
              <span className="rounded-full bg-[#b9ff2c] px-3 py-1.5 text-[#090a0f]">
                Destacada
              </span>
              <span className="text-zinc-200">{featured.category}</span>
              <time className="text-zinc-400" dateTime={featured.date}>
                {formatDate(featured.date)}
              </time>
            </div>
            <h2 className="max-w-4xl text-3xl leading-[1.02] font-black tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              {featured.title}
            </h2>
            <p className="mt-4 hidden max-w-2xl text-base leading-7 text-zinc-300 sm:block">
              {featured.summary}
            </p>
            <div className="mt-6">
              <AiBadge tool={featured.aiTool} />
            </div>
          </div>
        </button>
      </section>

      <section id="categorias" className="border-y border-white/8 bg-[#0c0d12]">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-5 py-5 lg:px-8">
          <span className="mr-2 shrink-0 text-[11px] font-black tracking-[0.15em] text-zinc-600 uppercase">
            Explorar
          </span>
          {categories.map((category) => (
            <span
              key={category}
              className="shrink-0 rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-zinc-300"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
            Últimas noticias
          </h2>
          <span className="text-xs font-bold text-zinc-600">
            {articles.length} ARTÍCULOS
          </span>
        </div>
        <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleLink key={article.slug} article={article} onOpen={onOpen} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-18 lg:px-8 lg:pb-24">
        <BalanceLab />
      </section>
    </main>
  );
}

function DetailPage({
  article,
  related,
  onHome,
  onOpen,
}: {
  article: Article;
  related?: Article;
  onHome: () => void;
  onOpen: (slug: string) => void;
}) {
  return (
    <main>
      <article>
        <div className="mx-auto max-w-4xl px-5 pt-10 pb-9 lg:px-8 lg:pt-16">
          <button
            type="button"
            onClick={onHome}
            className="mb-9 inline-flex items-center gap-2 text-xs font-bold tracking-[0.08em] text-zinc-400 uppercase transition hover:text-white"
          >
            <span className="text-[#b9ff2c]">←</span> Todas las noticias
          </button>
          <div className="mb-5 flex items-center gap-3 text-[11px] font-bold tracking-[0.12em] uppercase">
            <span className="text-[#b9ff2c]">{article.category}</span>
            <span className="size-1 rounded-full bg-zinc-700" />
            <time className="text-zinc-500" dateTime={article.date}>
              {formatDate(article.date)}
            </time>
          </div>
          <h1 className="text-4xl leading-[1.02] font-black tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400 sm:text-xl">
            {article.summary}
          </p>
          <div className="mt-6">
            <AiBadge tool={article.aiTool} />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <img
            src={article.image}
            alt={`Imagen relacionada con ${article.title}`}
            className="max-h-[680px] w-full rounded-3xl object-cover"
          />
        </div>

        <div className="mx-auto grid max-w-4xl gap-10 px-5 py-12 lg:grid-cols-[1fr_180px] lg:px-8 lg:py-16">
          <div className="article-copy">
            {article.content?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <aside className="border-t border-white/10 pt-5 lg:border-t-0 lg:border-l lg:pl-6">
            <div className="text-[10px] font-black tracking-[0.16em] text-zinc-600 uppercase">
              Ficha
            </div>
            <dl className="mt-4 space-y-4 text-xs">
              <div>
                <dt className="text-zinc-600">Categoría</dt>
                <dd className="mt-1 font-bold text-zinc-300">
                  {article.category}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-600">Fuente del texto</dt>
                <dd className="mt-1 font-bold text-zinc-300">
                  {article.aiTool}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-600">Tipo</dt>
                <dd className="mt-1 font-bold text-zinc-300">
                  Proyecto académico
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </article>

      {related && (
        <section className="border-t border-white/8 bg-[#0c0d12]">
          <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
            <div className="mb-6 text-xs font-black tracking-[0.15em] text-zinc-600 uppercase">
              Continúa leyendo
            </div>
            <ArticleLink
              article={related}
              onOpen={onOpen}
              className="max-w-xl"
            />
          </div>
        </section>
      )}
    </main>
  );
}

function Loading() {
  return (
    <div className="grid min-h-[65vh] place-items-center text-sm font-bold text-zinc-500">
      Cargando noticias…
    </div>
  );
}

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [article, setArticle] = useState<Article | null>(null);
  const [meta, setMeta] = useState<Meta>();
  const [slug, setSlug] = useState<string | null>(getSlug());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const onPopState = () => setSlug(getSlug());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(slug ? `/api/news/${slug}` : "/api/news", {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("No fue posible cargar el contenido");
        const payload = await response.json();
        setMeta(payload.meta);
        if (slug) setArticle(payload.data);
        else {
          setArticles(payload.data);
          setArticle(null);
        }
      } catch {
        setError(
          "No pudimos conectar con el portal. Intenta recargar la página.",
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const navigate = (nextSlug: string | null) => {
    window.history.pushState({}, "", nextSlug ? `/noticias/${nextSlug}` : "/");
    setSlug(nextSlug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-300">
      <Header instance={meta} onHome={() => navigate(null)} />
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="grid min-h-[65vh] place-items-center px-5 text-center text-zinc-400">
          {error}
        </div>
      ) : slug && article ? (
        <DetailPage
          article={article}
          related={articles[0]}
          onHome={() => navigate(null)}
          onOpen={(value) => navigate(value)}
        />
      ) : (
        <HomePage articles={articles} onOpen={(value) => navigate(value)} />
      )}
      <footer className="border-t border-white/8 bg-[#07080b]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <strong className="text-zinc-300">SAGaming</strong> · Proyecto
            académico de Software Avanzado "B"
          </div>
          <div>Noticias e imágenes generadas con ChatGPT de OpenAI</div>
        </div>
      </footer>
    </div>
  );
}

export default App;

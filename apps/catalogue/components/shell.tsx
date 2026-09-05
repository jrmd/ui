import { ArrowUpRight, Asterisk } from "lucide-react";
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-wrap">
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <header className="site-nav">
        <a href="/" className="brand" aria-label="Jez UI home">
          <span className="brand-mark">
            <Asterisk size={24} strokeWidth={2} />
          </span>
          jez<span className="font-normal text-muted-foreground">ui</span>
        </a>
        <nav className="nav-links" aria-label="Main">
          <a href="/components">Components</a>
          <a href="/blocks">Blocks</a>
          <a href="/templates">Templates</a>
          <a href="/docs/installation">Docs</a>
        </nav>
        <a
          className="nav-end flex items-center gap-2"
          href="/docs/installation"
        >
          Make it yours <ArrowUpRight size={14} />
        </a>
      </header>
      <div id="main-content">{children}</div>
      <footer className="site-footer">
        <a href="/" className="brand !text-lg">
          jez ui
        </a>
        <span>Good foundations. A little more feeling.</span>
        <div className="flex gap-5">
          <a href="/docs/changelog">Changelog</a>
          <a href="/docs/licensing">Distribution</a>
        </div>
      </footer>
    </div>
  );
}

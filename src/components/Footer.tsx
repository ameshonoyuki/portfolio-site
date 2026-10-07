export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-10">
        <p className="flex items-baseline gap-3">
          <span className="font-mincho font-bold tracking-wider">アメショのユキ</span>
          <span className="font-display text-sm italic tracking-[0.25em] text-gold">atelier</span>
        </p>
        <p className="text-xs tracking-wider text-muted">
          &copy; {new Date().getFullYear()} アメショのユキ. All rights reserved.
        </p>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 text-xs tracking-[0.3em] text-muted transition-colors hover:text-gold"
        >
          <span className="font-display text-sm uppercase italic">Back to top</span>
          <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

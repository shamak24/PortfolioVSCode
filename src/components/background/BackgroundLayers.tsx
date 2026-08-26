export function BackgroundLayers() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, black 0%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 60% at 50% 0%, black 0%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed top-[-10%] left-1/2 z-0 h-[900px] w-[900px] max-w-[140vw] -translate-x-1/2 opacity-[0.08] blur-[60px] transition-[background] duration-250"
        style={{
          background: 'radial-gradient(circle, var(--amber) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />
    </>
  )
}

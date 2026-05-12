export function BackToTopButton({
  label,
  ariaLabel,
}: {
  label: string;
  ariaLabel: string;
}) {
  return (
    <a
      href="#page-top"
      aria-label={ariaLabel}
      className="fixed bottom-5 right-5 z-40 rounded-full border border-white/20 bg-[#143a6b] px-5 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(11,35,68,0.25)] transition hover:bg-[#0b2344] focus:outline-none focus:ring-4 focus:ring-[#caa15a]/30"
    >
      {label}
    </a>
  );
}

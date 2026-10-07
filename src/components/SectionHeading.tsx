import Reveal from "./Reveal";

type Props = { no: string; ja: string; en: string; lead?: string };

export default function SectionHeading({ no, ja, en, lead }: Props) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <p className="flex items-center gap-4 font-display text-base italic tracking-[0.3em] text-gold">
          <span>{no}</span>
          <span className="h-px w-12 bg-gold/50" />
          <span className="font-sans text-xs not-italic tracking-[0.25em] text-muted">{ja}</span>
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-3 font-display text-[clamp(3.4rem,9vw,7.5rem)] font-medium italic leading-[0.95] tracking-tight">
          <span className="text-gradient">{en}</span>
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={160}>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-nocturnal-expedition/70">
          {eyebrow}
        </span>
      ) : null}
      <h2
        id={id}
        className="font-display max-w-2xl text-3xl font-semibold tracking-tight text-oceanic-noir sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-base leading-relaxed text-nocturnal-expedition/80">
          {description}
        </p>
      ) : null}
    </div>
  );
}

import { typographyStyles } from "@/lib/styles";

type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <header className={`space-y-3 ${alignClass}`}>
      {label ? (
        <p className={typographyStyles.eyebrow}>
          {label}
        </p>
      ) : null}
      <h2 className={typographyStyles.h2}>{title}</h2>
      {description ? (
        <p className={`max-w-2xl ${typographyStyles.body}`}>{description}</p>
      ) : null}
    </header>
  );
}

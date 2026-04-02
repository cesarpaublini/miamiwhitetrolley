import Image from "next/image";

type ImageOrPlaceholderProps = {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function ImageOrPlaceholder({
  src,
  alt,
  width = 1200,
  height = 900,
  fill = false,
  priority = false,
  sizes,
  className = "",
}: ImageOrPlaceholderProps) {
  if (!src) {
    return <div className={`h-full w-full bg-zinc-200 ${className}`} aria-hidden="true" />;
  }

  if (fill) {
    return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} />;
  }

  return <Image src={src} alt={alt} width={width} height={height} priority={priority} sizes={sizes} className={className} />;
}

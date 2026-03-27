import { Container } from "@/components/layout/Container";
import { ImageOrPlaceholder } from "@/components/ui/ImageOrPlaceholder";
import { lifestyleGalleryItems } from "@/lib/site";
import { sectionStyles, typographyStyles } from "@/lib/styles";

export function LifestyleGallerySection() {
  const [featureImage, ...restImages] = lifestyleGalleryItems;
  const supportImages = restImages.slice(0, 4);

  return (
    <section className={sectionStyles.base}>
      <Container className="space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#222222]">
            Miami Weddings · Captured Live
          </p>
          <h2 className={typographyStyles.h2}>
            See Our Trolleys in Action
          </h2>
          <p className="max-w-3xl text-base leading-7 text-zinc-600">
            Lifestyle shots from real weddings and events across Miami - exactly what you will
            experience.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">
          <figure className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <ImageOrPlaceholder
              src={featureImage?.image}
              alt={featureImage?.alt ?? "Feature trolley gallery image"}
              width={1200}
              height={1200}
              className="block h-104 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] lg:h-120"
            />
          </figure>

          <div className="grid grid-cols-2 gap-4">
            {supportImages.map((item) => (
              <figure
                key={item.alt}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <ImageOrPlaceholder
                  src={item.image}
                  alt={item.alt}
                  width={900}
                  height={700}
                  className="block h-58 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

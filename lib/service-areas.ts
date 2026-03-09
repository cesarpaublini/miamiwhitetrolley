export type AreaVenue = {
  emoji: string;
  name: string;
  type: string;
  highlight: string;
  capacity: string;
  description: string;
  image: string;
  address: string;
  tags: string[];
};

export type AreaService = {
  icon: string;
  title: string;
  description: string;
};

export type AreaReview = {
  rating: number;
  quote: string;
  avatar: string;
  name: string;
  venue: string;
  date: string;
};

export type AreaExpertiseItem = {
  icon: string;
  title: string;
  description: string;
};

export type AreaContactOption = {
  icon: string;
  label: string;
  value: string;
};

export type ServiceAreaPage = {
  slug: string;
  name: string;
  state: string;
  heroImage: string;
  regionBadge: string;
  statusBadge: string;
  heroSubtext: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    highlights: string[];
    images: {
      primary: string;
      topRight: string;
      bottomRight: string;
    };
  };
  venues: {
    eyebrow: string;
    heading: string;
    descriptor: string;
    items: AreaVenue[];
  };
  services: {
    eyebrow: string;
    heading: string;
    description: string;
    items: AreaService[];
    fleetCtaTitle: string;
    fleetCtaSubtitle: string;
    fleetCtaLabel: string;
  };
  reviews: {
    heading: string;
    items: AreaReview[];
  };
  localExpertise: {
    eyebrow: string;
    heading: string;
    body: string;
    image: string;
    quote: string;
    quoteAttribution: string;
    items: AreaExpertiseItem[];
  };
  booking: {
    eyebrow: string;
    heading: string;
    body: string;
    trustSignals: string[];
    contactOptions: AreaContactOption[];
    formHeading: string;
  };
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

function buildAreaPage({
  slug,
  name,
  heroImage,
  regionBadge,
  overrides,
}: {
  slug: string;
  name: string;
  heroImage: string;
  regionBadge: string;
  overrides?: DeepPartial<ServiceAreaPage>;
}): ServiceAreaPage {
  const defaultPage: ServiceAreaPage = {
    slug,
    name,
    state: "FL",
    heroImage,
    regionBadge,
    statusBadge: "We Serve This Area",
    heroSubtext: `Premium wedding, event, and group transportation throughout ${name} and nearby South Florida destinations.`,
    seoTitle: `${name} Transportation Services | Miami White Trolley`,
    seoDescription: `Book premium wedding and event transportation in ${name}, FL. Miami White Trolley provides elegant group travel with professional chauffeurs.`,
    seoKeywords: [
      `${name} wedding transportation`,
      `${name} trolley rental`,
      `group transportation ${name} FL`,
      `Miami White Trolley ${name}`,
    ],
    about: {
      eyebrow: "About the area",
      heading: `${name} events with local transportation expertise`,
      paragraphs: [
        `${name} offers a strong mix of destination venues, local landmarks, and high-demand event spaces throughout the year.`,
        `Our team coordinates transportation plans tailored to venue access windows, guest logistics, and event timelines across ${name}.`,
        `From wedding weekends to corporate events, we help groups move smoothly with reliable service and clear communication.`,
      ],
      highlights: [
        "📍 Local route expertise",
        "🏛️ Venue-aware planning",
        "⏱️ Timeline precision",
        "🛎️ Hotel pickup coordination",
        "🚌 Flexible fleet options",
        "✅ Professional chauffeurs",
      ],
      images: {
        primary: heroImage,
        topRight: "/images/white-trolley-transportation-miami.jpg",
        bottomRight: "/images/miami-trolley-rental-wedding-transportation.jpeg",
      },
    },
    venues: {
      eyebrow: "Venues",
      heading: "Hotels, venues & landmarks we know",
      descriptor:
        "We coordinate transportation daily with local properties and event teams, so pickups and arrivals stay seamless from start to finish.",
      items: [
        {
          emoji: "🏨",
          name: `${name} Signature Venue`,
          type: "Hotel",
          highlight: "Popular pick",
          capacity: "Up to 220 guests",
          description: `A dependable choice in ${name} for weddings, social events, and group functions.`,
          image: heroImage,
          address: `${name}, FL`,
          tags: ["Weddings", "Events", "Group Access"],
        },
      ],
    },
    services: {
      eyebrow: "Services in this area",
      heading: "Transportation options tailored to local events",
      description:
        "We provide full-service transportation for weddings, private celebrations, and corporate events with route planning adapted to this area's venues and traffic flow.",
      items: [
        {
          icon: "💍",
          title: "Wedding Transportation",
          description: "Guest shuttle coordination between hotels, ceremony venues, and receptions.",
        },
        {
          icon: "🏢",
          title: "Corporate Events",
          description: "Executive and group transportation for conferences and business functions.",
        },
        {
          icon: "🎉",
          title: "Private Charters",
          description: "Flexible private transportation for custom events and celebrations.",
        },
      ],
      fleetCtaTitle: "Not sure which vehicle is right for your event?",
      fleetCtaSubtitle: "Compare vehicle options by capacity, style, and event type.",
      fleetCtaLabel: "View Full Fleet ->",
    },
    reviews: {
      heading: `What clients say about us in ${name}`,
      items: [
        {
          rating: 5,
          quote: `Great communication and smooth transportation throughout our event in ${name}.`,
          avatar: "MW",
          name: "Mia W.",
          venue: `${name} Venue`,
          date: "Feb 2026",
        },
        {
          rating: 5,
          quote: `Our wedding transportation in ${name} was beautifully organized. The team kept our timeline on track and made every guest transfer feel easy and polished.`,
          avatar: "JR",
          name: "James R.",
          venue: `${name} Wedding Venue`,
          date: "Jan 2026",
        },
        {
          rating: 5,
          quote: `From the first pickup to the final drop-off, service in ${name} was professional, punctual, and stress-free. The trolley experience added a special touch to our celebration.`,
          avatar: "SA",
          name: "Sophia A.",
          venue: `${name} Reception Venue`,
          date: "Dec 2025",
        },
      ],
    },
    localExpertise: {
      eyebrow: "Local expertise",
      heading: "We know this area inside and out",
      body: `Our team brings on-the-ground knowledge of ${name} routes, venue logistics, and guest flow planning.`,
      image: "/images/miami-wedding-trolley-bridesmaids-group.jpg",
      quote:
        "Events run best when transportation is planned with local precision - from venue timing windows to seamless guest movement.",
      quoteAttribution: "- Miami White Trolley Team",
      items: [
        {
          icon: "🗺️",
          title: "We know every route",
          description: "Local routing expertise for efficient pickup, transfer, and drop-off planning.",
        },
        {
          icon: "⏱️",
          title: "Precise timing",
          description: "Timeline-aware transportation plans built around your event flow.",
        },
      ],
    },
    booking: {
      eyebrow: "Ready to book?",
      heading: `Let's plan your ${name} event`,
      body: "Tell us your timeline and guest details, and our team will send a clear, custom transportation quote.",
      trustSignals: [
        "✅ No travel fee",
        "⚡ Quote within 2 hours",
        "📋 Custom route plan included",
        "🔒 Fully licensed & bonded",
      ],
      contactOptions: [
        { icon: "📞", label: "Call us", value: "(305) 555-0100" },
        { icon: "💬", label: "WhatsApp", value: "Fast responses daily" },
        { icon: "📧", label: "Email", value: "info@miamiwhitetrolley.com" },
      ],
      formHeading: `Get a free ${name} quote`,
    },
  };

  return {
    slug: overrides?.slug ?? defaultPage.slug,
    name: overrides?.name ?? defaultPage.name,
    state: overrides?.state ?? defaultPage.state,
    heroImage: overrides?.heroImage ?? defaultPage.heroImage,
    regionBadge: overrides?.regionBadge ?? defaultPage.regionBadge,
    statusBadge: overrides?.statusBadge ?? defaultPage.statusBadge,
    heroSubtext: overrides?.heroSubtext ?? defaultPage.heroSubtext,
    seoTitle: overrides?.seoTitle ?? defaultPage.seoTitle,
    seoDescription: overrides?.seoDescription ?? defaultPage.seoDescription,
    seoKeywords: (overrides?.seoKeywords as string[] | undefined) ?? defaultPage.seoKeywords,
    about: {
      eyebrow: overrides?.about?.eyebrow ?? defaultPage.about.eyebrow,
      heading: overrides?.about?.heading ?? defaultPage.about.heading,
      paragraphs: (overrides?.about?.paragraphs as string[] | undefined) ?? defaultPage.about.paragraphs,
      highlights: (overrides?.about?.highlights as string[] | undefined) ?? defaultPage.about.highlights,
      images: {
        primary: overrides?.about?.images?.primary ?? defaultPage.about.images.primary,
        topRight: overrides?.about?.images?.topRight ?? defaultPage.about.images.topRight,
        bottomRight: overrides?.about?.images?.bottomRight ?? defaultPage.about.images.bottomRight,
      },
    },
    venues: {
      eyebrow: overrides?.venues?.eyebrow ?? defaultPage.venues.eyebrow,
      heading: overrides?.venues?.heading ?? defaultPage.venues.heading,
      descriptor: overrides?.venues?.descriptor ?? defaultPage.venues.descriptor,
      items: (overrides?.venues?.items as AreaVenue[] | undefined) ?? defaultPage.venues.items,
    },
    services: {
      eyebrow: overrides?.services?.eyebrow ?? defaultPage.services.eyebrow,
      heading: overrides?.services?.heading ?? defaultPage.services.heading,
      description: overrides?.services?.description ?? defaultPage.services.description,
      items: (overrides?.services?.items as AreaService[] | undefined) ?? defaultPage.services.items,
      fleetCtaTitle: overrides?.services?.fleetCtaTitle ?? defaultPage.services.fleetCtaTitle,
      fleetCtaSubtitle: overrides?.services?.fleetCtaSubtitle ?? defaultPage.services.fleetCtaSubtitle,
      fleetCtaLabel: overrides?.services?.fleetCtaLabel ?? defaultPage.services.fleetCtaLabel,
    },
    reviews: {
      heading: overrides?.reviews?.heading ?? defaultPage.reviews.heading,
      items: (overrides?.reviews?.items as AreaReview[] | undefined) ?? defaultPage.reviews.items,
    },
    localExpertise: {
      eyebrow: overrides?.localExpertise?.eyebrow ?? defaultPage.localExpertise.eyebrow,
      heading: overrides?.localExpertise?.heading ?? defaultPage.localExpertise.heading,
      body: overrides?.localExpertise?.body ?? defaultPage.localExpertise.body,
      image: overrides?.localExpertise?.image ?? defaultPage.localExpertise.image,
      quote: overrides?.localExpertise?.quote ?? defaultPage.localExpertise.quote,
      quoteAttribution:
        overrides?.localExpertise?.quoteAttribution ?? defaultPage.localExpertise.quoteAttribution,
      items:
        (overrides?.localExpertise?.items as AreaExpertiseItem[] | undefined) ??
        defaultPage.localExpertise.items,
    },
    booking: {
      eyebrow: overrides?.booking?.eyebrow ?? defaultPage.booking.eyebrow,
      heading: overrides?.booking?.heading ?? defaultPage.booking.heading,
      body: overrides?.booking?.body ?? defaultPage.booking.body,
      trustSignals:
        (overrides?.booking?.trustSignals as string[] | undefined) ?? defaultPage.booking.trustSignals,
      contactOptions:
        (overrides?.booking?.contactOptions as AreaContactOption[] | undefined) ??
        defaultPage.booking.contactOptions,
      formHeading: overrides?.booking?.formHeading ?? defaultPage.booking.formHeading,
    },
  };
}

export const serviceAreaPages: ServiceAreaPage[] = [
  buildAreaPage({
    slug: "coral-gables",
    name: "Coral Gables",
    heroImage: "/images/Areas/coral-gables-miami-white-trolley-transportation.jpg",
    regionBadge: "Miami-Dade · No travel fee",
    overrides: {
      about: {
        heading: "Miami's most elegant neighborhood",
        paragraphs: [
          "Coral Gables blends historic charm with modern sophistication, making it one of South Florida's most sought-after locations for weddings, private events, and upscale gatherings.",
          "From iconic landmarks and grand estates to refined hotel venues, the area offers a polished setting for celebrations that call for smooth, stylish group transportation.",
          "Our local drivers know Coral Gables routes, venues, and timing windows, helping your guests arrive comfortably and on schedule throughout the event day.",
        ],
        highlights: [
          "🌳 Tree-lined boulevards",
          "🏛️ Mediterranean architecture",
          "🍽️ Miracle Mile dining",
          "🎓 University of Miami",
          "🛍️ Luxury shopping",
          "🌊 Near Biscayne Bay",
        ],
        images: {
          primary: "/images/Areas/coral-gables-miami-white-trolley-transportation.jpg",
          topRight: "/images/Venues/Coral Gables/Coral-gables-001-miami-white-trolley.jpg",
          bottomRight: "/images/Venues/Coral Gables/Coral-gables-002-miami-white-trolley.jpg",
        },
      },
      venues: {
        items: [
          {
            emoji: "🏛️",
            name: "Club of knights",
            type: "Landmark",
            highlight: "Historic venue",
            capacity: "Up to 240 guests",
            description:
              "A classic Coral Gables venue known for elegant interiors and event-ready layouts for weddings and private celebrations.",
            image: "/images/Venues/Coral Gables/club-of-knights-miami-white-trolley.jpg",
            address: "Coral Gables, FL",
            tags: ["Weddings", "Historic", "Private Events"],
          },
          {
            emoji: "🏨",
            name: "Biltmore Hotel",
            type: "Hotel",
            highlight: "Most requested",
            capacity: "Up to 300 guests",
            description:
              "Iconic Coral Gables hotel with elegant ballrooms and outdoor spaces for weddings and upscale gatherings.",
            image: "/images/Venues/Coral Gables/biltmore-miami-white-trolley.jpg",
            address: "1200 Anastasia Ave, Coral Gables, FL",
            tags: ["Luxury", "Ballroom", "Weddings"],
          },
          {
            emoji: "🏛️",
            name: "Coral Gables Country Club",
            type: "Landmark",
            highlight: "Classic style",
            capacity: "Up to 220 guests",
            description:
              "Historic Mediterranean-revival setting that blends timeless architecture with modern event amenities.",
            image: "/images/Venues/Coral Gables/coral-gables-country-club-miami-white-trolley.jpg",
            address: "997 N Greenway Dr, Coral Gables, FL",
            tags: ["Historic", "Ballroom", "Central Location"],
          },
          {
            emoji: "🏨",
            name: "Hotel Colonnade Coral Gables",
            type: "Hotel",
            highlight: "Modern classic",
            capacity: "Up to 200 guests",
            description:
              "Stylish hotel venue in the heart of Coral Gables with flexible spaces for receptions and social events.",
            image: "/images/Venues/Coral Gables/hotel-colonnade-miami-white-trolley.jpg",
            address: "180 Aragon Ave, Coral Gables, FL",
            tags: ["Hotel Venue", "Receptions", "Downtown Gables"],
          },
          {
            emoji: "🏨",
            name: "Loews Coral Gables Hotel",
            type: "Hotel",
            highlight: "Premium events",
            capacity: "Up to 260 guests",
            description:
              "Contemporary luxury property with premium event spaces and excellent access for coordinated guest transportation.",
            image: "/images/Venues/Coral Gables/lowes-coral-gables-miami-white-trolley.jpg",
            address: "2950 Coconut Grove Dr, Coral Gables, FL",
            tags: ["Luxury", "Corporate", "Weddings"],
          },
          {
            emoji: "🏛️",
            name: "The Coral Gables Women's Club",
            type: "Historic Club",
            highlight: "Timeless charm",
            capacity: "Up to 180 guests",
            description:
              "A beloved historic clubhouse venue ideal for intimate weddings and elegant gatherings in Coral Gables.",
            image: "/images/Venues/Coral Gables/woman's-club-miami-white-trolley.jpg",
            address: "1001 E Ponce de Leon Blvd, Coral Gables, FL",
            tags: ["Historic", "Intimate", "Weddings"],
          },
          {
            emoji: "🌿",
            name: "Deering Estate",
            type: "Estate",
            highlight: "Waterfront grounds",
            capacity: "Up to 250 guests",
            description:
              "Scenic estate venue with lush landscapes and bayfront views, perfect for destination-style celebrations.",
            image: "/images/Venues/Coral Gables/deering-estate-miami-white-trolley.jpg",
            address: "16701 SW 72nd Ave, Miami, FL",
            tags: ["Estate", "Outdoor", "Bayfront"],
          },
        ],
      },
      services: {
        items: [
          {
            icon: "💍",
            title: "Wedding Transportation",
            description:
              "Guest shuttle coordination between hotels, ceremony venues, and receptions with professional event timing.",
          },
          {
            icon: "🏢",
            title: "Corporate Events",
            description:
              "Executive and group transportation for conferences, meetings, and business events across the area.",
          },
          {
            icon: "🎉",
            title: "Private Charters",
            description: "Flexible private transportation for birthdays, family celebrations, and custom event itineraries.",
          },
          {
            icon: "🛬",
            title: "Airport Transfers",
            description: "Reliable airport and hotel transportation for individuals and groups with coordinated pickup windows.",
          },
          {
            icon: "🚢",
            title: "Cruise Port Shuttles",
            description: "Smooth transfers for pre- and post-cruise guests with ample luggage support and route planning.",
          },
          {
            icon: "🕺",
            title: "Prom & Social Events",
            description:
              "Safe and stylish group transportation for proms, galas, and milestone celebrations throughout the city.",
          },
        ],
      },
      reviews: {
        heading: "What clients say about us in Coral Gables",
        items: [
          {
            rating: 5,
            quote:
              "Everything was perfectly timed from hotel pickup to reception drop-off. The team knew Coral Gables traffic and made the day feel effortless.",
            avatar: "EM",
            name: "Elena M.",
            venue: "Biltmore Hotel",
            date: "Feb 2026",
          },
          {
            rating: 5,
            quote:
              "Our guests loved the trolley and the service was incredibly polished. Communication was clear and every stop happened exactly as planned.",
            avatar: "JR",
            name: "James R.",
            venue: "Coral Gables Country Club",
            date: "Jan 2026",
          },
          {
            rating: 5,
            quote:
              "From booking to the final drop-off, Miami White Trolley delivered an amazing experience. Professional drivers and beautiful vehicles.",
            avatar: "SA",
            name: "Sophia A.",
            venue: "Hotel Colonnade Coral Gables",
            date: "Dec 2025",
          },
        ],
      },
      localExpertise: {
        body: "From ceremony logistics to reception drop-offs, our team brings local Coral Gables knowledge that helps transportation feel effortless for you and your guests.",
        quote:
          "Coral Gables events run best when transportation is planned with local precision - from venue timing windows to seamless guest movement throughout the evening.",
        quoteAttribution: "- Miami White Trolley Team",
        items: [
          {
            icon: "🗺️",
            title: "We know every route",
            description: "Our chauffeurs understand local traffic patterns, venue access points, and practical alternatives for smooth arrivals.",
          },
          {
            icon: "⏱️",
            title: "Precise timing",
            description: "We build timeline-aware transportation plans so guests, wedding parties, and coordinators stay on schedule.",
          },
          {
            icon: "🤝",
            title: "Relationships with local venues",
            description: "We coordinate with venue teams and planners across Coral Gables for efficient loading, unloading, and guest flow.",
          },
          {
            icon: "📋",
            title: "Custom route planning",
            description: "Every route is tailored to your event, including multi-stop pickups, photo stops, and return service options.",
          },
        ],
      },
      booking: {
        heading: "Let's plan your Coral Gables event",
        body: "Tell us your timeline and guest details, and our team will send a clear, custom transportation quote tailored to your Coral Gables venues.",
        formHeading: "Get a free Coral Gables quote",
      },
    },
  }),
  buildAreaPage({
    slug: "fort-lauderdale",
    name: "Fort Lauderdale",
    heroImage: "/images/Areas/fort-lauderdale-miami-white-trolley-transportation.jpg",
    regionBadge: "Broward · Travel available",
    overrides: {
      venues: {
        items: [
          {
            emoji: "🌿",
            name: "Bonnet House Museum & Gardens",
            type: "Historic estate / garden venue",
            highlight: "Iconic gardens",
            capacity: "Ideal for medium to large weddings",
            description:
              "A tropical historic estate with lush gardens, waterfront charm, and one of the most iconic wedding settings in Fort Lauderdale.",
            image:
              "/images/Venues/Coral Gables/Ft Lauderdale/Bonnet House Museum & Gardens.jpg",
            address: "Fort Lauderdale, FL",
            tags: ["Romantic Garden Weddings", "Historic Estate", "Waterfront Charm"],
          },
          {
            emoji: "🏨",
            name: "The Ritz-Carlton Fort Lauderdale",
            type: "Luxury beachfront hotel",
            highlight: "Oceanfront luxury",
            capacity: "Ideal for medium to large weddings",
            description:
              "A high-end oceanfront venue with elegant ballrooms, upscale guest accommodations, and a polished luxury wedding experience.",
            image:
              "/images/Venues/Coral Gables/Ft Lauderdale/The Ritz-Carlton Fort Lauderdale.jpg",
            address: "Fort Lauderdale, FL",
            tags: ["Luxury Hotel Weddings", "Oceanfront", "Elegant Ballrooms"],
          },
          {
            emoji: "🌊",
            name: "B Ocean Resort",
            type: "Beachfront resort",
            highlight: "Coastal chic",
            capacity: "Ideal for medium to large weddings",
            description:
              "A stylish beachfront venue perfect for destination weddings, ocean-view ceremonies, and couples who want a modern coastal feel.",
            image: "/images/Venues/Coral Gables/Ft Lauderdale/B Ocean Resort.jpg",
            address: "Fort Lauderdale, FL",
            tags: ["Beach and Destination Weddings", "Ocean-View Ceremonies", "Modern Coastal"],
          },
          {
            emoji: "🏖️",
            name: "Pelican Grand Beach Resort",
            type: "Oceanfront resort",
            highlight: "Seaside charm",
            capacity: "Ideal for small to medium weddings",
            description:
              "A boutique beachfront resort with a more intimate and relaxed coastal atmosphere, great for elegant seaside celebrations.",
            image:
              "/images/Venues/Coral Gables/Ft Lauderdale/Pelican Grand Beach Resort.jpg",
            address: "Fort Lauderdale, FL",
            tags: ["Intimate Beach Weddings", "Boutique Resort", "Seaside Celebrations"],
          },
          {
            emoji: "✨",
            name: "The Venue Fort Lauderdale",
            type: "Luxury mansion / event venue",
            highlight: "Grand interiors",
            capacity: "Ideal for large weddings",
            description:
              "A dramatic upscale event space with a grand interior, formal atmosphere, and strong appeal for large stylish weddings.",
            image: "/images/Venues/Coral Gables/Ft Lauderdale/The Venue Fort Lauderdale.jpg",
            address: "Fort Lauderdale, FL",
            tags: ["Glamorous Formal Weddings", "Luxury Mansion", "Large Celebrations"],
          },
          {
            emoji: "🎭",
            name: "Broward Center for the Performing Arts",
            type: "Waterfront cultural venue",
            highlight: "Riverfront setting",
            capacity: "Ideal for medium weddings",
            description:
              "A unique event venue along the New River with a sophisticated setting for couples who want something different from a traditional ballroom.",
            image:
              "/images/Venues/Coral Gables/Ft Lauderdale/Broward Center for the Performing Arts.jpg",
            address: "Fort Lauderdale, FL",
            tags: ["Modern Elegant Weddings", "Waterfront", "Unique Venue"],
          },
        ],
      },
      reviews: {
        heading: "What clients say about us in Fort Lauderdale",
        items: [
          {
            rating: 5,
            quote:
              "We had a fantastic experience with the White Trolley for our Fort Lauderdale wedding! The booking process was smooth and our bridal party had so much fun riding to the venue together. Everything ran perfectly and the trolley made the day feel even more special. Highly recommend for any wedding transportation!",
            avatar: "AR",
            name: "Ava R.",
            venue: "Fort Lauderdale Wedding Venue",
            date: "Mar 2026",
          },
          {
            rating: 5,
            quote:
              "The White Trolley was such a great addition to our Fort Lauderdale wedding! Our bridal party loved the ride and it made getting everyone to the venue easy and fun. The team was professional and everything went exactly as planned. It was definitely one of the highlights of the day!",
            avatar: "ML",
            name: "Mia L.",
            venue: "Fort Lauderdale Wedding Venue",
            date: "Mar 2026",
          },
          {
            rating: 5,
            quote:
              "Our Fort Lauderdale wedding day transportation was flawless with White Trolley. The ride was elegant, the bridal party stayed on schedule, and every guest transfer felt effortless. Their team was responsive, professional, and truly helped make the celebration feel elevated from start to finish.",
            avatar: "CR",
            name: "Camila R.",
            venue: "Fort Lauderdale Wedding Venue",
            date: "Mar 2026",
          },
        ],
      },
    },
  }),
  buildAreaPage({
    slug: "coconut-grove",
    name: "Coconut Grove",
    heroImage: "/images/Venues/Coconut Grove/coconut-grove-wedding-transportation-miami-white-trolley.jpg",
    regionBadge: "Miami-Dade · No travel fee",
    overrides: {
      venues: {
        items: [
          {
            emoji: "🏛️",
            name: "Villa Woodbine",
            type: "Historic estate / garden venue",
            highlight: "Garden elegance",
            capacity: "Ideal for small to medium weddings",
            description:
              "A historic Mediterranean-style villa with a romantic courtyard and lush gardens, making it one of the most sought-after wedding venues in Coconut Grove.",
            image:
              "/images/Venues/Coconut Grove/villa-woodbine-coconut-grove-miami-white-trolley.jpg",
            address: "Coconut Grove, FL",
            tags: ["Elegant Garden Weddings", "Historic Estate", "Romantic Courtyard"],
          },
          {
            emoji: "🌊",
            name: "Vizcaya Museum & Gardens",
            type: "Historic waterfront estate",
            highlight: "Destination luxury",
            capacity: "Ideal for medium to large weddings",
            description:
              "One of Miami's most iconic wedding venues, featuring a European-style villa, breathtaking gardens, and waterfront views of Biscayne Bay.",
            image:
              "/images/Venues/Coconut Grove/vizcaya-museum-gardens-coconut-grove-miami-white-trolley.jpg",
            address: "Coconut Grove, FL",
            tags: ["Luxury Destination Weddings", "Waterfront", "Iconic Gardens"],
          },
          {
            emoji: "🏨",
            name: "Mr. C Miami - Coconut Grove",
            type: "Luxury hotel / waterfront venue",
            highlight: "Modern luxury",
            capacity: "Ideal for medium to large weddings",
            description:
              "A luxury waterfront hotel offering modern elegance, rooftop views, and sophisticated event spaces perfect for upscale weddings.",
            image: "/images/Venues/Coconut Grove/mr-c-coconut-grove-miami-white-trolley.jpg",
            address: "Coconut Grove, FL",
            tags: ["Modern Luxury Weddings", "Waterfront Hotel", "Rooftop Views"],
          },
          {
            emoji: "🌿",
            name: "The Cruz Building",
            type: "Historic luxury event venue",
            highlight: "Glamorous elegance",
            capacity: "Ideal for medium to large weddings",
            description:
              "A stunning historic venue in Coconut Grove known for its dramatic architecture, glass ceilings, and elegant multi-level event spaces.",
            image:
              "/images/Venues/Coconut Grove/cruz-building-coconut-grove-miami-white-trolley.jpg",
            address: "Coconut Grove, FL",
            tags: ["Glamorous and Elegant Weddings", "Glass Ceilings", "Historic Luxury"],
          },
          {
            emoji: "✨",
            name: "Mayfair House Hotel & Garden",
            type: "Boutique luxury hotel",
            highlight: "Modern style",
            capacity: "Ideal for medium weddings",
            description:
              "A stylish boutique hotel in the heart of Coconut Grove featuring rooftop spaces, lush gardens, and modern luxury wedding settings.",
            image:
              "/images/Venues/Coconut Grove/mayfair-house-hotel-garden-coconut-grove-miami-white-trolley.jpg",
            address: "Coconut Grove, FL",
            tags: ["Modern and Stylish Weddings", "Boutique Luxury", "Rooftop Spaces"],
          },
          {
            emoji: "⛪",
            name: "Plymouth Congregational Church",
            type: "Historic church / garden venue",
            highlight: "Romantic classic",
            capacity: "Ideal for small to medium weddings",
            description:
              "A historic coral stone church surrounded by tropical gardens and famous banyan trees, offering one of the most picturesque ceremony locations in Coconut Grove.",
            image:
              "/images/Venues/Coconut Grove/plymouth-congregational-church-coconut-grove-miami-white-trolley.jpg",
            address: "Coconut Grove, FL",
            tags: ["Classic and Romantic Ceremonies", "Historic Church", "Garden Setting"],
          },
        ],
      },
    },
  }),
  buildAreaPage({
    slug: "brickell",
    name: "Brickell",
    heroImage: "/images/Venues/Brickell/brickell-wedding-transportation-miami-white-trolley.jpg",
    regionBadge: "Miami-Dade · No travel fee",
    overrides: {
      venues: {
        items: [
          {
            emoji: "🏨",
            name: "EAST Miami",
            type: "Luxury hotel / rooftop venue",
            highlight: "Skyline luxury",
            capacity: "Ideal for medium to large groups",
            description:
              "A sleek luxury hotel in the heart of Brickell featuring modern event spaces, rooftop venues, and stunning views of the Miami skyline.",
            image: "/images/Venues/Brickell/east-miami-brickell-miami-white-trolley.jpg",
            address: "Brickell, Miami, FL",
            tags: ["Modern City Events", "Upscale Celebrations", "Rooftop Venue"],
          },
          {
            emoji: "🏨",
            name: "JW Marriott Miami",
            type: "Luxury hotel ballroom",
            highlight: "Formal elegance",
            capacity: "Ideal for medium to large groups",
            description:
              "A classic Brickell hotel offering elegant ballrooms and sophisticated event spaces in the center of Miami's financial district.",
            image: "/images/Venues/Brickell/jw-marriott-miami-brickell-miami-white-trolley.jpg",
            address: "Brickell, Miami, FL",
            tags: ["Formal Events", "Corporate Gatherings", "Ballroom Venue"],
          },
          {
            emoji: "🌊",
            name: "Kimpton EPIC Hotel",
            type: "Luxury hotel / rooftop venue",
            highlight: "Waterfront modern",
            capacity: "Ideal for medium groups",
            description:
              "A stylish waterfront hotel located where the Miami River meets Biscayne Bay, featuring rooftop venues and panoramic skyline views.",
            image: "/images/Venues/Brickell/kimpton-epic-hotel-brickell-miami-white-trolley.jpg",
            address: "Brickell, Miami, FL",
            tags: ["Modern Waterfront Events", "Private Celebrations", "Rooftop Venue"],
          },
          {
            emoji: "✨",
            name: "W Miami (Icon Brickell)",
            type: "Luxury hotel / skyline venue",
            highlight: "City glamour",
            capacity: "Ideal for medium groups",
            description:
              "A modern luxury hotel known for its dramatic skyline views and upscale spaces for private events and celebrations.",
            image: "/images/Venues/Brickell/w-miami-icon-brickell-miami-white-trolley.jpg",
            address: "Brickell, Miami, FL",
            tags: ["Glamorous City Events", "Skyline Views", "Private Celebrations"],
          },
          {
            emoji: "🍽️",
            name: "The River Oyster Bar Private Events",
            type: "Restaurant / private event venue",
            highlight: "Private dining",
            capacity: "Ideal for small groups",
            description:
              "A popular Brickell restaurant offering private dining spaces and a lively atmosphere for intimate celebrations and gatherings.",
            image:
              "/images/Venues/Brickell/the-river-oyster-bar-private-events-brickell-miami-white-trolley.jpg",
            address: "Brickell, Miami, FL",
            tags: ["Private Dinners", "Small Celebrations", "Lively Atmosphere"],
          },
          {
            emoji: "🌆",
            name: "Brickell City Centre - EAST Miami Event Spaces",
            type: "Luxury hotel / rooftop venue",
            highlight: "Urban rooftop",
            capacity: "Ideal for medium to large groups",
            description:
              "Contemporary event spaces within Brickell City Centre featuring rooftop venues, skyline views, and a modern urban atmosphere.",
            image:
              "/images/Venues/Brickell/brickell-city-centre-east-miami-event-spaces-brickell-miami-white-trolley.jpg",
            address: "Brickell, Miami, FL",
            tags: ["Modern City Events", "Upscale Gatherings", "Skyline Views"],
          },
        ],
      },
    },
  }),
  buildAreaPage({
    slug: "wynwood",
    name: "Wynwood",
    heroImage: "/images/Areas/Wynwood-miami-white-trolley-transportation.jpg",
    regionBadge: "Miami-Dade · No travel fee",
    overrides: {
      venues: {
        items: [
          {
            emoji: "🎨",
            name: "Wynwood Walls",
            type: "Outdoor art venue / cultural space",
            highlight: "Creative hub",
            capacity: "Ideal for medium to large groups",
            description:
              "One of Miami's most iconic cultural spaces featuring vibrant street art, open-air courtyards, and a unique creative atmosphere for large gatherings and events.",
            image: "/images/Areas/Wynwood-miami-white-trolley-transportation.jpg",
            address: "Wynwood, Miami, FL",
            tags: ["Creative Events", "Brand Activations", "Private Celebrations"],
          },
          {
            emoji: "🛍️",
            name: "The Wynwood Marketplace",
            type: "Outdoor market / event venue",
            highlight: "Open-air social",
            capacity: "Ideal for medium to large groups",
            description:
              "A lively outdoor venue featuring open-air event spaces, food vendors, and entertainment areas in the heart of Wynwood.",
            image: "/images/Areas/Wynwood-miami-white-trolley-transportation.jpg",
            address: "Wynwood, Miami, FL",
            tags: ["Social Events", "Brand Activations", "Group Gatherings"],
          },
          {
            emoji: "🏨",
            name: "Arlo Wynwood",
            type: "Boutique hotel / rooftop venue",
            highlight: "Rooftop modern",
            capacity: "Ideal for medium groups",
            description:
              "A modern boutique hotel with rooftop venues, stylish event spaces, and skyline views located in the center of the Wynwood Arts District.",
            image: "/images/Areas/Wynwood-miami-white-trolley-transportation.jpg",
            address: "Wynwood, Miami, FL",
            tags: ["Modern City Events", "Private Celebrations", "Skyline Views"],
          },
          {
            emoji: "🏙️",
            name: "The Wynwood Garage",
            type: "Open-air event venue",
            highlight: "Artistic space",
            capacity: "Ideal for medium to large groups",
            description:
              "A large open-air venue with artistic architecture and flexible event spaces often used for creative events, pop-ups, and brand experiences.",
            image: "/images/Areas/Wynwood-miami-white-trolley-transportation.jpg",
            address: "Wynwood, Miami, FL",
            tags: ["Creative Events", "Brand Activations", "Pop-Ups"],
          },
          {
            emoji: "🍽️",
            name: "R House Wynwood",
            type: "Restaurant / private event venue",
            highlight: "Lively dining",
            capacity: "Ideal for small to medium groups",
            description:
              "A vibrant restaurant and event venue known for its lively atmosphere, colorful design, and private event spaces in the heart of Wynwood.",
            image: "/images/Areas/Wynwood-miami-white-trolley-transportation.jpg",
            address: "Wynwood, Miami, FL",
            tags: ["Social Events", "Group Celebrations", "Private Events"],
          },
          {
            emoji: "🎉",
            name: "1-800-Lucky",
            type: "Food hall / nightlife venue",
            highlight: "Nightlife social",
            capacity: "Ideal for medium groups",
            description:
              "A popular Asian food hall and nightlife venue offering multiple spaces for private events, group gatherings, and celebrations.",
            image: "/images/Areas/Wynwood-miami-white-trolley-transportation.jpg",
            address: "Wynwood, Miami, FL",
            tags: ["Social Events", "Nightlife Gatherings", "Group Outings"],
          },
        ],
      },
    },
  }),
  buildAreaPage({
    slug: "miami",
    name: "Miami",
    heroImage: "/images/Areas/miami-miami-white-trolley-transportation.jpg",
    regionBadge: "Miami-Dade · No travel fee",
    overrides: {
      venues: {
        items: [
          {
            emoji: "🏛️",
            name: "Perez Art Museum Miami (PAMM)",
            type: "Museum / waterfront event venue",
            highlight: "Bayfront elegance",
            capacity: "Ideal for medium to large groups",
            description:
              "A stunning waterfront museum with modern architecture, bayfront terraces, and panoramic views of Biscayne Bay and the Miami skyline.",
            image: "/images/Areas/miami-miami-white-trolley-transportation.jpg",
            address: "Miami, FL",
            tags: ["Elegant Events", "Cultural Gatherings", "Upscale Celebrations"],
          },
          {
            emoji: "🔬",
            name: "Frost Science Museum",
            type: "Museum / modern event venue",
            highlight: "Modern iconic",
            capacity: "Ideal for medium to large groups",
            description:
              "A modern science museum featuring dramatic architecture, rooftop spaces, and unique event areas overlooking Biscayne Bay.",
            image: "/images/Areas/miami-miami-white-trolley-transportation.jpg",
            address: "Miami, FL",
            tags: ["Unique Events", "Corporate Gatherings", "Large Celebrations"],
          },
          {
            emoji: "🌴",
            name: "Jungle Island",
            type: "Outdoor venue / waterfront event space",
            highlight: "Tropical waterfront",
            capacity: "Ideal for large groups",
            description:
              "A large tropical venue on Watson Island offering waterfront event spaces, gardens, and flexible outdoor areas for large gatherings.",
            image: "/images/Areas/miami-miami-white-trolley-transportation.jpg",
            address: "Miami, FL",
            tags: ["Large Celebrations", "Festivals", "Corporate Events"],
          },
          {
            emoji: "🛍️",
            name: "Miami Design District - Palm Court Event Space",
            type: "Outdoor plaza / luxury event venue",
            highlight: "Luxury plaza",
            capacity: "Ideal for medium to large groups",
            description:
              "A stylish outdoor plaza surrounded by luxury boutiques and modern architecture, ideal for upscale gatherings and brand events.",
            image: "/images/Areas/miami-miami-white-trolley-transportation.jpg",
            address: "Miami, FL",
            tags: ["Fashion Events", "Brand Activations", "Social Gatherings"],
          },
          {
            emoji: "🎭",
            name: "Faena Forum",
            type: "Cultural venue / architectural event space",
            highlight: "Architectural drama",
            capacity: "Ideal for medium to large groups",
            description:
              "A striking architectural venue known for its circular theater design and dramatic event spaces used for high-end gatherings and performances.",
            image: "/images/Areas/miami-miami-white-trolley-transportation.jpg",
            address: "Miami, FL",
            tags: ["Luxury Events", "Performances", "Corporate Gatherings"],
          },
          {
            emoji: "🌆",
            name: "Miami Tower - Private Event Spaces",
            type: "Skyline venue / private event space",
            highlight: "Skyline views",
            capacity: "Ideal for medium groups",
            description:
              "A landmark downtown building offering private event spaces with spectacular views of the Miami skyline and waterfront.",
            image: "/images/Areas/miami-miami-white-trolley-transportation.jpg",
            address: "Miami, FL",
            tags: ["Corporate Events", "Upscale Gatherings", "Private Events"],
          },
        ],
      },
    },
  }),
  buildAreaPage({
    slug: "downtown-miami",
    name: "Downtown Miami",
    heroImage: "/images/Areas/downtown-miami-miami-white-trolley-transportation.jpg",
    regionBadge: "Miami-Dade · No travel fee",
    overrides: {
      venues: {
        items: [
          {
            emoji: "🏛️",
            name: "The Historic Alfred I. duPont Building",
            type: "Historic ballroom venue",
            highlight: "Historic elegance",
            capacity: "Ideal for medium to large groups",
            description:
              "A beautifully restored historic venue featuring dramatic marble interiors, high ceilings, and one of the most iconic event spaces in downtown Miami.",
            image: "/images/Areas/downtown-miami-miami-white-trolley-transportation.jpg",
            address: "Downtown Miami, FL",
            tags: ["Elegant Celebrations", "Formal Gatherings", "Historic Venue"],
          },
          {
            emoji: "🏨",
            name: "JW Marriott Marquis Miami",
            type: "Luxury hotel ballroom",
            highlight: "Business luxury",
            capacity: "Ideal for medium to large groups",
            description:
              "A luxury downtown hotel offering expansive ballrooms, modern event spaces, and premium services in the center of Miami's business district.",
            image: "/images/Areas/downtown-miami-miami-white-trolley-transportation.jpg",
            address: "Downtown Miami, FL",
            tags: ["Corporate Events", "Upscale Celebrations", "Luxury Ballroom"],
          },
          {
            emoji: "🌊",
            name: "InterContinental Miami",
            type: "Luxury waterfront hotel",
            highlight: "Bayfront grand",
            capacity: "Ideal for large groups",
            description:
              "A landmark waterfront hotel featuring grand ballrooms and large event spaces overlooking Biscayne Bay.",
            image: "/images/Areas/downtown-miami-miami-white-trolley-transportation.jpg",
            address: "Downtown Miami, FL",
            tags: ["Large Celebrations", "Corporate Gatherings", "Waterfront Venue"],
          },
          {
            emoji: "🍽️",
            name: "The Citadel Miami",
            type: "Food hall / rooftop venue",
            highlight: "Rooftop social",
            capacity: "Ideal for small to medium groups",
            description:
              "A modern food hall and rooftop venue offering multiple private event spaces with a trendy and lively atmosphere.",
            image: "/images/Areas/downtown-miami-miami-white-trolley-transportation.jpg",
            address: "Downtown Miami, FL",
            tags: ["Social Events", "Group Gatherings", "Private Events"],
          },
          {
            emoji: "🏙️",
            name: "YOTEL Miami Event Spaces",
            type: "Modern hotel / rooftop venue",
            highlight: "Urban modern",
            capacity: "Ideal for medium groups",
            description:
              "A contemporary hotel venue featuring modern interiors, rooftop areas, and flexible event spaces in the heart of downtown.",
            image: "/images/Areas/downtown-miami-miami-white-trolley-transportation.jpg",
            address: "Downtown Miami, FL",
            tags: ["Modern City Events", "Private Celebrations", "Flexible Spaces"],
          },
          {
            emoji: "🎥",
            name: "The Temple House",
            type: "Experiential event venue",
            highlight: "Immersive events",
            capacity: "Ideal for medium to large groups",
            description:
              "A unique immersive venue known for its dramatic architecture and large projection-mapped event spaces in downtown Miami.",
            image: "/images/Areas/downtown-miami-miami-white-trolley-transportation.jpg",
            address: "Downtown Miami, FL",
            tags: ["Creative Events", "Large Celebrations", "Experiential Venue"],
          },
        ],
      },
    },
  }),
  buildAreaPage({
    slug: "west-palm-beach",
    name: "West Palm Beach",
    heroImage: "/images/Areas/west-palm-beach-miami-white-trolley-transportation.jpg",
    regionBadge: "Palm Beach · Travel available",
    overrides: {
      venues: {
        items: [
          {
            emoji: "🏨",
            name: "The Breakers Palm Beach",
            type: "Luxury resort / waterfront venue",
            highlight: "Resort grandeur",
            capacity: "Ideal for medium to large groups",
            description:
              "A historic luxury resort known for its grand architecture, oceanfront setting, and elegant event spaces in Palm Beach.",
            image: "/images/Areas/west-palm-beach-miami-white-trolley-transportation.jpg",
            address: "West Palm Beach, FL",
            tags: ["Upscale Celebrations", "Formal Gatherings", "Oceanfront Setting"],
          },
          {
            emoji: "🎭",
            name: "Kravis Center for the Performing Arts",
            type: "Performing arts center / event venue",
            highlight: "Cultural scale",
            capacity: "Ideal for medium to large groups",
            description:
              "A prominent cultural venue offering theaters, ballrooms, and modern event spaces in the heart of downtown West Palm Beach.",
            image: "/images/Areas/west-palm-beach-miami-white-trolley-transportation.jpg",
            address: "West Palm Beach, FL",
            tags: ["Corporate Events", "Galas", "Large Gatherings"],
          },
          {
            emoji: "🌊",
            name: "The Ben Hotel",
            type: "Boutique luxury hotel / rooftop venue",
            highlight: "Marina views",
            capacity: "Ideal for medium groups",
            description:
              "A stylish waterfront hotel with rooftop venues and modern event spaces overlooking the Palm Harbor Marina.",
            image: "/images/Areas/west-palm-beach-miami-white-trolley-transportation.jpg",
            address: "West Palm Beach, FL",
            tags: ["Modern Waterfront Events", "Celebrations", "Rooftop Venue"],
          },
          {
            emoji: "🏛️",
            name: "Flagler Museum",
            type: "Historic mansion / waterfront venue",
            highlight: "Gilded charm",
            capacity: "Ideal for medium groups",
            description:
              "A historic Gilded Age mansion offering elegant gardens and waterfront event spaces with views of the Intracoastal Waterway.",
            image: "/images/Areas/west-palm-beach-miami-white-trolley-transportation.jpg",
            address: "West Palm Beach, FL",
            tags: ["Elegant Outdoor Gatherings", "Formal Celebrations", "Historic Mansion"],
          },
          {
            emoji: "🏢",
            name: "Palm Beach County Convention Center",
            type: "Convention center / large event venue",
            highlight: "Convention scale",
            capacity: "Ideal for large groups",
            description:
              "A large downtown venue offering expansive halls and flexible event spaces for major gatherings, conferences, and exhibitions.",
            image: "/images/Areas/west-palm-beach-miami-white-trolley-transportation.jpg",
            address: "West Palm Beach, FL",
            tags: ["Conferences", "Trade Shows", "Large Events"],
          },
          {
            emoji: "🏨",
            name: "Hilton West Palm Beach",
            type: "Luxury hotel ballroom",
            highlight: "Contemporary ballroom",
            capacity: "Ideal for medium to large groups",
            description:
              "A modern hotel venue located in downtown West Palm Beach featuring large ballrooms and contemporary event spaces.",
            image: "/images/Areas/west-palm-beach-miami-white-trolley-transportation.jpg",
            address: "West Palm Beach, FL",
            tags: ["Corporate Gatherings", "Upscale Celebrations", "Downtown Venue"],
          },
        ],
      },
    },
  }),
  buildAreaPage({
    slug: "naples",
    name: "Naples",
    heroImage: "/images/Areas/Naples-miami-white-trolley-transportation.jpg",
    regionBadge: "Gulf Coast · Travel available",
    overrides: {
      venues: {
        items: [
          {
            emoji: "🏖️",
            name: "The Ritz-Carlton, Naples",
            type: "Luxury resort / beachfront venue",
            highlight: "Gulf luxury",
            capacity: "Ideal for medium to large groups",
            description:
              "A luxury beachfront resort overlooking the Gulf of Mexico with elegant indoor ballrooms and outdoor oceanfront event spaces.",
            image: "/images/Areas/Naples-miami-white-trolley-transportation.jpg",
            address: "Naples, FL",
            tags: ["Upscale Celebrations", "Destination Gatherings", "Beachfront Venue"],
          },
          {
            emoji: "🌊",
            name: "Naples Grande Beach Resort",
            type: "Beach resort / luxury event venue",
            highlight: "Coastal resort",
            capacity: "Ideal for medium to large groups",
            description:
              "A large coastal resort with terraces, waterfront views, and expansive indoor event spaces near the beach.",
            image: "/images/Areas/Naples-miami-white-trolley-transportation.jpg",
            address: "Naples, FL",
            tags: ["Resort Events", "Large Gatherings", "Waterfront Views"],
          },
          {
            emoji: "🏨",
            name: "LaPlaya Beach & Golf Resort",
            type: "Beachfront resort",
            highlight: "Beachfront elegance",
            capacity: "Ideal for medium to large groups",
            description:
              "A beachfront resort offering event spaces ranging from oceanfront lawns to elegant ballrooms and poolside venues.",
            image: "/images/Areas/Naples-miami-white-trolley-transportation.jpg",
            address: "Naples, FL",
            tags: ["Coastal Celebrations", "Upscale Events", "Ballroom Options"],
          },
          {
            emoji: "🌿",
            name: "Naples Botanical Garden",
            type: "Botanical garden / outdoor venue",
            highlight: "Garden tropical",
            capacity: "Ideal for small to medium groups",
            description:
              "A lush tropical garden venue with beautiful outdoor spaces and indoor facilities surrounded by botanical landscapes.",
            image: "/images/Areas/Naples-miami-white-trolley-transportation.jpg",
            address: "Naples, FL",
            tags: ["Garden Events", "Elegant Outdoor Gatherings", "Indoor Options"],
          },
          {
            emoji: "⚓",
            name: "Naples Bay Resort & Marina",
            type: "Waterfront resort / marina venue",
            highlight: "Marina waterfront",
            capacity: "Ideal for medium groups",
            description:
              "A waterfront resort and marina featuring scenic views, tropical courtyards, and flexible event spaces along the water.",
            image: "/images/Areas/Naples-miami-white-trolley-transportation.jpg",
            address: "Naples, FL",
            tags: ["Waterfront Events", "Private Celebrations", "Marina Views"],
          },
          {
            emoji: "⛳",
            name: "Vineyards Country Club",
            type: "Country club / golf course venue",
            highlight: "Club classic",
            capacity: "Ideal for medium to large groups",
            description:
              "A private country club offering elegant indoor ballrooms and outdoor spaces overlooking lush golf course landscapes.",
            image: "/images/Areas/Naples-miami-white-trolley-transportation.jpg",
            address: "Naples, FL",
            tags: ["Formal Gatherings", "Upscale Celebrations", "Golf Course Views"],
          },
        ],
      },
    },
  }),
  buildAreaPage({
    slug: "tampa",
    name: "Tampa",
    heroImage: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
    regionBadge: "Tampa Bay · Travel available",
    overrides: {
      venues: {
        items: [
          {
            emoji: "🏭",
            name: "Armature Works",
            type: "Historic market hall / waterfront venue",
            highlight: "Riverfront industrial",
            capacity: "Ideal for medium to large groups",
            description:
              "A historic waterfront venue along the Hillsborough River featuring industrial architecture, large open event spaces, and views of the Tampa skyline.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Tampa, FL",
            tags: ["Social Events", "Corporate Gatherings", "Large Celebrations"],
          },
          {
            emoji: "📚",
            name: "Oxford Exchange",
            type: "Historic building / luxury event venue",
            highlight: "European style",
            capacity: "Ideal for medium groups",
            description:
              "A European-inspired venue in Tampa known for its elegant design, glass atrium, and sophisticated event spaces.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Tampa, FL",
            tags: ["Elegant Gatherings", "Upscale Celebrations", "Sophisticated Venue"],
          },
          {
            emoji: "🏛️",
            name: "The Orlo House & Ballroom",
            type: "Historic mansion venue",
            highlight: "Garden classic",
            capacity: "Ideal for medium groups",
            description:
              "A historic mansion built in the 1880s featuring landscaped gardens, outdoor terraces, and a classic ballroom setting.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Tampa, FL",
            tags: ["Formal Gatherings", "Garden Celebrations", "Historic Mansion"],
          },
          {
            emoji: "🖼️",
            name: "Tampa Museum of Art",
            type: "Museum / waterfront venue",
            highlight: "Cultural waterfront",
            capacity: "Ideal for medium groups",
            description:
              "A modern museum venue located along the Hillsborough River with contemporary architecture and waterfront event spaces.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Tampa, FL",
            tags: ["Cultural Events", "Upscale Gatherings", "Modern Architecture"],
          },
          {
            emoji: "🏨",
            name: "Tampa Marriott Water Street",
            type: "Luxury hotel / waterfront venue",
            highlight: "Bayfront scale",
            capacity: "Ideal for large groups",
            description:
              "A large waterfront hotel with expansive ballrooms and multiple event spaces overlooking Tampa Bay and the downtown skyline.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Tampa, FL",
            tags: ["Corporate Events", "Conferences", "Large Celebrations"],
          },
          {
            emoji: "✨",
            name: "The Tampa EDITION",
            type: "Luxury hotel / rooftop venue",
            highlight: "Edition luxury",
            capacity: "Ideal for medium groups",
            description:
              "A luxury hotel featuring modern architecture, stylish event spaces, and terraces with views of the waterfront district.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Tampa, FL",
            tags: ["Modern City Events", "Upscale Celebrations", "Waterfront District"],
          },
        ],
      },
    },
  }),
  buildAreaPage({
    slug: "clearwater",
    name: "Clearwater",
    heroImage: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
    regionBadge: "Tampa Bay · Travel available",
    overrides: {
      venues: {
        items: [
          {
            emoji: "🏖️",
            name: "Sandpearl Resort",
            type: "Beachfront resort / luxury venue",
            highlight: "Gulf luxury",
            capacity: "Ideal for medium to large groups",
            description:
              "A luxury beachfront resort featuring elegant ballrooms, outdoor lawns, and private beach areas overlooking the Gulf of Mexico.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Clearwater, FL",
            tags: ["Coastal Celebrations", "Upscale Gatherings", "Beachfront Venue"],
          },
          {
            emoji: "🌊",
            name: "Wyndham Grand Clearwater Beach",
            type: "Luxury hotel / waterfront venue",
            highlight: "Beachfront modern",
            capacity: "Ideal for medium to large groups",
            description:
              "A modern waterfront hotel located steps from the beach, offering event spaces with views of Pier 60 and the Gulf of Mexico.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Clearwater, FL",
            tags: ["Beachside Events", "Social Celebrations", "Waterfront Views"],
          },
          {
            emoji: "🏨",
            name: "Hyatt Regency Clearwater Beach Resort & Spa",
            type: "Beach resort / rooftop venue",
            highlight: "Panoramic rooftop",
            capacity: "Ideal for medium to large groups",
            description:
              "A beachfront resort featuring rooftop terraces and elegant event spaces with panoramic views of the Gulf.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Clearwater, FL",
            tags: ["Coastal Celebrations", "Destination Gatherings", "Rooftop Terraces"],
          },
          {
            emoji: "🎶",
            name: "Shephard's Beach Resort",
            type: "Beachfront resort / entertainment venue",
            highlight: "Vibrant waterfront",
            capacity: "Ideal for medium groups",
            description:
              "A lively Gulf-front resort known for its private beach areas, event spaces, and vibrant waterfront atmosphere.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Clearwater, FL",
            tags: ["Social Gatherings", "Waterfront Celebrations", "Beachfront Resort"],
          },
          {
            emoji: "⛵",
            name: "Clearwater Community Sailing Center",
            type: "Waterfront venue / marina event space",
            highlight: "Marina views",
            capacity: "Ideal for small to medium groups",
            description:
              "A waterfront venue overlooking Clearwater Bay featuring indoor and outdoor spaces with scenic marina views.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Clearwater, FL",
            tags: ["Casual Gatherings", "Outdoor Celebrations", "Waterfront Venue"],
          },
          {
            emoji: "🏢",
            name: "The District Event Venue",
            type: "Banquet hall / event venue",
            highlight: "Modern banquet",
            capacity: "Ideal for medium groups",
            description:
              "A modern indoor venue located in Clearwater offering elegant banquet rooms designed for private events and celebrations.",
            image: "/images/Areas/Tampa-miami-white-trolley-transportation.jpg.png",
            address: "Clearwater, FL",
            tags: ["Private Celebrations", "Corporate Gatherings", "Indoor Venue"],
          },
        ],
      },
    },
  }),
];

export function getServiceAreaBySlug(slug: string) {
  return serviceAreaPages.find((area) => area.slug === slug);
}

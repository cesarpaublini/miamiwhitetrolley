export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Our Fleet", href: "/fleet" },
  { label: "Areas", href: "/service-areas" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
];

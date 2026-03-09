export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Our Fleet", href: "/fleet" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Services", href: "/services" },
  { label: "Weddings", href: "#services" },
  { label: "About", href: "#why-us" },
];

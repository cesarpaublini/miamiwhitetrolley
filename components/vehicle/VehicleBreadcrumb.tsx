import Link from "next/link";

type VehicleBreadcrumbProps = {
  currentLabel: string;
};

export function VehicleBreadcrumb({ currentLabel }: VehicleBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 flex items-center text-[0.82rem]">
      <Link href="/" className="text-[#717171] transition-colors hover:text-[#222222]">
        Home
      </Link>
      <span className="px-2 text-[#CCCCCC]" aria-hidden="true">
        /
      </span>
      <Link href="/fleet" className="text-[#717171] transition-colors hover:text-[#222222]">
        Fleet
      </Link>
      <span className="px-2 text-[#CCCCCC]" aria-hidden="true">
        /
      </span>
      <span className="font-semibold text-[#222222]">{currentLabel}</span>
    </nav>
  );
}

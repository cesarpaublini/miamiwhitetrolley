type VehicleTitleRowProps = {
  name: string;
  badge?: string | null;
};

function StarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-[#FF385C]">
      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.11.99 5.8L10 14.75l-5.2 2.78.99-5.8-4.21-4.11 5.82-.85L10 1.5z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current">
      <path
        d="M13.5 6.5a2.5 2.5 0 1 0-.02-5 2.5 2.5 0 0 0 .02 5Zm-7 6a2.5 2.5 0 1 0-.02-5 2.5 2.5 0 0 0 .02 5Zm7 6a2.5 2.5 0 1 0-.02-5 2.5 2.5 0 0 0 .02 5ZM8.73 8.47l2.54-1.44m-2.54 4.5 2.54 1.44"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current">
      <path
        d="M5.5 2.5h9A1.5 1.5 0 0 1 16 4v13.5L10 14.5 4 17.5V4a1.5 1.5 0 0 1 1.5-1.5Z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VehicleTitleRow({ name, badge }: VehicleTitleRowProps) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1
          className="font-bold text-[#222222]"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
          }}
        >
          {name}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[0.82rem] text-[#717171]">
          <div className="flex items-center gap-0.5">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </div>
          <span className="font-bold text-[#222222]">5.0</span>
          <span className="text-[#CCCCCC]" aria-hidden="true">
            ·
          </span>
          <span className="underline underline-offset-2">200+ reviews</span>
          <span className="text-[#CCCCCC]" aria-hidden="true">
            ·
          </span>
          <span>Miami, FL</span>
          {badge ? (
            <span className="rounded-full bg-[#FF385C] px-3 py-0.5 text-[0.72rem] font-bold text-white">
              {badge}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-4 text-[0.85rem] font-semibold text-[#222222]">
        <button type="button" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#FF385C]">
          <ShareIcon />
          Share
        </button>
        <button type="button" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#FF385C]">
          <SaveIcon />
          Save
        </button>
      </div>
    </div>
  );
}

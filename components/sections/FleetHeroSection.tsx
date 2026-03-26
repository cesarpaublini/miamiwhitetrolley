export function FleetHeroSection() {
  return (
    <section className="border-b border-[#EBEBEB] py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <h1
          className="mb-3 text-[#222222]"
          style={{
            fontSize: "clamp(1.75rem, 3.2vw, 2.7rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
          }}
        >
          Our Full Fleet
        </h1>
        <p
          className="text-[#717171]"
          style={{ fontSize: "1rem", lineHeight: 1.7 }}
        >
          Vehicles for every occasion — from iconic trolleys to luxury coaches, all available for private charter across Miami.
        </p>
      </div>
    </section>
  );
}

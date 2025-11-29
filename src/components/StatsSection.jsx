export default function StatsSection() {
  return (
    <section className="py-16 px-8 bg-[#f5f6fa] flex justify-center">
      <div className="flex gap-16 flex-wrap">

        {/* Card */}
        {[
          { value: "2000+", label: "Alumni" },
          { value: "500+", label: "Students" },
          { value: "100+", label: "Teachers" }
        ].map((item, index) => (
          <div
            key={index}
            className="
              text-center cursor-default 
              transition-transform duration-300 
              hover:-translate-y-1
            "
          >
            <div className="text-4xl font-bold text-[#0A1F44] tracking-tight">
              {item.value}
            </div>

            <div className="text-gray-600 mt-1 text-sm uppercase tracking-wide">
              {item.label}
            </div>

            {/* Highlight underline */}
            <div className="h-1 w-10 bg-[#E63946] mx-auto mt-3 rounded-full opacity-80"></div>
          </div>
        ))}

      </div>
    </section>
  );
}

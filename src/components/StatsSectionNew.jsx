export default function StatsSection() {
  const stats = [
    { value: "2000+", label: "Alumni actifs", icon: "👨‍🎓" },
    { value: "500+", label: "Étudiants connectés", icon: "📚" },
    { value: "100+", label: "Mentors expérimentés", icon: "🎯" },
    { value: "50+", label: "Opportunités d'emploi", icon: "💼" }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-[#0A1F44] to-blue-900 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Nos Statistiques
          </h2>
          <p className="text-blue-100 text-lg">
            Une communauté en pleine croissance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="text-5xl font-black mb-2 bg-gradient-to-r from-[#E30613] to-blue-400 bg-clip-text text-transparent">
                {stat.value}
              </div>

              {/* Label */}
              <p className="text-blue-200 font-medium">
                {stat.label}
              </p>

              {/* Underline */}
              <div className="h-1 w-0 bg-gradient-to-r from-[#E30613] to-transparent rounded-full mx-auto mt-4 group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

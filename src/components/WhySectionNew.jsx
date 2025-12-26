import React from "react";

export default function WhySection() {
  const features = [
    { 
      icon: "📘", 
      title: "Partage de Savoir", 
      text: "Échangez votre expertise entre générations et construisez ensemble." 
    },
    { 
      icon: "🤝", 
      title: "Collaboration Intergénérationnelle", 
      text: "Travaillez sur des projets significatifs avec étudiants et alumni." 
    },
    { 
      icon: "🌱", 
      title: "Croissance Mutuelle", 
      text: "Créez un avenir ensemble avec des opportunités partagées." 
    },
    { 
      icon: "💼", 
      title: "Opportunités de Carrière", 
      text: "Accédez aux meilleures offres de stage et d'emploi." 
    },
    { 
      icon: "🎓", 
      title: "Mentorat Personnalisé", 
      text: "Recevez des conseils de professionnels expérimentés." 
    },
    { 
      icon: "🌍", 
      title: "Réseau Global", 
      text: "Connectez-vous avec une communauté en croissance." 
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1F44] mb-4">
            Pourquoi <span className="text-[#E30613]">SUP'CONNECT</span> ?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une plateforme conçue pour connecter, inspirer et transformer la communauté SUP'COM
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#E30613]/30 cursor-default"
            >
              {/* Icon Circle */}
              <div className="mb-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#E30613]/10 to-blue-900/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#0A1F44] mb-3 group-hover:text-[#E30613] transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-4">
                {feature.text}
              </p>

              {/* Accent Line */}
              <div className="h-1 w-0 bg-gradient-to-r from-[#E30613] to-transparent rounded-full group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

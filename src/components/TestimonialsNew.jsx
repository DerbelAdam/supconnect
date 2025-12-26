export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Ben",
      role: "Alumni 2020",
      text: "SUP'CONNECT m'a aide à rester connectée avec la communauté et à mentorer les jeunes talents. C'est une plateforme fantastique !",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      name: "Ahmed Khalil",
      role: "Étudiant 3ème année",
      text: "Grâce aux mentors de SUP'CONNECT, j'ai pu décrocher mon stage chez Google. Merci infiniment !",
      avatar: "👨‍💻",
      rating: 5
    },
    {
      name: "Leila Mohsen",
      role: "Enseignante",
      text: "Une excellente initiative pour rapprocher les générations. Mes étudiants adorent apprendre des alumni.",
      avatar: "👩‍🏫",
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1F44] mb-4">
            Ce qu'en disent nos utilisateurs
          </h2>
          <p className="text-lg text-gray-600">
            Des témoignages qui parlent d'eux-mêmes
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#E30613]/30"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-2xl">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-bold text-[#0A1F44]">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Accent */}
              <div className="h-1 w-0 bg-gradient-to-r from-[#E30613] to-transparent rounded-full mt-4 group-hover:w-full transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

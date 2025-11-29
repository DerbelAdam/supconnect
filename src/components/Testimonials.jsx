export default function Testimonials() {
  return (
    <section className="py-16 px-8 bg-white text-center">
      <h2 className="text-3xl text-[#0A1F44] font-bold mb-10">
        What Our Community Says
      </h2>

      <div className="flex flex-col gap-8 items-center">

        {/* Card 1 */}
        <div className="bg-white p-8 border-l-4 border-[#0A1F44] rounded-lg shadow-md max-w-xl">
          <p className="text-lg text-gray-500 mb-4">
            “SUP’CONNECT helped me reconnect with alumni who mentored me through my career journey.”
          </p>
          <p className="text-[#E63946] font-semibold">— Sarah, Alumni</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-8 border-l-4 border-[#0A1F44] rounded-lg shadow-md max-w-xl">
          <p className="text-lg text-gray-500 mb-4">
            “A great platform to share knowledge and collaborate on meaningful projects.”
          </p>
          <p className="text-[#E63946] font-semibold">— Ahmed, Student</p>
        </div>

      </div>
    </section>
  );
}

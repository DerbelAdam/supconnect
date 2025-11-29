export default function Footer() {
  return (
    <footer className="w-full bg-[#0A1F44] text-white py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* Logo */}
        <div className="text-3xl font-bold tracking-wide mb-6">
          SUP’
          <span className="text-[#E30613]">CONNECT</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium opacity-90">
          <a href="/about" className="hover:text-[#E30613] transition">About</a>
          <a href="/contact" className="hover:text-[#E30613] transition">Contact</a>
          <a href="/privacy" className="hover:text-[#E30613] transition">Privacy Policy</a>
        </nav>

        {/* Copy */}
        <p className="text-xs opacity-75 tracking-wide mt-6">
          &copy; {new Date().getFullYear()} SUP’CONNECT — All rights reserved.
        </p>
      </div>
    </footer>
  );
}

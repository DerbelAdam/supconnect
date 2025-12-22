import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1F44] text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Colonne 1: Brand & Bio */}
          <div className="space-y-6">
            <Link to="/home" className="text-2xl font-bold tracking-tight">
              <span className="text-white">SUP’</span>
              <span className="text-[#E30613]">CONNECT</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              La plateforme de référence pour connecter les talents de demain. 
              Développez votre réseau, trouvez un mentor et accédez aux meilleures opportunités.
            </p>
            {/* Réseaux Sociaux */}
            <div className="flex space-x-4">
              <SocialIcon path="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z" />
              <SocialIcon path="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c0-.249 1.51-2.772 1.818-4.013z" />
              <SocialIcon path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
            </div>
          </div>

          {/* Colonne 2: Quick Links (Navigation simplifiée) */}
          <div className="md:justify-self-center">
            <h3 className="text-lg font-semibold mb-6 border-l-4 border-[#E30613] pl-3 text-white">
              Navigation
            </h3>
            <ul className="space-y-4 text-gray-400">
              <FooterLink to="/home">Accueil</FooterLink>
              <FooterLink to="/community">Communauté</FooterLink>
              <FooterLink to="/mentorship">Mentorat</FooterLink>
              <FooterLink to="/career">Carrières</FooterLink>
            </ul>
          </div>

          {/* Colonne 3: Appel à l'action (Join Community) */}
          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center space-y-4">
            <h3 className="text-xl font-bold">Prêt à propulser votre avenir ?</h3>
            <p className="text-gray-400 text-sm">
              Rejoignez des centaines d'étudiants et professionnels dès aujourd'hui.
            </p>
            <Link 
              to="/signup" 
              className="w-full bg-[#E30613] hover:bg-[#c40511] text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-red-600/20 transform hover:-translate-y-1 text-center"
            >
              S'inscrire gratuitement
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} SUP’CONNECT. Propulsé par l'excellence académique.</p>
          <div className="flex space-x-6">
            <Link to="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

// Composants utilitaires pour la propreté du code
function FooterLink({ to, children }) {
  return (
    <li>
      <Link 
        to={to} 
        className="hover:text-[#E30613] hover:translate-x-1 transition-all duration-300 inline-block"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ path }) {
  return (
    <a 
      href="#" 
      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#E30613] transition-all duration-300 group"
    >
      <svg className="w-5 h-5 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
        <path d={path} />
      </svg>
    </a>
  );
}
# SUP’CONNECT – Plateforme de mentorat académique

## 🎯 Mission
Mettre en relation les étudiants, alumni et enseignants de SUP’COM via un parcours de mentorat simple : découverte des mentors, envoi de demandes, suivi des statuts et gestion des réponses.

## 🌟 Points forts
- Authentification Firebase et rôles (student, alumni, teacher) synchronisés dans Firestore.
- Recherche/filtrage des mentors et envoi de demandes avec statuts `pending/accepted/rejected`.
- Dashboards dédiés : suivi des demandes côté étudiant, traitement des demandes côté mentor.
- Profil éditable, parcours/compétences visibles, partage d’email une fois la demande acceptée.
- Section Community pour publier et interagir entre utilisateurs connectés.

## 🛠️ Stack technique
- React 18 (Vite) + React Router DOM
- Tailwind CSS
- Firebase (Authentication, Firestore, Storage)
- Context API pour l’état global
- ESLint (config Vite)

## 📂 Structure principale
- src/main.jsx : point d’entrée
- src/App.jsx : routage et pages
- src/config/firebase.jsx : configuration Firebase
- src/context/AuthContext.jsx : auth, rôles et gardes de routes
- src/pages/* : Home, Community, Mentorship, Profile, StudentRequests, MentorDashboard, etc.
- src/components/* : Navbar/New, HeroNew, Filters, MentorCard, CareerSection, FooterNew, TestimonialsNew, BecomeMentorForm…
- src/utils/uploadFile.jsx : aide pour l’upload (Storage)

## ⚙️ Pré-requis
- Node.js 18+
- Compte Firebase avec Authentication, Firestore et Storage activés

## 🚀 Démarrage rapide
1) Cloner : `git clone https://github.com/your-repo/supconnect.git`
2) Installer : `npm install`
3) Configurer Firebase : créer `src/config/firebase.jsx` (exemple ci-dessous)
4) Lancer le dev server : `npm run dev`

### Exemple de configuration Firebase (à adapter)
```js
// src/config/firebase.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'VOTRE_API_KEY',
	authDomain: 'VOTRE_PROJET.firebaseapp.com',
	projectId: 'VOTRE_PROJET',
	storageBucket: 'VOTRE_PROJET.appspot.com',
	messagingSenderId: 'XXXX',
	appId: 'XXXX'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## 🔒 Sécurité & rôles
- Accès aux pages protégé via `AuthContext` et `PrivateRoute`.
- Règles Firestore attendues :
	- Écriture/lecture restreintes à l’utilisateur pour ses propres données profil.
	- Collection `mentorshipRequests` : seul l’étudiant propriétaire peut créer/consulter ses demandes ; le mentor ciblé peut mettre à jour le statut.
	- Section Community : écriture réservée aux utilisateurs authentifiés.

## 🧪 Scripts npm
- `npm run dev` : serveur de développement
- `npm run build` : build de production
- `npm run preview` : prévisualisation du build
- `npm run lint` : linting

## 📌 Bonnes pratiques
- Centraliser l’état utilisateur (auth + rôle) dans `AuthContext`.
- Utiliser les composants de filtrage (`Filters`, `MentorCard`) pour la recherche mentor.
- Stocker les CV/ressources dans Firebase Storage via `uploadFile.jsx`.
- Aucune messagerie interne : l’email du mentor est communiqué après acceptation pour contact externe.

## 👤 Auteur
Projet réalisé par Adam DERBEL, Zaineb CHOUARI et Ines BESBES dans le cadre d’un projet universitaire (usage éducatif).
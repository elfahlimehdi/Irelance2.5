# Dashboard Admin irelance

Un dashboard d'administration complet et sécurisé pour l'application irelance, construit avec React, TypeScript, Firebase et Tailwind CSS.

## 🚀 Fonctionnalités

### ✅ Authentification & Sécurité
- **Firebase Authentication** avec gestion multi-providers
- **Système de rôles** hiérarchique (Super Admin, Admin, Modérateur, Utilisateur)
- **Permissions granulaires** par fonctionnalité
- **Custom Claims Firebase** pour les rôles avancés
- **Routes protégées** avec middleware d'authentification
- **Session management** automatique avec Firebase

### ✅ Dashboard Principal
- **Métriques KPIs** en temps réel (utilisateurs, revenus, conversions)
- **Graphiques interactifs** avec Recharts
- **Activité récente** avec logs en temps réel
- **Indicateurs de performance** visuels
- **Vue d'ensemble** personnalisable

### ✅ Gestion des Utilisateurs
- **CRUD complet** avec interface intuitive
- **Recherche et filtrage** avancés
- **Pagination optimisée** avec Firestore cursors
- **Actions en lot** (suppression multiple)
- **Statuts utilisateurs** (Actif, Inactif, Suspendu)
- **Vérification email/téléphone** avec badges visuels
- **Export de données** (à implémenter)

### ✅ Analytics & Rapports
- **Graphiques de croissance** utilisateurs et revenus
- **Sources de trafic** avec charts circulaires
- **Analyse par appareil** et navigateur
- **Métriques de conversion** détaillées
- **Rapports périodiques** configurables
- **Export PDF/Excel** (à implémenter)

### ✅ Logs d'Activité
- **Traçabilité complète** de toutes les actions admin
- **Filtrage par catégorie** (Users, Content, System, Auth, API)
- **Recherche full-text** dans les logs
- **Détails techniques** (IP, User-Agent, Timestamp)
- **Audit trail** automatique pour compliance

### ✅ Interface Utilisateur
- **Design moderne** avec Shadcn/ui et Tailwind CSS
- **Navigation responsive** avec sidebar collapsible
- **Thème cohérent** avec variables CSS personnalisées
- **Loading states** et animations fluides
- **Messages de feedback** (toasts, confirmations)
- **Breadcrumbs** et navigation intuitive

## 🛠️ Stack Technique

### Frontend
- **React 18** avec hooks modernes
- **TypeScript** pour la sécurité des types
- **Tailwind CSS** + **Shadcn/ui** pour le design system
- **React Router** pour la navigation
- **Recharts** pour les graphiques
- **React Hook Form** pour les formulaires
- **Framer Motion** pour les animations

### Backend & Services
- **Firebase Authentication** pour l'auth
- **Firestore** pour la base de données NoSQL
- **Firebase Storage** pour les fichiers
- **Firebase Functions** pour la logique serveur
- **Custom Claims** pour les permissions avancées

### Outils & Qualité
- **Vite** pour le build et développement
- **ESLint** pour la qualité du code
- **TypeScript strict** mode activé
- **Git hooks** avec Husky (recommandé)

## 📁 Structure du Projet

```
project/
├── src/
│   ├── components/
│   │   ├── ui/                    # Composants UI réutilisables (Shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── badge.tsx
│   │   ├── admin/                 # Composants spécifiques admin
│   │   │   ├── AdminLayout.tsx    # Layout principal admin
│   │   │   └── AdminRoute.tsx     # Route protégée
│   │   └── Auth/                  # Authentification
│   │       └── AuthProvider.tsx
│   ├── pages/
│   │   └── admin/                 # Pages du dashboard admin
│   │       ├── Dashboard.tsx      # Page principale avec métriques
│   │       ├── UserManagement.tsx # Gestion des utilisateurs
│   │       ├── Analytics.tsx      # Analytics et rapports
│   │       └── ActivityLogs.tsx   # Logs d'activité
│   ├── hooks/
│   │   ├── useAuth.ts            # Hook d'authentification
│   │   └── useAdminAuth.ts       # Hook avec permissions admin
│   ├── services/
│   │   └── adminService.ts       # Service Firebase pour admin
│   ├── types/
│   │   ├── index.ts              # Types généraux
│   │   └── admin.ts              # Types spécifiques admin
│   ├── lib/
│   │   ├── firebase.ts           # Configuration Firebase
│   │   └── utils.ts              # Utilitaires (cn, formatters)
│   └── App.tsx                   # Point d'entrée avec routes
├── firestore.rules               # Règles de sécurité Firestore
├── firestore.indexes.json        # Index Firestore optimisés
├── firebase.json                 # Configuration Firebase
└── package.json
```

## 🚀 Installation & Configuration

### 1. Prérequis
```bash
# Node.js 18+ et npm
node --version  # v18+
npm --version   # 8+

# Firebase CLI
npm install -g firebase-tools
firebase --version
```

### 2. Clone et Installation
```bash
# Cloner le projet (partie admin déjà intégrée)
cd project/
npm install
```

### 3. Configuration Firebase

#### 3.1 Créer un projet Firebase
1. Aller sur [Firebase Console](https://console.firebase.google.com)
2. Créer un nouveau projet
3. Activer Authentication, Firestore, Storage

#### 3.2 Configuration Authentication
```bash
# Dans Firebase Console > Authentication > Sign-in method
# Activer : Email/Password, Google (optionnel)
```

#### 3.3 Variables d'environnement
```bash
# Créer le fichier .env.local dans /project
cp .env.example .env.local
```

```env
# .env.local
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### 3.4 Déployer les règles et index
```bash
# Depuis /project
firebase login
firebase use --add  # Sélectionner votre projet

# Déployer les règles Firestore
firebase deploy --only firestore:rules

# Déployer les index
firebase deploy --only firestore:indexes
```

### 4. Configuration des Custom Claims

#### 4.1 Créer une Cloud Function pour les rôles
```javascript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const setUserRole = functions.https.onCall(async (data, context) => {
  // Vérifier que l'appelant est un super admin
  if (!context.auth?.token.super_admin) {
    throw new functions.https.HttpsError('permission-denied', 'Access denied');
  }

  const { uid, role } = data;
  
  try {
    // Définir les custom claims selon le rôle
    const customClaims = {
      admin: role === 'admin' || role === 'super_admin',
      super_admin: role === 'super_admin',
      moderator: ['moderator', 'admin', 'super_admin'].includes(role),
      role: role
    };

    await admin.auth().setCustomUserClaims(uid, customClaims);
    return { success: true };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Error setting user role');
  }
});
```

#### 4.2 Créer le premier Super Admin
```javascript
// Script à exécuter une fois
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function createSuperAdmin(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, {
      super_admin: true,
      admin: true,
      moderator: true,
      role: 'super_admin'
    });
    console.log('Super admin created:', email);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Remplacer par votre email
createSuperAdmin('votre-email@admin.com');
```

## 🛡️ Sécurité

### Règles Firestore
Les règles de sécurité Firestore sont définies dans `firestore.rules` avec :
- **Authentification obligatoire** pour toutes les opérations sensibles
- **Vérification des rôles** via custom claims
- **Accès granulaire** par collection et document
- **Protection contre l'escalade de privilèges**

### Permissions par Rôle
```typescript
// Hiérarchie des rôles
Super Admin > Admin > Modérateur > Utilisateur

// Permissions
users.read:    Modérateur+
users.write:   Admin+
users.delete:  Super Admin
content.write: Modérateur+
system.write:  Super Admin
```

## 🚀 Déploiement

### 1. Build de Production
```bash
cd project/
npm run build
```

### 2. Déploiement Firebase Hosting
```bash
# Déployer l'application
firebase deploy --only hosting

# Déployer tout (rules, functions, hosting)
firebase deploy
```

### 3. Configuration CI/CD (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd project
          npm ci
      
      - name: Build
        run: |
          cd project
          npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          # ... autres variables
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: your-project-id
```

## 🔧 Développement

### Commandes Disponibles
```bash
# Développement
npm run dev           # Serveur de développement

# Build
npm run build         # Build de production
npm run preview       # Prévisualiser le build

# Qualité
npm run lint          # Linter ESLint
npm run type-check    # Vérification TypeScript

# Firebase
firebase emulators:start  # Émulateurs locaux
firebase deploy           # Déploiement
```

### Émulateurs Firebase
```bash
# Démarrer les émulateurs pour développement local
firebase emulators:start

# Accès aux interfaces :
# - Firestore: http://localhost:8080
# - Auth: http://localhost:9099  
# - Functions: http://localhost:5001
# - UI: http://localhost:4000
```

## 📝 Guide d'Utilisation

### Accéder au Dashboard Admin
1. Se connecter avec un compte ayant les droits admin
2. Naviguer vers `/admin`
3. Le dashboard vérifie automatiquement les permissions

### Gestion des Utilisateurs
- **Voir tous les utilisateurs** : Page Users
- **Rechercher** : Barre de recherche en temps réel
- **Filtrer** : Par statut, rôle, date
- **Actions** : Modifier, supprimer, voir détails
- **Actions en lot** : Sélection multiple pour suppression

### Analytics
- **Vue d'ensemble** : Métriques principales
- **Graphiques** : Croissance, revenus, trafic
- **Filtres temporels** : 7j, 30j, 90j, 1an
- **Export** : PDF et Excel (à implémenter)

### Logs d'Activité
- **Traçabilité** : Toutes les actions sont loggées
- **Filtrage** : Par catégorie, utilisateur, période
- **Détails** : IP, User-Agent, données modifiées

## 🔮 Roadmap & Améliorations

### À Court Terme
- [ ] **Gestion de contenu** avec éditeur riche (TinyMCE/Quill)
- [ ] **Paramètres système** configurables
- [ ] **API Management** avec monitoring
- [ ] **Notifications** en temps réel

### À Moyen Terme  
- [ ] **Dashboard widgets** personnalisables
- [ ] **Rapports automatisés** par email
- [ ] **Backup/Restore** automatique
- [ ] **Multi-tenancy** pour plusieurs clients

### À Long Terme
- [ ] **Machine Learning** pour analytics prédictifs
- [ ] **Audit trail** avancé avec blockchain
- [ ] **Plugin system** pour extensions
- [ ] **Mobile app** pour admin nomade

## 🐛 Troubleshooting

### Problèmes Courants

#### 1. Erreur Firebase non configuré
```bash
# Vérifier les variables d'environnement
echo $VITE_FIREBASE_API_KEY

# Redémarrer le serveur après modification .env
npm run dev
```

#### 2. Permissions insuffisantes
```javascript
// Vérifier les custom claims
firebase auth:export users.json
// Puis vérifier le champ customClaims
```

#### 3. Règles Firestore bloquent l'accès
```bash
# Tester les règles en local
firebase emulators:start --only firestore
# Consulter les logs dans l'interface émulateur
```

## 🤝 Contribution

### Structure des Commits
```bash
git commit -m "feat: add user export functionality"
git commit -m "fix: resolve pagination issue in user table"
git commit -m "docs: update installation guide"
```

### Pull Requests
1. Créer une branche feature
2. Implémenter avec tests
3. Mettre à jour la documentation
4. Soumettre la PR avec description détaillée

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- **Documentation** : Ce README
- **Issues** : GitHub Issues
- **Email** : support@irelance.ma

---

**Dashboard Admin irelance** - Une solution complète pour l'administration de votre plateforme e-commerce. 🚀 
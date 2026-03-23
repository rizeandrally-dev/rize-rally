# RIZE & RALLY — Context for Claude

## Founder
- Prénom : Mathéo
- Rôle : RIZE (Founder)

## Projet
Application mobile B2B de bien-être en entreprise basée sur la gamification collective.
Stack : Expo SDK 55 + React Native + TypeScript + expo-router + expo-linear-gradient + AsyncStorage

## Environnement
- OS : Windows
- Téléphone test : Samsung A53 5G Android
- Expo Go APK installé manuellement (version 55)
- GitHub : github.com/rizeandrally-dev/rize-rally

## Structure du projet
```
C:\rize-rally\
├── app/
│   ├── _layout.tsx          # RootLayout avec ThemeProvider
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Navigation bottom tab (4 onglets)
│   │   ├── index.tsx        # Dashboard principal
│   │   ├── leaderboard.tsx  # Classement individuel + équipes
│   │   ├── profile.tsx      # Profil + Achievements + Sélecteur thèmes
│   │   └── rh.tsx           # Vue RH agrégée
├── lib/
│   ├── theme.tsx            # 10 thèmes + ThemeContext + useTheme()
│   └── storage.ts           # AsyncStorage — Sparks + streak + daily data
├── app.json
├── package.json
└── CLAUDE.md
```

## Ce qui est fait ✅
- Navigation 4 onglets (Dashboard, Leaderboard, Profil, RH)
- 4 écrans complets avec charte graphique RIZE & RALLY
- Système de 10 thèmes visuels (Fire, Ocean, Nature, Neon, Crystal, Sunset, Gold, Galaxy, Pastel, Corporate)
- Thème appliqué sur toute l'app via Context React
- Boutons cliquables : Hydratation (+10 ⚡), Mood check-in (+5 ⚡)
- Barre de progression Sparks (max 100/jour)
- AsyncStorage : données persistantes entre sessions (hydratation, mood, total sparks, streak)
- Reset quotidien automatique à minuit
- Git + GitHub configurés

## Commandes utiles
```bash
cd C:\rize-rally
npx expo start          # Lancer le serveur de dev
npx expo start --clear  # Lancer avec cache vidé
git add . && git commit -m "message" && git push  # Sauvegarder
```

## Règles importantes
- Toujours préciser 💻 PC ou 📱 Android pour chaque action
- Installer les packages avec --legacy-peer-deps si erreur ERESOLVE
- Ne JAMAIS coller du code dans le terminal (uniquement les commandes npm/npx/git)
- Expo Go est installé via APK manuel (pas Play Store)

## Système de Sparks
| Action | Valeur | Limite |
|--------|--------|--------|
| Marche | +5 ⚡ par 1000 pas | Max 50 ⚡ |
| Hydratation | +10 ⚡ | 1 fois/jour |
| Mood check-in | +5 ⚡ | 1 fois/jour |
| **Total** | | **Max 100 ⚡/jour** |

## Charte graphique
- Violet pastel : #A78BFA
- Violet profond : #7C3AED
- Bleu électrique : #2C75FF
- Jaune doré : #FBBF24
- Police : Inter

## Prochaines étapes (Sprint 2)
- [ ] Backend Supabase (BDD + auth)
- [ ] Authentification email/MDP
- [ ] Système Squad avec code invitation
- [ ] Sync temps réel équipe
- [ ] Vrais pas en temps réel (expo-sensors)
- [ ] Sauvegarde du thème choisi (AsyncStorage)
- [ ] Notifications push 18h (expo-notifications)
- [ ] 3 Modes d'usage (Essentiel/Collectif/Évolution)
# RIZE & RALLY — Context for Claude Code

## Founder
- Prénom : Mathéo
- Rôle : RIZE (Founder)

## Projet
Application mobile B2B de bien-être en entreprise basée sur la gamification collective.
Les équipes se challengent sur leur hygiène de vie (pas, hydratation, humeur) pour améliorer leur qualité de vie au travail.

## Stack technique
- Framework : Expo SDK 55 + React Native + TypeScript
- Navigation : Expo Router (file-based)
- Gradients : expo-linear-gradient
- Stockage local : @react-native-async-storage/async-storage
- Thèmes : Context React custom (lib/theme.tsx)
- Icons : @expo/vector-icons (Ionicons)
- OS dev : Windows
- Téléphone test : Samsung A53 5G Android
- Expo Go : APK installé manuellement (version 55)
- GitHub : github.com/rizeandrally-dev/rize-rally

## Commandes importantes
```bash
cd C:\rize-rally
npx expo start              # Lancer le serveur dev
npx expo start --clear      # Lancer avec cache vidé
npm install <pkg> --legacy-peer-deps  # Toujours utiliser --legacy-peer-deps
git add . && git commit -m "message" && git push  # Sauvegarder
```

## Règles critiques
- Toujours utiliser --legacy-peer-deps pour npm install
- Ne jamais utiliser npx expo install sans -- --legacy-peer-deps
- Les imports lib/ utilisent le chemin ../../lib/ depuis app/(tabs)/
- Expo Go est en APK manuel — pas de mise à jour Play Store possible

## Structure du projet
```
C:\rize-rally\
├── app/
│   ├── _layout.tsx          # RootLayout avec ThemeProvider
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Bottom tab navigation (4 onglets)
│   │   ├── index.tsx        # Dashboard — Sparks, hydratation, mood, steps
│   │   ├── leaderboard.tsx  # Classement individuel + équipes
│   │   ├── profile.tsx      # Profil + Achievements + Sélecteur 10 thèmes
│   │   └── rh.tsx           # Vue RH agrégée (zéro donnée individuelle)
├── lib/
│   ├── theme.tsx            # 10 thèmes + ThemeContext + useTheme()
│   └── storage.ts           # AsyncStorage — Sparks + streak + daily data
├── app.json
├── package.json
├── CLAUDE.md
└── ROADMAP.md
```

## Ce qui est fait ✅
- Navigation 4 onglets fonctionnelle
- 4 écrans complets avec charte graphique RIZE & RALLY
- 10 thèmes visuels (Fire, Ocean, Nature, Neon, Crystal, Sunset, Gold, Galaxy, Pastel, Corporate)
- Thème appliqué sur toute l'app via Context React
- Boutons cliquables : Hydratation (+10 ⚡), Mood check-in (+5 ⚡)
- Barre de progression Sparks (max 100/jour)
- AsyncStorage : données persistantes entre sessions
- Reset quotidien automatique à minuit
- Streak calculé automatiquement
- Git + GitHub configurés

## Système de Sparks
| Action | Valeur | Limite/jour |
|--------|--------|-------------|
| Marche | +5 ⚡ par 1000 pas | Max 50 ⚡ |
| Hydratation | +10 ⚡ | 1 fois/jour |
| Mood check-in | +5 ⚡ | 1 fois/jour |
| **Total** | | **Max 100 ⚡/jour** |

## Thèmes disponibles (lib/theme.tsx)
Chaque thème expose : bg, card, cardBorder, gradient, accent, text, textMuted, spark, bar
- fire, ocean, nature, neon, crystal, sunset, gold, galaxy, pastel, corporate

## Charte graphique
- Violet pastel : #A78BFA
- Violet profond : #7C3AED
- Bleu électrique : #2C75FF
- Jaune doré : #FBBF24
- Fond sombre : #0D1117

## Prochaines étapes (Sprint 2)
- [ ] Vrais pas en temps réel (expo-sensors)
- [ ] Sauvegarde du thème choisi (AsyncStorage)
- [ ] Backend Supabase (BDD + auth)
- [ ] Authentification email/MDP
- [ ] Système Squad avec code invitation
- [ ] Sync temps réel équipe
- [ ] Notifications push 18h (expo-notifications)
- [ ] 3 Modes d'usage (Essentiel/Collectif/Évolution)
- [ ] Écran onboarding
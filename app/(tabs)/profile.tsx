import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { ThemeKey, themes, useTheme } from '../../lib/theme';

const achievements = [
  { icon: '⚡', label: 'First Spark', unlocked: true },
  { icon: '🔥', label: '7-day Streak', unlocked: true },
  { icon: '💧', label: 'Hydration Pro', unlocked: false },
  { icon: '🏆', label: 'Team Player', unlocked: true },
  { icon: '👑', label: 'Top classement', unlocked: false },
  { icon: '💪', label: 'Perfect Week', unlocked: false },
];

const weekData = [
  { day: 'Lun', sparks: 80 },
  { day: 'Mar', sparks: 60 },
  { day: 'Mer', sparks: 100 },
  { day: 'Jeu', sparks: 45 },
  { day: 'Ven', sparks: 90 },
  { day: 'Sam', sparks: 70 },
  { day: 'Dim', sparks: 65 },
];

export default function Profile() {
  const { theme, themeKey, setTheme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        <LinearGradient
          colors={theme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 24, paddingTop: 60, paddingBottom: 40, alignItems: 'center' }}
        >
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
            Mathieu D.
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
            Squad : Team Nantes
          </Text>
        </LinearGradient>

        <View style={{ flexDirection: 'row', margin: 16, gap: 10 }}>
          {[
            { label: 'Total Sparks', value: '8 420 ⚡' },
            { label: 'Rang', value: '#3 🏅' },
            { label: 'Streak', value: '4j 🔥' },
          ].map((s) => (
            <View key={s.label} style={{
              flex: 1, backgroundColor: theme.card,
              borderRadius: 14, padding: 14, alignItems: 'center',
              borderWidth: 1, borderColor: theme.cardBorder,
            }}>
              <Text style={{ color: theme.accent, fontSize: 15, fontWeight: 'bold' }}>
                {s.value}
              </Text>
              <Text style={{ color: theme.textMuted, fontSize: 10, marginTop: 4, textAlign: 'center' }}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={{
          marginHorizontal: 16, backgroundColor: theme.card,
          borderRadius: 16, padding: 16, marginBottom: 16,
          borderWidth: 1, borderColor: theme.cardBorder,
        }}>
          <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16, marginBottom: 16 }}>
            Progression cette semaine
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 80 }}>
            {weekData.map((d) => (
              <View key={d.day} style={{ alignItems: 'center', flex: 1 }}>
                <LinearGradient
                  colors={theme.bar}
                  style={{
                    width: 24,
                    height: Math.round((d.sparks / 100) * 70),
                    borderRadius: 6, marginBottom: 6,
                  }}
                />
                <Text style={{ color: theme.textMuted, fontSize: 10 }}>{d.day}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{
          marginHorizontal: 16, backgroundColor: theme.card,
          borderRadius: 16, padding: 16, marginBottom: 16,
          borderWidth: 1, borderColor: theme.cardBorder,
        }}>
          <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16, marginBottom: 16 }}>
            Achievements
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {achievements.map((a) => (
              <View key={a.label} style={{
                width: '30%', backgroundColor: a.unlocked ? theme.card : 'rgba(128,128,128,0.1)',
                borderRadius: 12, padding: 12, alignItems: 'center',
                borderWidth: a.unlocked ? 1 : 0, borderColor: theme.accent,
                opacity: a.unlocked ? 1 : 0.4,
              }}>
                <Text style={{ fontSize: 24, marginBottom: 6 }}>{a.icon}</Text>
                <Text style={{ color: theme.text, fontSize: 10, textAlign: 'center' }}>
                  {a.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{
          marginHorizontal: 16, marginBottom: 40,
          backgroundColor: theme.card,
          borderRadius: 16, padding: 16,
          borderWidth: 1, borderColor: theme.cardBorder,
        }}>
          <Text style={{ color: theme.text, fontWeight: '700', fontSize: 16, marginBottom: 4 }}>
            Apparence
          </Text>
          <Text style={{ color: theme.textMuted, fontSize: 13, marginBottom: 16 }}>
            Choisis le theme de l'app
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {(Object.keys(themes) as ThemeKey[]).map((key) => {
              const t = themes[key];
              const isSelected = themeKey === key;
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => setTheme(key)}
                  activeOpacity={0.8}
                  style={{
                    width: '47%', borderRadius: 14, overflow: 'hidden',
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected ? theme.accent : theme.cardBorder,
                  }}
                >
                  <LinearGradient
                    colors={t.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ padding: 14 }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View>
                        <Text style={{ fontSize: 20 }}>{t.emoji}</Text>
                        <Text style={{ color: 'white', fontWeight: '600', fontSize: 13, marginTop: 4 }}>
                          {t.name}
                        </Text>
                      </View>
                      {isSelected && (
                        <View style={{
                          width: 24, height: 24, borderRadius: 12,
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Text style={{ fontSize: 14 }}>✓</Text>
                        </View>
                      )}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
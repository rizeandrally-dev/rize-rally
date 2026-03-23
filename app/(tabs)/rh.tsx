import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { useTheme } from '../../lib/theme';

const weekTrend = [
  { day: 'Lun', participation: 70 },
  { day: 'Mar', participation: 80 },
  { day: 'Mer', participation: 60 },
  { day: 'Jeu', participation: 90 },
  { day: 'Ven', participation: 85 },
  { day: 'Sam', participation: 50 },
  { day: 'Dim', participation: 65 },
];

const alerts = [
  { icon: '⚠️', message: 'Participation en baisse depuis 3 jours', type: 'warning' },
  { icon: '✅', message: 'Objectif hebdo atteint a 87%', type: 'success' },
  { icon: '📉', message: 'Tendance hydratation en recul', type: 'warning' },
];

export default function RH() {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        <LinearGradient
          colors={theme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 24, paddingTop: 60, paddingBottom: 32 }}
        >
          <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>
            Vue RH
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
            Donnees agregees - Aucune donnee individuelle
          </Text>
        </LinearGradient>

        <View style={{ flexDirection: 'row', margin: 16, gap: 12 }}>
          {[
            { label: 'Participation', value: '80%' },
            { label: 'Sparks moy.', value: '67 ⚡' },
            { label: 'Streak moy.', value: '3j 🔥' },
          ].map((k) => (
            <View key={k.label} style={{
              flex: 1, backgroundColor: theme.card,
              borderRadius: 14, padding: 14, alignItems: 'center',
              borderWidth: 1, borderColor: theme.cardBorder,
            }}>
              <Text style={{ color: theme.accent, fontSize: 20, fontWeight: 'bold' }}>
                {k.value}
              </Text>
              <Text style={{ color: theme.textMuted, fontSize: 11, marginTop: 4, textAlign: 'center' }}>
                {k.label}
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
            Participation cette semaine
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 80 }}>
            {weekTrend.map((d) => (
              <View key={d.day} style={{ alignItems: 'center', flex: 1 }}>
                <LinearGradient
                  colors={
                    d.participation >= 80 ? ['#10B981', '#059669'] :
                    d.participation >= 60 ? theme.bar :
                    ['#EF4444', '#DC2626']
                  }
                  style={{
                    width: 24,
                    height: Math.round((d.participation / 100) * 70),
                    borderRadius: 6, marginBottom: 6,
                  }}
                />
                <Text style={{ color: theme.textMuted, fontSize: 10 }}>{d.day}</Text>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: 'row', marginTop: 12, gap: 16 }}>
            {[
              { color: '#10B981', label: '+ de 80%' },
              { color: theme.accent, label: '60 a 80%' },
              { color: '#EF4444', label: '- de 60%' },
            ].map((l) => (
              <View key={l.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: l.color }} />
                <Text style={{ color: theme.textMuted, fontSize: 11 }}>{l.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{
          marginHorizontal: 16, backgroundColor: theme.card,
          borderRadius: 16, padding: 16, marginBottom: 16,
          borderWidth: 1, borderColor: theme.cardBorder,
        }}>
          <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16, marginBottom: 12 }}>
            Bonus equipe actif
          </Text>
          {[
            { label: '60% actifs', bonus: '+3%', reached: true },
            { label: '80% actifs', bonus: '+7%', reached: true },
            { label: '100% actifs', bonus: '+10%', reached: false },
          ].map((b, i) => (
            <View key={b.label} style={{
              flexDirection: 'row', alignItems: 'center',
              paddingVertical: 10,
              borderBottomWidth: i < 2 ? 1 : 0,
              borderBottomColor: theme.cardBorder,
            }}>
              <View style={{
                width: 22, height: 22, borderRadius: 11,
                backgroundColor: b.reached ? theme.accent : theme.cardBorder,
                alignItems: 'center', justifyContent: 'center', marginRight: 12,
              }}>
                <Text style={{ color: 'white', fontSize: 11 }}>
                  {b.reached ? '✓' : ''}
                </Text>
              </View>
              <Text style={{ flex: 1, color: b.reached ? theme.text : theme.textMuted, fontSize: 14 }}>
                {b.label}
              </Text>
              <Text style={{ color: b.reached ? theme.spark : theme.textMuted, fontWeight: '700' }}>
                {b.bonus}
              </Text>
            </View>
          ))}
        </View>

        <View style={{
          marginHorizontal: 16, marginBottom: 40,
          backgroundColor: theme.card,
          borderRadius: 16, padding: 16,
          borderWidth: 1, borderColor: theme.cardBorder,
        }}>
          <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16, marginBottom: 12 }}>
            Alertes collectives
          </Text>
          {alerts.map((a, i) => (
            <View key={i} style={{
              flexDirection: 'row', alignItems: 'center',
              backgroundColor: a.type === 'warning' ? 'rgba(251,191,36,0.1)' : 'rgba(16,185,129,0.1)',
              borderRadius: 10, padding: 12, marginBottom: 8,
              borderLeftWidth: 3,
              borderLeftColor: a.type === 'warning' ? '#FBBF24' : '#10B981',
            }}>
              <Text style={{ fontSize: 18, marginRight: 10 }}>{a.icon}</Text>
              <Text style={{ color: theme.text, fontSize: 13, flex: 1 }}>{a.message}</Text>
            </View>
          ))}
          <Text style={{ color: theme.textMuted, fontSize: 11, marginTop: 8, textAlign: 'center' }}>
            Aucune donnee individuelle accessible ici
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}
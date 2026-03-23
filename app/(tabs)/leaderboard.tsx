import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { useTheme } from '../../lib/theme';

const players = [
  { rank: 1, name: 'Sophie M.', sparks: 1840, trend: 'up', crown: true, isMe: false },
  { rank: 2, name: 'Thomas R.', sparks: 1720, trend: 'flat', crown: false, isMe: false },
  { rank: 3, name: 'Vous', sparks: 1650, trend: 'up', crown: false, isMe: true },
  { rank: 4, name: 'Julie K.', sparks: 1580, trend: 'down', crown: false, isMe: false },
  { rank: 5, name: 'Marc D.', sparks: 1420, trend: 'up', crown: false, isMe: false },
  { rank: 6, name: 'Laura B.', sparks: 1380, trend: 'flat', crown: false, isMe: false },
  { rank: 7, name: 'Alex P.', sparks: 1200, trend: 'down', crown: false, isMe: false },
];

const teams = [
  { rank: 1, name: 'Team Alpha', sparks: 18400, members: 10, isMe: false },
  { rank: 2, name: 'Team Beta', sparks: 17800, members: 9, isMe: false },
  { rank: 3, name: 'Notre equipe', sparks: 16500, members: 10, isMe: true },
];

function getTrend(trend: string) {
  if (trend === 'up') return { symbol: '↑', color: '#10B981' };
  if (trend === 'down') return { symbol: '↓', color: '#EF4444' };
  return { symbol: '=', color: '#9CA3AF' };
}

export default function Leaderboard() {
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
            Classement
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
            Saison 1 - Semaine 8
          </Text>
        </LinearGradient>

        <View style={{ margin: 16 }}>
          <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16, marginBottom: 12 }}>
            Individuel
          </Text>
          {players.map((p) => {
            const trend = getTrend(p.trend);
            const rankColor = p.rank === 1 ? '#FBBF24' : p.rank === 2 ? '#9CA3AF' : p.rank === 3 ? '#CD7C3A' : theme.cardBorder;
            return (
              <View key={p.rank} style={{
                flexDirection: 'row', alignItems: 'center',
                backgroundColor: theme.card,
                borderRadius: 14, padding: 14, marginBottom: 8,
                borderWidth: p.isMe ? 2 : 1,
                borderColor: p.isMe ? theme.accent : theme.cardBorder,
              }}>
                <View style={{
                  width: 32, height: 32, borderRadius: 16,
                  backgroundColor: rankColor,
                  alignItems: 'center', justifyContent: 'center', marginRight: 12,
                }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>
                    {p.crown ? '👑' : String(p.rank)}
                  </Text>
                </View>
                <Text style={{
                  flex: 1, color: p.isMe ? theme.accent : theme.text,
                  fontWeight: p.isMe ? '700' : '500', fontSize: 15,
                }}>
                  {p.name}
                </Text>
                <Text style={{ color: trend.color, marginRight: 10, fontSize: 16 }}>
                  {trend.symbol}
                </Text>
                <Text style={{ color: theme.spark, fontWeight: '700' }}>
                  {String(p.sparks)} ⚡
                </Text>
              </View>
            );
          })}
        </View>

        <View style={{ marginHorizontal: 16, marginBottom: 40 }}>
          <Text style={{ color: theme.text, fontWeight: '600', fontSize: 16, marginBottom: 12 }}>
            Equipes
          </Text>
          {teams.map((t) => (
            <View key={t.rank} style={{
              backgroundColor: theme.card,
              borderRadius: 14, padding: 16, marginBottom: 8,
              borderWidth: t.isMe ? 2 : 1,
              borderColor: t.isMe ? theme.accent : theme.cardBorder,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                  color: t.rank === 1 ? '#FBBF24' : theme.textMuted,
                  fontWeight: 'bold', fontSize: 18, marginRight: 12,
                }}>
                  #{t.rank}
                </Text>
                <Text style={{
                  flex: 1, color: t.isMe ? theme.accent : theme.text,
                  fontWeight: '600', fontSize: 15,
                }}>
                  {t.name}
                </Text>
                <Text style={{ color: theme.spark, fontWeight: '700' }}>
                  {String(t.sparks)} ⚡
                </Text>
              </View>
              <Text style={{ color: theme.textMuted, fontSize: 12, marginTop: 4 }}>
                {String(t.members)} membres
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import {
  checkAndUpdateStreak,
  loadDailyData,
  loadTotalSparks,
  saveDailyData,
  saveTotalSparks,
} from '../../lib/storage';
import { useTheme } from '../../lib/theme';

export default function Dashboard() {
  const { theme } = useTheme();
  const [hydrated, setHydrated] = useState(false);
  const [moodDone, setMoodDone] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [totalSparks, setTotalSparks] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const steps = 6500;
  const maxSteps = 10000;
  const stepSparks = Math.min(Math.floor(steps / 1000) * 5, 50);
  const hydrationSparks = hydrated ? 10 : 0;
  const moodSparks = moodDone ? 5 : 0;
  const dailySparks = stepSparks + hydrationSparks + moodSparks;

  const moods = [
    { id: 1, emoji: '😴', label: 'Fatigue' },
    { id: 2, emoji: '😐', label: 'Neutre' },
    { id: 3, emoji: '🙂', label: 'Bien' },
    { id: 4, emoji: '🔥', label: 'Au top' },
  ];

  useEffect(() => {
    async function init() {
      const daily = await loadDailyData();
      const total = await loadTotalSparks();
      const currentStreak = await checkAndUpdateStreak();
      setHydrated(daily.hydrated);
      setMoodDone(daily.moodDone);
      setSelectedMood(daily.selectedMood);
      setTotalSparks(total);
      setStreak(currentStreak);
      setLoaded(true);
    }
    init();
  }, []);

  async function handleHydration() {
    if (!hydrated) {
      setHydrated(true);
      const daily = await loadDailyData();
      await saveDailyData({ ...daily, hydrated: true });
      const newTotal = totalSparks + 10;
      setTotalSparks(newTotal);
      await saveTotalSparks(newTotal);
      Alert.alert('Super !', '+10 Sparks sauvegardes !');
    }
  }

  async function handleMoodSelect(id: number) {
    setSelectedMood(id);
    setMoodDone(true);
    setShowMoodPicker(false);
    const daily = await loadDailyData();
    await saveDailyData({ ...daily, moodDone: true, selectedMood: id });
    const newTotal = totalSparks + 5;
    setTotalSparks(newTotal);
    await saveTotalSparks(newTotal);
    Alert.alert('Note !', '+5 Sparks sauvegardes !');
  }

  if (!loaded) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: theme.textMuted, fontSize: 16 }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        <LinearGradient
          colors={theme.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingHorizontal: 24, paddingTop: 64, paddingBottom: 32 }}
        >
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, letterSpacing: 1 }}>
            RIZE & RALLY
          </Text>
          <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginTop: 6 }}>
            Bonjour, Mathieu
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, marginTop: 6 }}>
            Streak {streak} jours - Continue comme ca !
          </Text>
          <View style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 16, padding: 16, marginTop: 20,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>
                Sparks aujourd'hui
              </Text>
              <Text style={{ color: theme.spark, fontWeight: '800', fontSize: 18 }}>
                {dailySparks}/100
              </Text>
            </View>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 99, height: 10 }}>
              <LinearGradient
                colors={theme.bar}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{ width: `${dailySparks}%`, height: 10, borderRadius: 99 }}
              />
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 8 }}>
              Total cumule : {totalSparks} Sparks
            </Text>
          </View>
        </LinearGradient>

        <View style={{ flexDirection: 'row', padding: 16, gap: 10 }}>
          {[
            { label: "Aujourd'hui", value: String(dailySparks) + ' ⚡' },
            { label: 'Total', value: String(totalSparks) + ' ⚡' },
            { label: 'Streak', value: String(streak) + ' 🔥' },
          ].map((s) => (
            <LinearGradient
              key={s.label}
              colors={theme.bar}
              style={{ flex: 1, borderRadius: 16, padding: 14, alignItems: 'center' }}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                {s.value}
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 4 }}>
                {s.label}
              </Text>
            </LinearGradient>
          ))}
        </View>

        <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <Text style={{ color: theme.text, fontWeight: '700', fontSize: 18, marginBottom: 14 }}>
            Objectifs du jour
          </Text>

          <View style={{
            backgroundColor: theme.card, borderRadius: 18, padding: 16,
            marginBottom: 10, borderWidth: 1,
            borderColor: stepSparks >= 50 ? theme.accent : theme.cardBorder,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <View style={{
                width: 40, height: 40, borderRadius: 20,
                backgroundColor: 'rgba(128,128,128,0.15)',
                alignItems: 'center', justifyContent: 'center', marginRight: 12,
              }}>
                <Text style={{ fontSize: 20 }}>🚶</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15 }}>Marche</Text>
                <Text style={{ color: theme.textMuted, fontSize: 12 }}>
                  {steps.toLocaleString()} / {maxSteps.toLocaleString()} pas
                </Text>
              </View>
              <Text style={{ color: theme.spark, fontWeight: '700' }}>+{stepSparks} ⚡</Text>
            </View>
            <View style={{ backgroundColor: theme.cardBorder, borderRadius: 99, height: 8 }}>
              <LinearGradient
                colors={theme.bar}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={{
                  width: `${Math.min((steps / maxSteps) * 100, 100)}%`,
                  height: 8, borderRadius: 99,
                }}
              />
            </View>
          </View>

          <TouchableOpacity onPress={handleHydration} activeOpacity={0.8}>
            <View style={{
              backgroundColor: theme.card, borderRadius: 18, padding: 16,
              marginBottom: 10, borderWidth: 1,
              borderColor: hydrated ? theme.accent : theme.cardBorder,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 40, height: 40, borderRadius: 20,
                  backgroundColor: 'rgba(128,128,128,0.15)',
                  alignItems: 'center', justifyContent: 'center', marginRight: 12,
                }}>
                  <Text style={{ fontSize: 20 }}>💧</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15 }}>
                    Hydratation
                  </Text>
                  <Text style={{ color: theme.textMuted, fontSize: 12 }}>
                    {hydrated ? '1,5L atteint ✓' : 'Appuie pour valider 1,5L'}
                  </Text>
                </View>
                <Text style={{ color: hydrated ? theme.spark : theme.textMuted, fontWeight: '700' }}>
                  {hydrated ? '+10 ⚡' : '10 ⚡'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => !moodDone && setShowMoodPicker(!showMoodPicker)}
            activeOpacity={0.8}
          >
            <View style={{
              backgroundColor: theme.card, borderRadius: 18, padding: 16,
              borderWidth: 1,
              borderColor: moodDone ? theme.accent : theme.cardBorder,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 40, height: 40, borderRadius: 20,
                  backgroundColor: 'rgba(128,128,128,0.15)',
                  alignItems: 'center', justifyContent: 'center', marginRight: 12,
                }}>
                  <Text style={{ fontSize: 20 }}>
                    {selectedMood ? moods.find(m => m.id === selectedMood)?.emoji : '😊'}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.text, fontWeight: '600', fontSize: 15 }}>
                    Mood check-in
                  </Text>
                  <Text style={{ color: theme.textMuted, fontSize: 12 }}>
                    {moodDone ? 'Humeur enregistree ✓' : 'Comment tu te sens ?'}
                  </Text>
                </View>
                <Text style={{ color: moodDone ? theme.spark : theme.textMuted, fontWeight: '700' }}>
                  {moodDone ? '+5 ⚡' : '5 ⚡'}
                </Text>
              </View>

              {showMoodPicker && (
                <View style={{
                  flexDirection: 'row', justifyContent: 'space-around',
                  marginTop: 16, paddingTop: 16,
                  borderTopWidth: 1, borderTopColor: theme.cardBorder,
                }}>
                  {moods.map((m) => (
                    <TouchableOpacity
                      key={m.id}
                      onPress={() => handleMoodSelect(m.id)}
                      style={{
                        alignItems: 'center',
                        backgroundColor: 'rgba(128,128,128,0.15)',
                        borderRadius: 14, padding: 12, width: 70,
                      }}
                    >
                      <Text style={{ fontSize: 28 }}>{m.emoji}</Text>
                      <Text style={{ color: theme.textMuted, fontSize: 11, marginTop: 6 }}>
                        {m.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={theme.gradient}
          style={{ marginHorizontal: 16, marginBottom: 40, borderRadius: 20, padding: 20 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 17, flex: 1 }}>
              Team Rally
            </Text>
            <View style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              paddingHorizontal: 10, paddingVertical: 4, borderRadius: 99,
            }}>
              <Text style={{ color: theme.spark, fontSize: 12, fontWeight: '700' }}>
                +7% bonus
              </Text>
            </View>
          </View>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 16 }}>
            8/10 membres actifs aujourd'hui
          </Text>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 99, height: 10 }}>
            <LinearGradient
              colors={theme.bar}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={{ width: '67%', height: 10, borderRadius: 99 }}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
              3 350 / 5 000 Sparks
            </Text>
            <Text style={{ color: theme.spark, fontSize: 13, fontWeight: '700' }}>
              67%
            </Text>
          </View>
        </LinearGradient>

      </ScrollView>
    </View>
  );
}
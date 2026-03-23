import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DailyData {
  date: string;
  hydrated: boolean;
  moodDone: boolean;
  selectedMood: number | null;
  steps: number;
}

const KEYS = {
  daily: 'rr_daily_data',
  totalSparks: 'rr_total_sparks',
  streak: 'rr_streak',
  lastActiveDate: 'rr_last_active',
};

function todayString() {
  return new Date().toISOString().split('T')[0];
}

function getEmptyDay(): DailyData {
  return {
    date: todayString(),
    hydrated: false,
    moodDone: false,
    selectedMood: null,
    steps: 6500,
  };
}

export async function loadDailyData(): Promise<DailyData> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.daily);
    if (!raw) return getEmptyDay();
    const data: DailyData = JSON.parse(raw);
    if (data.date !== todayString()) return getEmptyDay();
    return data;
  } catch {
    return getEmptyDay();
  }
}

export async function saveDailyData(data: DailyData): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.daily, JSON.stringify({
      ...data,
      date: todayString(),
    }));
  } catch (e) {
    console.error('Erreur sauvegarde:', e);
  }
}

export async function loadTotalSparks(): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.totalSparks);
    return raw ? parseInt(raw) : 0;
  } catch {
    return 0;
  }
}

export async function saveTotalSparks(total: number): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.totalSparks, String(total));
  } catch (e) {
    console.error('Erreur sauvegarde total:', e);
  }
}

export async function loadStreak(): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.streak);
    return raw ? parseInt(raw) : 0;
  } catch {
    return 0;
  }
}

export async function checkAndUpdateStreak(): Promise<number> {
  try {
    const lastActive = await AsyncStorage.getItem(KEYS.lastActiveDate);
    const today = todayString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    let streak = await loadStreak();
    if (lastActive === yesterdayStr) {
      streak += 1;
    } else if (lastActive !== today) {
      streak = 1;
    }
    await AsyncStorage.setItem(KEYS.streak, String(streak));
    await AsyncStorage.setItem(KEYS.lastActiveDate, today);
    return streak;
  } catch {
    return 1;
  }
}
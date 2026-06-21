import { Habit } from '@/types/habits';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const HABITS_KEY = 'habits';

const habitsService = {
  async getHabits() {
    const data = await AsyncStorage.getItem(HABITS_KEY);
    return data ? JSON.parse(data) : [];
  },
  async getHabit(id: string) {
    const habits = await this.getHabits();
    return habits.find((habit: Habit) => habit.id === id);
  },
  async addHabit(habit: Habit) {
    const habits = await this.getHabits();
    const newHabit: Habit = {
      ...habit,
      id: Crypto.randomUUID(),
    };
    await AsyncStorage.setItem(
      HABITS_KEY,
      JSON.stringify([newHabit, ...habits])
    );
    return newHabit;
  },

  async deleteHabit(id: string) {
    const habits = await this.getHabits();
    const filtered = habits.filter((habit: Habit) => habit.id !== id);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(filtered));
  },
  async updateHabit(updatedHabit: Habit) {
    const habits = await this.getHabits();
    const index = habits.findIndex(
      (habit: Habit) => habit.id === updatedHabit.id
    );
    if (index !== -1) {
      habits[index] = updatedHabit;
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
    }
  },
};

export default habitsService;

import { Habit } from '@/types/habits';
import databaseService from './databaseService';
import { ID, Query } from 'react-native-appwrite';

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB as string;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_HABITS_ID as string;

const habitsService = {
  async getHabits(userId: string) {
    if (!userId) {
      console.error('Error: Missing userId in getHabits');
      return { data: [], error: 'User ID is missing' };
    }

    try {
      const response = await databaseService.listDocuments(dbId, colId, [
        Query.equal('userId', userId),
      ]);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error fetching notes:', error.message);
      } else {
        console.log('Error fetching notes:', error);
      }
      return {
        data: [],
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  },
  async addHabit(userId: string, name: string) {
    if (!name) {
      return { error: 'Habit text cannot be empty' };
    }

    const data = {
      name,
      streak: 0,
      userId,
    };

    const response = await databaseService.createDocument(
      dbId,
      colId,
      data,
      ID.unique()
    );

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  async updateHabit(id: string, updatedHabit: Habit) {
    const response = await databaseService.updateDocument(
      dbId,
      colId,
      id,
      updatedHabit
    );

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
  async deleteHabit(id: string) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }
    return { success: true };
  },
};

export default habitsService;

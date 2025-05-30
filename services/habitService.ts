import { Habit } from '@/types/habits';
import databaseService from './databaseService';
import { ID, Query } from 'react-native-appwrite';
import streakProtectorService from './streakProtectorService';

const dbId = process.env.APPWRITE_DB as string;
const colId = process.env.APPWRITE_COL_HABITS_ID as string;

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
        console.log('Error fetching habits:', error.message);
      } else {
        console.log('Error fetching habits:', error);
      }
      return {
        data: [],
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  },
  async getHabit(habitId: string) {
    try {
      const response = databaseService.getDocument(dbId, colId, habitId);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error fetching habit:', error.message);
      } else {
        console.log('Error fetching habit:', error);
      }
      return {
        data: null,
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

    const existingStreak =
      await streakProtectorService.getStreakProtector(userId);
    if (existingStreak?.data?.length === 0) {
      await streakProtectorService.addStreakProtector(userId, 0);
    }

    return { data: response };
  },
  async updateHabit(id: string, updatedHabit: Habit, userId: string) {
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

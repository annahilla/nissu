import { StreakProtector } from '@/types/habits';
import databaseService from './databaseService';
import { ID, Query } from 'react-native-appwrite';

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB as string;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_STREAK_ID as string;

const streakProtectorService = {
  async getStreakProtector(userId: string) {
    if (!userId) {
      console.error('Error: Missing userId in getStreakProtector');
      return { data: [], error: 'User ID is missing' };
    }

    try {
      const response = await databaseService.listDocuments(dbId, colId, [
        Query.equal('userId', userId),
      ]);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error fetching streak protector:', error.message);
      } else {
        console.log('Error fetching streak protector:', error);
      }
      return {
        data: [],
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  },
  async addStreakProtector(userId: string, value: number) {
    const data = {
      value: value,
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
  async updateStreakProtector(
    id: string,
    updatedStreak: {
      userId: string;
      value: number;
    }
  ) {
    const response = await databaseService.updateDocument(
      dbId,
      colId,
      id,
      updatedStreak
    );

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },
};

export default streakProtectorService;

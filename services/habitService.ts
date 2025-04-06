import databaseService from './databaseService';
import { ID } from 'react-native-appwrite';

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB as string;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_HABITS_ID as string;

const habitsService = {
  async getHabits() {
    try {
      const response = await databaseService.listDocuments(dbId, colId);
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
  async addHabit(name: string) {
    if (!name) {
      return { error: 'Habit text cannot be empty' };
    }

    const data = {
      name: name,
      streak: 0,
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
  async deleteHabit(id: string) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }
    return { success: true };
  },
};

export default habitsService;

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
};

export default habitsService;

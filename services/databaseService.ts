import { Habit } from '@/types/habits';
import { database } from './appwrite';

const databaseService = {
  async listDocuments(dbId: string, colId: string, queries = []) {
    try {
      const response = await database.listDocuments(dbId, colId, queries);
      return { data: response.documents || [], error: null };
    } catch (error) {
      console.error('Error fetching documents:', (error as Error).message);
      return { error: (error as Error).message };
    }
  },
  async createDocument(
    dbId: string,
    colId: string,
    data: { name: string; streak: number },
    id: string = ''
  ) {
    try {
      return await database.createDocument(dbId, colId, id || '', data);
    } catch (error) {
      console.error('Error creating document:', (error as Error).message);
      return { error: (error as Error).message };
    }
  },
  async deleteDocument(dbId: string, colId: string, id: string) {
    try {
      await database.deleteDocument(dbId, colId, id);
      return { success: true };
    } catch (error) {
      console.error('Error deleting document:', (error as Error).message);
      return { error: (error as Error).message };
    }
  },
};

export default databaseService;

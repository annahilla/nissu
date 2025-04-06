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
};

export default databaseService;

import { database } from './appwrite';

const databaseService = {
  async listDocuments(dbId: string, colId: string, queries: string[] = []) {
    try {
      const response = await database.listDocuments(dbId, colId, queries);
      return { data: response.documents || [], error: null };
    } catch (error) {
      console.error('Error fetching documents:', (error as Error).message);
      return { error: (error as Error).message };
    }
  },
  async getDocument(dbId: string, colId: string, id: string) {
    try {
      const response = await database.getDocument(dbId, colId, id);
      return { data: response || {}, error: null };
    } catch (error) {
      console.error('Error fetching document:', (error as Error).message);
      return { error: (error as Error).message };
    }
  },
  async createDocument(
    dbId: string,
    colId: string,
    data: any,
    id: string = ''
  ) {
    try {
      return await database.createDocument(dbId, colId, id || '', data);
    } catch (error) {
      console.error('Error creating document:', (error as Error).message);
      return { error: (error as Error).message };
    }
  },
  async updateDocument(dbId: string, colId: string, id: string, data: any) {
    try {
      return await database.updateDocument(dbId, colId, id, data);
    } catch (error) {
      console.error('Error updating document:', (error as Error).message);
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

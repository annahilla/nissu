import { account, verificationUrl } from './appwrite';
import { ID } from 'react-native-appwrite';

const authService = {
  async register(email: string, password: string) {
    try {
      const response = await account.create(ID.unique(), email, password);
      await account.createVerification(verificationUrl);
      return response;
    } catch (error) {
      return {
        error:
          (error as any).message || 'Registration failed. Please try again.',
      };
    }
  },
  async login(email: string, password: string) {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      return response;
    } catch (error) {
      return {
        error:
          (error as any).message ||
          'Login failed. Please check your credentials.',
      };
    }
  },
  async getUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },

  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      return {
        error: (error as Error).message || 'Logout failed. Please try again.',
      };
    }
  },
};

export default authService;

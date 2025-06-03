import { router } from 'expo-router';

export const onBackPress = () => {
  router.replace('/');
  return true;
};

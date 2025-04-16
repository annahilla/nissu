import { View } from 'react-native';
import HappyCat from '@/assets/cats/happy-cat.svg';
import CryingCat from '@/assets/cats/crying-cat.svg';
import StreakProtector from '../habits/StreakProtector';

const HabitsHeader = ({ isStreakLost }: { isStreakLost?: boolean }) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <StreakProtector />
      {isStreakLost ? (
        <CryingCat width={24} height={24} />
      ) : (
        <HappyCat width={24} height={24} />
      )}
    </View>
  );
};

export default HabitsHeader;

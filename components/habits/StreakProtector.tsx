import { View, Text, TouchableOpacity } from 'react-native';
import Cookie from '@/assets/icons/cookie.svg';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useStreakProtector } from '@/context/StreakProtectorContext';
import CustomModal from '../ui/Modal';
import Button from '../ui/Button';

const StreakProtector = ({ showModal }: { showModal?: boolean }) => {
  const { user } = useAuth();
  const { streakProtector, fetchStreakProtector } = useStreakProtector();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (user) {
      fetchStreakProtector();
    }
  }, [user]);

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        disabled={!showModal}
        className="flex flex-row items-center gap-2">
        <Cookie width={24} height={24} />
        <Text className="text-brown">{streakProtector.value}</Text>
      </TouchableOpacity>

      <CustomModal visible={modalVisible} setVisible={setModalVisible}>
        <View className="flex w-full items-center justify-center">
          <Cookie width={50} height={50} />
        </View>
        <Text className="text-center text-xl font-bold">
          Nissu loves cookies!
        </Text>
        <Text className="text-center text-lg">
          You earn a cookie every time you complete a streak for an entire week,
          and you can use them to save your houses
        </Text>
        <Button onPress={() => setModalVisible(false)}>Ok</Button>
      </CustomModal>
    </>
  );
};

export default StreakProtector;

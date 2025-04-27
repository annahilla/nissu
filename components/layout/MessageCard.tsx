import { View, Text } from 'react-native';
import { useMessage } from '@/context/MessageContext';
import { isSmallDevice } from '@/consts/sizes';

const MessageCard = () => {
  const { message } = useMessage();
  const topPosition = isSmallDevice ? '5%' : '10%';

  return (
    <View
      className="absolute m-4 flex h-20 w-[80%] items-center justify-center rounded-xl border border-2 border-brown/80 bg-beige/80 p-4"
      style={{ top: topPosition }}>
      <Text className="text-center">{message}</Text>
    </View>
  );
};

export default MessageCard;

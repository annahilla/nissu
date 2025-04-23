import { View, Text } from 'react-native';
import { useMessage } from '@/context/MessageContext';

const MessageCard = () => {
  const { message } = useMessage();

  return (
    <View
      className="absolute m-4 flex h-20 w-[80%] items-center justify-center rounded-xl border border-2 border-brown/80 bg-beige/80 p-4"
      style={{ top: `${10}%` }}>
      <Text className="text-center">{message}</Text>
    </View>
  );
};

export default MessageCard;

import { View, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { ReactNode } from 'react';
import X from '@/assets/icons/X.svg';

interface ModalProps {
  children: ReactNode;
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const CustomModal = ({ children, visible, setVisible }: ModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setVisible(false);
        }}>
        <View className="flex-1 items-center justify-center bg-black/30">
          <View className="relative w-[85%] gap-8 rounded-xl border border-2 border-brown bg-beige p-10">
            <View className="absolute right-4 top-4">
              <X onPress={() => setVisible(false)} />
            </View>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;

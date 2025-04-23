import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardVisible = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleKeyboardVisible = () => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  };

  useEffect(() => {
    handleKeyboardVisible();
  }, []);

  return { keyboardVisible };
};

export default useKeyboardVisible;

import React from 'react';
import MessageCard from '../layout/MessageCard';
import HabitsSection from './HabitsSection';
import DynamicCat from '../layout/DynamicCat';
import useKeyboardVisible from '@/hooks/useKeyboardVisible';

const HabitsScreen = () => {
  const { keyboardVisible } = useKeyboardVisible();

  return (
    <>
      {!keyboardVisible && <MessageCard />}
      <HabitsSection />
      {!keyboardVisible && <DynamicCat />}
    </>
  );
};

export default HabitsScreen;

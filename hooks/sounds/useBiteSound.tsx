import BiteSound from '@/assets/sounds/bite.mp3';
import useSoundEffect from './useSoundEffect';

const useBiteSound = () => {
  const { playSound: playBiteSound } = useSoundEffect(BiteSound);

  return { playBiteSound };
};

export default useBiteSound;

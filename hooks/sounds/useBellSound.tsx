import BellSound from '@/assets/sounds/bell.mp3';
import useSoundEffect from './useSoundEffect';

const useBellSound = () => {
  const { playSound: playBellSound } = useSoundEffect(BellSound);

  return { playBellSound };
};

export default useBellSound;

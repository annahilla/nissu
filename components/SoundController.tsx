import SoundOn from '@/assets/icons/sound-on.svg';
import SoundOff from '@/assets/icons/sound-off.svg';
import { Pressable } from 'react-native';
import { useSound } from '@/context/SoundProvider';

const SoundController = () => {
  const { togglePlayer, soundOn } = useSound();
  const SoundIcon = soundOn ? SoundOn : SoundOff;

  return (
    <Pressable onPress={togglePlayer}>
      <SoundIcon />
    </Pressable>
  );
};

export default SoundController;

import MeowSound1 from '@/assets/sounds/meow.mp3';
import MeowSound2 from '@/assets/sounds/meow-2.mp3';
import MeowSound3 from '@/assets/sounds/meow-3.mp3';
import MeowSound4 from '@/assets/sounds/meow-4.mp3';
import { useAudioPlayer } from 'expo-audio';

const MeowSounds = [MeowSound1, MeowSound2, MeowSound3, MeowSound4];

const useMeowSound = () => {
  const player = useAudioPlayer();

  const playMeowSound = async () => {
    const randomIndex = Math.floor(Math.random() * MeowSounds.length);
    const selectedSound = MeowSounds[randomIndex];

    player.replace(selectedSound);
    player.play();
  };

  return { playMeowSound };
};

export default useMeowSound;

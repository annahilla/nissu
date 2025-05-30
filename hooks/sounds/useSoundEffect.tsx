import { useAudioPlayer } from 'expo-audio';

const useSoundEffect = (sound: string) => {
  const player = useAudioPlayer(sound);

  const playSound = () => {
    player.replace(sound);
    player.play();
  };
  return { playSound };
};

export default useSoundEffect;

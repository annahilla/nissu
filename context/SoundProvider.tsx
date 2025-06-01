import { createContext, useContext, useEffect, useState } from 'react';
import { useAudioPlayer } from 'expo-audio';
import backgroundMusic from '@/assets/sounds/background-music.mp3';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SOUND_PREF_KEY = 'soundOn';

const SoundContext = createContext<{
  soundOn: boolean;
  togglePlayer: () => void;
  loadSoundPreference: () => Promise<void>;
}>({
  soundOn: true,
  togglePlayer: () => {},
  loadSoundPreference: async () => {},
});

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
  const player = useAudioPlayer(backgroundMusic);
  const [soundOn, setSoundOn] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (hasInitialized) {
      AsyncStorage.setItem(SOUND_PREF_KEY, soundOn.toString());
    }
  }, [soundOn]);

  const loadSoundPreference = async () => {
    const storedPref = (await AsyncStorage.getItem(SOUND_PREF_KEY)) || 'true';
    const isSoundOn = storedPref !== 'false';
    setSoundOn(isSoundOn);
    setHasInitialized(true);
    if (isSoundOn) {
      player.play();
    }
  };

  const togglePlayer = () => {
    if (player.playing) {
      player.pause();
      setSoundOn(false);
    } else {
      player.play();
      setSoundOn(true);
    }
  };

  return (
    <SoundContext.Provider
      value={{ soundOn, togglePlayer, loadSoundPreference }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);

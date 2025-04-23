import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface MessageContextInterface {
  message: string;
  setMessage: (value: string) => void;
  generateNewMessage: () => void;
}

interface MessageProviderInterface {
  children: ReactNode;
}

const MessageContext = createContext<MessageContextInterface>({
  message:
    "Do you want to build a skyscraper? Let's see for how long you can keep a streak going.",
  setMessage: () => {},
  generateNewMessage: () => {},
});

export const MessageProvider = ({ children }: MessageProviderInterface) => {
  const defaultMessage =
    "Do you want to build a skyscraper? Let's see for how long you can keep a streak going.";
  const [message, setMessage] = useState<string>(defaultMessage);

  const generateDailyMessage = () => {
    const messages = [
      'Rise and shine!',
      'You can do it!',
      'New day, new goals!',
      'Your streak awaits!',
      'Let’s go, champion!',
      'Make today count!',
      'Keep up the streak!',
      'Streaks never stop!',
      'Ready, set, go!',
      'Stay strong today!',
      'Don’t stop now!',
      'Let’s build that skyscraper!',
      'Purrfect streak time!',
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const generateNewMessage = () => {
    const newMessage = generateDailyMessage();
    setMessage(newMessage);
  };

  return (
    <MessageContext.Provider
      value={{ message, setMessage, generateNewMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);

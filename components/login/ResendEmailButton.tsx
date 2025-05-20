import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { account, verificationUrl } from '@/services/appwrite';

const ResendEmailButton = () => {
  const [wait, setWait] = useState(false);
  const [counter, setCounter] = useState(0);

  const resendVerificationEmail = async () => {
    try {
      await account.createVerification(verificationUrl);
      setWait(true);
      setCounter(60);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (wait && counter > 0) {
      timer = setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    } else if (counter === 0) {
      setWait(false);
    }

    return () => clearTimeout(timer);
  }, [wait, counter]);

  return (
    <Button onPress={resendVerificationEmail} disabled={wait}>
      {wait ? `Wait ${counter}s` : 'Resend email'}
    </Button>
  );
};

export default ResendEmailButton;

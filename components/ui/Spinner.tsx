import { ActivityIndicator } from 'react-native';
import React from 'react';

const Spinner = ({ className = '' }: { className?: string }) => {
  return (
    <ActivityIndicator className={className} color="#A68F75" size="large" />
  );
};

export default Spinner;

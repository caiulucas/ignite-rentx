import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Container, Title } from './styles';

interface ConfirmButtonProps {
  nextScreen: string;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ nextScreen }) => {
  const { navigate } = useNavigation();

  function handleConfirmRental() {
    navigate(nextScreen);
  }

  return (
    <Container onPress={handleConfirmRental}>
      <Title>Ok</Title>
    </Container>
  );
};

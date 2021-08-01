import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Container, Title } from './styles';

export const ConfirmButton: React.FC = () => {
  const { navigate } = useNavigation();

  function handleConfirmRental() {
    navigate('Home');
  }

  return (
    <Container onPress={handleConfirmRental}>
      <Title>Ok</Title>
    </Container>
  );
};

import React from 'react';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';

interface BackButtonProps {
  color?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ color }) => {
  const theme = useTheme();
  const { goBack } = useNavigation();

  return (
    <Container onPress={goBack}>
      <Feather
        name="chevron-left"
        size={24}
        color={color || theme.colors.text}
      />
    </Container>
  );
};

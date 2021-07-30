import React from 'react';
import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { Container } from './styles';

interface BackButtonProps extends BorderlessButtonProps {
  color?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ color, ...rest }) => {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <Feather
        name="chevron-left"
        size={24}
        color={color || theme.colors.text}
      />
    </Container>
  );
};

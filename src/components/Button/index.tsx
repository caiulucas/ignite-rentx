import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  isLoading?: boolean;
  light?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  color,
  enabled = true,
  isLoading = false,
  light = false,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <Container {...rest} enabled={enabled} color={color}>
      {isLoading ? (
        <ActivityIndicator color={colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};

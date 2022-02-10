import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, OptionTitle } from './styles';

interface OptionButtonProps extends TouchableOpacityProps {
  title: string;
  active?: boolean;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  title,
  active = false,
  ...rest
}) => {
  return (
    <Container {...rest} active={active}>
      <OptionTitle active={active}>{title}</OptionTitle>
    </Container>
  );
};

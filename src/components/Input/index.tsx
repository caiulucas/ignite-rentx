import React, { useCallback, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert, TextInputProps } from 'react-native';

import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  InputText,
  VisibilityButton,
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  last?: boolean;
}

export const Input: React.FC<InputProps> = ({
  iconName,
  secureTextEntry,
  value,
  last = false,
  ...rest
}) => {
  const { colors } = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handlePasswordVisibility() {
    setIsPasswordVisible(visibility => !visibility);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container last={last}>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? colors.main : colors.text}
        />
      </IconContainer>

      <InputText
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        placeholderTextColor={colors.text_detail}
        {...rest}
      />

      {secureTextEntry && (
        <IconContainer isFocused={isFocused} style={{ marginRight: 0 }}>
          <VisibilityButton onPress={handlePasswordVisibility}>
            <Feather
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color={colors.text}
            />
          </VisibilityButton>
        </IconContainer>
      )}
    </Container>
  );
};

import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface ContainerProps {
  last?: boolean;
}

interface CommonProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  margin-bottom: ${({ last }) => (last ? 0 : RFValue(8))}px;
`;

export const IconContainer = styled.View<CommonProps>`
  height: ${RFValue(56)}px;
  width: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  justify-content: center;
  align-items: center;
  margin-right: ${RFValue(2)}px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: ${RFValue(2)}px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const InputText = styled(TextInput)<CommonProps>`
  flex: 1;
  padding: 0 ${RFValue(24)}px;

  color: ${({ theme }) => theme.colors.title};
  background-color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-bottom-width: ${RFValue(2)}px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const VisibilityButton = styled(BorderlessButton)``;

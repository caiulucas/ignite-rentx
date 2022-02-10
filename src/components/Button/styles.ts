import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface ButtonProps {
  color?: string;
  isLoading?: boolean;
}

interface ButtonTitleProps {
  light?: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  height: ${RFValue(56)}px;

  align-items: center;
  justify-content: center;

  opacity: ${({ enabled, isLoading }) => (enabled ? 1 : 0.5)};
  background-color: ${({ theme, color }) => color || theme.colors.main};
`;

export const Title = styled.Text<ButtonTitleProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`;

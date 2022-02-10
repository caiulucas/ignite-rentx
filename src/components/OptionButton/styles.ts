import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

interface OptionProps {
  active?: boolean;
}

export const Container = styled(TouchableOpacity)<OptionProps>`
  ${({ theme, active }) =>
    active &&
    css`
      border-bottom-width: ${RFValue(2)}px;
      border-bottom-color: ${theme.colors.main};
    `};
`;

export const OptionTitle = styled.Text<OptionProps>`
  font-size: ${RFValue(20)}px;
  margin-bottom: ${RFValue(8)}px;
  font-family: ${({ theme, active }) =>
    active ? theme.fonts.secondary_600 : theme.fonts.secondary_400};
  color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.text_detail};
`;

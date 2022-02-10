import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Container = styled.View`
  padding: 0 ${RFValue(24)}px;
`;

export const Header = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(40)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.text};

  margin-top: ${RFValue(16)}px;
`;

export const Form = styled.View`
  width: 100%;
  margin: ${RFValue(64)}px 0;
`;

export const Footer = styled.View``;

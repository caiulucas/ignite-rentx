import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 0 ${RFValue(24)}px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${StatusBar.currentHeight + RFValue(32)}px;
  margin-bottom: ${RFValue(60)}px;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
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
  margin-top: ${RFValue(64)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const FormTitle = styled(Title)`
  font-size: ${RFValue(20)}px;
  margin-bottom: ${RFValue(24)}px;
`;

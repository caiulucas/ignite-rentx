import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const About = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};

  text-align: justify;
  line-height: ${RFValue(25)}px;
  margin-top: ${RFValue(24)}px;
`;

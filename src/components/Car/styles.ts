import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';

export const Container = styled(RectButton)`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${RFValue(17)}px ${RFValue(24)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const Details = styled.View``;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text_detail};
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const About = styled.View`
  flex-direction: row;
  align-items: center;

  margin-top: ${RFValue(16)}px;
`;

export const Rent = styled.View`
  margin-right: ${RFValue(24)}px;
`;

export const Price = styled(Name)`
  color: ${({ theme }) => theme.colors.main};
`;

export const Type = styled.View``;

export const CarImage = styled(FastImage).attrs({
  resizeMode: 'contain',
})`
  width: ${RFValue(167)}px;
  height: ${RFValue(85)}px;
`;

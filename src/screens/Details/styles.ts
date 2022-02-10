import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const HeaderContainer = styled(Animated.View)``;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  margin-top: ${Number(StatusBar.currentHeight) + RFValue(32)}px;
  margin-left: ${RFValue(24)}px;
`;

export const CarImageContainer = styled(Animated.View)``;

export const CarImages = styled.View`
  margin-top: ${Number(StatusBar.currentHeight) + RFValue(40)}px;
`;

export const Content = styled(Animated.ScrollView).attrs({
  contentContainerStyle: {
    padding: RFValue(16),
    alignItems: 'center',
  },
  showsVerticalScrollIndicator: false,
})`
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Details = styled.View`
  width: 96%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: ${RFValue(38)}px;
`;

export const Description = styled.View``;

export const Subtitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text_detail};

  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Rent = styled.View``;

export const Price = styled(Name)`
  color: ${({ theme }) => theme.colors.main};
`;

export const Accessories = styled.View`
  width: 100%;
  margin-top: ${RFValue(16)}px;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const Footer = styled.View`
  padding: ${RFValue(24)}px;
`;

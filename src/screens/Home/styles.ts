import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  height: ${RFValue(113)}px;

  padding: 0 ${RFValue(24)}px ${RFValue(28)}px ${RFValue(16)}px;

  background-color: ${({ theme }) => theme.colors.shape_dark};

  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 24,
    showVerticalScrollIndicator: false,
  },
})``;

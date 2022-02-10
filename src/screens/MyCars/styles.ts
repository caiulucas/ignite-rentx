import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(273)}px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: center;
  padding: ${RFValue(24)}px;
  padding-top: ${Number(StatusBar.currentHeight) + RFValue(32)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;

  margin-top: ${RFValue(36)}px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;

  margin-top: ${RFValue(18)}px;
`;

export const Content = styled.View`
  width: 100%;
  flex: 1;
  padding: 0 ${RFValue(16)}px;
`;

export const Appointments = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RFValue(24)}px 0;
`;

export const AppointmentsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled(AppointmentsTitle)`
  font-family: ${({ theme }) => theme.fonts.primary_500};
`;

export const CarWrapper = styled.View`
  margin-bottom: ${RFValue(16)}px;
`;

export const CarFooter = styled.View`
  width: 100%;

  padding: ${RFValue(12)}px;
  margin-top: ${RFValue(-10)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.background_secondary}; ;
`;

export const CarFooterTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CarFooterDate = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;
`;

export const Icon = styled(AntDesign)`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_detail};

  margin: 0 ${RFValue(10)}px;
`;

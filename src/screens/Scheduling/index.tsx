import React from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

import ArrowSvg from '../../assets/arrow.svg';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

export const Scheduling: React.FC = () => {
  const theme = useTheme();
  const { navigate } = useNavigation();

  function handleConfirmRental() {
    navigate('SchedulingDetails');
  }

  return (
    <Container>
      <Header>
        <BackButton color={theme.colors.background_secondary} />

        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguél
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected>18/06/2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até </DateTitle>
            <DateValue />
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
};

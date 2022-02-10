import React, { useState, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

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
import { Calendar, DayProps, MarkedDateProps } from '../../components/Calendar';
import { createInterval } from '../../components/Calendar/createInterval';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

type RentalPeriod = {
  startFormatted: string;
  endFormatted: string;
};

export const Scheduling: React.FC = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps,
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod,
  );

  const theme = useTheme();
  const { navigate } = useNavigation();
  const { params } = useRoute();

  const { car } = params as { car: CarDTO };

  function handleConfirmRental() {
    navigate(
      'SchedulingDetails' as never,
      {
        car,
        dates: Object.keys(markedDates),
      } as never,
    );
  }

  const handleChangeDate = useCallback(
    (date: DayProps) => {
      let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
      const end = date;

      if (start.timestamp > end.timestamp) {
        start = end;
      }

      setLastSelectedDate(end);
      const interval = createInterval(start, end);
      setMarkedDates(interval);

      const intervalKeys = Object.keys(interval);
      const firstDate = intervalKeys[0];
      const lastDate = intervalKeys[intervalKeys.length - 1];

      setRentalPeriod({
        startFormatted: format(
          getPlatformDate(new Date(firstDate)),
          'dd/MM/yyyy',
        ),
        endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
      });
    },
    [lastSelectedDate],
  );

  return (
    <Container>
      <Header>
        <BackButton color={theme.colors.background_secondary} />

        <Title>
          Escolha uma {'\n'}
          data de inicio e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até </DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          enabled={!!rentalPeriod.startFormatted}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};

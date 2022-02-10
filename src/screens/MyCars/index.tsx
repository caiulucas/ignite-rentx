import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { format, parseISO } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Car as CarModel } from '../../database/models/car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { api } from '../../services/api';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
  Icon,
} from './styles';

interface DataProps {
  id: string;
  car: CarModel;
  start_date: string;
  end_date: string;
}

export const MyCars: React.FC = () => {
  const { colors } = useTheme();
  const screenIsFocus = useIsFocused();

  const [cars, setCars] = useState<DataProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`rentals`);
        const formattedData = response.data.map((data: DataProps) => {
          return {
            ...data,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
          };
        });
        setCars(formattedData);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCars();
  }, [screenIsFocus]);

  return (
    <Container>
      <Header>
        <BackButton color={colors.background_secondary} />

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>

        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>

      {isLoading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car car={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <Icon name="arrowright" />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
};

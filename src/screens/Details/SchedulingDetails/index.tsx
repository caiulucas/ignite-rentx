import React, { useState, useCallback, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Accessory } from '../../../components/Accessory';
import { BackButton } from '../../../components/BackButton';
import { ImageSlider } from '../../../components/ImageSlider';

import { accessoryIcons } from '../../../utils/accessoryIcons';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Subtitle,
  Name,
  Rent,
  Price,
  Accessories,
  Footer,
} from '../styles';
import {
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  Title,
  TextDetail,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceTotal,
} from './styles';

import { Button } from '../../../components/Button';
import { CarDTO } from '../../../dtos/CarDTO';
import { getPlatformDate } from '../../../utils/getPlatformDate';
import { api } from '../../../services/api';

interface SchedulingDetailsParams {
  car: CarDTO;
  dates: string[];
}

export const SchedulingDetails: React.FC = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const netInfo = useNetInfo();

  const [updatedCar, setUpdatedCar] = useState<CarDTO>({} as CarDTO);
  const [isLoading, setIsLoading] = useState(false);

  const { car, dates } = params as SchedulingDetailsParams;

  const rentTotal = car.price * dates.length;
  const formattedPeriod = {
    start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
    end: format(
      getPlatformDate(new Date(dates[dates.length - 1])),
      'dd/MM/yyyy',
    ),
  };

  const handleConfirmRental = useCallback(async () => {
    setIsLoading(true);
    try {
      await api.post('rentals', {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      });

      navigate(
        'Confirmation' as never,
        {
          title: 'Carro alugado!',
          message: 'Agora você só precisa ir\naté a concessionária da RENTX',
          nextScreen: 'Home',
        } as never,
      );
    } catch (err) {
      Alert.alert('Não foi possível confirmar o agendamento');
    } finally {
      setIsLoading(false);
    }
  }, [car.id, dates, navigate, rentTotal]);

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`cars/${car.id}`);
      setUpdatedCar(response.data);
    }

    if (netInfo.isConnected) fetchCarUpdated();
  }, [car.id, netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={
            updatedCar.photos
              ? updatedCar.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Subtitle>{car.brand}</Subtitle>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Subtitle>{car.period}</Subtitle>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {updatedCar.accessories && (
          <Accessories>
            {updatedCar.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={accessoryIcons[accessory.type]}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <Title>De</Title>
            <TextDetail>{formattedPeriod.start}</TextDetail>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={colors.text}
          />

          <DateInfo>
            <Title>Até</Title>
            <TextDetail>{formattedPeriod.end}</TextDetail>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <Title>Total</Title>
          <RentalPriceDetails>
            <TextDetail>
              R$ {car.price} x{dates.length} diárias
            </TextDetail>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={colors.success}
          onPress={handleConfirmRental}
          isLoading={isLoading}
          enabled={!isLoading}
        />
      </Footer>
    </Container>
  );
};

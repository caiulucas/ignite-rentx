import { useNetInfo } from '@react-native-community/netinfo';
import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import CarSvg from '../../assets/car.svg';
import { Car as CarModel } from '../../database/models/car';
import { accessoryIcons } from '../../utils/accessoryIcons';

import {
  Container,
  Details,
  Subtitle,
  Name,
  About,
  Rent,
  Price,
  Type,
  CarImage,
} from './styles';

interface CarProps extends RectButtonProps {
  car: CarModel;
}

export const Car: React.FC<CarProps> = ({ car, ...rest }) => {
  const MotorIcon = accessoryIcons[car.fuel_type] || CarSvg;

  const netInfo = useNetInfo();

  return (
    <Container {...rest}>
      <Details>
        <Subtitle>{car.brand}</Subtitle>
        <Name>{car.name}</Name>

        <About>
          <Rent>
            <Subtitle>{car.period}</Subtitle>
            <Price>R$ {netInfo.isConnected ? car.price : '...'}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: car.thumbnail,
        }}
      />
    </Container>
  );
};

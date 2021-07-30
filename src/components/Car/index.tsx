import React from 'react';

import GasolineSvg from '../../assets/gasoline.svg';

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

type Car = {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
};

interface CarProps {
  car: Car;
}

export const Car: React.FC<CarProps> = ({ car }) => {
  return (
    <Container>
      <Details>
        <Subtitle>{car.brand}</Subtitle>
        <Name>{car.name}</Name>

        <About>
          <Rent>
            <Subtitle>{car.rent.period}</Subtitle>
            <Price>R$ {car.rent.price}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
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

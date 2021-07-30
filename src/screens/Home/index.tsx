import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import { Container, Header, TotalCars, CarList } from './styles';

export const Home: React.FC = () => {
  const car = {
    id: '1',
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: { period: 'Ao dia', price: 120 },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  };
  return (
    <Container>
      <Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <TotalCars>Total de 12 carros</TotalCars>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={item => item}
        renderItem={() => <Car car={car} />}
      />
    </Container>
  );
};

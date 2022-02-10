import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useNetInfo } from '@react-native-community/netinfo';

import { Accessory } from '../../../components/Accessory';
import { BackButton } from '../../../components/BackButton';
import { ImageSlider } from '../../../components/ImageSlider';
import { api } from '../../../services/api';

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
  HeaderContainer,
  CarImageContainer,
} from '../styles';
import { About, OfflineInfo } from './styles';

import { Button } from '../../../components/Button';
import { CarDTO } from '../../../dtos/CarDTO';
import { Car as CarModel } from '../../../database/models/car';
import { accessoryIcons } from '../../../utils/accessoryIcons';

export const CarDetails: React.FC = () => {
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { car } = params as { car: CarDTO };
  const netInfo = useNetInfo();

  const [updatedCar, setUpdatedCar] = useState<CarDTO>({} as CarDTO);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [250, 50],
        Extrapolate.CLAMP,
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0]),
    };
  });

  function handleConfirmRental() {
    navigate('Scheduling' as never, { car } as never);
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`cars/${car.id}`);
      setUpdatedCar(response.data);
    }

    if (netInfo.isConnected) fetchCarUpdated();
  }, [car.id, netInfo.isConnected]);

  return (
    <Container>
      <HeaderContainer style={headerStyleAnimation}>
        <Header>
          <BackButton />
        </Header>

        <CarImageContainer style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImageSlider
              imagesUrl={
                updatedCar.photos
                  ? updatedCar.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </CarImageContainer>
      </HeaderContainer>

      <Content onScroll={scrollHandler} scrollEventThrottle={16}>
        <Details>
          <Description>
            <Subtitle>{car.brand}</Subtitle>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Subtitle>{car.period}</Subtitle>
            <Price>R$ {netInfo.isConnected ? car.price : '...'}</Price>
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

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          enabled={Boolean(netInfo.isConnected)}
          onPress={handleConfirmRental}
        />

        {!netInfo.isConnected && (
          <OfflineInfo>
            Conecte-se à internet para ver mais detalhes e agendar seu carro
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
};

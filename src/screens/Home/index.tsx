import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { synchronize } from '@nozbe/watermelondb/sync';

import { useNetInfo } from '@react-native-community/netinfo';
import { database } from '../../database';
import { api } from '../../services/api';

import { Car as CarModel } from '../../database/models/car';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/CarDTO';
import { CarList, Container, Header, TotalCars } from './styles';
import Logo from '../../assets/logo.svg';

export const Home: React.FC = () => {
  const { navigate } = useNavigation();
  const netInfo = useNetInfo();

  const [cars, setCars] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`,
        );

        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        try {
          await api.post('/users/sync', user);
        } catch (error) {
          console.log(error);
        }
      },
    });
  }

  useEffect(() => {
    if (netInfo.isConnected) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<CarModel>('cars');
        const fetchedCars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(fetchedCars);
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigate('CarDetails' as never, { car } as never);
  }

  return (
    <Container>
      <Header>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <TotalCars>Total de {cars.length} carros</TotalCars>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car car={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
};

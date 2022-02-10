import React, { useState } from 'react';

import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Section,
} from './styles';
import { BackButton } from '../../components/BackButton';
import { OptionButton } from '../../components/OptionButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import PeopleSvg from '../../assets/people.svg';

const schema = Yup.object().shape({
  driver_license: Yup.string().required('CNH é obrigatória'),
  name: Yup.string().required('Nome é obrigatório'),
});

export const Profile: React.FC = () => {
  const { colors } = useTheme();
  const { user, signOut, updateUser } = useAuth();
  const netInfo = useNetInfo();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de conexão com internet para realizar login novamente',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => signOut() },
      ],
    );
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled) return;

    if (result.uri) setAvatar(result.uri);
  }

  async function handleUpdateProfile() {
    try {
      await updateUser({
        ...user,
        name,
        driver_license: driverLicense,
        avatar,
      });

      Alert.alert('Perfil atualizado');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert(error.message);
      } else {
        Alert.alert('Não foi possível atualizar perfil');
      }
    }
  }

  async function handleOptionChange(
    selectedOption: 'dataEdit' | 'passwordEdit',
  ) {
    if (!netInfo.isConnected && selectedOption === 'passwordEdit') {
      Alert.alert(
        'Você está offline',
        'Você precisa de conexão com internet para alterar a senha',
      );
    } else {
      setOption(selectedOption);
    }
  }

  return (
    <Container behavior="position">
      <Header>
        <HeaderTop>
          <BackButton color={colors.background_secondary} />
          <HeaderTitle>Editar perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather
              name="power"
              size={RFValue(24)}
              color={colors.text_detail}
            />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          {avatar ? (
            <Photo source={{ uri: avatar }} />
          ) : (
            <PeopleSvg
              width={RFValue(96)}
              height={RFValue(96)}
              fill={colors.text_detail}
            />
          )}
          <PhotoButton onPress={handleSelectAvatar}>
            <Feather
              name="camera"
              size={RFValue(24)}
              color={colors.background_secondary}
            />
          </PhotoButton>
        </PhotoContainer>
      </Header>

      <Content style={{ marginBottom: useBottomTabBarHeight() }}>
        <Options>
          <OptionButton
            title="Dados"
            active={option === 'dataEdit'}
            onPress={() => handleOptionChange('dataEdit')}
          />
          <OptionButton
            title="Trocar senha"
            active={option === 'passwordEdit'}
            onPress={() => handleOptionChange('passwordEdit')}
          />
        </Options>

        {option === 'dataEdit' && (
          <Section>
            <Input
              iconName="user"
              placeholder="Nome"
              defaultValue={user.name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <Input iconName="mail" editable={false} defaultValue={user.email} />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              last
              defaultValue={user.driver_license}
              onChangeText={setDriverLicense}
            />
          </Section>
        )}

        {option === 'passwordEdit' && (
          <Section>
            <Input iconName="lock" placeholder="Senha atual" secureTextEntry />
            <Input iconName="lock" placeholder="Nova senha" secureTextEntry />
            <Input
              iconName="lock"
              placeholder="Repetir senha"
              secureTextEntry
              last
            />
          </Section>
        )}
        <Button title="Salvar alterações" onPress={handleUpdateProfile} />
      </Content>
    </Container>
  );
};

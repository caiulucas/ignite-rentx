import React, { useEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';
import { api } from '../../../services/api';

type Params = {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
};

export const SecondStep: React.FC = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const { user } = params as Params;

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert('Informe a senha e a confirmação');
    }

    if (password !== passwordConfirm) {
      return Alert.alert('As senhas não são iguais');
    }

    try {
      await api.post('users', {
        ...user,
        driver_license: user.driverLicense,
        password,
      });

      return navigate('Confirmation', {
        title: 'Conta criada!',
        message: 'Agora é só fazer login\ne aproveitar.',
        nextScreen: 'SignIn',
      });
    } catch (error) {
      console.log(error);
      return Alert.alert('Ops!', 'Não foi possível cadastrar');
    }
  }

  return (
    <Container behavior="height">
      <Header>
        <BackButton />
        <Steps>
          <Bullet />
          <Bullet active />
        </Steps>
      </Header>

      {!isKeyboardVisible && (
        <>
          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil.</SubTitle>
        </>
      )}

      <Form>
        <FormTitle>2. Senha</FormTitle>

        <Input
          iconName="lock"
          placeholder="Senha"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={setPassword}
          value={password}
        />
        <Input
          iconName="lock"
          placeholder="Repetir senha"
          secureTextEntry
          autoCapitalize="none"
          last
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
        />
      </Form>
      <Button
        title="Cadastrar"
        color={colors.success}
        onPress={handleRegister}
      />
    </Container>
  );
};

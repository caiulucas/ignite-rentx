import React, { useEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import * as Yup from 'yup';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { database } from '../../database';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import {
  KeyboardAvoidingView,
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().required('A senha é obrigatória'),
});

export const SignIn: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    try {
      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Ops!', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais',
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate('FirstStep' as never);
  }

  useEffect(() => {
    async function loadData() {
      const userCollection = database.get('users');
      const users = await userCollection.query().fetch();
      console.log(users);
    }

    loadData();
  });

  return (
    <KeyboardAvoidingView behavior="height" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <Input
              iconName="lock"
              placeholder="Senha"
              secureTextEntry
              last
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button title="Login" onPress={handleSignIn} />

            <Button
              title="Criar conta gratuita"
              color={colors.background_secondary}
              style={{ marginTop: 8 }}
              onPress={handleNewAccount}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

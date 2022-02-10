import React, { createContext, useState, useContext, useEffect } from 'react';

import { api } from '../services/api';
import { database } from '../database';
import { User as ModelUser } from '../database/models/user';

type User = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string | null;
  token: string;
};

type AuthState = {
  token: string;
  user: User;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        // eslint-disable-next-line no-underscore-dangle
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  async function signIn(credentials: SignInCredentials) {
    try {
      const response = await api.post<AuthState>('sessions', credentials);

      const { token, user } = response.data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');

      await database.write(async () => {
        await userCollection.create(newUser => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw new Error(error as undefined);
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const selectedUser = await userCollection.find(data.id);
        await selectedUser.destroyPermanently();
      });

      setData({} as User);
    } catch (error) {
      throw new Error(error as undefined);
    }
  }

  async function updateUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const selectedUser = await userCollection.find(user.id);
        await selectedUser.update(userData => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });
      });

      setData(user);
    } catch (error) {
      throw new Error(error as undefined);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user: data, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  return useContext(AuthContext);
};

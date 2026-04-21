import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadindAuth] = useState(false);
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation();

  useEffect(() => {
    async function loadStorage(params) {
      try {
        const storageUser = await AsyncStorage.getItem('@buscarToken');

        if (storageUser) {
          api.defaults.headers.common['Authorization'] = `Bearer ${storageUser}`;

          const response = await api.get('/me');

          if (response?.data) {
            setUser({
              ...response.data,
              token: storageUser
            });
          }
        }
      } catch (error) {
        console.log('Erro ao buscar usuário:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadStorage();
  }, [])

  async function signUp(nome, email, password) {

    setLoadindAuth(true);
    try {
      const response = await api.post('/users', {
        name: nome,
        email: email,
        password: password,
        balance: 0
      });

      setUser(response.data);
      setLoadindAuth(false);
      navigation.goBack();

    } catch (error) {
      setLoadindAuth(false);
      // ESTE LOG É A CHAVE:
      alert('Erro ao cadastrar: ' + (error.response?.data?.message || 'Verifique o terminal'));
    }
  }

  async function signIn(email, password) {
    setLoadindAuth(true);

    try {
      const response = await api.post('/login', {
        email: email,
        password: password
      })

      const { id, name, token } = response.data;

      const data = {
        id,
        name,
        token, email

      }
      await AsyncStorage.setItem('@buscarToken', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser({ id, name, email, token })
      setLoadindAuth(false)
    } catch (err) {
      setLoadindAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear()
      .then(() => {
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut,  loadingAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
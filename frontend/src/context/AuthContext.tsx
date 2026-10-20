import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';

import { api } from '../services/api';
import { User } from '../types';

type C = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Auth = createContext<C>({
  user: null,
  login: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api
        .get('/api/auth/me')
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  async function login(email: string, password: string) {
    const response = await api.post('/api/auth/login', {
      email,
      password
    });

    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <Auth.Provider value={{ user, login, logout }}>
      {children}
    </Auth.Provider>
  );
}

export const useAuth = () => useContext(Auth);
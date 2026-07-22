
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { authService } from '../services/authService'; // O serviço que criamos antes!

// 1. O que vai estar disponível globalmente? (Tipagem)
interface AuthContextData {
  user: { nome: string; email: string } | null;
  isAuthenticated: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  lightMode: boolean;
}

// 2. Criando o Contexto (a estrutura vazia)
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// 3. O Provider (O gerenciador dos estados)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ nome: string; email: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  // Função global de Login
  async function signIn(email: string, pass: string) {
    try {
      setLoading(true);
      // Aqui usamos aquele serviço para bater na API
      const response = await authService.login({ email, password: pass });
      
      // Salvamos o usuário no estado global!
      setUser({ nome: response.nome, email: response.email });
      
      // Em um app real, aqui você também salvaria o Token (ex: JWT) 
      // usando AsyncStorage ou SecureStore para o usuário não precisar
      // logar de novo ao fechar o app.
      
    } catch (error) {
      throw error; // Repassa o erro para a tela tratar (ex: mostrar Alert)
    } finally {
      setLoading(false);
    }
  }

  // Função global de Logout
  function signOut() {
    setUser(null);
    // Aqui você também limparia o AsyncStorage
  }

  // O Provider "envelopa" os filhos (children) e distribui os 'values'
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, // !! converte para booleano (true se tiver user, false se null)
        signIn, 
        signOut, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 4. Criando um Hook customizado para facilitar o acesso nas telas
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
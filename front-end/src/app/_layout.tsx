import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

// 1. Importe o AuthProvider e o hook useAuth do seu contexto
import { AuthProvider, useAuth } from "../contexts/AuthContext"; 

// Componente interno que decide para onde o usuário deve ir
function MainLayout() {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments(); // Pega a pasta/rota atual que o usuário está
  const router = useRouter();

  useEffect(() => {
    // Se ainda estiver carregando as informações de auth (ex: buscando token salvo), não faz nada
    if (loading) return;

    // Verifica se o usuário está dentro do grupo de telas (auth)
    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // Se NÃO está logado e NÃO está nas telas de auth -> Manda pro Login
      router.replace("/(auth)/login");
    } else if (isAuthenticated && inAuthGroup) {
      // Se JÁ ESTÁ logado e tentou abrir o Login/Registro -> Manda pras Tabs
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, loading, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

// Layout Raiz Exportado
export default function RootLayout() {
  const [loaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!loaded) {
    return null;
  }

  // 2. Envelopamos o MainLayout com o AuthProvider
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
// app/(tabs)/social/_layout.tsx
import { Stack } from 'expo-router';
import { colors } from '@/styles/global';

export default function SocialLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundDark },
        headerTintColor: colors.textPrimaryDark,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
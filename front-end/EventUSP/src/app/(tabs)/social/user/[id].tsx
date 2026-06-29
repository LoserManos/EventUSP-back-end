// app/(tabs)/social/user/[id].tsx
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { SocialUser } from '@/types/social';
import { getUserById } from '@/storage/socialAPI'; // Crie esta função na sua API

export default function UserProfile() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams(); // Pega o ID da URL
  const [user, setUser] = useState<SocialUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca os detalhes na API usando o ID
    navigation.setOptions({ title: `` }); 

    getUserById(id as string).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [id]);

  if (loading || !user) return <ActivityIndicator />;

  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.bio}</Text>
    </View>
  );
}
// app/(tabs)/social/org/[id].tsx
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Organization } from '@/types/social';
import { getOrgById } from '@/storage/socialAPI'; // Crie esta função na sua API

export default function orgProfile() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams(); // Pega o ID da URL
  const [org, setorg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca os detalhes na API usando o ID
    navigation.setOptions({ title: `` }); 

    getOrgById(id as string).then(data => {
      setorg(data);
      setLoading(false);
    });
  }, [id]);

  if (loading || !org) return <ActivityIndicator />;

  return (
    <View>
      <Text>{org.name}</Text>
      <Text>{org.description}</Text>
    </View>
  );
}
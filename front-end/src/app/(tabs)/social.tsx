import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useFetchUser } from '../../hooks/useFetchUser';

export default function ProfileScreen() {
  const { userProfile: authUser } = useAuth(); // Usuário básico vindo do login (ex: id)
  
  // 1. Passamos o ID com segurança (só busca se authUser?.id existir)
  // 2. Mudamos de userData para user (conforme o hook foi construído)
  const userId = authUser?.id ? authUser.id : undefined;
  const { user, loading, error, refetch } = useFetchUser(userId);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={refetch} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* Agora usamos os dados completos que vieram da API através do useFetchUser */}
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.nickname}>@{user?.nickname}</Text>
      
      {user?.bio && <Text style={styles.bio}>{user.bio}</Text>}

      <View style={styles.infoCard}>
        <Text style={styles.email}>✉️ {user?.email}</Text>
        <Text style={styles.role}>Tipo de conta: {user?.role}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: 'bold' },
  nickname: { fontSize: 16, color: '#666', marginBottom: 10 },
  bio: { fontSize: 14, color: '#444', textAlign: 'center', marginBottom: 20, paddingHorizontal: 10 },
  infoCard: { width: '100%', padding: 15, backgroundColor: '#f5f5f5', borderRadius: 8 },
  email: { fontSize: 14, marginBottom: 5 },
  role: { fontSize: 14, color: '#888' },
  errorText: { color: 'red', marginBottom: 15 },
});
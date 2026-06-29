// src/app/(tabs)/index.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { UserCard } from '@/components/UserCard';
import { OrgCard } from '@/components/OrgCard';
import { getUsers, getOrgs } from '@/storage/socialAPI';
import { SocialUser, Organization } from '@/types/social';
import { colors, globalStyles } from '@/styles/global';
import SearchBar from '@/components/SearchBar';
import { SocialFeed } from '@/components/SocialFeed';

export default function SocialPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [type, setType] = useState<'user' | 'org'>('user'); // Padrão: Usuários
  const [searchQuery, setSearchQuery] = useState('');

  // Função principal para carregar dados
  const loadData = async (mode: 'user' | 'org', reset = false, query = '') => {
    if (loading) return;
    setLoading(true);
    
    const currentPage = reset ? 1 : page;
    const result = mode === 'user' 
      ? await getUsers(currentPage, query) 
      : await getOrgs(currentPage, query);

    setData(reset ? result : [...data, ...result]);
    setPage(reset ? 2 : currentPage + 1);
    setLoading(false);
  };

  // Carrega dados iniciais e re-carrega ao mudar o tipo
  useEffect(() => {
    loadData(type, true, searchQuery);
  }, [type]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    loadData(type, true, text);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <SearchBar 
          value={searchQuery} 
          onChangeText={handleSearch} 
          placeholder={`Buscar ${type === 'user' ? 'usuários' : 'organizações'}...`} 
        />
      </View>

      {/* Botões de Seleção */}
      <View style={styles.tabButtons}>
        <TouchableOpacity 
          style={[styles.button, type === 'user' && styles.activeButton]} 
          onPress={() => setType('user')}
        >
          <Text style={styles.buttonText}>Usuários</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, type === 'org' && styles.activeButton]} 
          onPress={() => setType('org')}
        >
          <Text style={styles.buttonText}>Organizações</Text>
        </TouchableOpacity>
      </View>

      <SocialFeed 
        data={data}
        loading={loading}
        onEndReached={() => loadData(type, false, searchQuery)}
        renderItem={({ item }) => (
          type === 'user' ? <UserCard user={item as SocialUser} /> : <OrgCard org={item as Organization} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    gap: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: colors.backgroundDarkSecondary,
  },
  activeButton: {
    backgroundColor: colors.orangePrimary,
  },
  buttonText: {
    color: colors.orangeSecondary,
    fontWeight: 'bold',
  }
});
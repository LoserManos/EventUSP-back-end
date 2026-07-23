import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/global';
import { useRouter } from 'expo-router';
export default function CreateEventScreen() {
  const router = useRouter();
  
  // Estados para os campos do formulário
  const [title, setTitle] = useState('');
  const [local, setLocal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const handleCreateEvent = () => {
    // Por enquanto apenas exibe os dados (Estrutura UI)
    if (!title || !local || !startDate || !duration || !category) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    console.log('Dados do evento:', { title, local, startDate, duration, category });
    Alert.alert('Sucesso', 'Estrutura do evento criada! (Integração com API pendente)');
  
    // Limpa os campos
    setTitle('');
    setLocal('');
    setStartDate('');
    setDuration('');
    setCategory('');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.titulo}>Criar Evento</Text>
            <Text style={styles.subtitulo}>
              Preencha os dados abaixo para divulgar seu novo evento.
            </Text>
          </View>
          {/* Nome do Evento */}
          <Text style={styles.label}>Nome do Evento</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="text-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ex: Festa da Computação"
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
            />
          </View>
              {/* Local */}
          <Text style={styles.label}>Local</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="location-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ex: Pátio Principal"
              placeholderTextColor={colors.textSecondary}
              value={local}
              onChangeText={setLocal}
            />
          </View>
          {/* Data e Hora (Estrutura provisória) */}
          <Text style={styles.label}>Data e Hora</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ex: 2024-10-30 18:00"
              placeholderTextColor={colors.textSecondary}
              value={startDate}
              onChangeText={setStartDate}
            />
          </View>
          {/* Duração */}
          <Text style={styles.label}>Duração (em minutos)</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="time-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ex: 120"
              placeholderTextColor={colors.textSecondary}
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
            />
          </View>
          
          {/* Categoria (Estrutura provisória) */}
          <Text style={styles.label}>ID da Categoria</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="pricetag-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ex: 1 (Festa), 2 (Esporte)..."
              placeholderTextColor={colors.textSecondary}
              value={category}
              onChangeText={setCategory}
              keyboardType="numeric"
            />
          </View>
          {/* Botão de Criar */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateEvent}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[colors.orangePrimary, colors.orangePrimary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Text style={styles.createButtonText}>Publicar Evento</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  titulo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.orangePrimary,
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 21,
  },
  label: {
    fontSize: 14,
    color: colors.textPrimaryDark,
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundDarkSecondary,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimaryDark,
  },
  createButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 10,
    shadowColor: colors.orangePrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  gradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    color: colors.backgroundDark,
    fontSize: 17,
    fontWeight: 'bold',
  },
});
// src/storage/socialAPI.ts
import { SocialUser, Organization } from '@/types/social'; // Importando seus tipos

// Mock Data para Usuários
const MOCK_USERS: SocialUser[] = Array.from({ length: 60 }).map((_, i) => ({
  id: (i + 1).toString(),
  name: `Usuário ${i + 1}`,
  username: `@usuario${i + 1}`,
  bio: "Entusiasta de eventos e tecnologia.",
}));

// Mock Data para Organizações
const MOCK_ORGS: Organization[] = Array.from({ length: 60 }).map((_, i) => ({
  id: (i + 1).toString(),
  name: `Organização ${i + 1}`,
  description: "Foco em promover grandes eventos universitários.",
}));

export const getUsers = async (page: number = 1, name?: string): Promise<SocialUser[]> => {
  return new Promise((resolve) => {
    let filtered = MOCK_USERS;
    if (name) {
      filtered = filtered.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
    }
    // Simula paginação: 20 por página
    const start = (page - 1) * 20;
    setTimeout(() => resolve(filtered.slice(start, start + 20)), 500);
  });
};

export const getUserById = async (id: string): Promise<SocialUser> => {
  return new Promise((resolve) => {
    const user = MOCK_USERS.find(u => u.id === id);
    setTimeout(() => resolve(user || MOCK_USERS[0]), 500);
  });
};

export const getOrgs = async (page: number = 1, name?: string): Promise<Organization[]> => {
  return new Promise((resolve) => {
    let filtered = MOCK_ORGS;
    if (name) {
      filtered = filtered.filter(o => o.name.toLowerCase().includes(name.toLowerCase()));
    }
    const start = (page - 1) * 20;
    setTimeout(() => resolve(filtered.slice(start, start + 20)), 500);
  });
};

export const getOrgById = async (id: string): Promise<Organization> => {
  return new Promise((resolve) => {
    const org = MOCK_ORGS.find(u => u.id === id);
    setTimeout(() => resolve(org || MOCK_ORGS[0]), 500);
  });
};
// Configuración base de la API
const API_URL = 'http://localhost:8080/api'; // Ajusta según tu backend

export const api = {
  // USUARIOS
  usuarios: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/usuarios`);
      return response.json();
    },
    
    getById: async (id) => {
      const response = await fetch(`${API_URL}/usuarios/${id}`);
      return response.json();
    },
    
    create: async (usuarioData) => {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioData),
      });
      return response.json();
    },
    
    update: async (id, usuarioData) => {
      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioData),
      });
      return response.json();
    },
    
    delete: async (id) => {
      const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    },
  },
  
  // ROLES
  roles: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/roles`);
      return response.json();
    },
  },
};
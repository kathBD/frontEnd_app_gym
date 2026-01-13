// Datos mock 
let usuariosFake = [
  {
    id: 1,
    nombre: "Juan Pérez",
    correo: "juan@mail.com",
    password: "123456",
    rolId: 1,
    activo: true
  },
  {
    id: 2,
    nombre: "Ana Gómez",
    correo: "ana@example.com",
    password: "123456",
    rolId: 2,
    activo: true
  },
  {
    id: 3,
    nombre: "Carlos Admin",
    correo: "carlos@mail.com",
    password: "123456",
    rolId: 3,
    activo: true
  }
];

// Roles disponibles
const roles = {
  1: "Cliente",
  2: "Entrenador",
  3: "Administrador"
};

const getRolFromId = (rolId) => {
  return roles[rolId] || "Cliente";
};

const getIdFromRol = (rolNombre) => {
  for (const [id, nombre] of Object.entries(roles)) {
    if (nombre === rolNombre) return parseInt(id);
  }
  return 1; // Por defecto Cliente
};

// Remover password para respuestas
const removePassword = (user) => {
  const copy = { ...user };
  delete copy.password;
  return {
    ...copy,
    rol: { nombre: getRolFromId(copy.rolId) }
  };
};

// Servicio de usuarios
const usuariosService = {
  // Obtener todos los usuarios
  getAll() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: usuariosFake.map(removePassword),
          message: "Usuarios cargados exitosamente"
        });
      }, 500); // Simular delay de red
    });
  },

  // Obtener usuario por ID
  getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuario = usuariosFake.find(u => u.id === parseInt(id));
        if (usuario) {
          resolve({
            data: removePassword(usuario),
            message: "Usuario encontrado"
          });
        } else {
          reject(new Error("Usuario no encontrado"));
        }
      }, 300);
    });
  },

  // Crear nuevo usuario
  create(usuarioData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Validaciones
          if (!usuarioData.nombre || !usuarioData.correo) {
            throw new Error("Nombre y correo son requeridos");
          }

          if (!usuarioData.password && !usuarioData.id) {
            throw new Error("La contraseña es requerida para nuevos usuarios");
          }

          // Verificar si el correo ya existe
          const correoExiste = usuariosFake.some(u => 
            u.correo.toLowerCase() === usuarioData.correo.toLowerCase()
          );
          
          if (correoExiste) {
            throw new Error("El correo ya está registrado");
          }

          // Generar nuevo ID
          const newId = usuariosFake.length > 0 
            ? Math.max(...usuariosFake.map(u => u.id)) + 1 
            : 1;

          // Convertir rol a rolId
          const rolId = getIdFromRol(usuarioData.rol);

          // Crear nuevo usuario
          const nuevoUsuario = {
            id: newId,
            nombre: usuarioData.nombre,
            correo: usuarioData.correo,
            password: usuarioData.password || "123456", // Valor por defecto
            rolId: rolId,
            activo: usuarioData.activo !== false // Por defecto true
          };

          usuariosFake.push(nuevoUsuario);
          
          resolve({
            data: removePassword(nuevoUsuario),
            message: "Usuario creado exitosamente"
          });
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  },

  // Actualizar usuario
  update(id, usuarioData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const index = usuariosFake.findIndex(u => u.id === parseInt(id));
          
          if (index === -1) {
            throw new Error("Usuario no encontrado");
          }

          // Mantener datos existentes
          const usuarioExistente = usuariosFake[index];
          
          // Convertir rol a rolId si se proporciona
          const rolId = usuarioData.rol 
            ? getIdFromRol(usuarioData.rol)
            : usuarioExistente.rolId;

          // Actualizar usuario
          usuariosFake[index] = {
            ...usuarioExistente,
            nombre: usuarioData.nombre || usuarioExistente.nombre,
            correo: usuarioData.correo || usuarioExistente.correo,
            rolId: rolId,
            activo: usuarioData.activo !== undefined 
              ? usuarioData.activo 
              : usuarioExistente.activo
          };

          // Actualizar password si se proporciona
          if (usuarioData.password) {
            usuariosFake[index].password = usuarioData.password;
          }

          resolve({
            data: removePassword(usuariosFake[index]),
            message: "Usuario actualizado exitosamente"
          });
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  },

  // Eliminar usuario
  delete(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = usuariosFake.findIndex(u => u.id === parseInt(id));
        
        if (index === -1) {
          reject(new Error("Usuario no encontrado"));
          return;
        }

        usuariosFake.splice(index, 1);
        
        resolve({
          success: true,
          message: "Usuario eliminado exitosamente"
        });
      }, 300);
    });
  },

  // Cambiar estado (activo/inactivo)
  toggleEstado(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = usuariosFake.findIndex(u => u.id === parseInt(id));
        
        if (index === -1) {
          reject(new Error("Usuario no encontrado"));
          return;
        }

        usuariosFake[index].activo = !usuariosFake[index].activo;
        
        resolve({
          data: removePassword(usuariosFake[index]),
          message: "Estado cambiado exitosamente"
        });
      }, 300);
    });
  },

  // Login
  login(correo, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = usuariosFake.find(
          (u) => u.correo === correo && u.password === password && u.activo
        );

        if (!user) {
          reject(new Error("Credenciales incorrectas o usuario inactivo"));
          return;
        }

        resolve({
          success: true,
          token: "mock-token-" + user.id,
          usuario: removePassword(user)
        });
      }, 500);
    });
  },

  // Obtener roles
  getRoles() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const rolesArray = Object.entries(roles).map(([id, nombre]) => ({
          id: parseInt(id),
          nombre
        }));
        resolve({
          data: rolesArray,
          message: "Roles cargados exitosamente"
        });
      }, 200);
    });
  },

  // Método para debug: ver todos los usuarios con password
  debugGetAllWithPassword() {
    return [...usuariosFake];
  }
};

export default usuariosService;